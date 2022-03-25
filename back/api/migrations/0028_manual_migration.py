# Generated by Django 3.1.7 on 2022-03-16 21:50

from django.db import migrations, models
import django.db.models.deletion

def migrate_categories(apps, schema_editor):
    Pattern = apps.get_model('api', 'Pattern')
    Lang = apps.get_model('api', 'LangIntegerField')
    for pattern in Pattern.objects.all():
        lang = Lang.objects.create(
            en=pattern.price_en or 0,
            ru=pattern.price_ru or 0
        )
        lang.save()
        pattern.price = lang
        pattern.save()

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0027_pattern_price'),
    ]

    operations = [
        migrations.RunPython(migrate_categories)
    ]
