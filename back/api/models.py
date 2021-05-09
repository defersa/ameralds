from django import utils
from django.db import models
from django.contrib.auth.models import User
from enum import Enum

import os 
from datetime import datetime


class ORDER_STATUS(Enum):
    CARD = 1
    PAID = 2
    DELIVERY = 3
    SUCCESS = 4


class Image(models.Model):
    image_full = models.ImageField(
        upload_to='static/images_model/full', blank=True)
    image_small = models.ImageField(
        upload_to='static/images_model/small', blank=True)

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


class Category(models.Model):
    name = models.CharField(max_length=200, verbose_name="Имя категории")

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

    price_ru = models.FloatField(verbose_name="Цена для СНГ")
    price_en = models.FloatField(verbose_name="Цена для мира")

    category = models.ManyToManyField(
        Category,
        related_name="jewelry",
        blank=True)

    views = models.IntegerField(verbose_name="Количество показов", default=0)

    create_date = models.DateField(verbose_name="Дата создания позиции")

    def __str__(self):
        return str(self.name)


class Pattern(models.Model):
    name = models.CharField(max_length=200, verbose_name="Имя схемы")
    description = models.CharField(
        max_length=1000, verbose_name="Описание схемы")

    images = models.ManyToManyField(
        Image, related_name="pattern", blank=True, verbose_name="Изображения")

    urls = models.CharField(max_length=1000, verbose_name="Файлы схемы", blank=True)

    price_ru = models.FloatField(verbose_name="Цена для СНГ")
    price_en = models.FloatField(verbose_name="Цена для мира")

    category = models.ManyToManyField(
        Category,
        related_name="pattern",
        blank=True)

    views = models.IntegerField(verbose_name="Количество показов", default=0)
    create_date = models.DateField(verbose_name="Дата создания позиции", default=utils.timezone.now)

    def delete(self, *args, **kwargs):
        for image in self.images.all():
            image.delete()
        super(Pattern, self).delete(*args, **kwargs)

    def __str__(self):
        return str(self.name)


class Person(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    bonus_coints_ru = models.FloatField(default=0)
    bonus_coints_en = models.FloatField(default=0)

    location = models.CharField(max_length=2)

    patterns = models.ManyToManyField(
        Pattern,
        blank=True)

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

    next_status_date = models.DateField(
        verbose_name="Примерное время измения статуса", blank=True)

    owner = models.ForeignKey(
        Person, on_delete=models.CASCADE, related_name='orders')

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

    deactivate_date = models.DateField(verbose_name="Дата создания позиции")

    def __str__(self):
        return str(self.pk)
