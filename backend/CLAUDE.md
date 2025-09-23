# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development Server
```bash
# Start Django development server
source venv/bin/activate && python manage.py runserver 8000

# Run with specific host/port for external access
source venv/bin/activate && python manage.py runserver 0.0.0.0:8000
```

### Database Operations
```bash
# Run migrations
source venv/bin/activate && python manage.py migrate

# Create migrations after model changes
source venv/bin/activate && python manage.py makemigrations

# Django shell for testing
source venv/bin/activate && python manage.py shell

# Django shell with one-liner commands
source venv/bin/activate && python manage.py shell -c "command_here"
```

### Testing (if test framework is added)
```bash
# Run all tests
source venv/bin/activate && python manage.py test

# Run specific app tests
source venv/bin/activate && python manage.py test users

# Run specific test
source venv/bin/activate && python manage.py test users.tests.test_authentication
```

### Virtual Environment
```bash
# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Update requirements
pip freeze > requirements.txt
```

## Architecture Overview

### Firebase Authentication System
This Django backend uses **Firebase for authentication** with a custom dual-system:

1. **Firebase ID Token Validation**: Custom `FirebaseAuthentication` class validates JWT tokens from Authorization headers
2. **User Synchronization**: Users exist in both Firebase and Django, linked by `firebase_uid`
3. **Atomic Operations**: Registration creates users in both systems with rollback protection
4. **Token Flow**: Client gets Firebase token → Django validates → loads Django user

**Key Files:**
- `users/authentication.py`: Firebase token validation
- `users/firebase_service.py`: Firebase operations (create, delete, verify users)
- `users/services.py`: User management services
- `users/views_auth.py`: Registration endpoints

### Permission System
Role-based access control with object-level permissions:

- **Admin Users**: Full access to all data
- **Regular Users**: Can only access their own TodoLists and associated items
- **Assignment Security**: Users can assign tasks to others but only from accessible TodoLists

**Permission Classes:**
- `IsOwnerOrAdmin`: Users can only access/modify their own resources
- `IsAdmin`: Admin-only functionality
- `IsOwnerOrAdminOrCreateOnly`: Flexible permissions for creation vs modification

### Data Models & Relationships
**Custom User Model** (`users/models.py`):
- Email-based authentication with UUID primary keys
- Fields: `email`, `user_type` (USER/ADMIN), `firebase_uid`, profile fields
- Links to Firebase authentication system

**TodoList Model** (`todolists/models.py`):
- Each list has an `owner` (foreign key to User)
- One-to-many relationship with TodoItems

**TodoItem Model** (`todoitems/models.py`):
- Status tracking: PENDING → IN_PROGRESS → DONE
- Assignment system: `assignee` field allows task assignment to any user
- Belongs to TodoList, can be assigned to User

### API Structure
**Authentication Endpoints** (`/api/users/auth/`):
- `POST /register/` - Public user registration
- `POST /register-admin/` - Admin registration (requires `ADMIN_REG_CODE`)

**TodoList Management** (`/api/todolists/`):
- Full CRUD with automatic owner assignment
- Queryset filtering: Users see only their own lists (admins see all)

**TodoItem Management** (`/api/todoitems/`):
- Full CRUD with ownership validation
- Custom action: `GET /assigned_to_me/` - Tasks assigned to current user
- Assignment functionality via `assignee` field

**Public Endpoints**:
- `GET /api/users/` - Public user listing (safe fields only)

### Key Dependencies
- **Django 5.2.6** with **Django REST Framework 3.16.1**
- **Firebase Admin SDK 7.1.0** for authentication
- **drf-spectacular 0.28.0** for OpenAPI documentation
- **drf-flex-fields 1.0.2** for flexible field expansion

### Configuration
**Firebase Setup**:
- Service account credentials in `firebase-credentials.json`
- Automatic Firebase initialization on Django startup
- Environment variables in `.env` file

**API Documentation**:
- OpenAPI 3.0 schema available at `/api/schema/`
- Swagger UI at `/api/docs/`
- ReDoc at `/api/redoc/`

### Security Features
- **JWT Token Validation**: Comprehensive Firebase token verification
- **Object-level Permissions**: Fine-grained access control
- **Serializer Validation**: Business logic validation prevents unauthorized operations
- **Atomic Operations**: Data consistency across Firebase and Django
- **Admin Registration Code**: Protected admin user creation
- **Safe Public Endpoints**: Public user list exposes only safe fields

### Development Workflow
1. Model changes → `makemigrations` → `migrate`
2. Authentication: Firebase token in Authorization header
3. Testing: Use existing test users or create via registration endpoints
4. API Testing: Postman collection available with pre-request script for authentication
5. Documentation: Auto-generated OpenAPI schema

### Important Notes
- **Environment Variables**: Firebase credentials and admin registration code in `.env`
- **Database**: SQLite for development (can be changed to PostgreSQL for production)
- **UUID Primary Keys**: All models use UUIDs instead of auto-incrementing IDs
- **Firebase Integration**: Requires valid Firebase project configuration
- **Permission System**: Always check ownership when accessing/modifying resources