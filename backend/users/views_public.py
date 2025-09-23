from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from django.contrib.auth import get_user_model
from .serializers import UserSerializer

User = get_user_model()


@extend_schema(
    responses={200: UserSerializer(many=True)},
    auth=[],  # No authentication required for public users list
    description="Get a list of all users with safe fields only. Public endpoint."
)
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def list_users_public(request):
    """
    Get a list of all users with safe fields only.
    This is a public endpoint that doesn't require authentication.
    Returns user information without their todo lists and items.
    """
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)