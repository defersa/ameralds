from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from django.db.models import QuerySet
from django.core.paginator import Paginator

from ..models import BoughtAdminPattern, AdminOrder, Pattern
from ..patterns.utils import get_pattern
from .serializers import AdminOrderSerializer, ShortAdminOrderSerializer
from .utils import get_order_admin

import math


ORDER_ON_LIST = 6


class AdminOrderView(APIView):
    permission_classes = [IsAdminUser]

    @classmethod
    def post(cls, request):
        email = request.data['email']
        order = request.data['order']

        purchases = order['purchases']
        model_purchases = []

        for purchase in purchases:
            pattern: Pattern = get_pattern(purchase['pattern'])

            model_purchase: BoughtAdminPattern = BoughtAdminPattern(
                pattern=pattern,
                colors=purchase['color']
            )

            model_purchase.save()
            model_purchase.sizes.set(purchase['sizes'])
            model_purchase.save()

            model_purchases.append(model_purchase.pk)

        model_order = AdminOrder(
            email=email
        )

        model_order.save()
        model_order.purchases.set(model_purchases)
        model_order.save()

        return Response({
            'result': True
        })

    @classmethod
    def get(cls, request):
        pk = request.GET.get('id', 0)

        order = get_order_admin(pk)

        if not order:
            return Response({
                'result': False
            })

        item = AdminOrderSerializer(order).data

        return Response({
            'result': True,
            'item': item
        })


class PaginatedAdminOrderView(APIView):
    permission_classes = [IsAdminUser]

    @classmethod
    def get(cls, request):

        page = request.GET.get('page', 1)
        per_page = request.GET.get('perPage', ORDER_ON_LIST)

        # sizes = request.GET.getlist('sizes', [])
        # categories = request.GET.getlist('categories', [])
        #
        # search = request.GET.get('search', None)

        admin_order_list: QuerySet[AdminOrder] = AdminOrder.objects.all()

        # if search and search != 'null':
        #     pattern_list = pattern_list.filter(Q(name__en__icontains=search) | Q(name__ru__icontains=search)).distinct()
        #
        # if len(categories):
        #     pattern_list = pattern_list.filter(category__in=categories).distinct()
        #
        # if len(sizes):
        #     pattern_list = pattern_list.filter(sizes__size__in=sizes).distinct()

        #
        paginator = Paginator(
            admin_order_list.order_by('-create_date'), per_page)

        orders = ShortAdminOrderSerializer(
            paginator.page(page), many=True).data


        return Response({
            'pageCount': math.ceil(paginator.count / ORDER_ON_LIST),
            'page': page,
            'items': orders
        })
