from django.db import models

from . import Pattern, Size


# Купленный паттерн
class BoughtAdminPattern(models.Model):
    pattern = models.ForeignKey(
        Pattern, on_delete=models.SET_NULL, related_name='admin_order_patterns', null=True)

    sizes = models.ManyToManyField(Size, related_name='admin_order_patterns')

    def __str__(self):
        return str(self.pattern.__str__())


# Корзина админа
class AdminOrder(models.Model):
    email = models.CharField(max_length=200, verbose_name="Email", default="blank@email.com")
    create_date = models.DateTimeField(
        verbose_name="Дата создании категории", auto_now_add=True)

    purchases = models.ManyToManyField(BoughtAdminPattern, related_name='order')

    def __str__(self):
        return str(self.email + ' ' + self.create_date.strftime("%d/%m/%Y, %H:%M:%S"))
