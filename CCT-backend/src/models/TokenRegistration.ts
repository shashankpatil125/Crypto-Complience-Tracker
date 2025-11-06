import mongoose, { Schema, Document } from 'mongoose';
import { TokenRegistrationSchema, TokenRegistration } from '../types/tokenTypes';

// Token Registration document interface
export interface ITokenRegistration extends Document, Omit<TokenRegistration, '_id'> {}

// Blockchain Network sub-schema
const blockchainNetworkSchema = new Schema({
  networkName: { type: String, required: true },
  chainId: { type: String, required: true }
}, { _id: false });

// Contract Address sub-schema
const contractAddressSchema = new Schema({
  network: { type: String, required: true },
  contractAddress: { type: String, required: true }
}, { _id: false });

// Compliance Contact sub-schema
const complianceContactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true }
}, { _id: false });

// Main Token Registration schema
const tokenRegistrationSchema = new Schema<ITokenRegistration>({
  // Basic Token Information
  tokenName: {
    type: String,
    required: [true, 'Token name is required'],
    maxlength: [100, 'Token name must be less than 100 characters']
  },
  tokenSymbol: {
    type: String,
    required: [true, 'Token symbol is required'],
    maxlength: [10, 'Token symbol must be less than 10 characters'],
    uppercase: true
  },
  tokenCategory: {
    type: String,
    required: true
  },
  tokenType: {
    type: String,
    required: [true, 'Token type is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },

  // Issuer Information
  issuerName: {
    type: String,
    required: [true, 'Issuer name is required']
  },
  legalEntityName: {
    type: String,
    required: [true, 'Legal entity name is required']
  },
  websiteUrl: {
    type: String,
    required: [true, 'Website URL is required']
  },
  whitepaperUrl: {
    type: String
  },

  // Technical Information
  blockchainNetworks: {
    type: [blockchainNetworkSchema],
    required: [true, 'At least one blockchain network is required'],
    validate: {
      validator: function(v: any[]) { return v.length > 0; },
      message: 'At least one blockchain network is required'
    }
  },
  contractAddresses: {
    type: [contractAddressSchema],
    required: [true, 'At least one contract address is required'],
    validate: {
      validator: function(v: any[]) { return v.length > 0; },
      message: 'At least one contract address is required'
    }
  },
  tokenStandard: {
    type: String,
    required: true
  },
  totalSupply: {
    type: String,
    required: [true, 'Total supply is required']
  },

  // Compliance Information
  regulatoryStatus: {
    type: String,
    required: true
  },
  complianceContacts: {
    type: [complianceContactSchema],
    required: [true, 'At least one compliance contact is required'],
    validate: {
      validator: function(v: any[]) { return v.length > 0; },
      message: 'At least one compliance contact is required'
    }
  },
  kycRequirements: {
    type: String,
    required: [true, 'KYC requirements are required']
  },
  transferRestrictions: {
    type: String,
    required: [true, 'Transfer restrictions are required']
  },
  amlPolicyUrl: {
    type: String,
    required: [true, 'AML policy URL is required']
  },
  usesWhitelist: {
    type: Boolean,
    required: true,
    default: false
  },
  lastSecurityAuditDate: {
    type: String,
    required: [true, 'Last security audit date is required']
  },

  // Metadata
  submittedBy: {
    type: String,
    required: [true, 'Submitted by user ID is required']
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED', 'UNDER_REVIEW'],
    default: 'PENDING'
  }
}, {
  timestamps: true
});

// Create and export the model
export const TokenRegistrationModel = mongoose.model<ITokenRegistration>('TokenRegistration', tokenRegistrationSchema);

// Validation function using Zod
export const validateTokenRegistrationData = (data: any) => {
  return TokenRegistrationSchema.parse(data);
};
