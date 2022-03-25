import math
from django.core.paginator import Paginator

from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import serializers, status

from ..models import Size

SIZES_ON_LIST = 10


class SizesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Size
        fields = ['id', 'value', 'create_date']


class SizesView(APIView):
    permission_classes = []

    @staticmethod
    def get(request, page):
        paginator = Paginator(
            Size.objects.order_by('value'), SIZES_ON_LIST)
        sizes = SizesSerializer(
            paginator.page(page), many=True).data

        return Response({
            'pageCount': math.ceil(paginator.count / SIZES_ON_LIST),
            'page': page,
            'items': sizes
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
            'size': data
        })

    @staticmethod
    def post(request):
        size = Size(
            value=request.data['value'])
        size.save()

        return Response({
            'id': size.pk
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
