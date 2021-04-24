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

class ImageManager(APIView):
    permission_classes = []

    def post(self, request):
        # print(request.data['file'])
        # image = models.Image.create(request.data['file'])
        # image.save()
        image_original = Image.open(request.data['file'])
        image_big = image_original.resize((1920, 1080), Image.ANTIALIAS)
        image_small = image_original.resize((640, 480), Image.ANTIALIAS)
        
        
        # print(image_big, image_small.load(), request.data['file'])
        image = models.Image.create(image_big.load(), image_small.load())
        image.save()
        return Response()
