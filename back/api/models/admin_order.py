from django.db import models

from . import Pattern, PatternSize


# Купленный паттерн
class BoughtAdminPattern(models.Model):
    pattern = models.ForeignKey(
        Pattern, on_delete=models.SET_NULL, related_name='admin_order_patterns', null=True, verbose_name='Паттерн')

    sizes = models.ManyToManyField(PatternSize, related_name='admin_order_patterns', verbose_name='Размеры')
    colors = models.BooleanField(verbose_name='Подбор цветов')

    def __str__(self):
        sizes = ','.join([size.__str__() for size in self.sizes.all()])
        return self.pk.__str__() + '. Схема: ' + self.pattern.__str__() + '  Размеры:' + sizes + '  Подбор: ' + self.colors.__str__()


# Корзина админа
class AdminOrder(models.Model):
    email = models.CharField(max_length=200, verbose_name="Email", default="blank@email.com")
    create_date = models.DateTimeField(
        verbose_name="Дата создании категории", auto_now_add=True)

    purchases = models.ManyToManyField(BoughtAdminPattern, related_name='order')

    def __str__(self):
        return str(self.email + ' ' + self.create_date.strftime("%d/%m/%Y, %H:%M:%S"))
