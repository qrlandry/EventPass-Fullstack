from django.db import models
from .venue import Venue
from .customer import Customer
from .ticket import Ticket


class Event(models.Model):
    venue = models.ForeignKey(
        Venue, on_delete=models.CASCADE, related_name='events')
    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name='events')
    ticket = models.ForeignKey(
        Ticket, on_delete=models.CASCADE, related_name='events')
    name = models.CharField(max_length=500)
    datetime = models.DateTimeField()
    photo_url = models.CharField(max_length=500, default='a string')

    def __str__(self):
        return self.name
