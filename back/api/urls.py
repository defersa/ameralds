from django.urls import path

from . import views, patterns, goods, fileview, orders, patternFile
from .general import sizes, categories

urlpatterns = [
    path('profile/', views.Profile.as_view()),

    path('patterns/page=<int:page>/categories=<slug:categories>/sizes=<slug:sizes>/search=<str:search>',
         patterns.PatternsView.as_view()),

    path('patterns/page=<int:page>/categories=<slug:categories>/sizes=<slug:sizes>', patterns.PatternsView.as_view()),

    path('pattern/', patterns.PatternCardView.as_view()),
    path('get-own-patterns/<int:page>', patterns.OwnPatternsView.as_view()),       
    
    
    path('add-product/', goods.Goods.GoodsAdd.as_view()),
    path('remove-product/', goods.Goods.GoodsRemove.as_view()),
    path('goods-buy/', goods.Goods.GoodsBuy.as_view()),

    path('get-pattern-file/', fileview.FileManager.as_view()),
    path('pattern-download-size-file/patternSizeId=<int:pattern_size_id>/format=<str:format_name>',
         patternFile.PatternDownloadSizeFileView.as_view()),

    path('pattern-download-colors-file/id=<int:pattern>',
         patternFile.PatternDownloadColorsFileView.as_view()),

    path('upload-image-file/', fileview.ImageManager.as_view()),
    path('get-images/<int:page>', fileview.GetImages.as_view()),

    path('get-orders/<int:page>', orders.Orders.as_view()),
    
    path('category/<int:pk>', categories.CategoryEditView.as_view()),
    path('category/', categories.CategoryEditView.as_view()),
    path('categories/<int:page>', categories.CategoriesView.as_view()),
    path('categories-all/', categories.CategoriesAllView.as_view()),
    
    path('size/<int:pk>', sizes.SizesEditView.as_view()),
    path('size/', sizes.SizesEditView.as_view()),
    path('sizes/<int:page>', sizes.SizesView.as_view()),
    path('sizes-all/', sizes.SizesAllView.as_view()),
    
    path('pattern-size-file/', patternFile.PatternSizeFileView.as_view()),
    path('pattern-colors-file/', patternFile.PatternColorFileView.as_view()),
    
    path('pattern-edit/', patterns.PatternEditView.as_view()),
    path('pattern-edit/<int:page>', patterns.PatternEditView.as_view()),

    path('send-mail/', patterns.SendMailView.as_view())
    
    
]