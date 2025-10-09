# 🔧 API Connection Troubleshooting Guide

## ❌ **Error: "Failed to fetch"**

This error occurs when the frontend cannot connect to your API server. Here are the steps to resolve it:

---

## 🚀 **Step 1: Start Your API Server**

Make sure your API server is running on `http://localhost:3001`:

```bash
# Navigate to your API project directory
cd /path/to/your/api/project

# Start the server
npm run dev
# or
node server.js
# or
npm start
```

**Expected Output:**
```
Server running on http://localhost:3001
API endpoints available:
- POST /api/register
- POST /api/login
- GET /api/test
```

---

## 🧪 **Step 2: Test API Server**

Open a new terminal and test if your API is working:

```bash
# Test if server is running
curl http://localhost:3001/api/test

# Expected response:
# {"message": "API is working!"}
```

---

## 🔍 **Step 3: Check Browser Console**

1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Try to login/register
4. Look for these logs:

**✅ If API is running:**
```
🔐 Attempting login... {email: "user@example.com"}
🌐 Making request to: http://localhost:3001/api/login
📥 Login response: {success: true, data: {...}}
✅ Login successful! Redirecting to dashboard...
```

**❌ If API is not running:**
```
🔐 Attempting login... {email: "user@example.com"}
🌐 Making request to: http://localhost:3001/api/login
❌ API server is not running: TypeError: Failed to fetch
```

---

## 🛠️ **Step 4: Common Issues & Solutions**

### **Issue 1: Port Already in Use**
```bash
# Error: EADDRINUSE: address already in use :::3001
# Solution: Kill the process using port 3001
lsof -ti:3001 | xargs kill -9
```

### **Issue 2: CORS Issues**
Add CORS middleware to your API server:
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // Your Next.js app URL
  credentials: true
}));
```

### **Issue 3: Wrong Port**
Make sure your API server is running on port **3001**, not 3000:
```javascript
const PORT = 3001; // Not 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### **Issue 4: Firewall/Network Issues**
- Check if your firewall is blocking port 3001
- Try accessing `http://localhost:3001/api/test` directly in your browser
- Make sure no antivirus is blocking the connection

---

## 📋 **Step 5: Verify API Endpoints**

Test each endpoint individually:

### **Test Register Endpoint:**
```bash
curl -X POST http://localhost:3001/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "companyName": "Test Corp"
  }'
```

### **Test Login Endpoint:**
```bash
curl -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 🔧 **Step 6: Updated Error Handling**

The login component now includes:

1. **Server Health Check**: Automatically checks if API server is running
2. **Better Error Messages**: Clear messages about server connection issues
3. **Debug Logging**: Detailed console logs for troubleshooting
4. **URL Validation**: Logs the exact URL being called

---

## ✅ **Success Indicators**

When everything is working correctly, you should see:

1. **Console Logs:**
   ```
   ✅ API server is running
   🔐 Attempting login...
   🌐 Making request to: http://localhost:3001/api/login
   📥 Login response: {success: true, data: {...}}
   ✅ Login successful! Redirecting to dashboard...
   ```

2. **Browser Behavior:**
   - Form submits without errors
   - Loading spinner appears
   - Redirects to dashboard on success
   - User data stored in localStorage

---

## 🆘 **Still Having Issues?**

If you're still getting "Failed to fetch" errors:

1. **Check Network Tab**: Open DevTools → Network tab → try login → look for failed requests
2. **Check API Logs**: Look at your API server console for incoming requests
3. **Try Different Port**: Change API server to port 3002 and update the URL in the component
4. **Restart Everything**: Stop both frontend and backend, then restart them

**Need Help?** Share the console logs and I'll help you debug further!
