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
      'tokenName', 'tokenSymbol', 'tokenCategory', 'tokenType',
      'description', 'issuerName', 'legalEntityName', 'websiteUrl',
      'tokenStandard', 'totalSupply', 'regulatoryStatus'
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

    // Simulate successful registration
    const registrationData = {
      _id: `token_mock_${Date.now()}`,
      tokenName: body.tokenName,
      tokenSymbol: body.tokenSymbol,
      tokenCategory: body.tokenCategory,
      tokenType: body.tokenType,
      description: body.description,
      issuerName: body.issuerName,
      legalEntityName: body.legalEntityName,
      websiteUrl: body.websiteUrl,
      whitepaperUrl: body.whitepaperUrl,
      blockchainNetworks: body.blockchainNetworks || [],
      contractAddresses: body.contractAddresses || [],
      tokenStandard: body.tokenStandard,
      totalSupply: body.totalSupply,
      regulatoryStatus: body.regulatoryStatus,
      complianceContacts: body.complianceContacts || [],
      kycRequirements: body.kycRequirements,
      transferRestrictions: body.transferRestrictions,
      amlPolicyUrl: body.amlPolicyUrl,
      usesWhitelist: body.usesWhitelist || false,
      lastSecurityAuditDate: body.lastSecurityAuditDate,
      status: 'PENDING_REVIEW',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      mockEndpoint: true // Flag to indicate this is from mock endpoint
    };

    // Log the registration for debugging
    console.log('✅ Token registration (MOCK) successful:', {
      tokenName: body.tokenName,
      tokenSymbol: body.tokenSymbol,
      category: body.tokenCategory,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: 'Token registration submitted successfully (MOCK ENDPOINT)',
      data: registrationData
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Token registration (MOCK) error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error during token registration (MOCK)',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
