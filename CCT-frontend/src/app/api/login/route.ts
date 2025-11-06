import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.email || !body.password) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email and password are required' 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email format' 
        },
        { status: 400 }
      );
    }

    // Mock user database - predefined users for testing
    const mockUsers = [
      {
        id: 'user_1',
        username: 'testuser',
        email: 'test@test.com',
        password: 'password123', // In real app, this would be hashed
        companyName: 'Test Company',
        createdAt: '2025-09-22T18:52:36.379Z'
      },
      {
        id: 'user_2',
        username: 'admin',
        email: 'admin@test.com',
        password: 'admin123',
        companyName: 'Admin Company',
        createdAt: '2025-09-22T18:52:36.379Z'
      },
      {
        id: 'user_3',
        username: 'demo',
        email: 'demo@test.com',
        password: 'demo123',
        companyName: 'Demo Company',
        createdAt: '2025-09-22T18:52:36.379Z'
      }
    ];

    // Find user by email
    const user = mockUsers.find(u => u.email === body.email);
    
    if (!user) {
      // Return generic error message to prevent user enumeration
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email or password' 
        },
        { status: 401 }
      );
    }

    // Check password (in real app, you'd use bcryptjs to compare hashed passwords)
    if (user.password !== body.password) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email or password' 
        },
        { status: 401 }
      );
    }

    // Remove password from user object before returning
    const { password, ...userWithoutPassword } = user;

    // Generate a mock JWT token (in real app, you'd use proper JWT)
    const mockToken = `mock_jwt_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Log the login for debugging
    console.log('✅ Mock login successful:', {
      email: body.email,
      username: user.username,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token: mockToken
      }
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Login error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error during login',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
