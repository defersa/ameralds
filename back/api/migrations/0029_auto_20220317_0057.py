# Generated by Django 3.1.7 on 2022-03-16 21:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0028_manual_migration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pattern',
            name='price',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.langintegerfield'),
        ),
    ]
