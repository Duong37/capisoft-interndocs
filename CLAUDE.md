# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Backend Development
```bash
# Activate virtual environment and start Django server
cd backend && source venv/bin/activate && python manage.py runserver 8000

# Database migrations
cd backend && source venv/bin/activate && python manage.py makemigrations
cd backend && source venv/bin/activate && python manage.py migrate

# Generate API documentation
cd backend && source venv/bin/activate && python manage.py spectacular --file schema.json --format openapi-json

# Django shell for testing
cd backend && source venv/bin/activate && python manage.py shell
```

### Frontend Development
```bash
# Start React development server
cd frontend && npm start

# Build for production
cd frontend && npm run build

# Run tests
cd frontend && npm test
```

## Architecture Overview

This is a full-stack Todo management application with Django REST Framework backend and React frontend.

### Backend Architecture (Django + DRF)

**Firebase Authentication System:**
- Custom `FirebaseAuthentication` class validates JWT tokens from Firebase
- Dual authentication: Firebase for client auth, Django for server-side user management
- Automatic user synchronization between Firebase and Django via `firebase_uid`
- Located in: `users/authentication.py`, `users/firebase_service.py`, `users/services.py`

**Data Models:**
- **Custom User Model** (`users/models.py`): Email-based with UUID primary keys, user types (USER/ADMIN)
- **TodoList** (`todolists/models.py`): Owned by users, contains multiple TodoItems
- **TodoItem** (`todoitems/models.py`): Status tracking (PENDING → IN_PROGRESS → DONE), assignable to users

**Permission System:**
- Role-based access: Admin users have full access, regular users only access their own data
- Object-level permissions: `IsOwnerOrAdmin`, `IsAdmin` classes prevent unauthorized access
- Assignment security: Users can only assign tasks from TodoLists they own

**API Structure:**
- Authentication: `/api/users/auth/register/`, `/api/users/auth/register-admin/`
- TodoLists: `/api/todolists/` (CRUD with ownership filtering)
- TodoItems: `/api/todoitems/` (CRUD with custom `/assigned_to_me/` endpoint)
- OpenAPI documentation at `/api/docs/` (Swagger UI) and `/api/redoc/`

### Frontend Architecture (React + Firebase)

**Authentication Flow:**
- Firebase Authentication for client-side auth
- Custom `AuthContext` provides global auth state
- Route guards: `RequireAuth` for protected routes, `RequireGuest` for auth pages
- Located in: `src/context/AuthContext.jsx`, `src/routes/`

**Component Structure:**
- `Layout.jsx`: Sidebar navigation for authenticated areas
- `Login.jsx`/`Register.jsx`: Authentication forms
- `Dashboard.jsx`: Main Todo management interface
- Route-based code splitting with React Router v6

**Styling & UI:**
- Chakra UI v3 for component library
- Emotion for styling
- Framer Motion for animations

## Key Dependencies

### Backend
- Django 5.2.6 with Django REST Framework 3.16.1
- Firebase Admin SDK 7.1.0 for authentication
- drf-spectacular 0.28.0 for OpenAPI documentation
- drf-flex-fields 1.0.2 for flexible API responses
- SQLite database (development)

### Frontend
- React 18.2.0 with React Router 6.20.0
- Firebase 12.3.0 for client authentication
- Chakra UI 3.26.0 for UI components
- Recharts 3.1.2 for data visualization

## Development Workflow

### Database Schema Changes
1. Modify Django models in respective apps
2. Run `python manage.py makemigrations`
3. Run `python manage.py migrate`
4. Update serializers if needed
5. Test with existing API endpoints

### API Development
1. Models → Serializers → Views → URLs
2. Use drf-spectacular for automatic OpenAPI docs
3. Test with Swagger UI at `/api/docs/`
4. Validate permissions with test users

### Frontend Development
1. Components in `src/components/`
2. Routes defined in `App.jsx` with guards
3. Global state via `AuthContext`
4. Styling with Chakra UI components

## Security Features

- **JWT Token Validation**: Comprehensive Firebase token verification
- **Object-level Permissions**: Fine-grained access control in serializers
- **Dual Authentication**: Firebase client auth + Django server auth
- **Atomic Operations**: Data consistency across Firebase and Django
- **Admin Registration Code**: Protected admin user creation via environment variable

## Configuration

### Firebase Setup
- Backend: Service account credentials in `backend/firebase-credentials.json`
- Frontend: Web app configuration in `frontend/src/firebase.js`
- Automatic Firebase initialization on Django startup

### Environment Variables
- Backend: `.env` file contains sensitive configuration
- Admin registration code required for admin user creation

## Testing

### Backend Testing
- Use Django test framework: `python manage.py test`
- Test users available with UUIDs from README.md
- API testing via Postman with OpenAPI schema import

### Frontend Testing
- React Testing Library setup available via `npm test`
- Authentication flow testing with Firebase auth mock

## Important Notes

- **UUID Primary Keys**: All models use UUIDs instead of auto-incrementing IDs
- **Firebase Integration**: Requires valid Firebase project configuration
- **Permission System**: Always check ownership when accessing/modifying resources
- **Migration Commands**: Essential after any model changes
- **OpenAPI Documentation**: Auto-generated and available at runtime