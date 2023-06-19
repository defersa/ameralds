from django.urls import path

from . import views

urlpatterns = [
    path('', views.AdminOrderView.as_view()),
]
