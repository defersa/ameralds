import os

from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import HttpResponse
from django.conf import settings


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


