# API Integration Documentation

## Overview
The login page has been integrated with your authentication API endpoints. The system now supports both login and registration functionality with proper error handling, loading states, and token management.

## API Endpoints Used

### 1. Login Endpoint
- **URL**: `POST http://localhost:3001/api/login`
- **Body**: `{ "email": "user@example.com", "password": "password123" }`
- **Response**: `{ "success": true, "token": "jwt_token", "user": {...} }`

### 2. Register Endpoint
- **URL**: `POST http://localhost:3001/api/register`
- **Body**: `{ "username": "johndoe", "email": "john@example.com", "password": "password123", "companyName": "Tech Corp" }`
- **Response**: `{ "success": true, "message": "User created successfully" }`

### 3. Get Users Endpoint (Protected)
- **URL**: `GET http://localhost:3001/api/users`
- **Headers**: `Authorization: Bearer YOUR_TOKEN_HERE`
- **Response**: `{ "success": true, "data": [...] }`

## Features Implemented

### 1. Login Page (`src/components/landingPageComponents/LoginPageComponent.tsx`)
- ✅ Dual-mode form (Login/Register tabs)
- ✅ Email and password fields for login
- ✅ Additional username and company name fields for registration
- ✅ Real-time form validation
- ✅ Loading states with spinner
- ✅ Error handling with user-friendly messages
- ✅ Automatic login after successful registration
- ✅ Token storage in localStorage
- ✅ Redirect to dashboard on successful authentication

### 2. API Utilities (`src/utils/api.ts`)
- ✅ Type-safe API functions
- ✅ Token management (get, set, remove)
- ✅ User data management
- ✅ Error handling
- ✅ Authentication status checking

### 3. Authentication Context (`src/contexts/AuthContext.tsx`)
- ✅ Global authentication state management
- ✅ User data persistence
- ✅ Login/logout functionality
- ✅ Authentication status checking

### 4. Protected Routes (`src/components/common/ProtectedRoute.tsx`)
- ✅ Route protection based on authentication status
- ✅ Loading state while checking authentication
- ✅ Automatic redirect to login page for unauthenticated users

### 5. Updated Components
- ✅ **Navbar**: Shows user information and logout functionality
- ✅ **Dashboard**: Displays user information and quick actions
- ✅ **Layout**: Wrapped with AuthProvider for global state

## Usage

### Login Flow
1. User enters email and password
2. System calls `/api/login` endpoint
3. On success: token stored, user data saved, redirect to dashboard
4. On error: display error message

### Registration Flow
1. User fills out registration form (username, email, password, company)
2. System calls `/api/register` endpoint
3. On success: automatically logs in the user
4. On error: display error message

### Logout Flow
1. User clicks logout button in navbar
2. Token and user data removed from localStorage
3. Redirect to login page

## Security Features
- ✅ JWT token storage in localStorage
- ✅ Automatic token cleanup on logout
- ✅ Protected routes that require authentication
- ✅ Secure API calls with proper headers

## Error Handling
- ✅ Network error handling
- ✅ API error message display
- ✅ Form validation
- ✅ User-friendly error messages

## Testing the Integration

1. **Start your API server** on `http://localhost:3001`
2. **Navigate to the login page** (`/login`)
3. **Test Registration**:
   - Switch to "Register" tab
   - Fill out the form with test data
   - Submit and verify automatic login
4. **Test Login**:
   - Use registered credentials
   - Verify dashboard access
5. **Test Logout**:
   - Click logout button in navbar
   - Verify redirect to login page

## File Structure
```
src/
├── components/
│   ├── common/
│   │   ├── Navbar.tsx (updated with auth)
│   │   └── ProtectedRoute.tsx (new)
│   └── landingPageComponents/
│       └── LoginPageComponent.tsx (updated with API)
├── contexts/
│   └── AuthContext.tsx (new)
├── utils/
│   └── api.ts (new)
└── app/
    ├── layout.tsx (updated with AuthProvider)
    ├── dashboard/page.tsx (updated with user info)
    └── login/page.tsx (existing)
```

The integration is complete and ready for testing!
