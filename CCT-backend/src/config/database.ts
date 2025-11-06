import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { existsSync } from 'fs';

// Load environment variables - try .env first (for Docker/production), then env.local (for local dev)
if (existsSync('./.env')) {
  dotenv.config({ path: './.env' });
} else if (existsSync('./env.local')) {
  dotenv.config({ path: './env.local' });
} else {
  // Fallback to default .env lookup
  dotenv.config();
}

const MONGODB_URL = process.env.MONGODB_URL || '';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.log('⚠️ Server will continue without database connection');
    // Don't exit process, let server run without DB
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('❌ MongoDB error:', error);
});
