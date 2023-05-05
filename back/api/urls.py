from django.urls import path, include

from . import goods, fileview, orders, patternFile


urlpatterns = [
    # path('patterns/page=<int:page>/categories=<slug:categories>/sizes=<slug:sizes>/search=<str:search>',
    #      patterns.PaginatedPatternsView.as_view()),
    # path('patterns/page=<int:page>/categories=<slug:categories>/sizes=<slug:sizes>', patterns.PaginatedPatternsView.as_view()),
    # path('pattern/', patterns.PatternCardView.as_view()),
    # path('get-own-patterns/<int:page>', patterns.OwnPatternsView.as_view()),
    # path('pattern-edit/', patterns.PatternEditView.as_view()),
    # path('pattern-edit/<int:page>', patterns.PatternEditView.as_view()),
    
    
    path('add-product/', goods.Goods.GoodsAdd.as_view()),
    path('remove-product/', goods.Goods.GoodsRemove.as_view()),
    path('goods-buy/', goods.Goods.GoodsBuy.as_view()),

    path('get-pattern-file/', fileview.FileManager.as_view()),
    path('pattern-download-size-file/patternSizeId=<int:pattern_size_id>/format=<str:format_name>',
         patternFile.PatternDownloadSizeFileView.as_view()),

    path('pattern-download-colors-file/id=<int:pattern>',
         patternFile.PatternDownloadColorsFileView.as_view()),

    path('get-orders/<int:page>', orders.Orders.as_view()),


    path('pattern-size-file/', patternFile.PatternSizeFileView.as_view()),
    path('pattern-colors-file/', patternFile.PatternColorFileView.as_view()),

    path('patterns/', include('api.patterns.urls')),
    path('send-mail/', include('api.emails.urls')),

    path('auth/', include('api.auth.urls')),
    path('profile/', include('api.profile.urls')),
    path('sizes/', include('api.sizes.urls')),
    path('categories/', include('api.categories.urls')),
    path('images/', include('api.images.urls')),
    
]