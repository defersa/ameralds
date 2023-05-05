import random
import string
import io

from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

import PIL

from .. import models
from .serializers import ImageSerializer


class ImageView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        image_original = PIL.Image.open(request.data['file'])
        image_rate = image_original.size[0] / image_original.size[1]

        image_big: PIL.Image = image_original.resize((
            round(1080 * image_rate),
            1080), PIL.Image.ANTIALIAS).convert('RGB')

        image_small: PIL.Image = image_original.resize((
            round(480 * image_rate),
            480), PIL.Image.ANTIALIAS).convert('RGB')

        filename = ''.join(random.choices(
            string.ascii_lowercase + string.ascii_uppercase + string.digits, k=30)) + '.jpg'

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
            "image": ImageSerializer(image).data
        })

    def delete(self, request):

        id = request.GET.get('id')
        image = models.Image.objects.get(pk=id)
        image.delete()

        return Response({
            'result': True
        })
