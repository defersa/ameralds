# Generated by Django 3.1.7 on 2021-05-09 10:05

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='image_full',
            field=models.ImageField(blank=True, upload_to='static/images_model/full'),
        ),
        migrations.AlterField(
            model_name='image',
            name='image_small',
            field=models.ImageField(blank=True, upload_to='static/images_model/small'),
        ),
        migrations.RemoveField(
            model_name='jewelry',
            name='images',
        ),
        migrations.AddField(
            model_name='jewelry',
            name='images',
            field=models.ManyToManyField(blank=True, related_name='jewelry', to='api.Image', verbose_name='Изображения'),
        ),
        migrations.AlterField(
            model_name='pattern',
            name='create_date',
            field=models.DateField(default=django.utils.timezone.now, verbose_name='Дата создания позиции'),
        ),
        migrations.RemoveField(
            model_name='pattern',
            name='images',
        ),
        migrations.AddField(
            model_name='pattern',
            name='images',
            field=models.ManyToManyField(blank=True, related_name='pattern', to='api.Image', verbose_name='Изображения'),
        ),
        migrations.AlterField(
            model_name='pattern',
            name='urls',
            field=models.CharField(blank=True, max_length=1000, verbose_name='Файлы схемы'),
        ),
    ]