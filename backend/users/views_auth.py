from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema
from .serializers_auth import UserRegistrationSerializer, AdminRegistrationSerializer
from .serializers import UserSerializer


@extend_schema(
    request=UserRegistrationSerializer,
    responses={201: UserSerializer},
    auth=[],  # No authentication required for registration
    description="Register a new user account. Creates both Firebase and Django user."
)
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_user(request):
    """
    Register a new user account.
    Creates both Firebase user and Django user atomically.
    """
    serializer = UserRegistrationSerializer(data=request.data)

    if serializer.is_valid():
        try:
            user = serializer.save()
            return Response(
                UserSerializer(user).data,
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    request=AdminRegistrationSerializer,
    responses={201: UserSerializer},
    auth=[],  # No authentication required for registration
    description="Register a new admin user account. Requires valid admin registration code."
)
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_admin(request):
    """
    Register a new admin user account.
    Requires valid admin registration code for security.
    """
    serializer = AdminRegistrationSerializer(data=request.data)

    if serializer.is_valid():
        try:
            user = serializer.save()
            return Response(
                UserSerializer(user).data,
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)