from django.contrib import admin
from .models import Category, Jewelry, Pattern, Person, Order, Promo

# Register your models here.

admin.site.register(Category)
admin.site.register(Jewelry)
admin.site.register(Pattern)
admin.site.register(Person)
admin.site.register(Order)
admin.site.register(Promo)