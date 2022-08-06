from django.urls import path
from rest_framework_jwt.views import refresh_jwt_token

from .views import AmstoreAuthView

urlpatterns = [
    path('login/', AmstoreAuthView.as_view()),
    path('refresh/', refresh_jwt_token),
]
