from django.urls import path
from . import views
from .views import create_food_listing, get_food_listings


urlpatterns = [
    path('register/supplier/', views.register_supplier, name='register_supplier'),
    path('register/receiver/', views.register_receiver, name='register_receiver'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('profile/', views.get_profile, name='profile'),
    path('food/create/', create_food_listing),
    path('food/list/', get_food_listings),
]