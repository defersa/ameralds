from django import utils
from django.db import models
from django.contrib.auth.models import User

import os
import binascii


class LangCharFieldShort(models.Model):
    en = models.CharField(max_length=200, verbose_name="En", blank=True, default="")
    ru = models.CharField(max_length=200, verbose_name="Ru", blank=True, default="")

    def __str__(self):
        return str(self.en + ' ' + self.ru)


class LangIntegerField(models.Model):
    en = models.IntegerField(verbose_name="En", blank=True, default=0)
    ru = models.IntegerField(verbose_name="Ru", blank=True, default=0)

    def __str__(self):
        return str(str(self.en) + '$ ' + str(self.ru) + 'Р')


class Image(models.Model):
    name = models.CharField(max_length=200, verbose_name="Исходное название файла", default="")
    index = models.IntegerField(verbose_name="Номер в очереди", blank=True, default=0)
    image_full = models.ImageField(
        upload_to='static/images_model/full', blank=True)
    image_small = models.ImageField(
        upload_to='static/images_model/small', blank=True)
    create_date = models.DateTimeField(
        verbose_name="Дата создания картинки", auto_now_add=True)

    def delete(self, *args, **kwargs):
        if bool(self.image_full) and os.path.isfile(self.image_full.path):
            os.remove(self.image_full.path)
        if bool(self.image_small) and os.path.isfile(self.image_small.path):
            os.remove(self.image_small.path)

        super(Image, self).delete(*args, **kwargs)

    @classmethod
    def create(self, inout_image_full, input_image_small):
        return self(image_full=inout_image_full, image_small=input_image_small)

    def __str__(self):
        return str(self.pk)

    class Meta:
        ordering = ['index', 'pk']


class Category(models.Model):
    name = models.OneToOneField(LangCharFieldShort, on_delete=models.CASCADE)
    name_en = models.CharField(max_length=200, verbose_name="Имя категории en", blank=True)
    name_ru = models.CharField(max_length=200, verbose_name="Имя категории ru", blank=True)

    create_date = models.DateTimeField(
        verbose_name="Дата создании категории", auto_now_add=True)

    def create(self, en, ru):
        print(en, ru)
        lang = LangCharFieldShort(en=en, ru=ru)
        lang.save()
        return self.objects.create(name=lang)

    def __str__(self):
        return str(self.name.ru + ' ' + self.name.en)


class Size(models.Model):
    value = models.PositiveIntegerField(default=0)
    create_date = models.DateTimeField(
        verbose_name="Дата создания размера", auto_now_add=True)

    def __str__(self):
        return str(self.value)


class PrivateFile(models.Model):
    name = models.CharField(max_length=200, verbose_name="Название файла", default="")
    file = models.FileField(
        upload_to='files/pattern', blank=True)

    def delete(self, *args, **kwargs):
        if bool(self.file) and os.path.isfile(self.file.path):
            os.remove(self.file.path)
        super(PrivateFile, self).delete(*args, **kwargs)

    def __str__(self):
        return str(self.name)


class Jewelry(models.Model):
    name = models.CharField(max_length=200, verbose_name="Имя украшения")
    description = models.CharField(
        max_length=1000, verbose_name="Описание украшения")

    images = models.ManyToManyField(
        Image, related_name="jewelry", blank=True, verbose_name="Изображения")

    stock = models.IntegerField(verbose_name="Количество в наличии")
    complexity = models.IntegerField(
        verbose_name="Количество дней на новую исполнение новой товарной единицы")

    price = models.OneToOneField(LangIntegerField, on_delete=models.CASCADE, null=True, blank=True)

    price_ru = models.FloatField(verbose_name="Цена для СНГ")
    price_en = models.FloatField(verbose_name="Цена для мира")

    category = models.ManyToManyField(
        Category,
        related_name="jewelry",
        blank=True)

    views = models.IntegerField(verbose_name="Количество показов", default=0)

    create_date = models.DateTimeField(verbose_name="Дата создания позиции")

    def __str__(self):
        return str(self.name)


class Pattern(models.Model):
    name = models.OneToOneField(
        LangCharFieldShort,
        on_delete=models.CASCADE)

    description = models.CharField(
        max_length=1000,
        verbose_name="Описание схемы")

    images = models.ManyToManyField(
        Image, related_name="pattern",
        blank=True,
        verbose_name="Изображения")

    colors = models.OneToOneField(
        PrivateFile,
        verbose_name="Цветовой подбор",
        on_delete=models.CASCADE,
        related_name="colors",
        blank=True,
        null=True)

    price = models.OneToOneField(
        LangIntegerField,
        on_delete=models.CASCADE)

    hidden = models.BooleanField(verbose_name="Скрытый")

    category = models.ManyToManyField(
        Category,
        related_name="pattern",
        blank=True)

    views = models.IntegerField(
        verbose_name="Количество показов",
        default=0)
    create_date = models.DateTimeField(
        verbose_name="Дата создания позиции",
        default=utils.timezone.now)

    def delete(self, *args, **kwargs):
        for image in self.images.all():
            image.delete()

        if self.colors:
            self.colors.delete()

        super(Pattern, self).delete(*args, **kwargs)

    def __str__(self):
        return str(self.name)


class PatternSize(models.Model):
    pattern = models.ForeignKey(Pattern, on_delete=models.CASCADE, related_name="sizes")
    size = models.ForeignKey(Size, on_delete=models.CASCADE)

    cbb = models.OneToOneField(PrivateFile, on_delete=models.CASCADE, related_name="cbb", blank=True, null=True)
    pdf = models.OneToOneField(PrivateFile, on_delete=models.CASCADE, related_name="pdf", blank=True, null=True)
    png = models.OneToOneField(PrivateFile, on_delete=models.CASCADE, related_name="png", blank=True, null=True)
    jbb = models.OneToOneField(PrivateFile, on_delete=models.CASCADE, related_name="jbb", blank=True, null=True)

    def delete(self, *args, **kwargs):
        if self.cbb:
            self.cbb.delete()
        if self.pdf:
            self.pdf.delete()
        if self.png:
            self.png.delete()
        if self.jbb:
            self.jbb.delete()

        super(PatternSize, self).delete(*args, **kwargs)

    def __str__(self):
        return str(self.pk)


class Token(models.Model):
    value = models.CharField(max_length=100)

    @classmethod
    def create(cls):
        token = cls()
        token.value = binascii.hexlify(os.urandom(20)).decode()
        return token

    def verify(self, token):
        if token == self.value:
            super(Token, self).delete()
            return True
        else:
            return False

    def __str__(self):
        return str(self.pk)


class Person(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    verify = models.BooleanField(verbose_name='Потвержденный аккаунт', default=False)

    token_verify = models.ForeignKey(Token,
                                     on_delete=models.SET_NULL,
                                     related_name="user_verify",
                                     blank=True,
                                     null=True)

    bonus_coints_ru = models.FloatField(default=0)
    bonus_coints_en = models.FloatField(default=0)

    location = models.CharField(max_length=2)

    patterns = models.ManyToManyField(
        Pattern,
        blank=True)

    @classmethod
    def create(cls):
        person = cls()
        person.token_verify = Token.create()
        person.token_verify.save()
        return person


    def __str__(self):
        return str(self.user.username)


class JewelryRating(models.Model):
    score = models.IntegerField(verbose_name="Оценка", default=0)

    user = models.ForeignKey(
        Person, on_delete=models.CASCADE, related_name='jewelryRating')
    jewelry = models.ForeignKey(
        Jewelry, on_delete=models.CASCADE, related_name='rating')

    def __str__(self):
        return str(self.pk)


class PatternRating(models.Model):
    score = models.IntegerField(verbose_name="Оценка", default=0)

    user = models.ForeignKey(
        Person, on_delete=models.CASCADE, related_name='patternRating')
    pattern = models.ForeignKey(
        Pattern, on_delete=models.CASCADE, related_name='rating')

    def __str__(self):
        return str(self.pk)


class Order(models.Model):
    status = models.IntegerField()

    jewels = models.ManyToManyField(
        Jewelry,
        blank=True)

    patterns = models.ManyToManyField(
        Pattern,
        blank=True)

    track_number = models.CharField(
        max_length=200, verbose_name="Трек отслеживания", blank=True)

    next_status_date = models.DateTimeField(
        verbose_name="Примерное время измения статуса", blank=True)

    owner = models.ForeignKey(
        Person, on_delete=models.CASCADE, related_name='orders')

    create_date = models.DateTimeField(
        verbose_name="Дата создания заказа", default=utils.timezone.now)

    @classmethod
    def create(self, status, person, next_status_date):
        order = self(status=status, owner=person,
                     next_status_date=next_status_date)
        return order

    def __str__(self):
        return str(self.pk)


class Promo(models.Model):
    active = models.BooleanField()

    secretCode = models.CharField(max_length=50)
    coints_ru = models.FloatField()
    coints_en = models.FloatField()

    deactivate_date = models.DateTimeField(verbose_name="Дата создания позиции")

    def __str__(self):
        return str(self.pk)
