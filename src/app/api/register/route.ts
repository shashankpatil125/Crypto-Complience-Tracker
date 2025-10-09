import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.username || !body.email || !body.password || !body.companyName) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Username, email, password, and company name are required' 
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
          message: 'Please enter a valid email address' 
        },
        { status: 400 }
      );
    }

    // Validate password length
    if (body.password.length < 6) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Password must be at least 6 characters long' 
        },
        { status: 400 }
      );
    }

    // Mock user registration - create user data
    const mockUser = {
      _id: `user_${Date.now()}`,
      username: body.username,
      email: body.email,
      companyName: body.companyName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Generate a mock JWT token (in real app, you'd use proper JWT)
    const mockToken = `mock_jwt_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Log the registration for debugging
    console.log('✅ Mock registration successful:', {
      username: body.username,
      email: body.email,
      companyName: body.companyName,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      data: {
        user: mockUser,
        token: mockToken
      }
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Registration error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error during registration',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
