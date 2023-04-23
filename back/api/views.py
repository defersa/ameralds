from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from . import goods, serializers

MODER_NAME = 'moder'


class Profile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        god_mode = request.user.groups.filter(name=MODER_NAME).count() > 0
        goodsValue = goods.Goods.getGoodsSer(request.user.person).data

        content = {
            'username': request.user.username,
            'email': request.user.email,
            'godmode': god_mode,
            'goods': goodsValue,
            'patterns': serializers.IdSerializer(request.user.person.patterns, many=True).data
        }
        return Response(content)


