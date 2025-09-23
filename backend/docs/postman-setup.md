# Postman Setup for Firebase Authentication

## Prerequisites

You need your Firebase project's **Web API Key**:
1. Go to Firebase Console → Project Settings → General
2. Under "Your apps", find your web app configuration
3. Copy the `apiKey` value

## Postman Collection Setup

### 1. Environment Variables

Create a Postman environment with these variables:

| Variable | Example Value | Description |
|----------|---------------|-------------|
| `base_url` | `http://127.0.0.1:8000/api` | Your API base URL |
| `FIREBASE_API_KEY` | `AIzaSyB...` | Your Firebase Web API Key |
| `email` | `user@example.com` | User email for authentication |
| `password` | `password123` | User password for authentication |
| `ADMIN_REG_CODE` | `super-secret-code` | Admin registration code (set in Django env) |

### 2. Collection Pre-request Script

Add this script at the **Collection level** (runs before every request):

```javascript
const path = pm.request.url.getPath();
const skip = path.includes("/api/auth/register");

if (!skip) {
    const apiKey = pm.environment.get("FIREBASE_API_KEY");
    const email = pm.environment.get("email");
    const password = pm.environment.get("password");
    let idToken = pm.environment.get("idToken");
    let exp = parseInt(pm.environment.get("idTokenExp") || "0", 10);

    const now = Math.floor(Date.now() / 1000);

    function setAuth(tkn, expiresIn, refreshToken) {
        pm.environment.set("idToken", tkn);
        pm.environment.set("idTokenExp", now + parseInt(expiresIn, 10) - 30);
        if (refreshToken) {
            pm.environment.set("refreshToken", refreshToken);
        }
        pm.request.headers.upsert({
            key: "Authorization",
            value: `Bearer ${tkn}`
        });
        console.log("Authentication token refreshed");
    }

    // Check if token is expired or missing
    if (!idToken || now >= exp) {
        const refreshToken = pm.environment.get("refreshToken");

        if (refreshToken) {
            // Try to refresh the token
            console.log("Refreshing authentication token...");
            pm.sendRequest({
                url: `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
                method: "POST",
                header: { "Content-Type": "application/x-www-form-urlencoded" },
                body: {
                    mode: "urlencoded",
                    urlencoded: [
                        { key: "grant_type", value: "refresh_token" },
                        { key: "refresh_token", value: refreshToken }
                    ]
                }
            }, (err, res) => {
                if (!err && res.code === 200) {
                    const json = res.json();
                    setAuth(json.id_token, json.expires_in, json.refresh_token);
                } else {
                    console.log("Token refresh failed, trying new login...");
                    // Fall back to new login
                    loginAndSetAuth();
                }
            });
        } else {
            // Get new token
            loginAndSetAuth();
        }
    } else {
        // Use existing valid token
        pm.request.headers.upsert({
            key: "Authorization",
            value: `Bearer ${idToken}`
        });
        console.log("Using existing authentication token");
    }
}

function loginAndSetAuth() {
    const apiKey = pm.environment.get("FIREBASE_API_KEY");
    const email = pm.environment.get("email");
    const password = pm.environment.get("password");

    console.log("Logging in to Firebase...");
    pm.sendRequest({
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: {
            mode: "raw",
            raw: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        }
    }, (err, res) => {
        if (!err && res.code === 200) {
            const json = res.json();
            setAuth(json.idToken, json.expiresIn, json.refreshToken);
            console.log("Successfully logged in");
        } else {
            console.log("Login failed:", err || res.json());
        }
    });
}
```

### 3. Test Users Setup

Before testing, create these users:

#### Regular User
```json
POST {{base_url}}/api/users/auth/register/
{
    "email": "test@example.com",
    "password": "password123",
    "first_name": "Test",
    "last_name": "User"
}
```

#### Admin User
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

## Testing Scenarios

### 1. Registration (Public)
- `POST /api/users/auth/register/` - Create regular user
- `POST /api/users/auth/register-admin/` - Create admin user

### 2. Public Users List (Public)
- `GET /api/users/` - List all users (no auth required)

### 3. TodoList Operations (Authenticated)
- `GET /api/todolists/` - See only your own lists (or all if admin)
- `POST /api/todolists/` - Create new list (auto-assigned to you)
- `PUT /api/todolists/{id}/` - Update only your lists
- `DELETE /api/todolists/{id}/` - Delete only your lists

### 4. TodoItem Operations (Authenticated)
- `GET /api/todoitems/` - See items from your lists (or all if admin)
- `POST /api/todoitems/` - Create items in your lists
- `PUT /api/todoitems/{id}/` - Update items from your lists
- `DELETE /api/todoitems/{id}/` - Delete items from your lists

## Environment Setup Commands

Set these in your Django `.env` file:

```bash
# Firebase Admin (for backend)
FIREBASE_CREDENTIALS_PATH=/path/to/firebase-credentials.json

# Admin Registration (for security)
ADMIN_REG_CODE=super-secret-admin-code-123

# Postman Environment Variables
FIREBASE_API_KEY=your-firebase-web-api-key
base_url=http://127.0.0.1:8000/api
email=test@example.com
password=password123
```

## Troubleshooting

1. **401 Unauthorized**: Check that your user exists and credentials are correct
2. **403 Forbidden**: You don't have permission for that resource
3. **Admin registration fails**: Check `ADMIN_REG_CODE` matches environment variable
4. **Token errors**: Clear environment variables and log in again