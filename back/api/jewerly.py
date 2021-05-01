from rest_framework import serializers
from .models import Jewelry, JewelryRating

class JewelryPriceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Jewelry
        fields = ['id', 'price_ru', 'price_en']