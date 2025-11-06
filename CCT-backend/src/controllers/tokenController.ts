import { Request, Response } from 'express';
import { TokenRegistrationModel, validateTokenRegistrationData } from '../models/TokenRegistration';
import { ApiResponse, TokenRegistration } from '../types/tokenTypes';
import { ZodError } from 'zod';
import { logger } from '../utils/logger';

// Register token controller
export const registerToken = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info('Token registration attempt', { 
      tokenName: req.body.tokenName, 
      tokenSymbol: req.body.tokenSymbol,
      submittedBy: req.user?.userId 
    });
    
    // Validate input data using Zod
    const validatedData = validateTokenRegistrationData(req.body);

    // Check if token with same symbol already exists
    const existingToken = await TokenRegistrationModel.findOne({ 
      tokenSymbol: validatedData.tokenSymbol.toUpperCase() 
    });
    
    if (existingToken) {
      logger.warn('Token registration failed - symbol already exists', { 
        tokenSymbol: validatedData.tokenSymbol 
      });
      const response: ApiResponse = {
        success: false,
        message: 'Token with this symbol already exists'
      };
      res.status(409).json(response);
      return;
    }

    // Create new token registration
    const newTokenRegistration = new TokenRegistrationModel({
      ...validatedData,
      tokenSymbol: validatedData.tokenSymbol.toUpperCase(),
      submittedBy: req.user?.userId || 'mock-user' // Get from authenticated user or use mock
    });
    
    await newTokenRegistration.save();

    logger.success('Token registered successfully', { 
      tokenId: newTokenRegistration._id, 
      tokenSymbol: newTokenRegistration.tokenSymbol 
    });
    
    const response: ApiResponse<TokenRegistration> = {
      success: true,
      message: 'Token registration submitted successfully',
      data: {
        _id: String(newTokenRegistration._id),
        tokenName: newTokenRegistration.tokenName,
        tokenSymbol: newTokenRegistration.tokenSymbol,
        tokenCategory: newTokenRegistration.tokenCategory,
        tokenType: newTokenRegistration.tokenType,
        description: newTokenRegistration.description,
        issuerName: newTokenRegistration.issuerName,
        legalEntityName: newTokenRegistration.legalEntityName,
        websiteUrl: newTokenRegistration.websiteUrl,
        whitepaperUrl: newTokenRegistration.whitepaperUrl,
        blockchainNetworks: newTokenRegistration.blockchainNetworks,
        contractAddresses: newTokenRegistration.contractAddresses,
        tokenStandard: newTokenRegistration.tokenStandard,
        totalSupply: newTokenRegistration.totalSupply,
        regulatoryStatus: newTokenRegistration.regulatoryStatus,
        complianceContacts: newTokenRegistration.complianceContacts,
        kycRequirements: newTokenRegistration.kycRequirements,
        transferRestrictions: newTokenRegistration.transferRestrictions,
        amlPolicyUrl: newTokenRegistration.amlPolicyUrl,
        usesWhitelist: newTokenRegistration.usesWhitelist,
        lastSecurityAuditDate: newTokenRegistration.lastSecurityAuditDate,
        submittedBy: newTokenRegistration.submittedBy,
        status: newTokenRegistration.status,
        createdAt: newTokenRegistration.createdAt,
        updatedAt: newTokenRegistration.updatedAt
      }
    };

    res.status(201).json(response);

  } catch (error) {
    if (error instanceof ZodError) {
      logger.error('Token registration validation error', error.issues);
      const response: ApiResponse = {
        success: false,
        message: 'Validation error',
        error: error.issues.map(err => err.message).join(', ')
      };
      res.status(400).json(response);
      return;
    }

    logger.error('Token registration internal error', error);
    const response: ApiResponse = {
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    res.status(500).json(response);
  }
};

// Get all token registrations controller
export const getAllTokenRegistrations = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info('Get all token registrations request', { userId: req.user?.userId });
    
    const tokens = await TokenRegistrationModel.find({})
      .sort({ createdAt: -1 })
      .limit(50); // Limit to prevent large responses
    
    const tokensResponse = tokens.map(token => ({
      _id: String(token._id),
      tokenName: token.tokenName,
      tokenSymbol: token.tokenSymbol,
      tokenCategory: token.tokenCategory,
      tokenType: token.tokenType,
      description: token.description,
      issuerName: token.issuerName,
      legalEntityName: token.legalEntityName,
      websiteUrl: token.websiteUrl,
      whitepaperUrl: token.whitepaperUrl,
      blockchainNetworks: token.blockchainNetworks,
      contractAddresses: token.contractAddresses,
      tokenStandard: token.tokenStandard,
      totalSupply: token.totalSupply,
      regulatoryStatus: token.regulatoryStatus,
      complianceContacts: token.complianceContacts,
      kycRequirements: token.kycRequirements,
      transferRestrictions: token.transferRestrictions,
      amlPolicyUrl: token.amlPolicyUrl,
      usesWhitelist: token.usesWhitelist,
      lastSecurityAuditDate: token.lastSecurityAuditDate,
      submittedBy: token.submittedBy,
      status: token.status,
      createdAt: token.createdAt,
      updatedAt: token.updatedAt
    }));
    
    logger.success('Token registrations retrieved successfully', { count: tokensResponse.length });
    
    const response: ApiResponse<{ tokens: any[], count: number }> = {
      success: true,
      message: 'Token registrations retrieved successfully',
      data: {
        tokens: tokensResponse,
        count: tokensResponse.length
      }
    };

    res.json(response);
  } catch (error) {
    logger.error('Get token registrations internal error', error);
    const response: ApiResponse = {
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    res.status(500).json(response);
  }
};

// Get token registration by ID controller
export const getTokenRegistrationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    logger.info('Get token registration by ID request', { tokenId: id, userId: req.user?.userId });
    
    const token = await TokenRegistrationModel.findById(id);
    
    if (!token) {
      logger.warn('Token registration not found', { tokenId: id });
      const response: ApiResponse = {
        success: false,
        message: 'Token registration not found'
      };
      res.status(404).json(response);
      return;
    }
    
    const tokenResponse = {
      _id: String(token._id),
      tokenName: token.tokenName,
      tokenSymbol: token.tokenSymbol,
      tokenCategory: token.tokenCategory,
      tokenType: token.tokenType,
      description: token.description,
      issuerName: token.issuerName,
      legalEntityName: token.legalEntityName,
      websiteUrl: token.websiteUrl,
      whitepaperUrl: token.whitepaperUrl,
      blockchainNetworks: token.blockchainNetworks,
      contractAddresses: token.contractAddresses,
      tokenStandard: token.tokenStandard,
      totalSupply: token.totalSupply,
      regulatoryStatus: token.regulatoryStatus,
      complianceContacts: token.complianceContacts,
      kycRequirements: token.kycRequirements,
      transferRestrictions: token.transferRestrictions,
      amlPolicyUrl: token.amlPolicyUrl,
      usesWhitelist: token.usesWhitelist,
      lastSecurityAuditDate: token.lastSecurityAuditDate,
      submittedBy: token.submittedBy,
      status: token.status,
      createdAt: token.createdAt,
      updatedAt: token.updatedAt
    };
    
    logger.success('Token registration retrieved successfully', { tokenId: id });
    
    const response: ApiResponse = {
      success: true,
      message: 'Token registration retrieved successfully',
      data: tokenResponse
    };

    res.json(response);
  } catch (error) {
    logger.error('Get token registration by ID internal error', error);
    const response: ApiResponse = {
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    res.status(500).json(response);
  }
};
