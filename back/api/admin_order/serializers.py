from rest_framework import serializers
from ..models import BoughtAdminPattern, AdminOrder
from ..patterns.serializers import PatternsSerializer, PatternSizeSerializer, PatternShortSerializer

class BoughtAdminPatternSerializer(serializers.HyperlinkedModelSerializer):
    sizes = PatternSizeSerializer(many=True)
    pattern = PatternsSerializer()

    class Meta:
        model = BoughtAdminPattern
        fields = ['id', 'colors', 'pattern', 'sizes']


class AdminOrderSerializer(serializers.HyperlinkedModelSerializer):
    purchases = BoughtAdminPatternSerializer(many=True)

    class Meta:
        model = AdminOrder
        fields = ['id', 'email', 'create_date', 'purchases']


class ShortBoughtAdminPatternSerializer(serializers.HyperlinkedModelSerializer):
    sizes = serializers.StringRelatedField(
        many=True,
    )
    pattern = PatternShortSerializer()

    class Meta:
        model = BoughtAdminPattern
        # fields = ['id', 'colors', 'pattern']
        fields = ['id', 'colors', 'pattern', 'sizes']

class ShortAdminOrderSerializer(serializers.HyperlinkedModelSerializer):
    purchases = ShortBoughtAdminPatternSerializer(many=True)

    class Meta:
        model = AdminOrder
        fields = ['id', 'email', 'create_date', 'purchases']
