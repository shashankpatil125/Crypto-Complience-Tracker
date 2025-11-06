# Backend API Endpoints Reference

## Base URL
```
http://72.60.27.182:3001/api
```

---

## 🔍 Test & Info Endpoints

### Test API (Health Check)
```
GET http://72.60.27.182:3001/api/test
```
**Response:**
```json
{
  "success": true,
  "message": "Test API is working!",
  "data": {
    "timestamp": "2025-11-06T...",
    "status": "OK",
    "port": 3001,
    "language": "TypeScript",
    "database": "MongoDB"
  }
}
```

### Root Endpoint (API Info)
```
GET http://72.60.27.182:3001/
```
Returns list of all available endpoints.

---

## 👤 User Endpoints

### Register User (Public)
```
POST http://72.60.27.182:3001/api/users/register
```
**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "companyName": "Tech Corp"
}
```

### Login User (Public)
```
POST http://72.60.27.182:3001/api/users/login
```
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "jwt_token_here"
  }
}
```

### Get All Users (Protected - Requires Auth)
```
GET http://72.60.27.182:3001/api/users/users
```
**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🪙 Token Registration Endpoints

### Register Token (Protected - Requires Auth)
```
POST http://72.60.27.182:3001/api/tokens/register
```
**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```
**Request Body:** (See token registration form data structure)

### Get All Token Registrations (Protected - Requires Auth)
```
GET http://72.60.27.182:3001/api/tokens/registrations
```
**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Get Token Registration by ID (Protected - Requires Auth)
```
GET http://72.60.27.182:3001/api/tokens/registrations/:id
```
**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🧪 Mock Endpoints (No Authentication Required)

### Register Token (Mock - No Auth)
```
POST http://72.60.27.182:3001/api/tokens/register-mock
```

### Get All Token Registrations (Mock - No Auth)
```
GET http://72.60.27.182:3001/api/tokens/registrations-mock
```

### Get Token Registration by ID (Mock - No Auth)
```
GET http://72.60.27.182:3001/api/tokens/registrations-mock/:id
```

---

## 📝 Testing with cURL

### Test API
```bash
curl http://72.60.27.182:3001/api/test
```

### Register User
```bash
curl -X POST http://72.60.27.182:3001/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "companyName": "Test Company"
  }'
```

### Login
```bash
curl -X POST http://72.60.27.182:3001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Users (Protected)
```bash
curl http://72.60.27.182:3001/api/users/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🔐 Authentication

Most endpoints require JWT authentication. After login, use the returned token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🌐 CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:3000`
- `http://localhost:3001`
- `http://127.0.0.1:3000`
- `http://127.0.0.1:3001`

**Note:** You may need to update CORS settings in `CCT-backend/src/index.ts` to include your VPS IP or domain.

---

## 📊 Response Format

All API responses follow this format:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error information"
}
```

---

## 🔧 Update CORS for Production

If you need to allow requests from your frontend domain, update `CCT-backend/src/index.ts`:

```typescript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://72.60.27.182:3000',  // Add your VPS IP
    'http://your-domain.com',     // Add your domain
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

Then rebuild the backend:
```bash
docker compose build backend
docker compose restart backend
```

