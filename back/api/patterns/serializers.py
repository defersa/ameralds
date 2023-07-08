from rest_framework import serializers

from ..lang.serializers import LangNumberSerializer, LangShortSerializer
from ..sizes.serializers import SizesSerializer
from ..images.serializers import ImageSerializer
from ..categories.serializers import CategorySerializer
from ..models import PatternSize, Pattern, PrivateFile


class PrivateFileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PrivateFile
        fields = ['name', 'id']


class PatternSizeSerializer(serializers.HyperlinkedModelSerializer):
    size = SizesSerializer()
    cbb = PrivateFileSerializer()
    jbb = PrivateFileSerializer()
    png = PrivateFileSerializer()
    pdf = PrivateFileSerializer()

    class Meta:
        model = PatternSize
        fields = ['id', 'size', 'cbb', 'jbb', 'png', 'pdf']


class PatternsSerializer(serializers.HyperlinkedModelSerializer):
    name = LangShortSerializer()
    price = LangNumberSerializer()
    colors = PrivateFileSerializer()

    sizes = PatternSizeSerializer(many=True)
    images = ImageSerializer(many=True)
    category = CategorySerializer(many=True)

    class Meta:
        model = Pattern
        fields = ['id', 'name', 'views', 'category', 'hidden', 'price', 'images', 'sizes', 'colors']


class PatternShortSerializer(serializers.HyperlinkedModelSerializer):
    name = LangShortSerializer()

    class Meta:
        model = Pattern
        fields = ['id', 'name']
