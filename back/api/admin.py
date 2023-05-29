from django.contrib import admin
from . import models

# Register your models here.

admin.site.register(models.Category)
admin.site.register(models.Jewelry)
admin.site.register(models.Pattern)
admin.site.register(models.Person)
admin.site.register(models.Order)
admin.site.register(models.Promo)
admin.site.register(models.JewelryRating)
admin.site.register(models.PatternRating)
admin.site.register(models.Image)
admin.site.register(models.Size)
admin.site.register(models.PrivateFile)
admin.site.register(models.PatternSize)
admin.site.register(models.LangCharFieldShort)
admin.site.register(models.Token)

admin.site.register(models.BoughtAdminPattern)
admin.site.register(models.AdminOrder)
