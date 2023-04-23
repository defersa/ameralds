import math
from django.core.paginator import Paginator

from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.db.models import QuerySet, Q

from ..models import Size
from .serializers import SizesSerializer


SIZES_ON_LIST = 10


class SizesView(APIView):
    permission_classes = []

    @staticmethod
    def get(request):

        page = request.GET.get('page', 1)
        per_page = request.GET.get('perPage', SIZES_ON_LIST)
        sizes_list: QuerySet[Size] = Size.objects.all()

        match request.GET.get('sort', None):
            case 'newSort':
                sizes_list = sizes_list.order_by('-value')
            case _:
                sizes_list = sizes_list.order_by('-value')

        paginator = Paginator(sizes_list, per_page)

        sizes_data = SizesSerializer(
            paginator.page(page), many=True).data

        return Response({
            'pageCount': math.ceil(paginator.count / SIZES_ON_LIST),
            'page': page,
            'items': sizes_data
        })


class SizesAllView(APIView):
    permission_classes = []

    @staticmethod
    def get(request):
        sizes = SizesSerializer(
            Size.objects.order_by('value'), many=True).data

        return Response({
            'items': sizes
        })


class SizesEditView(APIView):
    permission_classes = [IsAdminUser]

    @staticmethod
    def get(request, pk):
        if not len(Size.objects.filter(pk=pk)):
            return Response({
                'result': False
            })

        size = Size.objects.get(pk=pk)

        data = SizesSerializer(size).data

        return Response({
            'result': True,
            'item': data
        })

    @staticmethod
    def post(request):
        size = Size(
            value=request.data['value'])
        size.save()

        data = SizesSerializer(size).data

        return Response({
            'result': True,
            'item': data
        })

    @staticmethod
    def patch(request):
        pk = request.data['id']
        if not pk:
            Response("Not correct id", status=status.HTTP_400_BAD_REQUEST)

        size = Size.objects.get(pk=pk)
        size.value = request.data['value']
        size.save()

        return Response({
            'result': True
        })

    @staticmethod
    def delete(request, pk):
        size = Size.objects.get(pk=pk)
        size.delete()

        return Response({
            'result': True
        })
