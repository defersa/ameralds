import math

from django.core.paginator import Paginator
from django.db.models import QuerySet, Q

from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Pattern, LangCharFieldShort, LangIntegerField, Image, Size
from ..patternFile import PatternSize, PatternSizeSerializer
from .serializers import PatternsMinSerializer, PatternsMaxSerializer


PATTERNS_ON_LIST = 5


class PaginatedPatternsView(APIView):
    permission_classes = []

    @classmethod
    def get(cls, request):

        page = request.GET.get('page', 1)
        per_page = request.GET.get('perPage', PATTERNS_ON_LIST)

        sizes = request.GET.getlist('sizes', [])
        categories = request.GET.getlist('categories', [])

        search = request.GET.get('search', None)

        pattern_list: QuerySet[Pattern] = Pattern.objects.all()

        if search and search != 'null':
            pattern_list = pattern_list.filter(Q(name__en__icontains=search) | Q(name__ru__icontains=search)).distinct()

        if len(categories):
            pattern_list = pattern_list.filter(category__in=categories).distinct()

        if len(sizes):
            pattern_list = pattern_list.filter(sizes__size__in=sizes).distinct()

        # if categories != 'null':
        #     categories_id_list = [int(item) for item in categories.split('-')]
        #     pattern_list = pattern_list.filter(category__in=categories_id_list)
        #
        # if sizes != 'null':
        #     sizes_id_list = [int(item) for item in sizes.split('-')]
        #     pattern_list = pattern_list.filter(sizes__size__in=sizes_id_list)

        paginator = Paginator(
            pattern_list.order_by('-views'), per_page)

        patterns = PatternsMinSerializer(
            paginator.page(page), many=True).data

        return Response({
            'pageCount': math.ceil(paginator.count / PATTERNS_ON_LIST),
            'page': page,
            'items': patterns
        })


class OwnPatternsView(APIView):
    permission_classes = [IsAuthenticated]

    @classmethod
    def get(cls, request, page):
        person_patterns = request.user.person.patterns
        paginator = Paginator(
            person_patterns.order_by('-views'), PATTERNS_ON_LIST)
        serializer_patterns = PatternsMinSerializer(
            paginator.page(page), many=True).data

        return Response({
            'pageCount': math.ceil(paginator.count / PATTERNS_ON_LIST),
            'page': page,
            'items': serializer_patterns
        })


class PatternCardView(APIView):
    permission_classes = []

    @classmethod
    def get(cls, request):
        pk = request.GET.get('id')

        if not len(Pattern.objects.filter(pk=pk)):
            return Response({
                'result': False
            })

        pattern = Pattern.objects.get(pk=pk)
        pattern.views = pattern.views + 1
        pattern.save()

        data = PatternsMaxSerializer(pattern).data

        return Response({
            'result': True,
            'item': data
        })


class PatternEditView(APIView):
    permission_classes = [IsAdminUser]

    @classmethod
    def get(cls, request):
        pk = request.GET.get('id')

        if not len(Pattern.objects.filter(pk=pk)):
            return Response({
                'result': False
            })

        pattern = Pattern.objects.get(pk=pk)

        data = PatternsMaxSerializer(pattern).data

        return Response({
            'result': True,
            'item': data
        })

    @classmethod
    def post(cls, request):
        pattern = Pattern()
        pattern.name = LangCharFieldShort()
        pattern.price = LangIntegerField()

        sizes = cls.update_entity(pattern, request)

        return Response({
            'id': pattern.pk,
            'sizes': sizes
        })

    @classmethod
    def patch(cls, request):
        pk = request.data['id']
        if not id:
            return Response("Not correct id", status=status.HTTP_400_BAD_REQUEST)

        pattern = Pattern.objects.get(pk=pk)
        sizes = cls.update_entity(pattern, request)

        return Response({
            'id': pattern.pk,
            'sizes': sizes
        })

    @classmethod
    def delete(cls, request):
        pk = request.GET.get('id')
        pattern = Pattern.objects.get(pk=pk)
        pattern.delete()

        return Response({
            'result': True
        })

    @staticmethod
    def update_entity(entity, request):
        entity.name.ru = request.data['name']['ru']
        entity.name.en = request.data['name']['en']
        entity.name.save()

        entity.price.ru = request.data['price']['ru']
        entity.price.en = request.data['price']['en']
        entity.price.save()

        entity.hidden = request.data['hidden']

        entity.save()
        entity.category.set(request.data['category'])

        pattern_images = request.data['images']

        for image in entity.images.all():
            matches = len([x for x in pattern_images if x == image.pk])
            if matches == 0:
                image.delete()

        entity.images.set(pattern_images)

        for index, image_pk in enumerate(pattern_images):
            image = Image.objects.get(pk=image_pk)
            image.index = index
            image.save()

        pattern_sizes = request.data['patternSizes']

        for size in entity.sizes.all():
            matches = len([x for x in pattern_sizes if x['id'] == size.pk])
            if matches == 0:
                size.delete()

        for size in pattern_sizes:
            if size['id'] and PatternSize.objects.get(pk=size['id']):
                bd_pattern_size = PatternSize.objects.get(pk=size['id'])
                bd_pattern_size.size = Size.objects.get(pk=size['size'])
                bd_pattern_size.save()

            else:
                bd_pattern_size = PatternSize(
                    size=Size.objects.get(pk=size['size']),
                    pattern=entity)
                bd_pattern_size.save()

                entity.sizes.add(bd_pattern_size)

        entity.save()

        return PatternSizeSerializer(entity.sizes, many=True).data

