import math
from django.core.paginator import Paginator

from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from . import patterns, jewerly
from .models import Order, Pattern, Jewelry 

class OrderMinSelializer(serializers.HyperlinkedModelSerializer):
    jewels = jewerly.JewelryPriceSerializer(many=True)
    patterns = patterns.PatternsMinSerializer(many=True)
    create_date = serializers.DateTimeField(format="%Y-%m-%d.%H-%M-%S")

    class Meta:
        model = Order
        fields = ['id', 'status', 'jewels', 'patterns', 'create_date']


ORDERS_ON_LIST = 5

class Orders(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, page):
        orders = request.user.person.orders
        paginator = Paginator(
           orders.order_by('-create_date'), ORDERS_ON_LIST)

        serializedOrders = OrderMinSelializer(
            paginator.page(page), many=True).data

        return Response({
            'pageCount': math.ceil(paginator.count / ORDERS_ON_LIST),
            'page': page,
            'orders': serializedOrders
        })