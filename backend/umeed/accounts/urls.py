from django.urls import path
from . import views

urlpatterns = [
    # Auth
    path('auth/register/supplier/', views.register_supplier),
    path('auth/register/receiver/', views.register_receiver),
    path('auth/login/', views.login_user),
    path('auth/logout/', views.logout_user),
    path('auth/profile/', views.get_profile),

    # Food
    path('food/create/', views.create_food_listing),
    path('food/list/', views.get_food_listings),
    path('food/my-listings/', views.get_my_listings),        # ✅ FIX: sirf apni listings
    path('food/delete/<int:food_id>/', views.delete_food_listing),  # ✅ FIX: delete enabled
    path('food/request/<int:food_id>/', views.request_food),
    path('food/requests/', views.get_requests),              # Supplier ke liye
    path('food/my-requests/', views.get_my_requests),        # ✅ FIX: Receiver ke liye
    path('food/request/update/<int:request_id>/', views.update_request),

    # Admin
    path('admin-api/users/', views.admin_get_users),         # ✅ FIX: enabled
    path('admin-api/listings/', views.admin_get_listings),   # ✅ FIX: enabled
]
