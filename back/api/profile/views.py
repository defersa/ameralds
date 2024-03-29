from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer


MODER_NAME = 'moder'


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    @classmethod
    def get(cls, request):
        user = request.user

        user_data = UserSerializer(user).data

        return Response(user_data)