import { z } from 'zod';

// Zod validation schemas
export const RegisterSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be less than 20 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters').max(50, 'Company name must be less than 50 characters')
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
});

// TypeScript interfaces
export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  companyName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  _id: string;
  username: string;
  email: string;
  companyName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: UserResponse;
  token: string;
}

export type RegisterRequest = z.infer<typeof RegisterSchema>;

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
