from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('supplier', 'Supplier'),
        ('receiver', 'Receiver'),
        ('admin', 'Admin'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    name = models.CharField(max_length=100)
    contact = models.CharField(max_length=15, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.role})"


class SupplierProfile(models.Model):
    SUPPLIER_TYPE_CHOICES = [
        ('common', 'Common Man'),
        ('restaurant', 'Restaurant'),
    ]
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='supplier_profile'
    )
    supplier_type = models.CharField(max_length=20, choices=SUPPLIER_TYPE_CHOICES)
    restaurant_name = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"Supplier: {self.user.username}"


class ReceiverProfile(models.Model):
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='receiver_profile'
    )
    has_disability = models.BooleanField(default=False)

    def __str__(self):
        return f"Receiver: {self.user.username}"