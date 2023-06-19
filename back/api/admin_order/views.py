from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response


class AdminOrderView(APIView):
    permission_classes = [IsAdminUser]

    @classmethod
    def post(cls, request):
        email = request.data['email']
        order = request.data['order']

        print(email, order)

        return Response({
            'result': True
        })
