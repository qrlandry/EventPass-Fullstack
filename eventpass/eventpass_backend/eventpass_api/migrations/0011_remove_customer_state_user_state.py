# Generated by Django 4.1.7 on 2023-04-03 19:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eventpass_api', '0010_alter_customer_state'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customer',
            name='state',
        ),
        migrations.AddField(
            model_name='user',
            name='state',
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
    ]
