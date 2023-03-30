# Generated by Django 4.1.7 on 2023-03-30 21:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Venue",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("address", models.CharField(max_length=255)),
                ("city", models.CharField(max_length=100)),
                ("state", models.CharField(max_length=50)),
                ("zip_code", models.IntegerField()),
                ("capacity", models.IntegerField()),
                ("indoor", models.BooleanField()),
                ("outdoor", models.BooleanField()),
            ],
        ),
    ]
