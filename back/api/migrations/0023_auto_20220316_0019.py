# Generated by Django 3.1.7 on 2022-03-15 21:19

from django.db import migrations, models
import django.db.models.deletion


def migrate_categories(apps, schema_editor):
    Category = apps.get_model('api', 'Category')
    Lang = apps.get_model('api', 'LangCharFieldShort')
    for category in Category.objects.all():
        lang = Lang.objects.create(
            en=category.name_en,
            ru=category.name_ru
        )
        lang.save()
        category.name = lang
        category.save()

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_auto_20220316_0019'),
    ]

    operations = [
        migrations.RunPython(migrate_categories)
    ]