from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import serializers, status
from .models import Pattern, PatternRating

import math
from django.core.paginator import Paginator


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

    class Meta:
        model = Pattern
        fields = ['id', 'name', 'urls', 'views',
                  'price_ru', 'price_en', 'rating']


class PatternsMaxSerializer(serializers.HyperlinkedModelSerializer):
    rating = RatingSelializer(many=True)

    class Meta:
        model = Pattern
        fields = ['id', 'name', 'description', 'urls', 'views',
                  'price_ru', 'price_en', 'create_date', 'rating']


class PatternsView(APIView):
    permission_classes = []

    def get(self, request, page):
        paginator = Paginator(Pattern.objects.order_by('-views'), PATTERNS_ON_LIST)
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
            'pattern': data,
            'user_rating': user_rating
        })
    def post(self, request):
        if not request.user or request.user.groups.filter(name=GOD_GROUP_NAME).count() == 0 :
            Response("Not enought permissions", status=status.HTTP_403_FORBIDDEN)

        pattern = Pattern(
            name=request.data['name'],
            price_ru=request.data['price_ru'],
            price_en=request.data['price_en'],
            description='desc')
        # pattern.name = request.data['name']
        # pattern.price_ru = request.data['price_ru']
        # pattern.price_en = request.data['price_en']
        # pattern.description = ''
        # pattern.images.set(None)
        pattern.save()
        Response({
            id: pattern.pk
        })
