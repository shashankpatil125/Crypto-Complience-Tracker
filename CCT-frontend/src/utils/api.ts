// API utility functions for authentication

const API_BASE_URL = 'http://localhost:3001/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  companyName: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  token?: string;
  user?: T;
  data?: T;
}

export interface User {
  id: string;
  username: string;
  email: string;
  companyName: string;
  createdAt: string;
}

// Token management
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
};

export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};

export const getUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
};

export const setUser = (user: User): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

// API calls
export const login = async (credentials: LoginRequest): Promise<ApiResponse<User>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data: ApiResponse<User> = await response.json();
    
    if (response.ok && data.token) {
      setAuthToken(data.token);
      if (data.user) {
        setUser(data.user);
      }
    }

    return data;
  } catch (error) {
    console.error('Login API error:', error);
    throw new Error('Network error. Please try again.');
  }
};

export const register = async (userData: RegisterRequest): Promise<ApiResponse<User>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data: ApiResponse<User> = await response.json();
    return data;
  } catch (error) {
    console.error('Register API error:', error);
    throw new Error('Network error. Please try again.');
  }
};

export const getUsers = async (): Promise<ApiResponse<User[]>> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data: ApiResponse<User[]> = await response.json();
    return data;
  } catch (error) {
    console.error('Get users API error:', error);
    throw new Error('Network error. Please try again.');
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

// Logout function
export const logout = (): void => {
  removeAuthToken();
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};
