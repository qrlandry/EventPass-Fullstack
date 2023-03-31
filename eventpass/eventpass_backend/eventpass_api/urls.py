from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('register', views.RegisterView.as_view()),
    path('login', views.LoginView.as_view()),
    path('user', views.UserView.as_view()),
    path('logout', views.LogoutView.as_view()),
    path('venues', views.VenueListView.as_view(), name='venue_list'),
    path('venue/details/<int:pk>',
         views.VenueDetailView.as_view(), name='venue_details'),
    path('events', views.EventListView.as_view(), name='event_list'),
    path('event/details/<int:pk>',
         views.EventDetailView.as_view(), name='event_details'),
    path('customer', views.CustomerListView.as_view(), name='customer_list'),
    path('customer/details/<int:pk>', views.CustomerDetailView.as_view(),
         name='customer_details')
]
