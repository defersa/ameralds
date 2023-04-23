from django.urls import path

from . import view


urlpatterns = [
    path('paginated/', view.SizesView.as_view()),
    path('all/', view.SizesAllView.as_view()),
    path('<int:pk>/', view.SizesEditView.as_view()),
    path('', view.SizesEditView.as_view()),
]
