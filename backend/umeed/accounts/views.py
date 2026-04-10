from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import FoodListing
from .serializers import FoodListingSerializer

from .models import FoodListing, CustomUser
from .serializers import (
    FoodListingSerializer,
    SupplierRegisterSerializer,
    ReceiverRegisterSerializer,
    UserProfileSerializer
)


# 🔐 JWT Token Generator
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


# 🧾 Supplier Register
@api_view(['POST'])
@permission_classes([AllowAny])
def register_supplier(request):
    serializer = SupplierRegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        tokens = get_tokens_for_user(user)

        return Response({
            'message': 'Supplier registered successfully!',
            'tokens': tokens,
            'user': UserProfileSerializer(user).data
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 🧾 Receiver Register
@api_view(['POST'])
@permission_classes([AllowAny])
def register_receiver(request):
    serializer = ReceiverRegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        tokens = get_tokens_for_user(user)

        return Response({
            'message': 'Receiver registered successfully!',
            'tokens': tokens,
            'user': UserProfileSerializer(user).data
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 🔑 Login
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response(
            {'error': 'Username and password required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(username=username, password=password)

    if user is None:
        return Response(
            {'error': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED
        )

    tokens = get_tokens_for_user(user)

    return Response({
        'message': 'Login successful!',
        'tokens': tokens,
        'user': UserProfileSerializer(user).data
    }, status=status.HTTP_200_OK)


# 👤 Get Profile
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data)


# 🚪 Logout
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    try:
        refresh_token = request.data.get('refresh')
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({'message': 'Logged out successfully!'})
    except Exception:
        return Response({'message': 'Logged out!'})



@api_view(['POST'])
def create_food_listing(request):
    serializer = FoodListingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Food listed successfully", "data": serializer.data})
    return Response(serializer.errors)


@api_view(['GET'])
def get_food_listings(request):
    listings = FoodListing.objects.all().order_by('-timestamp')
    serializer = FoodListingSerializer(listings, many=True)
    return Response(serializer.data)