from rest_framework import serializers

from ..models import Category
from ..lang.serializers import LangShortSerializer


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    name = LangShortSerializer()

    class Meta:
        model = Category
        fields = ['id', 'name', 'create_date']

