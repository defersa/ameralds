# Generated by Django 3.1.7 on 2022-03-07 22:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_remove_pattern_urls'),
    ]

    operations = [
        migrations.AddField(
            model_name='pattern',
            name='hidden',
            field=models.BooleanField(default=False, verbose_name='Скрытый'),
            preserve_default=False,
        ),
    ]