from rest_framework import serializers
from .patterns.serializers import PatternsSerializer
from .jewerelies.serializers import JewelryPriceSerializer
from .models import Order, Pattern, Jewelry 
from datetime import datetime

from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .common.serializers import IdSerializer


class GoodsSelializer(serializers.HyperlinkedModelSerializer):
    jewels = JewelryPriceSerializer(many=True)
    patterns = PatternsSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'status', 'jewels', 'patterns']


class Goods():
    def getGoods(person):
        orders = person.orders.filter(status=1)

        if len(orders) > 0:
            order = orders[0]
        else:
            order = Order.create(1, person, datetime.now())            
            order.create_date = datetime.now()
            order.save()

        return order

    def getGoodsSer(person):
        return GoodsSelializer(Goods.getGoods(person))

    def getIdFromObject(objs):
        result = []
        for obj in objs:
            result.append(obj['id'])

        return result

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

    class GoodsBuy(APIView):
        permission_classes = [IsAuthenticated]

        def post(self, request): 
            person = request.user.person
            person_goods = Goods.getGoods(person)

            person_goods.status = 4
            person_goods.create_date = datetime.now()
            person_goods.save()

            bought_patterns_id = Goods.getIdFromObject(IdSerializer(person_goods.patterns.all(), many=True).data)

            for id in bought_patterns_id:
                person.patterns.add(id);
            person.save()
            
            return Response({
                'result': True,
                'goods': Goods.getGoodsSer(request.user.person).data,
                'patterns': IdSerializer(person.patterns, many=True).data
            })