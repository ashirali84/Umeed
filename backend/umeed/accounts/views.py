from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.utils import timezone

from .models import FoodListing, FoodRequest, CustomUser
from .serializers import (
    FoodListingSerializer,
    FoodRequestSerializer,
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


# 🔑 Login — FIX: tokens ab response body mein bhi return hote hain
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password required'}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({'error': 'Invalid credentials'}, status=401)

    tokens = get_tokens_for_user(user)

    # ✅ FIX: tokens BOTH in response body AND cookie
    response = Response({
        'message': 'Login successful!',
        'tokens': tokens,                          # <-- frontend ko chahiye tha ye
        'user': UserProfileSerializer(user).data
    })

    # Cookie bhi set karo (optional fallback)
    response.set_cookie(
        key='access_token',
        value=tokens['access'],
        httponly=True,
        secure=False,   # True in production (HTTPS)
        samesite='Lax'
    )

    return response


# 👤 Get Profile
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    return Response(UserProfileSerializer(request.user).data)


# 🚪 Logout
@api_view(['POST'])
def logout_user(request):
    response = Response({'message': 'Logged out'})
    response.delete_cookie('access_token')
    return response


# 🍱 Create Food
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_food_listing(request):
    serializer = FoodListingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


# 📦 Get All Food (non-expired)
@api_view(['GET'])
def get_food_listings(request):
    foods = FoodListing.objects.filter(
        expiry_time__gt=timezone.now()
    ).order_by('-timestamp')
    serializer = FoodListingSerializer(foods, many=True, context={'request': request})
    return Response(serializer.data)


# 📦 Get MY Food Listings (supplier only) — FIX: filter by request.user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_listings(request):
    foods = FoodListing.objects.filter(user=request.user).order_by('-timestamp')
    serializer = FoodListingSerializer(foods, many=True, context={'request': request})
    return Response(serializer.data)


# 🗑️ Delete Food Listing
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_food_listing(request, food_id):
    try:
        food = FoodListing.objects.get(id=food_id, user=request.user)
    except FoodListing.DoesNotExist:
        return Response({'error': 'Food not found or unauthorized'}, status=404)
    food.delete()
    return Response({'message': 'Deleted successfully'}, status=200)


# 🙋 Request Food
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def request_food(request, food_id):
    try:
        food = FoodListing.objects.get(id=food_id)
    except FoodListing.DoesNotExist:
        return Response({'error': 'Food not found'}, status=404)

    if FoodRequest.objects.filter(food=food, receiver=request.user).exists():
        return Response({'error': 'Already requested'}, status=400)

    FoodRequest.objects.create(food=food, receiver=request.user)
    return Response({"message": "Request sent"}, status=201)


# 📥 Supplier: Get Requests for my food
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_requests(request):
    requests_qs = FoodRequest.objects.filter(food__user=request.user).select_related('food', 'receiver')
    serializer = FoodRequestSerializer(requests_qs, many=True)
    return Response(serializer.data)


# 📋 Receiver: Get MY Requests
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_requests(request):
    requests_qs = FoodRequest.objects.filter(receiver=request.user).select_related('food')
    serializer = FoodRequestSerializer(requests_qs, many=True)
    return Response(serializer.data)


# ✅ Accept / Reject Request
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_request(request, request_id):
    try:
        req = FoodRequest.objects.get(id=request_id, food__user=request.user)
    except FoodRequest.DoesNotExist:
        return Response({'error': 'Request not found or unauthorized'}, status=404)

    status_val = request.data.get('status')
    if status_val not in ['accepted', 'rejected']:
        return Response({'error': 'Invalid status'}, status=400)

    req.status = status_val
    req.save()
    return Response({"message": "Updated successfully"})


# 👑 Admin: Get all users
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_get_users(request):
    if request.user.role != 'admin':
        return Response({'error': 'Unauthorized'}, status=403)
    users = CustomUser.objects.exclude(is_superuser=True)
    serializer = UserProfileSerializer(users, many=True)
    return Response(serializer.data)


# 👑 Admin: Get all listings
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_get_listings(request):
    if request.user.role != 'admin':
        return Response({'error': 'Unauthorized'}, status=403)
    foods = FoodListing.objects.all().order_by('-timestamp')
    serializer = FoodListingSerializer(foods, many=True, context={'request': request})
    return Response(serializer.data)
