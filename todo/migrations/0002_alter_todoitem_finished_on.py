# Generated by Django 4.2.9 on 2024-02-29 13:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todoitem',
            name='finished_on',
            field=models.DateField(null=True),
        ),
    ]