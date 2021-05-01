from rest_framework import serializers
from . import patterns, jewerly
from .models import Order, Pattern, Jewelry 
from datetime import datetime

from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response


class GoodsSelializer(serializers.HyperlinkedModelSerializer):
    jewels = jewerly.JewelryPriceSerializer(many=True)
    patterns = patterns.PatternsPriceSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'status', 'jewels', 'patterns']


class Goods():
    def getGoods(person):
        orders = person.orders.filter(status=1)
        order = None
        if len(orders) > 0:
            order = orders[0]
        else:
            order = Order.create(1, person, datetime.now())
            order.save()
        return order

    def getGoodsSer(person):
        return GoodsSelializer(Goods.getGoods(person))

    class GoodsAdd(APIView):
        permission_classes = [IsAuthenticated]

        def post(self, request):
            data = request.data
            status = True
            message = ''

            person_goods = Goods.getGoods(request.user.person)
            product_type = None
            new_product = None

            if data['productType'] == "patterns":
                product_type = person_goods.patterns
                new_product = Pattern.objects.get(pk=data['id'])
            if data['productType'] == "jewelys":
                product_type = person_goods.jewels
                new_product = Jewelry.objects.get(pk=data['id'])

            if not product_type.filter(pk=data['id']).exists():
                if new_product:
                    product_type.add(new_product)
            else:
                message = "Product is already in basket"
                status = False

            return Response({
                'result': status,
                'message': message,
                'goods': Goods.getGoodsSer(request.user.person).data
            })

    class GoodsRemove(APIView):
        permission_classes = [IsAuthenticated]

        def post(self, request):
            data = request.data
            status = True
            message = ''

            person_goods = Goods.getGoods(request.user.person)
            product_type = None
            remove_product = None

            if data['productType'] == "patterns":
                product_type = person_goods.patterns
                remove_product = Pattern.objects.get(pk=data['id'])
            if data['productType'] == "jewelys":
                product_type = person_goods.jewels
                remove_product = Jewelry.objects.get(pk=data['id'])

            if product_type.filter(pk=data['id']).exists():
                if remove_product:
                    product_type.remove(remove_product)
            else:
                message = "Product not exist"
                status = False

            return Response({
                'result': status,
                'message': message,
                'goods': Goods.getGoodsSer(request.user.person).data
            })
