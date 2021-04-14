from . import models
from django.shortcuts import render


from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from . import goods

GOD_GROUP_NAME = 'god'


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def trypost(request):
    print(request)
    return Response({'data': 'you authrizate'})


class ExampleView(APIView):
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        content = {
            # `django.contrib.auth.User` instance.
            'user': request.user.username,
            'auth': request.auth,  # None
        }
        return Response(content)


class Profile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        god_mode = request.user.groups.filter(name=GOD_GROUP_NAME).count() > 0
        goods.Goods.getGoods(request.user.person)
        goodsValue = goods.Goods.getGoodsSer(request.user.person).data
        content = {
            'username': request.user.username,
            'email': request.user.email,
            'godmode': god_mode,
            'goods': goodsValue
        }
        return Response(content)


