from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import serializers

from .models import PatternFile, PatternSize
from .general.sizes import SizesSerializer


class PatternFileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PatternFile
        fields = ['name', 'id']


class PatternSizeSerializer(serializers.HyperlinkedModelSerializer):
    size = SizesSerializer()
    cbb = PatternFileSerializer()
    jbb = PatternFileSerializer()
    png = PatternFileSerializer()
    pdf = PatternFileSerializer()

    class Meta:
        model = PatternSize
        fields = ['id', 'size', 'cbb', 'jbb', 'png', 'pdf']


class PatternFileMethods:
    def create_pattern_file(patter_id: int, size_value, file_format, file):
        name = "id-" + str(patter_id) + "-size-" + \
            str(size_value) + "-" + file_format + '.' + file_format
        file.name = name
        
        pattern_file = PatternFile(
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


class PatternFileView(APIView):
    permission_classes = [IsAdminUser]

    @classmethod
    def post(cls, request):
        pattern_size = request.data['patternSizeId']

        if pattern_size:
            pattern_size_object = PatternSize.objects.get(pk=pattern_size)

            if 'cbb' in request.data:
                if pattern_size_object.cbb:
                    pattern_size_object.cbb.delete()

                pattern_size_object.cbb = PatternFileMethods.create_pattern_file(
                    pattern_size_object.pattern.id, pattern_size_object.size.value, 'cbb', request.data['cbb'])

            if 'jbb' in request.data:
                if pattern_size_object.jbb:
                    pattern_size_object.jbb.delete()

                pattern_size_object.jbb = PatternFileMethods.create_pattern_file(
                    pattern_size_object.pattern.id, pattern_size_object.size.value, 'jbb', request.data['jbb'])

            if 'pdf' in request.data:
                if pattern_size_object.pdf:
                    pattern_size_object.pdf.delete()

                pattern_size_object.pdf = PatternFileMethods.create_pattern_file(
                    pattern_size_object.pattern.id, pattern_size_object.size.value, 'pdf', request.data['pdf'])

            if 'png' in request.data:
                if pattern_size_object.png:
                    pattern_size_object.png.delete()

                pattern_size_object.png = PatternFileMethods.create_pattern_file(
                    pattern_size_object.pattern.id, pattern_size_object.size.value, 'png', request.data['png'])
                
            pattern_size_object.save()

        return Response({
            "result": True
        })
