import { Request, Response } from 'express';
import { UserModel, validateUserData } from '../models/User';
import { ApiResponse, UserResponse, LoginRequest, AuthResponse, LoginSchema } from '../types';
import { ZodError } from 'zod';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';
import { logger } from '../utils/logger';

// Register user controller
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info('User registration attempt', { email: req.body.email, username: req.body.username });
    
    // Validate input data using Zod
    const validatedData = validateUserData(req.body);

    // Check if user already exists by email
    const existingUserByEmail = await UserModel.findOne({ email: validatedData.email });
    if (existingUserByEmail) {
      logger.warn('Registration failed - email already exists', { email: validatedData.email });
      const response: ApiResponse = {
        success: false,
        message: 'User with this email already exists'
      };
      res.status(409).json(response);
      return;
    }

    // Check if username already exists
    const existingUserByUsername = await UserModel.findOne({ username: validatedData.username });
    if (existingUserByUsername) {
      logger.warn('Registration failed - username already taken', { username: validatedData.username });
      const response: ApiResponse = {
        success: false,
        message: 'Username already taken'
      };
      res.status(409).json(response);
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password);

    // Create new user
    const newUser = new UserModel({
      ...validatedData,
      password: hashedPassword
    });
    await newUser.save();

    // Generate JWT token
    const token = generateToken(String(newUser._id));

    // Return success response (exclude password)
    const userResponse: UserResponse = {
      _id: String(newUser._id),
      username: newUser.username,
      email: newUser.email,
      companyName: newUser.companyName,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    };

    const authResponse: AuthResponse = {
      user: userResponse,
      token
    };
    
    logger.success('User registered successfully', { userId: newUser._id, email: newUser.email });
    
    const response: ApiResponse<AuthResponse> = {
      success: true,
      message: 'User registered successfully',
      data: authResponse
    };

    res.status(201).json(response);

  } catch (error) {
    if (error instanceof ZodError) {
      logger.error('Registration validation error', error.issues);
      const response: ApiResponse = {
        success: false,
        message: 'Validation error',
        error: error.issues.map(err => err.message).join(', ')
      };
      res.status(400).json(response);
      return;
    }

    logger.error('Registration internal error', error);
    const response: ApiResponse = {
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    res.status(500).json(response);
  }
};

// Login user controller
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info('User login attempt', { email: req.body.email });
    
    // Validate input data using Zod
    const validatedData = LoginSchema.parse(req.body);

    // Find user by email
    const user = await UserModel.findOne({ email: validatedData.email });
    if (!user) {
      logger.warn('Login failed - user not found', { email: validatedData.email });
      const response: ApiResponse = {
        success: false,
        message: 'Invalid email or password'
      };
      res.status(401).json(response);
      return;
    }

    // Compare password
    const isPasswordValid = await comparePassword(validatedData.password, user.password);
    if (!isPasswordValid) {
      logger.warn('Login failed - invalid password', { email: validatedData.email, userId: user._id });
      const response: ApiResponse = {
        success: false,
        message: 'Invalid email or password'
      };
      res.status(401).json(response);
      return;
    }

    // Generate JWT token
    const token = generateToken(String(user._id));

    // Return success response (exclude password)
    const userResponse: UserResponse = {
      _id: String(user._id),
      username: user.username,
      email: user.email,
      companyName: user.companyName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    const authResponse: AuthResponse = {
      user: userResponse,
      token
    };
    
    logger.success('User login successful', { userId: user._id, email: user.email });
    
    const response: ApiResponse<AuthResponse> = {
      success: true,
      message: 'Login successful',
      data: authResponse
    };

    res.json(response);

  } catch (error) {
    if (error instanceof ZodError) {
      logger.error('Login validation error', error.issues);
      const response: ApiResponse = {
        success: false,
        message: 'Validation error',
        error: error.issues.map(err => err.message).join(', ')
      };
      res.status(400).json(response);
      return;
    }

    logger.error('Login internal error', error);
    const response: ApiResponse = {
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    res.status(500).json(response);
  }
};

// Get all users controller
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info('Get all users request', { userId: req.user?.userId });
    
    const users = await UserModel.find({}).select('-password').sort({ createdAt: -1 });
    
    const usersResponse: UserResponse[] = users.map(user => ({
      _id: String(user._id),
      username: user.username,
      email: user.email,
      companyName: user.companyName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));
    
    logger.success('Users retrieved successfully', { count: usersResponse.length });
    
    const response: ApiResponse<{ users: UserResponse[], count: number }> = {
      success: true,
      message: 'Users retrieved successfully',
      data: {
        users: usersResponse,
        count: usersResponse.length
      }
    };

    res.json(response);
  } catch (error) {
    logger.error('Get users internal error', error);
    const response: ApiResponse = {
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    res.status(500).json(response);
  }
};
