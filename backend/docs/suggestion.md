Short answer: almost. Phase 1 is “enough” for the first checkpoint if you do **all** of the below and it runs cleanly.

## Phase 1 readiness checklist

* User model has `firebase_uid` with a DB constraint.
* Migrations applied and the server starts.
* Firebase Admin SDK is installed and initialized from env.
* A tiny `firebase_service` wrapper exists for create/verify so Phase 2 can plug it into DRF auth.

### 1) Model change and migrate

```python
# users/models.py
firebase_uid = models.CharField(
    max_length=128, unique=True, null=True, blank=True, db_index=True
)
```

```bash
python manage.py makemigrations users
python manage.py migrate
```

### 2) Firebase Admin init (settings.py)

```python
# settings.py
import os, json
import firebase_admin
from firebase_admin import credentials

FIREBASE_CREDENTIALS_JSON = os.getenv("FIREBASE_CREDENTIALS_JSON")  # paste JSON string or load from file
if FIREBASE_CREDENTIALS_JSON and not firebase_admin._apps:
    creds = credentials.Certificate(json.loads(FIREBASE_CREDENTIALS_JSON))
    firebase_admin.initialize_app(creds)
```

### 3) Minimal Firebase service

```python
# users/firebase_service.py
from firebase_admin import auth as fb_auth

def create_firebase_user(email: str, password: str) -> str:
    user = fb_auth.create_user(email=email, password=password)
    return user.uid

def delete_firebase_user(uid: str) -> None:
    fb_auth.delete_user(uid)

def verify_id_token(id_token: str) -> dict:
    return fb_auth.verify_id_token(id_token)
```

Optional helper that keeps Firebase and DB in sync during registration (used in Phase 3):

```python
# users/services.py
from django.db import transaction
from django.contrib.auth import get_user_model
from .firebase_service import create_firebase_user, delete_firebase_user

User = get_user_model()

@transaction.atomic
def register_local_and_firebase_user(*, email, password, first_name, last_name, user_type="USER"):
    uid = create_firebase_user(email, password)
    try:
        user = User.objects.create_user(
            email=email, password=password,
            first_name=first_name, last_name=last_name,
            user_type=user_type, 
        )
        user.firebase_uid = uid
        user.save(update_fields=["firebase_uid"])
        return user
    except Exception:
        delete_firebase_user(uid)  # rollback Firebase if DB fails
        raise
```

### 4) Smoke tests for Phase 1

* Server boots: `python manage.py runserver`
* Django shell:

```bash
python manage.py shell
```

```python
from users.services import register_local_and_firebase_user
u = register_local_and_firebase_user(email="test@example.com", password="pass12345", first_name="Test", last_name="User")
print(u.id, u.firebase_uid)
```

* Get a Firebase ID token for that email using the REST sign-in endpoint (Postman or curl) and verify it:

```bash
curl -s "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=$FIREBASE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass12345","returnSecureToken":true}' | jq -r .idToken
```

```python
from users.firebase_service import verify_id_token
claims = verify_id_token("<paste idToken>")
assert claims["uid"] == u.firebase_uid
```

If all of that works, Phase 1 is complete.
You do not need to change OpenAPI yet. Next phase will add the DRF authentication class, permissions, and the register endpoints that call the service above.


