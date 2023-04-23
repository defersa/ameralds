import math
from django.core.paginator import Paginator

from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.db.models import QuerySet

from ..models import Category
from .serializers import CategorySerializer

SIZES_ON_LIST = 10


class CategoriesView(APIView):
    permission_classes = []

    @staticmethod
    def get(request):
        page = request.GET.get('page', 1)
        per_page = request.GET.get('perPage', SIZES_ON_LIST)
        categories_list: QuerySet[Category] = Category.objects.all()

        paginator = Paginator(categories_list, per_page)

        categories_data = CategorySerializer(
            paginator.page(page), many=True).data

        return Response({
            'pageCount': math.ceil(paginator.count / SIZES_ON_LIST),
            'page': page,
            'items': categories_data
        })


class CategoriesAllView(APIView):
    permission_classes = []

    @staticmethod
    def get(request):
        categories = CategorySerializer(
            Category.objects.order_by('id'), many=True).data

        return Response({
            'items': categories
        })


class CategoryEditView(APIView):
    permission_classes = [IsAdminUser]

    @staticmethod
    def get(request, pk):
        if not len(Category.objects.filter(pk=pk)):
            return Response({
                'result': False
            })

        size = Category.objects.get(pk=pk)

        data = CategorySerializer(size).data

        return Response({
            'result': True,
            'item': data
        })

    @staticmethod
    def post(request):
        category = Category.create(Category,
            en=request.data['en'],
            ru=request.data['ru'])
        category.save()

        data = CategorySerializer(category).data

        return Response({
            'result': True,
            'item': data
        })


    @staticmethod
    def patch(request):
        pk = request.data['id']
        if not pk:
            Response("Not correct id", status=status.HTTP_400_BAD_REQUEST)

        category = Category.objects.get(pk=id)
        category.name.en = request.data['en']
        category.name.ru = request.data['ru']
        category.name.save()
        category.save()

        return Response({
            'result': True
        })


    @staticmethod
    def delete(request, pk):
        size = Category.objects.get(pk=pk)
        size.delete()

        return Response({
            'result': True
        })
