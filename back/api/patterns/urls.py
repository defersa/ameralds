from django.urls import path

from .views import PaginatedPatternsView, PatternCardView, OwnPatternsView, PatternEditView


urlpatterns = [
    path('paginated/', PaginatedPatternsView.as_view()),
    path('own/<int:page>', OwnPatternsView.as_view()),
    path('edit/<int:page>', PatternEditView.as_view()),
    path('edit/', PatternEditView.as_view()),
    path('', PatternCardView.as_view()),
]

