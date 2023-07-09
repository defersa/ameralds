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

        email = request.GET.get('email', None)
        start_date = request.GET.get('startDate', None)
        end_date = request.GET.get('endDate', None)

        admin_order_list: QuerySet[AdminOrder] = AdminOrder.objects.all()

        if start_date != 'null' and end_date != 'null':
            admin_order_list = admin_order_list.filter(create_date__range=[start_date, end_date])

        if email and email != 'null':
            admin_order_list = admin_order_list.filter(email__icontains=email).distinct()

        paginator = Paginator(
            admin_order_list.order_by('-create_date'), per_page)

        orders = ShortAdminOrderSerializer(
            paginator.page(page), many=True).data

        return Response({
            'pageCount': math.ceil(paginator.count / ORDER_ON_LIST),
            'page': page,
            'items': orders
        })
