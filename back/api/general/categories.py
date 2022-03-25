import math
from django.core.paginator import Paginator

from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import serializers, status
from ..models import Category
from ..serializers import LangShortSerializer

CATEGORIES_ON_LIST = 10


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    name = LangShortSerializer()

    class Meta:
        model = Category
        fields = ['id', 'name', 'create_date']


class CategoriesView(APIView):
    permission_classes = []

    def get(self, request, page):
        paginator = Paginator(
            Category.objects.order_by('-id'), CATEGORIES_ON_LIST)
        categories = CategorySerializer(
            paginator.page(page), many=True).data

        return Response({
            'pageCount': math.ceil(paginator.count / CATEGORIES_ON_LIST),
            'page': page,
            'items': categories
        })

class CategoriesAllView(APIView):
    permission_classes = []

    def get(self, request):
        categories = CategorySerializer(
            Category.objects.order_by('-id'), many=True).data

        return Response({
            'items': categories
        })

class CategoryEditView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, pk):

        if not len(Category.objects.filter(pk=pk)):
            return Response({
                'result': False
            })

        category = Category.objects.get(pk=pk)

        data = CategorySerializer(category).data

        return Response({
            'result': True,
            'category': data
        })

    def post(self, request):

        print(request.data['en'], request.data['ru'])
        category = Category.create(Category,
            en=request.data['en'],
            ru=request.data['ru'])

        category.save()

        return Response({
            'id': category.pk
        })

    def patch(self, request):
        id = request.data['id']
        if not id:
            Response("Not correct id", status=status.HTTP_400_BAD_REQUEST)

        category = Category.objects.get(pk=id)
        category.name.en = request.data['en']
        category.name.ru = request.data['ru']
        category.name.save()
        category.save()

        return Response({
            'result': True
        })

    def delete(self, request, pk):
        category = Category.objects.get(pk=pk)
        category.delete()

        return Response({
            'result': True
        })
