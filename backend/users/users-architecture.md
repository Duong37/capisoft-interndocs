# Users App Architecture

This Django app implements a **Firebase-integrated authentication system** with role-based access control and clean layered architecture.

## Architecture Overview

```
HTTP Request → views_auth.py → serializers_auth.py → services.py → firebase_service.py → Database
             ↓
HTTP Request → views_public.py → serializers.py → Database
```

## File-by-File Breakdown

### **Core Models**
- **`models.py`** - Custom User model with email-based auth, UUID keys, Firebase integration

### **Authentication System**
- **`authentication.py`** - Firebase token validation class for DRF
- **`firebase_service.py`** - Firebase user management (create, delete, verify tokens)
- **`services.py`** - Business logic layer bridging Django and Firebase users atomically

### **API Layers**
- **`views_auth.py`** - Authentication endpoints (registration, no auth required)
- **`views_public.py`** - Public endpoints (user listing, no auth required)
- **`serializers_auth.py`** - Input validation for registration operations
- **`serializers.py`** - Data transformation for user display operations
- **`permissions.py`** - Role-based access control (admin vs user permissions)

### **Configuration**
- **`urls.py`** - URL routing for all user-related endpoints

## Key Design Patterns

### **Layered Architecture**
Each layer has a single responsibility:
- **Views**: HTTP handling and response formatting
- **Serializers**: Input validation and data transformation
- **Services**: Business logic and orchestration
- **Models**: Data structure and relationships

### **Dual Authentication System**
- **Firebase**: Client-side authentication with JWT tokens
- **Django**: Server-side user management and permissions
- **Atomic Operations**: Users created in both systems with rollback protection

### **Role-Based Permissions**
- **`IsAdmin`**: Admin-only access
- **`IsOwnerOrAdmin`**: Ownership-based access with admin override
- **`IsOwnerOrAdminOrCreateOnly`**: Flexible creation + restrictive modification

## Data Flow Example

### User Registration
```python
# 1. HTTP POST /api/users/auth/register/
# 2. views_auth.py → UserRegistrationSerializer validation
# 3. serializers_auth.py → services.py business logic
# 4. services.py → firebase_service.py + Django user creation
# 5. Returns created user with 201 status
```

### Authentication
```python
# 1. HTTP request with Authorization: Bearer <token>
# 2. authentication.py → Firebase token validation
# 3. Returns Django user object for permission checking
# 4. Permission classes grant/deny access based on role and ownership
```

## Security Features

- **Firebase JWT validation** with cryptographic verification
- **Atomic user creation** prevents orphaned accounts
- **Role-based permissions** with object-level access control
- **UUID primary keys** prevent user enumeration
- **Admin registration codes** protect admin account creation
- **Safe public endpoints** expose only non-sensitive data

## API Endpoints

### Public (No Auth Required)
- `GET /api/users/` - List all users (safe fields only)

### Authentication (No Auth Required)
- `POST /api/users/auth/register/` - Register new user
- `POST /api/users/auth/register-admin/` - Register admin (with code)

### Protected (Firebase Auth Required)
- All TodoList and TodoItem endpoints use these permission classes

## Dependencies

- **Django 5.2.6** with **Django REST Framework 3.16.1**
- **Firebase Admin SDK 7.1.0** for authentication integration
- **drf-spectacular 0.28.0** for OpenAPI documentation
- **drf-flex-fields 1.0.2** for flexible field expansion

This architecture provides a robust, scalable foundation for Firebase-integrated authentication with clean separation of concerns and comprehensive security features.