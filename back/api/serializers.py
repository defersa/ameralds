from rest_framework import serializers
from .models import LangCharFieldShort, LangIntegerField, PatternRating


class IdSerializer(serializers.Serializer):
    id = serializers.IntegerField()


class IdNameSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()


class LangShortSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LangCharFieldShort
        fields = ['en', 'ru']


class LangNumberSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LangIntegerField
        fields = ['en', 'ru']


class RatingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PatternRating
        fields = ['score']
