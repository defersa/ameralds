import math
from django.core.paginator import Paginator

from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import serializers, status
from .models import Category

CATEFORIES_ON_LIST = 20


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name_en', 'name_ru']


class CategoriesView(APIView):
    permission_classes = []

    def get(self, request, page):
        paginator = Paginator(
            Category.objects.order_by('-id'), CATEFORIES_ON_LIST)
        categories = CategorySerializer(
            paginator.page(page), many=True).data

        return Response({
            'pageCount': math.ceil(paginator.count / CATEFORIES_ON_LIST),
            'page': page,
            'items': categories
        })


class CategoriesEditView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        id = request.GET.get('id')

        if not len(Category.objects.filter(pk=id)):
            return Response({
                'result': False
            })

        category = Category.objects.get(pk=id)

        data = CategorySerializer(category).data

        return Response({
            'result': True,
            'category': data
        })

    def post(self, request):

        category = Category(
            name_en=request.data['name_en'],
            name_ru=request.data['name_ru'])
        category.save()

        return Response({
            'id': category.pk
        })

    def patch(self, request):
        id = request.data['id']
        if not id:
            Response("Not correct id", status=status.HTTP_400_BAD_REQUEST)

        pattern = Category.objects.get(pk=id)
        pattern.name_en = request.data['name_en']
        pattern.name_ru = request.data['name_ru']
        pattern.save()

        return Response({
            'id': pattern.pk
        })

    def delete(self, request):
        id = request.GET.get('id')
        pattern = Category.objects.get(pk=id)
        pattern.delete()

        return Response({
            'result': True
        })
