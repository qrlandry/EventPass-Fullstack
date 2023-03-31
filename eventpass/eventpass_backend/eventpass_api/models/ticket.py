from django.db import models
from .event import Event
from .customer import Customer


class Ticket(models.Model):
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE, related_name='tickets')
    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name='tickets')
    price = models.DecimalField(max_digits=5, decimal_places=2)
    seating = models.CharField(max_length=150)
    number_of_tickets = models.IntegerField()
    tickets_sold = models.IntegerField()

    def __str__(self):
        return self.price
