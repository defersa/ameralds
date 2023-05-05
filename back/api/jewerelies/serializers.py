from rest_framework import serializers
from ..models import Jewelry


class JewelryPriceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Jewelry
        fields = ['id', 'price_ru', 'price_en']