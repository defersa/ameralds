from django.urls import path
from rest_framework_jwt.views import refresh_jwt_token

from .views import AmstoreAuthView, AmstoreRegistrationView, AmstoreVerifyView, AmstoreSendVerifyView

urlpatterns = [
    path('login/', AmstoreAuthView.as_view()),
    path('refresh/', refresh_jwt_token),
    path('registration/', AmstoreRegistrationView.as_view()),
    path('send-verify-token/', AmstoreSendVerifyView.as_view()),
    path('verify/', AmstoreVerifyView.as_view()),
]
