from django.db import models


class Venue(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=150)
    zip_code = models.IntegerField()
    capacity = models.IntegerField()
    indoor = models.BooleanField()
    outdoor = models.BooleanField()
    photo_url = models.CharField(max_length=500, default='a string')

    def __str__(self):
        return self.name
