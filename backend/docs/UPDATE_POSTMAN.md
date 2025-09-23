# Postman Schema Update

## New Endpoints Added

Since the last schema import, these new endpoints have been added:

### Authentication Endpoints
- `POST /api/users/auth/register/` - Register new user
- `POST /api/users/auth/register-admin/` - Register admin user (requires admin code)

### Task Assignment
- `GET /api/todoitems/assigned_to_me/` - Get all tasks assigned to current user

## Steps to Update Postman

1. **Export the new schema:**
   ```bash
   curl -X GET "http://127.0.0.1:8000/api/schema/?format=openapi-json" -o schema.json
   ```

2. **Import into Postman:**
   - Open Postman
   - Click "Import" button
   - Select the downloaded `schema.json` file
   - Choose "Import" as a new collection or merge with existing

3. **Update Environment Variables:**
   Make sure your Postman environment has these variables:
   - `FIREBASE_API_KEY`: `AIzaSyCwDWMDUlKvdMlSYyYh5HypNp38a984rko`
   - `base_url`: `http://127.0.0.1:8000/api`
   - `email`: `test@example.com`
   - `password`: `password123`
   - `ADMIN_REG_CODE`: `super-secret-admin-code-123`

## Testing the New Endpoints

### 1. Register a new user
```json
POST {{base_url}}/api/users/auth/register/
{
    "email": "newuser@example.com",
    "password": "password123",
    "first_name": "New",
    "last_name": "User"
}
```

### 2. Register an admin user
```json
POST {{base_url}}/api/users/auth/register-admin/
{
    "email": "admin@example.com",
    "password": "password123",
    "first_name": "Admin",
    "last_name": "User",
    "admin_code": "{{ADMIN_REG_CODE}}"
}
```

### 3. Get assigned tasks (after authentication)
```json
GET {{base_url}}/api/todoitems/assigned_to_me/
```

The pre-request script should handle authentication automatically for all protected endpoints!