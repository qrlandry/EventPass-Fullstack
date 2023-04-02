from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class User(AbstractUser):
    name = models.CharField(max_length=150)
    email = models.EmailField(max_length=150, unique=True)
    password = models.CharField(max_length=150)
    username = None  # model.CharFiled()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, name, password, **extra_fields)

        REQUIRED_FIELDS = ['name']


objects = UserManager()


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


class Ticket(models.Model):
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE, related_name='tickets')
    price = models.DecimalField(max_digits=5, decimal_places=2)
    seating = models.CharField(max_length=150)
    number_of_tickets = models.IntegerField()
    tickets_sold = models.IntegerField()

    def __str__(self):
        return self.price


class Customer(models.Model):
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE, related_name='customers')
    ticket = models.ForeignKey(
        Ticket, on_delete=models.CASCADE, related_name='customers')
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=150)
    zip_code = models.IntegerField()
    purchases = models.CharField(max_length=500)
    photo_url = models.CharField(max_length=500, default='a string')

    def __str__(self):
        return self.name
