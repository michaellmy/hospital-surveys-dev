# Generated by Django 3.0.2 on 2020-02-06 21:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0007_auto_20200204_1754'),
    ]

    operations = [
        migrations.AddField(
            model_name='questionnaire',
            name='maxAge',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='questionnaire',
            name='minAge',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
