from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from django.http import HttpResponse
from django.conf import settings

import os

from rest_framework.response import Response

from . import models
from PIL import Image

class FileManager(APIView):
    # permission_classes = [IsAuthenticated]
    permission_classes = []

    def get(self, request):
        file_path = os.path.join(settings.MEDIA_ROOT, 'media/test.pdf')
        if os.path.exists(file_path):
            with open(file_path, 'rb') as fh:
                response = HttpResponse(fh.read(), content_type="whatever")
                response['Content-Disposition'] = 'attachment; filename=' + os.path.basename(file_path)
                return response
        
        return Response()

import io, string, random
from django.core.files.uploadedfile import InMemoryUploadedFile

class ImageManager(APIView):
    permission_classes = []

    def post(self, request):
        image_original = Image.open(request.data['file'])
        image_big: Image = image_original.resize((1920, 1080), Image.ANTIALIAS)
        image_small: Image = image_original.resize((640, 480), Image.ANTIALIAS)

        filename = ''.join(random.choices(string.ascii_uppercase + string.digits, k=30)) + '.jpg'
        
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
        return Response()
