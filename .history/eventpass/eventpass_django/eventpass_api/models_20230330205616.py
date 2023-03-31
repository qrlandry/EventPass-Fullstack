from django.db import models

# Create your models here.


class Venue(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=50)
    zip_code = models.IntegerField()
    capacity = models.IntegerField()
    indoor = models.BooleanField()
    outdoor = models.BooleanField()

    def __str__(self):
        return self.name
