from rest_framework import serializers
from ..models import BoughtAdminPattern, AdminOrder
from ..patterns.serializers import PatternsSerializer, PatternSizeSerializer
from ..common.serializers import IdSerializer


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


class MinAdminOrderSerializer(serializers.HyperlinkedModelSerializer):
    purchases = IdSerializer(many=True)

    class Meta:
        model = AdminOrder
        fields = ['id', 'email', 'create_date', 'purchases']
