# Quick Start: Running the iOS App

## What Was Fixed

✅ **API Configuration** - iOS app now uses your local IP (100.81.107.118) instead of localhost  
✅ **Backend Settings** - Django now accepts network connections  
✅ **Error Handling** - App won't hang if backend is unreachable  
✅ **Timeout Protection** - 8-second timeout on API requests  
✅ **Better Logging** - Console logs help debug issues  

## Running the App

### Step 1: Start the Backend

```bash
cd backend
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```

**Important:** Use `0.0.0.0:8000` (not `127.0.0.1:8000`) so your iPhone can connect.

You should see:
```
Starting development server at http://0.0.0.0:8000/
```

### Step 2: Run on iOS

Option A - From Xcode:
```bash
npx cap open ios
# Then click the Play button in Xcode
```

Option B - Command line:
```bash
npx cap run ios
```

### Step 3: Watch the Console in Xcode

View > Debug Area > Activate Console (Cmd+Shift+Y)

You should see:
```
📱 Running on platform: ios
🔧 Native platform - Using API URL: http://100.81.107.118:8000/api
🎯 Setting up Firebase auth state listener
🔐 Firebase auth state changed: No user (logged out)
👤 No Firebase user, skipping backend fetch
✨ Setting loading to false, app should now render
```

## Expected Behavior

### ✅ Success - App loads to login screen
- Splash screen shows briefly
- Login screen appears
- No infinite loading

### ⚠️ Backend Not Connected (But App Still Works!)
If you see these logs:
```
⏱️ Backend request timed out
🌐 Network error - cannot reach backend server
```

**This is OK!** The app will:
- Still show the login screen
- Firebase auth still works
- You can navigate the UI
- Backend features won't work until connection is fixed

### ❌ Still Stuck on Loading?
Check that:
1. Backend is running: `http://100.81.107.118:8000/admin` should load in your browser
2. iPhone and Mac on same WiFi network
3. No VPN active
4. Firewall allows port 8000

## Testing the Complete Flow

### 1. Test Without Backend (Firebase Only)
- Don't start the backend
- Run the iOS app
- You should see the login screen
- Console shows timeout but app continues

### 2. Test With Backend (Full Functionality)
- Start backend on `0.0.0.0:8000`
- Run the iOS app
- Login should work fully
- Backend API calls succeed

## Troubleshooting

### "Network error" in console but backend is running?

1. Test from iOS Safari:
   ```
   Open Safari on iPhone
   Navigate to: http://100.81.107.118:8000/admin
   ```
   If this doesn't load, it's a network issue.

2. Check your IP hasn't changed:
   ```bash
   ipconfig getifaddr en0
   ```
   If different from `100.81.107.118`, update `frontend/.env` and rebuild.

### Need to change the API URL?

1. Update `frontend/.env`:
   ```env
   REACT_APP_API_URL=http://NEW_IP:8000/api
   ```

2. Rebuild and sync:
   ```bash
   cd frontend
   npm run build
   cd ..
   npx cap sync ios
   ```

## Key Files Modified

- ✅ `frontend/.env` - API URL configuration
- ✅ `frontend/src/services/api.js` - Platform detection, timeout
- ✅ `frontend/src/context/AuthContext.jsx` - Better error handling
- ✅ `backend/todo_project/settings.py` - ALLOWED_HOSTS for network access

## Your Network Details

- **Local IP:** `100.81.107.118`
- **Backend URL:** `http://100.81.107.118:8000`
- **API URL:** `http://100.81.107.118:8000/api`

If your IP changes (e.g., you connect to different WiFi), you'll need to:
1. Get new IP: `ipconfig getifaddr en0`
2. Update `frontend/.env`
3. Rebuild and sync

## Production Note

For production, you'd set:
```env
REACT_APP_API_URL=https://your-production-domain.com/api
```

And update ALLOWED_HOSTS in Django settings.py to your actual domain.

