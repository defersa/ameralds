from rest_framework import serializers
from ..models import LangCharFieldShort, LangIntegerField


class LangShortSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LangCharFieldShort
        fields = ['en', 'ru']


class LangNumberSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LangIntegerField
        fields = ['en', 'ru']
