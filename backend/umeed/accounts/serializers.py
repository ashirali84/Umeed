from rest_framework import serializers
from .models import CustomUser, SupplierProfile, ReceiverProfile


class SupplierRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    supplier_type = serializers.ChoiceField(choices=['common', 'restaurant'])
    restaurant_name = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = CustomUser
        fields = [
            'name', 'username', 'password',
            'contact', 'location',
            'supplier_type', 'restaurant_name'
        ]

    def create(self, validated_data):
        supplier_type = validated_data.pop('supplier_type')
        restaurant_name = validated_data.pop('restaurant_name', '')

        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            name=validated_data['name'],
            contact=validated_data.get('contact', ''),
            location=validated_data.get('location', ''),
            role='supplier'
        )

        SupplierProfile.objects.create(
            user=user,
            supplier_type=supplier_type,
            restaurant_name=restaurant_name if supplier_type == 'restaurant' else ''
        )

        return user


class ReceiverRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    has_disability = serializers.BooleanField(default=False)

    class Meta:
        model = CustomUser
        fields = [
            'name', 'username', 'password',
            'contact', 'location', 'has_disability'
        ]

    def create(self, validated_data):
        has_disability = validated_data.pop('has_disability', False)

        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            name=validated_data['name'],
            contact=validated_data.get('contact', ''),
            location=validated_data.get('location', ''),
            role='receiver'
        )

        ReceiverProfile.objects.create(
            user=user,
            has_disability=has_disability
        )

        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'name', 'username', 'role', 'contact', 'location']