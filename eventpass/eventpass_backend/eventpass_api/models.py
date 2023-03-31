from django.db import models
from django.contrib.auth.models import AbstractUser


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


class Event(models.Model):
    venue = models.ForeignKey(
        Venue, on_delete=models.CASCADE, related_name='events')
    name = models.CharField(max_length=500)
    datetime = models.DateTimeField()
    photo_url = models.CharField(max_length=500, default='a string')

    def __str__(self):
        return self.name


class Customer(models.Model):
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE, related_name='customers')
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=150)
    zip_code = models.IntegerField()
    purchases = models.CharField(max_length=500)
    photo_url = models.CharField(max_length=500, default='a string')

    def __str__(self):
        return self.name


class User(AbstractUser):
    name = models.CharField(max_length=150)
    email = models.EmailField(max_length=150, unique=True)
    password = models.CharField(max_length=150)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
