from django.contrib import admin
from .models import User, Venue, Event, Ticket, Customer
admin.site.register(User)
admin.site.register(Venue)
admin.site.register(Event)
admin.site.register(Ticket)
admin.site.register(Customer)
