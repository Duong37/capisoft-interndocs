from rest_framework import authentication, exceptions
from django.contrib.auth import get_user_model
from .firebase_service import verify_id_token
from .services import get_user_by_firebase_uid

User = get_user_model()


class FirebaseAuthentication(authentication.BaseAuthentication):
    """
    Firebase token authentication class for Django REST Framework.

    Authenticates users by validating Firebase ID tokens from the Authorization header.

    Header format: Authorization: Bearer <firebase_id_token>
    """

    def authenticate(self, request):
        """
        Authenticate the request and return a tuple of (user, token) or None.
        """
        auth_header = authentication.get_authorization_header(request).split()

        if not auth_header or auth_header[0].lower() != b'bearer':
            return None

        if len(auth_header) == 1:
            raise exceptions.AuthenticationFailed('Invalid token header. No credentials provided.')
        elif len(auth_header) > 2:
            raise exceptions.AuthenticationFailed('Invalid token header. Token string should not contain spaces.')

        try:
            token = auth_header[1].decode('utf-8')
        except UnicodeError:
            raise exceptions.AuthenticationFailed('Invalid token header. Token string should not contain invalid characters.')

        return self.authenticate_credentials(token)

    def authenticate_credentials(self, token):
        """
        Verify Firebase token and return the corresponding Django user.
        """
        try:
            print(f"Debug: Authentication attempt with token length: {len(token)}")

            # Verify the Firebase ID token
            decoded_token = verify_id_token(token)

            # Extract user information from token
            firebase_uid = decoded_token['uid']
            email = decoded_token.get('email')
            print(f"Debug: Token decoded - UID: {firebase_uid}, Email: {email}")

            # Find the corresponding Django user
            user = get_user_by_firebase_uid(firebase_uid)
            print(f"Debug: Django user lookup result: {user is not None}")

            if user is None:
                raise exceptions.AuthenticationFailed('No such user found in our database.')

            if not user.is_active:
                raise exceptions.AuthenticationFailed('User account is disabled.')

            print(f"Debug: Authentication successful for user: {user.email}")
            return (user, token)

        except ValueError as e:
            print(f"Debug: ValueError in authentication: {str(e)}")
            raise exceptions.AuthenticationFailed(f'Invalid token: {str(e)}')
        except Exception as e:
            print(f"Debug: General authentication error: {type(e).__name__}: {str(e)}")
            raise exceptions.AuthenticationFailed(f'Authentication failed: {str(e)}')

    def authenticate_header(self, request):
        """
        Return a string to be used as the WWW-Authenticate header value.
        """
        return 'Bearer'