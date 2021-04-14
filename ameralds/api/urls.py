from django.urls import path

from . import views, patterns, goods


urlpatterns = [	
    path('profile/', views.Profile.as_view()),
    path('get-patterns/<int:page>', patterns.PatternsView.as_view()),    
    path('get-pattern-card/<int:id>', patterns.PatternCardView.as_view()),
    path('add-product/', goods.Goods.GoodsAdd.as_view()),
    path('remove-product/', goods.Goods.GoodsRemove.as_view()),
]