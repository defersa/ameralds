import random
import string
import io
import math
import os

from PIL import Image

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.paginator import Paginator
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from django.http import HttpResponse
from django.conf import settings



from . import models
from .serializers import IdNameSerializer

IMAGES_ON_LIST = 10


class FileManager(APIView):
    permission_classes = []

    def get(self, request):
        file_path = os.path.join(settings.MEDIA_ROOT, 'media/test.pdf')
        if os.path.exists(file_path):
            with open(file_path, 'rb') as fh:
                response = HttpResponse(fh.read(), content_type="whatever")
                response['Content-Disposition'] = 'attachment; filename=' + \
                    os.path.basename(file_path)
                return response

        return Response()


class ImageSerializer(serializers.HyperlinkedModelSerializer):
    create_date = serializers.DateTimeField(format="%Y-%m-%d.%H-%M-%S")
    class Meta:
        model = models.Image
        fields = ['id', 'image_full', 'image_small', 'create_date']

class ImageSerializerFull(serializers.HyperlinkedModelSerializer):
    create_date = serializers.DateTimeField(format="%Y-%m-%d.%H-%M-%S")
    pattern = IdNameSerializer(many=True)
    jewelry = IdNameSerializer(many=True)
    class Meta:
        model = models.Image
        fields = ['id', 'image_full', 'image_small', 'create_date', 'pattern', 'jewelry']



class GetImages(APIView):
    permission_classes = []

    def get(self, request, page):
        paginator = Paginator(
            models.Image.objects.order_by('-create_date'), IMAGES_ON_LIST)

        images = ImageSerializerFull(
            paginator.page(page), many=True).data
        return Response({
            "pageCount": math.ceil(paginator.count / IMAGES_ON_LIST),
            "page": page,
            "images": images
        })


class ImageManager(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        image_original = Image.open(request.data['file'])
        image_rate = image_original.size[0] / image_original.size[1]

        image_big: Image = image_original.resize((
            round(1080 * image_rate),
            1080), Image.ANTIALIAS).convert('RGB')

        image_small: Image = image_original.resize((
            round(480 * image_rate),
            480), Image.ANTIALIAS).convert('RGB')

        filename = ''.join(random.choices(
            string.ascii_uppercase + string.digits, k=30)) + '.jpg'

        image_big_io = io.BytesIO()
        image_big.save(image_big_io, format='JPEG')

        thumb_file_big = InMemoryUploadedFile(image_big_io, None, filename, 'image/jpeg',
                                              image_big_io.tell, None)

        image_small_io = io.BytesIO()
        image_small.save(image_small_io, format='JPEG')

        thumb_file_small = InMemoryUploadedFile(image_small_io, None, filename, 'image/jpeg',
                                                image_small_io.tell, None)

        image = models.Image.create(thumb_file_big, thumb_file_small)
        image.save()

        return Response({
            "image": ImageSerializerFull(image).data
        })

    def delete(self, request):

        id = request.GET.get('id')
        image = models.Image.objects.get(pk=id)
        image.delete()

        return Response({
            'result': True
        })
