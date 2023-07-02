from django.urls import path

from . import views

urlpatterns = [
    path('paginated/', views.PaginatedAdminOrderView.as_view()),
    path('', views.AdminOrderView.as_view()),
]
