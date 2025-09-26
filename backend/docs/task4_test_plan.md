# Task 4 Test Plan

## Overview
Test the complete integration between frontend Firebase auth state and Django backend authentication.

## Test Cases

### 1. Backend Auth Endpoint (`/api/users/auth/me/`)
- [ ] **Valid Token**: Should return Django user data
- [ ] **Invalid Token**: Should return 401/403
- [ ] **No Token**: Should return 401/403
- [ ] **Expired Token**: Should return 401/403

### 2. Axios Interceptors
- [ ] **Token Attachment**: Verify Firebase token is added to all requests
- [ ] **No User**: Verify no token added when no current user
- [ ] **Error Handling**: Verify 401/403 triggers redirect to login

### 3. Auth State Management
- [ ] **Registration**: Verify both Firebase and Django user states are set
- [ ] **Login**: Verify both user states are updated correctly
- [ ] **Logout**: Verify both user states are cleared
- [ ] **Page Refresh**: Verify auth state persists

### 4. Route Protection
- [ ] **Protected Route**: Unauthenticated user gets redirected to login
- [ ] **Public Route**: Authenticated user can access public routes
- [ ] **Guest Route**: Authenticated user gets redirected from login/register

### 5. TanStack Query Integration
- [ ] **Auth Queries**: Verify useAuthQuery works correctly
- [ ] **Cache Invalidation**: Verify auth state updates clear cache
- [ ] **Loading States**: Verify loading indicators work

### 6. Error Scenarios
- [ ] **Network Error**: Backend unreachable handling
- [ ] **Invalid Credentials**: Wrong email/password handling
- [ ] **Duplicate Registration**: Email already exists handling
- [ ] **Firebase Errors**: Invalid token, network issues

### 7. Complete Flow Tests
- [ ] **Registration Flow**: Register → Login → Access protected route
- [ ] **Login Flow**: Login → Access protected route → Logout
- [ ] **Session Persistence**: Login → Refresh page → Still authenticated
- [ ] **Token Refresh**: Automatic token refresh handling

## Test Commands

### Backend Testing
```bash
# Test auth endpoint directly
curl -H "Authorization: Bearer <firebase_token>" http://127.0.0.1:8000/api/users/auth/me/

# Test registration
python test_register.py
```

### Frontend Testing
```bash
# Start frontend
cd frontend && npm start

# Manual testing:
# 1. Try accessing protected routes without auth
# 2. Register new user
# 3. Login with existing user
# 4. Test route protection
# 5. Test logout
# 6. Test page refresh
```

## Success Criteria
- ✅ All authentication flows work end-to-end
- ✅ Route protection works correctly
- ✅ Auth state persists across page refreshes
- ✅ Error handling is graceful
- ✅ No race conditions in user creation
- ✅ Tokens are properly validated
- ✅ Users can only access their own data