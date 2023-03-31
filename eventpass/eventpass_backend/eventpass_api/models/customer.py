from django.db import models
from .event import Event
from .ticket import Ticket


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
