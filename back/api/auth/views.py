from django.contrib.auth import authenticate, user_logged_in
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.serializers import jwt_payload_handler

import jwt
import requests

from ameralds import env
from ..models import Person
from ..emails.views import send_verify_email


class AmstoreAuthView(APIView):
    permission_classes = []

    @classmethod
    def post(cls, request):
        # Create your tests here.
        secret_key = env.RECAPTCHA_KEY

        # captcha verification
        recaptcha_data = {
            'response': request.data['token'],
            'secret': secret_key
        }
        recaptcha_response = requests.post('https://www.google.com/recaptcha/api/siteverify', data=recaptcha_data)
        recaptcha_response_result = recaptcha_response.json()

        if recaptcha_response_result.get('success'):
            # Auth user
            user = authenticate(username=request.data['username'], password=request.data['password'])
            if user is not None:
                try:
                    # Take auth token
                    payload = jwt_payload_handler(user)
                    token = jwt.encode(payload, env.SECRET_KEY)
                    user_details = {'name': "%s %s" % (
                        user.first_name, user.last_name), 'token': token}
                    user_logged_in.send(sender=user.__class__,
                                        request=request, user=user)
                    return Response(user_details, status=status.HTTP_200_OK)

                except Exception as e:
                    raise e
            return Response('Not correct payload', status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Is robot'})


class AmstoreRegistrationView(APIView):
    permission_classes = []

    @classmethod
    def post(cls, request):
        same_email_user = User.objects.filter(email=request.data['email']).first()
        if same_email_user:
            return Response({
                "formError": {
                    "email": {
                        "emailBusy": True
                    }
                }
            })

        new_user = User.objects.create_user(
            username=request.data['email'],
            email=request.data['email'],
            password=request.data['password']
        )

        if request.data['firstName']:
            new_user.first_name = request.data['firstName']
        if request.data['lastName']:
            new_user.first_name = request.data['lastName']
        new_user.save()

        new_person = Person.create()
        new_person.user = new_user
        new_person.location = 'ru'
        new_person.save()

        return Response({"result": True})


class AmstoreSendVerifyView(APIView):
    permission_classes = [IsAuthenticated]

    @classmethod
    def get(cls, request):
        send_verify_email(request.user)
        return Response({"result": True})


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
