from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import AmstoreAuthView, AmstoreRegistrationView, AmstoreVerifyView, AmstoreSendVerifyView


urlpatterns = [
    path('login/', AmstoreAuthView.as_view()),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('registration/', AmstoreRegistrationView.as_view()),
    path('send-verify-token/', AmstoreSendVerifyView.as_view()),
    path('verify/', AmstoreVerifyView.as_view()),
]
