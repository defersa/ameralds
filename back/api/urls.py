from django.urls import path

from . import views, patterns, goods, fileview


urlpatterns = [	
    path('profile/', views.Profile.as_view()),
    path('get-patterns/<int:page>', patterns.PatternsView.as_view()),   
    path('get-pattern-card/', patterns.PatternCardView.as_view()),
    path('add-product/', goods.Goods.GoodsAdd.as_view()),
    path('remove-product/', goods.Goods.GoodsRemove.as_view()),
    path('get-pattern-file/', fileview.FileManager.as_view()),
    path('upload-image-file/', fileview.ImageManager.as_view())
]