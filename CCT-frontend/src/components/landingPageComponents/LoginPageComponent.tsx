'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, register, RegisterRequest, LoginRequest } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPageComponent() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    companyName: ''
  });
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const credentials: LoginRequest = { email, password };
      const data = await login(credentials);

      if (data.token && data.user) {
        authLogin(data.user);
        router.push('/dashboard');
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed. Please try again.');
    }
  };

  const handleRegister = async (userData: typeof formData) => {
    try {
      const registerData: RegisterRequest = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        companyName: userData.companyName
      };
      
      const data = await register(registerData);

      if (data.success) {
        setError('');
        // After successful registration, automatically log in
        await handleLogin(userData.email, userData.password);
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        await handleLogin(formData.email || formData.username, formData.password);
      } else {
        await handleRegister(formData);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
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
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isLogin
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email/Username */}
            <div>
              <label htmlFor={isLogin ? "email" : "email"} className="block text-sm font-medium text-gray-700 mb-2">
                {isLogin ? 'Email' : 'Email'}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                required
              />
            </div>

            {/* Username - Only for Register */}
            {!isLogin && (
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                  required
                />
              </div>
            )}

            {/* Company Name - Only for Register */}
            {!isLogin && (
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter your company name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                  required
                />
              </div>
            )}

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
                  {isLogin ? 'Signing in...' : 'Creating Account...'}
                </>
              ) : (
                isLogin ? 'Sign in' : 'Create Account'
              )}
            </button>
          </form>

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
