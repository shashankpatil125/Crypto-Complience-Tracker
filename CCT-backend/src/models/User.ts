import mongoose, { Schema, Document } from 'mongoose';
import { RegisterSchema } from '../types';

// User document interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  companyName: string;
  createdAt: Date;
  updatedAt: Date;
}

// User schema
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [20, 'Username must be less than 20 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    minlength: [2, 'Company name must be at least 2 characters'],
    maxlength: [50, 'Company name must be less than 50 characters']
  }
}, {
  timestamps: true
});

// Create and export the model
export const UserModel = mongoose.model<IUser>('User', userSchema);

// Validation function using Zod
export const validateUserData = (data: any) => {
  return RegisterSchema.parse(data);
};