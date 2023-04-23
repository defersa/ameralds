from django.urls import path

from . import view


urlpatterns = [
    path('paginated/', view.CategoriesView.as_view()),
    path('all/', view.CategoriesAllView.as_view()),
    path('<int:pk>/', view.CategoryEditView.as_view()),
    path('', view.CategoryEditView.as_view()),
]
