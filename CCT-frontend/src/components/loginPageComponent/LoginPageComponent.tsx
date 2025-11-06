'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

// API Response Types
interface ApiResponse {
  success: boolean;
  message?: string;
  data?: {
    user: {
      _id: string;
      username: string;
      email: string;
      companyName: string;
      createdAt: string;
      updatedAt: string;
    };
    token: string;
  };
}

// Form Data Types
interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  companyName: string;
}

export default function LoginPageComponent() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Separate form states for better organization
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    companyName: ''
  });
  
  const router = useRouter();
  const { login: authLogin } = useAuth();

  // API Base URL - use real backend API
  const API_BASE_URL = 'http://localhost:3001/api';

  // Note: No need to check API server since we're using local Next.js API routes

  // Clear error when switching tabs
  const handleTabSwitch = (isLoginTab: boolean) => {
    setIsLogin(isLoginTab);
    setError('');
  };

  // Handle login form input changes
  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  // Handle register form input changes
  const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  // Login API Call
  const handleLogin = async (formData: LoginFormData) => {
    try {
      console.log('🔐 Attempting login...', { email: formData.email });
      
      const url = `${API_BASE_URL}/users/login`;
      console.log('🌐 Making request to:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('❌ Non-JSON response received:', textResponse);
        setError(`Server error: Received non-JSON response (${response.status}). Please check if the API server is running correctly.`);
        return;
      }

      let data: ApiResponse;
      try {
        data = await response.json();
        console.log('📥 Login response:', data);
      } catch (parseError) {
        console.error('❌ JSON parsing error:', parseError);
        setError('Failed to parse server response. The server may be returning invalid JSON.');
        return;
      }

      if (data.success && data.data?.token) {
        // Store token and user data
        localStorage.setItem('authToken', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        // Update AuthContext state - map _id to id
        const userData = {
          ...data.data.user,
          id: data.data.user._id
        };
        authLogin(userData);
        
        console.log('✅ Login successful! Redirecting to dashboard...');
        // Small delay to ensure state is updated
        setTimeout(() => {
          router.push('/dashboard');
        }, 100);
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
        console.error('❌ Login failed:', data.message);
      }
    } catch (error) {
      console.error('🌐 Network error during login:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        setError(`Cannot connect to server. Please make sure your API server is running on ${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}`);
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    }
  };

  // Register API Call
  const handleRegister = async (formData: RegisterFormData) => {
    try {
      console.log('📝 Attempting registration...', { 
        username: formData.username, 
        email: formData.email,
        companyName: formData.companyName 
      });
      
      const url = `${API_BASE_URL}/users/register`;
      console.log('🌐 Making request to:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('❌ Non-JSON response received:', textResponse);
        setError(`Server error: Received non-JSON response (${response.status}). Please check if the API server is running correctly.`);
        return;
      }

      let data: ApiResponse;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('❌ JSON parsing error:', parseError);
        setError('Failed to parse server response. The server may be returning invalid JSON.');
        return;
      }
      console.log('📥 Registration response:', data);

      if (data.success && data.data?.token) {
        // Store token and user data
        localStorage.setItem('authToken', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        // Update AuthContext state - map _id to id
        const userData = {
          ...data.data.user,
          id: data.data.user._id
        };
        authLogin(userData);
        
        console.log('✅ Registration successful! Redirecting to dashboard...');
        // Small delay to ensure state is updated
        setTimeout(() => {
          router.push('/dashboard');
        }, 100);
      } else {
        setError(data.message || 'Registration failed. Please try again.');
        console.error('❌ Registration failed:', data.message);
      }
    } catch (error) {
      console.error('🌐 Network error during registration:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        setError(`Cannot connect to server. Please make sure your API server is running on ${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}`);
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        await handleLogin(loginData);
      } else {
        await handleRegister(registerData);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Dark Blue Background */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-4 h-4 bg-blue-300 rounded-full"></div>
          <div className="absolute top-40 left-32 w-6 h-6 bg-blue-300 rounded-full"></div>
          <div className="absolute top-60 left-20 w-3 h-3 bg-blue-300 rounded-full"></div>
          <div className="absolute top-80 left-40 w-5 h-5 bg-blue-300 rounded-full"></div>
          <div className="absolute top-32 left-60 w-4 h-4 bg-blue-300 rounded-full"></div>
          <div className="absolute top-52 left-80 w-3 h-3 bg-blue-300 rounded-full"></div>
          <div className="absolute top-72 left-70 w-6 h-6 bg-blue-300 rounded-full"></div>
          <div className="absolute top-96 left-50 w-4 h-4 bg-blue-300 rounded-full"></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-24 left-24 w-8 h-8 border border-blue-300 rotate-45"></div>
          <div className="absolute top-44 left-44 w-6 h-6 border border-blue-300 rotate-45"></div>
          <div className="absolute top-64 left-64 w-10 h-10 border border-blue-300 rotate-45"></div>
          <div className="absolute top-84 left-84 w-7 h-7 border border-blue-300 rotate-45"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">CryptoCompliance</span>
          </div>

          {/* Tagline */}
          <div className="mb-8">
            <p className="text-white text-lg leading-relaxed">
              Secure your crypto operations with enterprise-grade compliance tools
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - White Form Section */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-600">Sign in to your account or create a new one</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => handleTabSwitch(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isLogin
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => handleTabSwitch(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                !isLogin
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Register
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Login Form */}
          {isLogin ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginInputChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginInputChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-800 text-white py-3 px-4 rounded-md hover:bg-blue-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div>
                <label htmlFor="register-username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="register-username"
                  name="username"
                  value={registerData.username}
                  onChange={handleRegisterInputChange}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="register-email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterInputChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="register-password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterInputChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                  required
                />
              </div>

              {/* Company Name */}
              <div>
                <label htmlFor="register-companyName" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="register-companyName"
                  name="companyName"
                  value={registerData.companyName}
                  onChange={handleRegisterInputChange}
                  placeholder="Enter your company name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-800 text-white py-3 px-4 rounded-md hover:bg-blue-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          )}

          {/* Additional Options */}
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
