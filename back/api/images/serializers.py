from rest_framework import serializers

from ..models import Image


class ImageSerializer(serializers.HyperlinkedModelSerializer):
    create_date = serializers.DateTimeField(format="%Y-%m-%d.%H-%M-%S")

    class Meta:
        model = Image
        fields = ['id', 'image_full', 'image_small', 'create_date']
