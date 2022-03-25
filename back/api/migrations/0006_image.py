# Generated by Django 3.1.7 on 2021-04-22 18:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20210409_0323'),
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_full', models.ImageField(blank=True, upload_to='images/full')),
                ('image_small', models.ImageField(blank=True, upload_to='images/small')),
            ],
        ),
    ]
