from rest_framework import serializers
from .models import LangCharFieldShort, LangIntegerField, PatternRating


class IdSerializer(serializers.Serializer):
    id = serializers.IntegerField()


class IdNameSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()


class RatingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PatternRating
        fields = ['score']
