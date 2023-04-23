from rest_framework import serializers

from ..models import Size


class SizesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Size
        fields = ['id', 'value', 'create_date']
