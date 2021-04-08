from django.urls import path

from . import views, patterns


urlpatterns = [	
    path('profile/', views.Profile.as_view()),
    path('get-patterns/<int:page>', patterns.PatternsView.as_view()),    
    path('get-pattern-card/<int:id>', patterns.PatternCardView.as_view()),
]