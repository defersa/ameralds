# Generated by Django 3.1.7 on 2022-03-17 18:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0034_auto_20220317_2108'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pattern',
            name='name_en',
        ),
        migrations.RemoveField(
            model_name='pattern',
            name='name_ru',
        ),
        migrations.RemoveField(
            model_name='pattern',
            name='price_en',
        ),
        migrations.RemoveField(
            model_name='pattern',
            name='price_ru',
        ),
    ]