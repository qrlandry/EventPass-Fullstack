from django.db import models
from django.contrib.auth.models import AbstractUser

# Create the User model
class User(AbstractUser):
    name = models.CharField(max_length=150)
    email = models.EmailField(max_length=150, unique=True)
    password = models.CharField(max_length=150)
    username = models.CharField(max_length=150, unique=True)

    REQUIRED_FIELDS = []


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
