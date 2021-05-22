import math
from django.core.paginator import Paginator

from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import serializers, status
from .models import Pattern, PatternRating

from .fileview import ImageSerializer


PATTERNS_ON_LIST = 3
GOD_GROUP_NAME = 'god'


def getRatingSum(items):
    items_count = len(items) or 1
    sum = 0
    for item in items:
        sum = sum + dict(item)['score']
    return round(sum/items_count, 2)


class RatingSelializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PatternRating
        fields = ['score']


class PatternsPriceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Pattern
        fields = ['id', 'price_ru', 'price_en']


class PatternsMinSerializer(serializers.HyperlinkedModelSerializer):
    rating = RatingSelializer(many=True)
    images = ImageSerializer(many=True)

    class Meta:
        model = Pattern
        fields = ['id', 'name', 'urls', 'views',
                  'price_ru', 'price_en', 'rating', 'images']


class PatternsMaxSerializer(serializers.HyperlinkedModelSerializer):
    rating = RatingSelializer(many=True)
    images = ImageSerializer(many=True)

    class Meta:
        model = Pattern
        fields = ['id', 'name', 'description', 'urls', 'views',
                  'price_ru', 'price_en', 'create_date', 'rating', 'images']


class PatternsView(APIView):
    permission_classes = []

    def get(self, request, page):
        paginator = Paginator(
            Pattern.objects.order_by('-views'), PATTERNS_ON_LIST)
        pattern = PatternsMinSerializer(
            paginator.page(page), many=True).data

        for p in pattern:
            p['rating'] = getRatingSum(p['rating'])

        return Response({
            'pageCount': math.ceil(paginator.count / PATTERNS_ON_LIST),
            'page': page,
            'items': pattern
        })


class PatternCardView(APIView):
    permission_classes = []

    def get(self, request):
        id = request.GET.get('id')

        if not len(Pattern.objects.filter(pk=id)):
            return Response({
                'result': False
            })

        pattern = Pattern.objects.get(pk=id)

        pattern.views = pattern.views + 1
        pattern.save()

        data = PatternsMaxSerializer(pattern).data
        data['rating'] = getRatingSum(data['rating'])

        user_rating = None

        if request.user:
            user_rating_filter = request.user.person.patternRating.filter(
                pattern=pattern)
            if len(user_rating_filter):
                user_rating = RatingSelializer(
                    user_rating_filter, many=True).data[0]

        return Response({
            'result': True,
            'pattern': data,
            'user_rating': user_rating
        })

class PatternEditView(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request):

        pattern = Pattern(
            name=request.data['name'],
            price_ru=request.data['price_ru'],
            price_en=request.data['price_en'],
            description='desc',
            images=request.data['images'])
        pattern.save()

        return Response({
            'id': pattern.pk
        })

    def patch(self, request):
        id = request.data['id']
        if not id:
            Response("Not correct id", status=status.HTTP_400_BAD_REQUEST)

        pattern = Pattern.objects.get(pk=id)
        pattern.name = request.data['name']
        pattern.price_ru = request.data['price_ru']
        pattern.price_en = request.data['price_en']
        pattern.images.set(request.data['images'])
        pattern.save()

        return Response({
            'id': pattern.pk
        })

    def delete(self, request):

        id = request.GET.get('id')
        pattern = Pattern.objects.get(pk=id)
        pattern.delete()

        return Response({
            'result': True
        })
