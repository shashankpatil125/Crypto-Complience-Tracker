import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';
import { ApiResponse } from '../types';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
    }
  }
}

// JWT Authentication middleware
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    const response: ApiResponse = {
      success: false,
      message: 'Access token required'
    };
    res.status(401).json(response);
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: 'Invalid or expired token'
    };
    res.status(403).json(response);
  }
};
