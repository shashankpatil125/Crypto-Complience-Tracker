import express, { Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import { ApiResponse } from './types';
import { connectDB } from './config/database';
import { requestLogger } from './utils/logger';

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tokens', tokenRoutes);

// Test GET API endpoint
app.get('/api/test', (req: Request, res: Response): void => {
  const response: ApiResponse = {
    success: true,
    message: 'Test API is working!',
    data: {
      timestamp: new Date().toISOString(),
      status: 'OK',
      port: PORT,
      language: 'TypeScript',
      database: 'MongoDB'
    }
  };
  res.json(response);
});

// Root endpoint
app.get('/', (req: Request, res: Response): void => {
  const response: ApiResponse = {
    success: true,
    message: 'Welcome to TypeScript Backend API with MongoDB',
    data: {
      endpoints: {
        test: '/api/test',
        users: {
          register: 'POST /api/users/register',
          login: 'POST /api/users/login',
          getAll: 'GET /api/users/users'
        },
        tokens: {
          register: 'POST /api/tokens/register',
          getAll: 'GET /api/tokens/registrations',
          getById: 'GET /api/tokens/registrations/:id'
        },
        mockTokens: {
          register: 'POST /api/tokens/register-mock (NO AUTH)',
          getAll: 'GET /api/tokens/registrations-mock (NO AUTH)',
          getById: 'GET /api/tokens/registrations-mock/:id (NO AUTH)'
        }
      },
      language: 'TypeScript',
      database: 'MongoDB',
      version: '1.0.0'
    }
  };
  res.json(response);
});

// Start server
app.listen(PORT, (): void => {
  console.log(`🚀 TypeScript Server running on port ${PORT}`);
  console.log(`📝 Test API: http://localhost:${PORT}/api/test`);
  console.log(`👤 User APIs: http://localhost:${PORT}/api/users`);
  console.log(`🪙 Token APIs: http://localhost:${PORT}/api/tokens`);
  console.log(`🗄️ Database: MongoDB Atlas`);
  console.log(`🌐 CORS enabled for frontend connections`);
});

export default app;
