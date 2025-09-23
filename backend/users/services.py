from django.db import transaction
from django.contrib.auth import get_user_model
from .firebase_service import create_firebase_user, delete_firebase_user

User = get_user_model()

"""
Purpose: Business logic for user operations between Django and Firebase.
"""


@transaction.atomic
def register_local_and_firebase_user(
    *,
    email: str,
    password: str,
    first_name: str,
    last_name: str,
    user_type: str = "USER",
    phone: str = None,
    birthday = None
) -> User:
    """
    Register a user in both Django and Firebase atomically.

    If Django user creation fails, the Firebase user is rolled back.

    Args:
        email: User's email address
        password: User's password
        first_name: User's first name
        last_name: User's last name
        user_type: User type (USER or ADMIN)
        phone: User's phone number (optional)
        birthday: User's birthday (optional)

    Returns:
        User: Created Django user instance

    Raises:
        Exception: If user creation fails (Firebase user is deleted)
    """
    # Create Firebase user first
    firebase_uid = create_firebase_user(email=email, password=password)

    try:
        # Create Django user
        user = User.objects.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            user_type=user_type,
            phone=phone,
            birthday=birthday
        )

        # Link Firebase UID to Django user
        user.firebase_uid = firebase_uid
        user.save(update_fields=["firebase_uid"])

        return user

    except Exception as e:
        # Rollback: Delete Firebase user if Django user creation fails
        delete_firebase_user(firebase_uid)
        raise e


def get_user_by_firebase_uid(firebase_uid: str) -> User:
    """
    Get Django user by Firebase UID.

    Args:
        firebase_uid: Firebase UID to search for

    Returns:
        User: Django user instance or None if not found
    """
    try:
        return User.objects.get(firebase_uid=firebase_uid)
    except User.DoesNotExist:
        return None


def create_admin_user(
    *,
    email: str,
    password: str,
    first_name: str,
    last_name: str,
    phone: str = None,
    birthday = None
) -> User:
    """
    Create an admin user in both Django and Firebase.

    Args:
        email: Admin's email address
        password: Admin's password
        first_name: Admin's first name
        last_name: Admin's last name
        phone: Admin's phone number (optional)
        birthday: Admin's birthday (optional)

    Returns:
        User: Created admin user instance
    """
    return register_local_and_firebase_user(
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name,
        user_type="ADMIN",
        phone=phone,
        birthday=birthday
    )