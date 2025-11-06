import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Access token required' },
        { status: 401 }
      );
    }

    // Extract token
    const token = authHeader.substring(7);
    
    // Simple token validation (in real app, you'd validate JWT)
    if (!token || token.length < 10) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'protocolName', 'websiteUrl', 'protocolType', 
      'smartContractAddresses', 'blockchainNetworks'
    ];
    
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    // Validate URL format
    if (body.websiteUrl && !/^https?:\/\/.+/.test(body.websiteUrl)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please enter a valid website URL' 
        },
        { status: 400 }
      );
    }

    // Simulate successful registration
    const registrationData = {
      _id: `defi_${Date.now()}`,
      protocolName: body.protocolName,
      websiteUrl: body.websiteUrl,
      supportedTokens: body.supportedTokens || '',
      protocolType: body.protocolType,
      smartContractAddresses: body.smartContractAddresses,
      blockchainNetworks: body.blockchainNetworks,
      status: 'PENDING_REVIEW',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Log the registration for debugging
    console.log('✅ DeFi protocol registration successful:', {
      protocolName: body.protocolName,
      protocolType: body.protocolType,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: 'DeFi protocol registration submitted successfully',
      data: registrationData
    }, { status: 201 });

  } catch (error) {
    console.error('❌ DeFi protocol registration error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error during DeFi protocol registration',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
