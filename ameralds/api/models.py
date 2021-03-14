from django.db import models
from django.contrib.auth.models import User
from enum import Enum

class ORDER_STATUS(Enum):
    CARD = 0
    PAID = 1
    DELIVERY = 2
    SUCCESS = 3

class Category(models.Model):
    name = models.CharField(max_length=200, verbose_name="Имя категории")
    
    def __str__(self):
        return str(self.name)


class Jewelry(models.Model):
    name = models.CharField(max_length=200, verbose_name="Имя украшения")
    description = models.CharField(max_length=1000, verbose_name="Описание украшения")

    images = models.CharField(max_length=1000, verbose_name="Изображения", blank = True)

    stock = models.IntegerField(verbose_name="Количество в наличии")
    complexity = models.IntegerField(verbose_name="Количество дней на новую исполнение новой товарной единицы")

    price_ru = models.FloatField(verbose_name="Цена для СНГ")
    price_en = models.FloatField(verbose_name="Цена для мира")
    
    category = models.ManyToManyField(
        Category,
        related_name = "jewelry",
        blank = True)

    create_date = models.DateField(verbose_name="Дата создания позиции")
    
    def __str__(self):
        return str(self.name)
    

class Pattern(models.Model):
    name = models.CharField(max_length=200, verbose_name="Имя схемы")
    description = models.CharField(max_length=1000, verbose_name="Описание схемы")

    images = models.CharField(max_length=1000, verbose_name="Изображения", blank = True) 
    urls = models.CharField(max_length=1000, verbose_name="Файлы схемы")

    price_ru = models.FloatField(verbose_name="Цена для СНГ")
    price_en = models.FloatField(verbose_name="Цена для мира")
    
    category = models.ManyToManyField(
        Category,
        related_name = "pattern",
        blank = True)

    create_date = models.DateField(verbose_name="Дата создания позиции")
    
    def __str__(self):
        return str(self.name)

class Person(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    bonus_coints_ru = models.FloatField()
    bonus_coints_en = models.FloatField()

    location = models.CharField(max_length=2)

    patterns = models.ManyToManyField(
        Pattern, 
        blank = True)
        
    def __str__(self):
        return str(self.user.username)


class Order(models.Model):
    status = models.IntegerField()

    jewels = models.ManyToManyField(
        Jewelry,
        blank = True)

    patterns = models.ManyToManyField(
        Pattern,
        blank = True)

    track_number = models.CharField(max_length=200, verbose_name="Трек отслеживания")
    
    next_status_date = models.DateField(verbose_name="Примерное время измения статуса")

    owner = models.ForeignKey(Person, on_delete=models.CASCADE)

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
