import math

from django.core.mail import send_mail, EmailMultiAlternatives
from django.core.paginator import Paginator
from django.db.models import QuerySet, Q

from django.template.loader import get_template
from rest_framework import serializers, status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .fileview import ImageSerializer
from .categories.serializers import CategorySerializer
from .models import Pattern, LangCharFieldShort, LangIntegerField, Image, Size
from .patternFile import PatternSize, PatternSizeSerializer, PrivateFileSerializer

from .lang.serializers import LangShortSerializer, LangNumberSerializer


PATTERNS_ON_LIST = 5


def get_rating_sum(items):
    items_count: int = len(items) or 1
    rating_sum: int = 0
    for item in items:
        rating_sum = rating_sum + dict(item)['score']
    return round(rating_sum / items_count, 2)


class PatternsMinSerializer(serializers.HyperlinkedModelSerializer):
    name = LangShortSerializer()
    price = LangNumberSerializer()

    images = ImageSerializer(many=True)
    sizes = PatternSizeSerializer(many=True)
    category = CategorySerializer(many=True)

    class Meta:
        model = Pattern
        fields = ['id', 'name', 'views', 'price', 'images', 'category', 'sizes']


class PatternsMaxSerializer(serializers.HyperlinkedModelSerializer):
    name = LangShortSerializer()
    price = LangNumberSerializer()
    colors = PrivateFileSerializer()

    images = ImageSerializer(many=True)
    sizes = PatternSizeSerializer(many=True)
    category = CategorySerializer(many=True)

    class Meta:
        model = Pattern
        fields = ['id', 'name', 'views', 'category', 'hidden', 'price', 'images', 'sizes', 'colors']


class PatternsView(APIView):
    permission_classes = []

    @classmethod
    def get(cls, request, page, categories, sizes, search=None):
        print(search, categories, sizes.split('-'))

        pattern_list: QuerySet[Pattern] = Pattern.objects.all()

        if search and search != 'null':
            print(search)
            pattern_list = pattern_list.filter(Q(name__en__icontains=search) | Q(name__ru__icontains=search))

        if categories != 'null':
            categories_id_list = [int(item) for item in categories.split('-')]
            pattern_list = pattern_list.filter(category__in=categories_id_list)

        if sizes != 'null':
            sizes_id_list = [int(item) for item in sizes.split('-')]
            pattern_list = pattern_list.filter(sizes__size__in=sizes_id_list)

        paginator = Paginator(
            pattern_list.order_by('-views'), PATTERNS_ON_LIST)



        patterns = PatternsMinSerializer(
            paginator.page(page), many=True).data

        return Response({
            'pageCount': math.ceil(paginator.count / PATTERNS_ON_LIST),
            'page': page,
            'items': patterns
        })


class OwnPatternsView(APIView):
    permission_classes = [IsAuthenticated]

    @classmethod
    def get(cls, request, page):
        person_patterns = request.user.person.patterns
        paginator = Paginator(
            person_patterns.order_by('-views'), PATTERNS_ON_LIST)
        serializer_patterns = PatternsMinSerializer(
            paginator.page(page), many=True).data

        return Response({
            'pageCount': math.ceil(paginator.count / PATTERNS_ON_LIST),
            'page': page,
            'items': serializer_patterns
        })


class PatternCardView(APIView):
    permission_classes = []

    @classmethod
    def get(cls, request):
        pk = request.GET.get('id')

        if not len(Pattern.objects.filter(pk=pk)):
            return Response({
                'result': False
            })

        pattern = Pattern.objects.get(pk=pk)
        pattern.views = pattern.views + 1
        pattern.save()

        data = PatternsMaxSerializer(pattern).data

        return Response({
            'result': True,
            'item': data
        })


class PatternEditView(APIView):
    permission_classes = [IsAdminUser]

    @classmethod
    def get(cls, request):
        pk = request.GET.get('id')

        if not len(Pattern.objects.filter(pk=pk)):
            return Response({
                'result': False
            })

        pattern = Pattern.objects.get(pk=pk)

        data = PatternsMaxSerializer(pattern).data

        return Response({
            'result': True,
            'item': data
        })

    @classmethod
    def post(cls, request):
        pattern = Pattern()
        pattern.name = LangCharFieldShort()
        pattern.price = LangIntegerField()

        sizes = cls.update_entity(pattern, request)

        return Response({
            'id': pattern.pk,
            'sizes': sizes
        })

    @classmethod
    def patch(cls, request):
        pk = request.data['id']
        if not id:
            Response("Not correct id", status=status.HTTP_400_BAD_REQUEST)

        pattern = Pattern.objects.get(pk=pk)
        sizes = cls.update_entity(pattern, request)

        return Response({
            'id': pattern.pk,
            'sizes': sizes
        })

    @classmethod
    def delete(cls, request):
        pk = request.GET.get('id')
        pattern = Pattern.objects.get(pk=pk)
        pattern.delete()

        return Response({
            'result': True
        })

    @staticmethod
    def update_entity(entity, request):
        entity.name.ru = request.data['name']['ru']
        entity.name.en = request.data['name']['en']
        entity.name.save()

        entity.price.ru = request.data['price']['ru']
        entity.price.en = request.data['price']['en']
        entity.price.save()

        entity.hidden = request.data['hidden']

        entity.save()
        entity.category.set(request.data['category'])

        pattern_images = request.data['images']
        for image in entity.images.all():
            matches = len([x for x in pattern_images if x == image.pk])
            if matches == 0:
                image.delete()

        entity.images.set(pattern_images)
        for index, image_pk in enumerate(pattern_images):
            image = Image.objects.get(pk=image_pk)
            image.index = index
            image.save()

        pattern_sizes = request.data['patternSizes']

        for size in entity.sizes.all():
            matches = len([x for x in pattern_sizes if x['id'] == size.pk])
            if matches == 0:
                size.delete()

        for size in pattern_sizes:
            if size['id'] and PatternSize.objects.get(pk=size['id']):
                bd_pattern_size = PatternSize.objects.get(pk=size['id'])
                bd_pattern_size.size = Size.objects.get(pk=size['size'])
                bd_pattern_size.save()

            else:
                bd_pattern_size = PatternSize(
                    size=Size.objects.get(pk=size['size']),
                    pattern=entity)
                bd_pattern_size.save()

                entity.sizes.add(bd_pattern_size)

        entity.save()
        return PatternSizeSerializer(entity.sizes, many=True).data


class SendMailView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        email = request.data['email']
        data = "Id схемы: " + str(request.data['id'])
        # send_mail('Ну вот в принципе', data, None,
        #           [email], fail_silently=False)

        pattern = Pattern.objects.get(pk=request.data['id'])

        html_template = get_template('email_template_ru.html')

        subject = 'Покупка схемы'
        html_content = html_template.render({'name': pattern.name.ru, 'sizes': '14, 16'})
        msg = EmailMultiAlternatives(subject, 'alternate text', None, [email])
        msg.attach_alternative(html_content, "text/html")

        for size in pattern.sizes.all():
            msg.attach_file(size.cbb.file.path)
            msg.attach_file(size.pdf.file.path)
            msg.attach_file(size.png.file.path)

        msg.content_subtype = 'html'
        msg.send()


        return Response({
            'result': True
        })
