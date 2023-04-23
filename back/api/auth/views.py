from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.views.decorators.csrf import csrf_exempt

from ..models import Person
from ..emails.views import send_verify_email
from .utils import check_recaptcha_token


class AmstoreAuthView(APIView):
    permission_classes = []

    @csrf_exempt
    def post(self, request):
        if check_recaptcha_token(request.data['token']):
            # Auth user
            user = authenticate(username=request.data['username'], password=request.data['password'])

            if user is not None:
                try:
                    # Take auth token
                    payload = TokenObtainPairSerializer.get_token(user)

                    user_details = {
                        'name': user.username,
                        'access': str(payload.access_token),
                        "refresh": str(payload),
                    }

                    return Response(user_details, status=status.HTTP_200_OK)

                except Exception as e:
                    raise e
            return Response({'error': 'Not correct payload'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Is robot'})


# Регистрация нового пользователя
class AmstoreRegistrationView(APIView):
    permission_classes = []

    @classmethod
    def post(cls, request):
        same_email_user = User.objects.filter(email=request.data['email']).first()

        if same_email_user:
            return Response({
                "formError": {"email": {"emailBusy": True}}
            })

        new_user = User.objects.create_user(
            username=request.data['email'],
            email=request.data['email'],
            password=request.data['password'],
            first_name=request.data['firstName'] or '',
            lastName=request.data['lastName'] or '',
        )

        new_user.save()

        new_person = Person.create(
            user=new_user,
            location='ru'
        )

        new_person.save()

        return Response({"result": True})


# Отправить верефикационное письмо
class AmstoreSendVerifyView(APIView):
    permission_classes = [IsAuthenticated]

    @classmethod
    def get(cls, request):
        send_verify_email(request.user)
        return Response({"result": True})


# Подтверждение аккаунта
class AmstoreVerifyView(APIView):
    permission_classes = []

    @classmethod
    def post(cls, request):
        user = User.objects.filter(username=request.data['user']).first()
        if not user:
            return Response({
                "result": False
            })

        if not user.person.token_verify:
            return Response({
                "result": False
            })

        result = user.person.token_verify.verify(request.data['token'])

        if result:
            user.person.verify = True
            user.person.token_verify = None
            user.person.save()

        return Response({"result": result})
