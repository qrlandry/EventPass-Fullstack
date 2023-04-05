from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('register', views.RegisterView.as_view()),
    path('login', views.LoginView.as_view()),
    path('user', views.UserView.as_view()),
    path('updateuser/<int:user_id>/', views.UserUpdateView.as_view()),
    path('logout', views.LogoutView.as_view()),
    path('venues', views.VenueListView.as_view(), name='venue_list'),
    path('venue/details/<int:pk>',
         views.VenueDetailView.as_view(), name='venue_detail'),
    path('events', views.EventListView.as_view(), name='event_list'),
    path('event/details/<int:pk>',
         views.EventDetailView.as_view(), name='event_detail'),
    path('customer', views.CustomerListView.as_view(), name='customer_list'),
    path('customer/details/<int:pk>', views.CustomerDetailView.as_view(),
         name='customer_details'),
    path('tickets', views.TicketListView.as_view(), name='ticket_list'),
    path('ticket/details/<int:pk>',
         views.TicketDetailView.as_view(), name='ticket_detail'),
]
