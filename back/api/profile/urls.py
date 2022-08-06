from django.urls import path

from .views import AmstoreOwnProfileView

urlpatterns = [
    path('own/', AmstoreOwnProfileView.as_view()),
]
