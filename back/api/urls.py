from django.urls import path

from . import views, patterns, goods, fileview


urlpatterns = [	
    path('profile/', views.Profile.as_view()),
    path('patterns/<int:page>', patterns.PatternsView.as_view()),       
    path('pattern-edit/', patterns.PatternEditView.as_view()),
    path('pattern/', patterns.PatternCardView.as_view()),
    
    path('add-product/', goods.Goods.GoodsAdd.as_view()),
    path('remove-product/', goods.Goods.GoodsRemove.as_view()),
    path('goods-buy/', goods.Goods.GoodsBuy.as_view()),

    path('get-pattern-file/', fileview.FileManager.as_view()),
    path('upload-image-file/', fileview.ImageManager.as_view()),
    path('get-images/<int:page>', fileview.GetImages.as_view())
]