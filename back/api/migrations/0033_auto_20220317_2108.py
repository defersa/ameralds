# Generated by Django 3.1.7 on 2022-03-17 18:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0032_remove_pattern_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pattern',
            old_name='name_new',
            new_name='name',
        ),
    ]
