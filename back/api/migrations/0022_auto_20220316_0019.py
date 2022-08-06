# Generated by Django 3.1.7 on 2022-03-15 21:19

from django.db import migrations, models
import django.db.models.deletion


def create_myproducts(apps, schema_editor):
    Product = apps.get_model('myapp', 'Product')
    MyProduct = apps.get_model('myapp', 'MyProduct')
    for prod in Product.objects.all():
        MyProduct.objects.create(product=prod)

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0021_pattern_hidden'),
    ]

    operations = [
        migrations.CreateModel(
            name='LangCharFieldShort',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('en', models.CharField(blank=True, null=True, default='', max_length=200, verbose_name='En')),
                ('ru', models.CharField(blank=True, null=True, default='', max_length=200, verbose_name='Ru')),
            ],
        ),
        migrations.AddField(
            model_name='category',
            name='name',
            field=models.OneToOneField(blank=True, null=True, default=None, on_delete=django.db.models.deletion.CASCADE, to='api.langcharfieldshort'),
            preserve_default=False,
        ),
    ]