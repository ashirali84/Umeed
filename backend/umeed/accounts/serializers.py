from rest_framework import serializers
from .models import CustomUser, SupplierProfile, ReceiverProfile, FoodListing, FoodRequest


class SupplierRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    supplier_type = serializers.ChoiceField(choices=['common', 'restaurant'])
    restaurant_name = serializers.CharField(required=False, allow_blank=True)
    latitude = serializers.FloatField(required=False, allow_null=True)
    longitude = serializers.FloatField(required=False, allow_null=True)

    class Meta:
        model = CustomUser
        fields = [
            'name', 'username', 'password',
            'contact', 'location', 'latitude', 'longitude',
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
            latitude=validated_data.get('latitude', None),
            longitude=validated_data.get('longitude', None),
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
    latitude = serializers.FloatField(required=False, allow_null=True)
    longitude = serializers.FloatField(required=False, allow_null=True)

    class Meta:
        model = CustomUser
        fields = [
            'name', 'username', 'password',
            'contact', 'location', 'latitude', 'longitude',
            'has_disability'
        ]

    def create(self, validated_data):
        has_disability = validated_data.pop('has_disability', False)

        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            name=validated_data['name'],
            contact=validated_data.get('contact', ''),
            location=validated_data.get('location', ''),
            latitude=validated_data.get('latitude', None),
            longitude=validated_data.get('longitude', None),
            role='receiver'
        )

        ReceiverProfile.objects.create(
            user=user,
            has_disability=has_disability
        )

        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id', 'name', 'username', 'role',
            'contact', 'location', 'latitude', 'longitude'
        ]


class FoodListingSerializer(serializers.ModelSerializer):
    # ✅ FIX: image URL absolute path ke saath return ho
    food_image_url = serializers.SerializerMethodField()

    class Meta:
        model = FoodListing
        fields = '__all__'

    def get_food_image_url(self, obj):
        request = self.context.get('request')
        if obj.food_image and request:
            return request.build_absolute_uri(obj.food_image.url)
        elif obj.food_image:
            return obj.food_image.url
        return None


# ✅ FIX: FoodRequestSerializer mein food_name, receiver_name, etc. add kiye
class FoodRequestSerializer(serializers.ModelSerializer):
    food_name = serializers.CharField(source='food.item_name', read_only=True)
    food_location = serializers.CharField(source='food.location', read_only=True)
    food_image_url = serializers.SerializerMethodField()
    receiver_name = serializers.CharField(source='receiver.name', read_only=True)
    receiver_username = serializers.CharField(source='receiver.username', read_only=True)
    receiver_contact = serializers.CharField(source='receiver.contact', read_only=True)

    class Meta:
        model = FoodRequest
        fields = [
            'id', 'food', 'food_name', 'food_location', 'food_image_url',
            'receiver', 'receiver_name', 'receiver_username', 'receiver_contact',
            'status', 'created_at'
        ]

    def get_food_image_url(self, obj):
        request = self.context.get('request')
        if obj.food.food_image and request:
            return request.build_absolute_uri(obj.food.food_image.url)
        elif obj.food.food_image:
            return obj.food.food_image.url
        return None
