# Generated by Django 4.1.7 on 2023-04-02 22:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("eventpass_api", "0007_merge_20230401_2356"),
    ]

    operations = [
        migrations.AddField(
            model_name="customer",
            name="app_user",
            field=models.ForeignKey(
                default=0,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="customers",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]