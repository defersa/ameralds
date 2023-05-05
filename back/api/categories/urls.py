from django.urls import path

from . import views


urlpatterns = [
    path('paginated/', views.CategoriesView.as_view()),
    path('all/', views.CategoriesAllView.as_view()),
    path('<int:pk>/', views.CategoryEditView.as_view()),
    path('', views.CategoryEditView.as_view()),
]
