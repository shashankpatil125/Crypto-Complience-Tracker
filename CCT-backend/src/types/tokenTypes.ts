import { z } from 'zod';

// Token Registration Zod Schema - Flexible validation
export const TokenRegistrationSchema = z.object({
  // Basic Token Information
  tokenName: z.string().min(1, 'Token name is required'),
  tokenSymbol: z.string().min(1, 'Token symbol is required'),
  tokenCategory: z.string().min(1, 'Token category is required'),
  tokenType: z.string().min(1, 'Token type is required'),
  description: z.string().min(1, 'Description is required'),

  // Issuer Information
  issuerName: z.string().min(1, 'Issuer name is required'),
  legalEntityName: z.string().min(1, 'Legal entity name is required'),
  websiteUrl: z.string().min(1, 'Website URL is required'),
  whitepaperUrl: z.string().optional(),

  // Technical Information
  blockchainNetworks: z.array(z.object({
    networkName: z.string().min(1, 'Network name is required'),
    chainId: z.string().min(1, 'Chain ID is required')
  })).min(1, 'At least one blockchain network is required'),
  
  contractAddresses: z.array(z.object({
    network: z.string().min(1, 'Network is required'),
    contractAddress: z.string().min(1, 'Contract address is required')
  })).min(1, 'At least one contract address is required'),
  
  tokenStandard: z.string().min(1, 'Token standard is required'),
  totalSupply: z.string().min(1, 'Total supply is required'),

  // Compliance Information
  regulatoryStatus: z.string().min(1, 'Regulatory status is required'),
  complianceContacts: z.array(z.object({
    name: z.string().min(1, 'Contact name is required'),
    email: z.string().min(1, 'Email is required'),
    role: z.string().min(1, 'Role is required')
  })).min(1, 'At least one compliance contact is required'),
  
  kycRequirements: z.string().min(1, 'KYC requirements are required'),
  transferRestrictions: z.string().min(1, 'Transfer restrictions are required'),
  amlPolicyUrl: z.string().min(1, 'AML policy URL is required'),
  usesWhitelist: z.union([z.boolean(), z.string()]).transform(val => {
    if (typeof val === 'string') {
      return val.toLowerCase() === 'true' || val === '1';
    }
    return val;
  }),
  lastSecurityAuditDate: z.string().min(1, 'Last security audit date is required')
});

// TypeScript interfaces
export interface BlockchainNetwork {
  networkName: string;
  chainId: string;
}

export interface ContractAddress {
  network: string;
  contractAddress: string;
}

export interface ComplianceContact {
  name: string;
  email: string;
  role: string;
}

export interface TokenRegistration {
  _id?: string;
  // Basic Token Information
  tokenName: string;
  tokenSymbol: string;
  tokenCategory: 'UTILITY' | 'SECURITY' | 'PAYMENT' | 'GOVERNANCE' | 'NFT' | 'OTHER';
  tokenType: string;
  description: string;

  // Issuer Information
  issuerName: string;
  legalEntityName: string;
  websiteUrl: string;
  whitepaperUrl?: string;

  // Technical Information
  blockchainNetworks: BlockchainNetwork[];
  contractAddresses: ContractAddress[];
  tokenStandard: 'ERC-20' | 'ERC-721' | 'ERC-1155' | 'BEP-20' | 'TRC-20' | 'OTHER';
  totalSupply: string;

  // Compliance Information
  regulatoryStatus: 'REGULATED' | 'UNREGULATED' | 'PENDING' | 'EXEMPT';
  complianceContacts: ComplianceContact[];
  kycRequirements: string;
  transferRestrictions: string;
  amlPolicyUrl: string;
  usesWhitelist: boolean;
  lastSecurityAuditDate: string;

  // Metadata
  submittedBy: string; // User ID who submitted
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW';
  createdAt: Date;
  updatedAt: Date;
}

export type TokenRegistrationRequest = z.infer<typeof TokenRegistrationSchema>;

// API Response interface
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
