from firebase_admin import auth as fb_auth


def create_firebase_user(email: str, password: str) -> str:
    """
    Create a new user in Firebase and return the UID.

    Args:
        email: User's email address
        password: User's password

    Returns:
        str: Firebase UID of the created user

    Raises:
        firebase_admin.auth.EmailAlreadyExistsError: If email already exists
        firebase_admin.auth.InvalidPasswordError: If password is invalid
    """
    user = fb_auth.create_user(email=email, password=password)
    return user.uid


def delete_firebase_user(uid: str) -> None:
    """
    Delete a user from Firebase by UID.

    Args:
        uid: Firebase UID of the user to delete
    """
    fb_auth.delete_user(uid)


def verify_id_token(id_token: str) -> dict:
    """
    Verify a Firebase ID token and return the decoded claims.

    Args:
        id_token: Firebase ID token string

    Returns:
        dict: Decoded token claims containing user information

    Raises:
        firebase_admin.auth.InvalidIdTokenError: If token is invalid
        firebase_admin.auth.ExpiredIdTokenError: If token is expired
        firebase_admin.auth.RevokedIdTokenError: If token is revoked
    """
    return fb_auth.verify_id_token(id_token)


def get_firebase_user(uid: str) -> dict:
    """
    Get user information from Firebase by UID.

    Args:
        uid: Firebase UID of the user

    Returns:
        dict: User information dictionary
    """
    return fb_auth.get_user(uid)


def update_firebase_user(uid: str, **kwargs) -> dict:
    """
    Update user information in Firebase.

    Args:
        uid: Firebase UID of the user to update
        **kwargs: Fields to update (email, password, display_name, etc.)

    Returns:
        dict: Updated user information
    """
    return fb_auth.update_user(uid, **kwargs)