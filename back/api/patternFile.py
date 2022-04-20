from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import serializers, generics
from rest_framework.decorators import permission_classes

from django.http import HttpResponse, StreamingHttpResponse, FileResponse
from django.core.files import File as FileWrapper

from .models import PrivateFile, PatternSize, Pattern
from .general.sizes import SizesSerializer


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


class PatternFileMethods:
    def create_pattern_size_file(patter_id: int, size_value: int, file_format, file):
        name = "id-" + str(patter_id) + "-size-" + \
            str(size_value) + "-" + file_format + '.' + file_format
        file.name = name

        return PatternFileMethods.create_file(name, file)

    def create_pattern_color_file(patter_id: int, file):
        name = "id-" + str(patter_id) + "-color.jpg"
        file.name = name

        return PatternFileMethods.create_file(name, file)

    def create_file(name, file):
        pattern_file = PrivateFile(
            name=name,
            file=file
        )
        pattern_file.save()

        return pattern_file

    def remove_pattern_files(pattern_size_object: PatternSize):
        if pattern_size_object.cbb:
            pattern_size_object.cbb.delete()
        if pattern_size_object.jbb:
            pattern_size_object.jbb.delete()
        if pattern_size_object.png:
            pattern_size_object.png.delete()
        if pattern_size_object.pdf:
            pattern_size_object.pdf.delete()


class PatternSizeFileView(APIView):
    permission_classes = [IsAdminUser]

    @classmethod
    def post(cls, request):
        pattern_size = request.data['patternSizeId']

        if pattern_size:
            pattern_size_object = PatternSize.objects.get(pk=pattern_size)

            if 'cbb' in request.data:
                if pattern_size_object.cbb:
                    pattern_size_object.cbb.delete()

                pattern_size_object.cbb = PatternFileMethods.create_pattern_size_file(
                    pattern_size_object.pattern.id, pattern_size_object.size.value, 'cbb', request.data['cbb'])

            if 'jbb' in request.data:
                if pattern_size_object.jbb:
                    pattern_size_object.jbb.delete()

                pattern_size_object.jbb = PatternFileMethods.create_pattern_size_file(
                    pattern_size_object.pattern.id, pattern_size_object.size.value, 'jbb', request.data['jbb'])

            if 'pdf' in request.data:
                if pattern_size_object.pdf:
                    pattern_size_object.pdf.delete()

                pattern_size_object.pdf = PatternFileMethods.create_pattern_size_file(
                    pattern_size_object.pattern.id, pattern_size_object.size.value, 'pdf', request.data['pdf'])

            if 'png' in request.data:
                if pattern_size_object.png:
                    pattern_size_object.png.delete()

                pattern_size_object.png = PatternFileMethods.create_pattern_size_file(
                    pattern_size_object.pattern.id, pattern_size_object.size.value, 'png', request.data['png'])
                
            pattern_size_object.save()

        return Response({
            "result": True
        })


class PatternColorFileView(APIView):
    @classmethod
    def post(cls, request):
        pattern_id = request.data['patternId']

        if pattern_id:
            pattern = Pattern.objects.get(pk=pattern_id)

            if 'colors' in request.data:
                if pattern.colors:
                    pattern.colors.delete()
                pattern.colors = PatternFileMethods.create_pattern_color_file(pattern_id, request.data['colors'])
                pattern.save()

        return Response({
            "result": True
        })


class PatternDownloadSizeFileView(generics.ListAPIView):

    @classmethod
    @permission_classes([IsAdminUser])
    def get(cls, request, pattern_size_id, format_name):
        pattern_size = PatternSize.objects.get(pk=pattern_size_id)

        file_model = None
        content_type = None
        if format_name == 'cbb':
            file_model = pattern_size.cbb
            content_type = 'text/cbb'
        if format_name == 'pdf':
            file_model = pattern_size.pdf
            content_type = 'application/pdf'
        if format_name == 'png':
            file_model = pattern_size.png
            content_type = 'image/png'

        if file_model:
            response = FileResponse(file_model.file, content_type=content_type)
            return response

        return Response({
            "result": False
        })

