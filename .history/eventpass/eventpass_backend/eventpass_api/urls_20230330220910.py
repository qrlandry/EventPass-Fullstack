from django.contrib import admin
from django.urls import path, include
from .views import RegisterView, LoginView, UserView, LogoutView
urlpatterns = [
    path('register', RegisterView.as_view()),
]