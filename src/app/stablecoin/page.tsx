'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavbarComponent from '@/components/common/Navbar';

export default function StablecoinRegistrationPage() {
  const [activeTab, setActiveTab] = useState('form');
  const [activeStep, setActiveStep] = useState('basic');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Information
    stablecoinName: '',
    issuerLegalName: '',
    jurisdiction: '',
    complianceOfficerEmail: '',
    tokenSymbol: '',
    registrationNumber: '',
    websiteUrl: '',
    totalSupply: '',
    
    // Backing & Reserves
    backingAssetType: 'Fiat Currency',
    peggedTo: 'USD',
    reserveRatio: '100',
    attestationMethod: '',
    marketMakingPartnership: false,
    redemptionFrequency: 'Daily',
    backingAssetDetails: '',
    custodianName: '',
    auditProvider: '',
    redemptionPolicy: '',
    
    // Compliance & Regulation
    regulatedStablecoin: false,
    travelRuleCompliance: false,
    centralBankPartnership: false,
    amlPolicyUrl: '',
    
    // Technical Details
    chainIds: '',
    smartContractSecurity: false
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Auto-save to localStorage
    const updatedData = {
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    };
    localStorage.setItem('stablecoinFormData', JSON.stringify(updatedData));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Basic Information validation
    if (!formData.stablecoinName.trim()) newErrors.stablecoinName = 'Stablecoin name is required';
    if (!formData.tokenSymbol.trim()) newErrors.tokenSymbol = 'Token symbol is required';
    if (!formData.issuerLegalName.trim()) newErrors.issuerLegalName = 'Legal entity name is required';
    if (!formData.jurisdiction) newErrors.jurisdiction = 'Jurisdiction is required';
    if (!formData.complianceOfficerEmail.trim()) newErrors.complianceOfficerEmail = 'Compliance officer email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.complianceOfficerEmail)) newErrors.complianceOfficerEmail = 'Please enter a valid email';
    
    // Backing & Reserves validation
    if (!formData.backingAssetType) newErrors.backingAssetType = 'Backing asset type is required';
    if (!formData.peggedTo.trim()) newErrors.peggedTo = 'Pegged currency is required';
    if (!formData.reserveRatio || parseInt(formData.reserveRatio) < 0 || parseInt(formData.reserveRatio) > 100) {
      newErrors.reserveRatio = 'Reserve ratio must be between 0 and 100';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validateForm()) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Stablecoin registration submitted:', formData);
        localStorage.removeItem('stablecoinFormData');
        router.push('/dashboard');
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      stablecoinName: '',
      issuerLegalName: '',
      jurisdiction: '',
      complianceOfficerEmail: '',
      tokenSymbol: '',
      registrationNumber: '',
      websiteUrl: '',
      totalSupply: '',
      backingAssetType: 'Fiat Currency',
      peggedTo: 'USD',
      reserveRatio: '100',
      attestationMethod: '',
      marketMakingPartnership: false,
      redemptionFrequency: 'Daily',
      backingAssetDetails: '',
      custodianName: '',
      auditProvider: '',
      redemptionPolicy: '',
      regulatedStablecoin: false,
      travelRuleCompliance: false,
      centralBankPartnership: false,
      amlPolicyUrl: '',
      chainIds: '',
      smartContractSecurity: false
    });
    setErrors({});
    localStorage.removeItem('stablecoinFormData');
  };

  // Load saved data on component mount
  React.useEffect(() => {
    const savedData = localStorage.getItem('stablecoinFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <NavbarComponent />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stablecoin Issuer Registration</h1>
          <p className="text-gray-600">
            Register your stablecoin issuance for regulatory compliance tracking and attestation services.
          </p>
        </div>

        {/* Main Tabs */}
        <div className="flex mb-6">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-6 py-3 font-medium transition-colors rounded-t-lg ${
              activeTab === 'form'
                ? 'bg-white text-gray-900 border border-gray-200 border-b-0'
                : 'bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
          >
            Registration Form
          </button>
          <button
            onClick={() => setActiveTab('guidance')}
            className={`px-6 py-3 font-medium transition-colors rounded-t-lg ${
              activeTab === 'guidance'
                ? 'bg-white text-gray-900 border border-gray-200 border-b-0'
                : 'bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
          >
            Regulatory Guidance
          </button>
        </div>

        {/* Registration Form Tab */}
        {activeTab === 'form' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 border-t-0">
            {/* Step Navigation */}
            <div className="flex">
              {['basic', 'backing', 'compliance', 'technical'].map((step) => (
                <button
                  key={step}
                  onClick={() => setActiveStep(step)}
                  className={`px-6 py-4 font-medium transition-colors rounded-t-lg ${
                    activeStep === step
                      ? 'bg-white text-gray-900 border border-gray-200'
                      : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {step === 'basic' && 'Basic Information'}
                  {step === 'backing' && 'Backing & Reserves'}
                  {step === 'compliance' && 'Compliance & Regulation'}
                  {step === 'technical' && 'Technical Details'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              {/* Basic Information Step */}
              {activeStep === 'basic' && (
                <div>
                  <div className="flex items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Stablecoin Information</h3>
                    <svg className="w-5 h-5 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Stablecoin Name *</label>
                      <input
                        type="text"
                        name="stablecoinName"
                        value={formData.stablecoinName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900 ${
                          errors.stablecoinName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter stablecoin name"
                      />
                      {errors.stablecoinName && (
                        <p className="text-xs text-red-500 mt-1">{errors.stablecoinName}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Official name of your stablecoin project.</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Token Symbol *</label>
                      <input
                        type="text"
                        name="tokenSymbol"
                        value={formData.tokenSymbol}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900 ${
                          errors.tokenSymbol ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., USDT, USDC"
                      />
                      {errors.tokenSymbol && (
                        <p className="text-xs text-red-500 mt-1">{errors.tokenSymbol}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Token ticker, typically 3-5 characters.</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Issuer Legal Name *</label>
                      <input
                        type="text"
                        name="issuerLegalName"
                        value={formData.issuerLegalName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900 ${
                          errors.issuerLegalName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter legal entity name"
                      />
                      {errors.issuerLegalName && (
                        <p className="text-xs text-red-500 mt-1">{errors.issuerLegalName}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Legal entity responsible for token issuance.</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
                      <input
                        type="text"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                        placeholder="Enter registration number"
                      />
                      <p className="text-xs text-gray-500 mt-1">Corporate registration or license ID.</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Jurisdiction *</label>
                      <select
                        name="jurisdiction"
                        value={formData.jurisdiction}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                          errors.jurisdiction ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select jurisdiction</option>
                        <option value="US">United States</option>
                        <option value="EU">European Union</option>
                        <option value="UK">United Kingdom</option>
                        <option value="SG">Singapore</option>
                        <option value="JP">Japan</option>
                        <option value="CH">Switzerland</option>
                      </select>
                      {errors.jurisdiction && (
                        <p className="text-xs text-red-500 mt-1">{errors.jurisdiction}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Primary country of incorporation.</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                      <input
                        type="url"
                        name="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                        placeholder="https://www.example.com"
                      />
                      <p className="text-xs text-gray-500 mt-1">Official stablecoin website.</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Compliance Officer Email *</label>
                      <input
                        type="email"
                        name="complianceOfficerEmail"
                        value={formData.complianceOfficerEmail}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900 ${
                          errors.complianceOfficerEmail ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="compliance@example.com"
                      />
                      {errors.complianceOfficerEmail && (
                        <p className="text-xs text-red-500 mt-1">{errors.complianceOfficerEmail}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Primary contact for regulatory matters.</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total Supply</label>
                      <input
                        type="text"
                        name="totalSupply"
                        value={formData.totalSupply}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                        placeholder="Enter total supply"
                      />
                      <p className="text-xs text-gray-500 mt-1">Current or planned circulation amount.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Backing & Reserves Step */}
              {activeStep === 'backing' && (
                <div>
                  <div className="flex items-center mb-6">
                    <svg className="w-6 h-6 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-900">Backing & Reserves</h3>
                  </div>
                  <p className="text-gray-600 mb-8">
                    All stablecoin issuers must provide accurate information about their reserve backing. False statements may be subject to regulatory action in most jurisdictions.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Backing Asset Type *</label>
                      <select
                        name="backingAssetType"
                        value={formData.backingAssetType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                          errors.backingAssetType ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="Fiat Currency">Fiat Currency</option>
                        <option value="Cryptocurrency">Cryptocurrency</option>
                        <option value="Commodities">Commodities</option>
                        <option value="Mixed">Mixed</option>
                      </select>
                      {errors.backingAssetType && (
                        <p className="text-xs text-red-500 mt-1">{errors.backingAssetType}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Primary asset class backing the token</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pegged To *</label>
                      <input
                        type="text"
                        name="peggedTo"
                        value={formData.peggedTo}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900 ${
                          errors.peggedTo ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="USD"
                      />
                      {errors.peggedTo && (
                        <p className="text-xs text-red-500 mt-1">{errors.peggedTo}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Asset or currency being tracked</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Reserve Ratio (%) *</label>
                      <input
                        type="number"
                        name="reserveRatio"
                        value={formData.reserveRatio}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900 ${
                          errors.reserveRatio ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="100"
                        min="0"
                        max="100"
                      />
                      {errors.reserveRatio && (
                        <p className="text-xs text-red-500 mt-1">{errors.reserveRatio}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">Percentage of token backed by reserves</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Attestation Method</label>
                      <select
                        name="attestationMethod"
                        value={formData.attestationMethod}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                      >
                        <option value="">Select attestation method</option>
                        <option value="Third-party Audit">Third-party Audit</option>
                        <option value="Self-attestation">Self-attestation</option>
                        <option value="Blockchain Verification">Blockchain Verification</option>
                        <option value="Regulatory Reporting">Regulatory Reporting</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">How reserve backing is verified</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Redemption Frequency</label>
                      <select
                        name="redemptionFrequency"
                        value={formData.redemptionFrequency}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                      >
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="On-demand">On-demand</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">How often redemptions are processed</p>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="marketMakingPartnership"
                        checked={formData.marketMakingPartnership}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700">Market Making Partnership</span>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Backing Asset Details</label>
                      <textarea
                        name="backingAssetDetails"
                        value={formData.backingAssetDetails}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                        placeholder="Describe the specific assets backing your stablecoin (e.g., USD in custody accounts at Silvergate Bank, USDC and ETH, etc.)"
                      />
                      <p className="text-xs text-gray-500 mt-1">Detailed description of reserve composition</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Custodian Name</label>
                      <input
                        type="text"
                        name="custodianName"
                        value={formData.custodianName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                        placeholder="e.g., State Street, BitGo"
                      />
                      <p className="text-xs text-gray-500 mt-1">Institution holding the reserve assets</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Audit Provider</label>
                      <input
                        type="text"
                        name="auditProvider"
                        value={formData.auditProvider}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                        placeholder="e.g., Grant Thornton, Deloitte"
                      />
                      <p className="text-xs text-gray-500 mt-1">Firm that verifies reserve attestations</p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Redemption Policy</label>
                      <textarea
                        name="redemptionPolicy"
                        value={formData.redemptionPolicy}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                        placeholder="Describe your redemption policy, including any minimum requirements or fees"
                      />
                      <p className="text-xs text-gray-500 mt-1">How users can exchange tokens for backing assets</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Compliance & Regulation Step */}
              {activeStep === 'compliance' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Compliance & Regulation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <label className="flex items-start">
                          <input
                            type="checkbox"
                            name="regulatedStablecoin"
                            checked={formData.regulatedStablecoin}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                          />
                          <div className="ml-3">
                            <span className="text-gray-900 font-medium">Regulated Stablecoin</span>
                            <p className="text-sm text-gray-500 mt-1">
                              Check if you operate under a specific stablecoin or e-money regulation.
                            </p>
                          </div>
                        </label>
                      </div>
                      
                      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <label className="flex items-start">
                          <input
                            type="checkbox"
                            name="travelRuleCompliance"
                            checked={formData.travelRuleCompliance}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                          />
                          <div className="ml-3">
                            <span className="text-gray-900 font-medium">Travel Rule Compliance</span>
                            <p className="text-sm text-gray-500 mt-1">
                              Check if your stablecoin implements FATF Travel Rule compliance.
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <label className="flex items-start">
                          <input
                            type="checkbox"
                            name="centralBankPartnership"
                            checked={formData.centralBankPartnership}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                          />
                          <div className="ml-3">
                            <span className="text-gray-900 font-medium">Central Bank Partnership</span>
                            <p className="text-sm text-gray-500 mt-1">
                              Check if your project has formal relationship with a central bank.
                            </p>
                          </div>
                        </label>
                      </div>
                      
                      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-2">AML Policy URL</label>
                        <input
                          type="url"
                          name="amlPolicyUrl"
                          value={formData.amlPolicyUrl}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                          placeholder="https://example.com/aml-policy"
                        />
                        <p className="text-sm text-gray-500 mt-1">Link to your Anti-Money Laundering policy.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Technical Details Step */}
              {activeStep === 'technical' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Technical Details</h3>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Chain IDs</label>
                    <textarea
                      name="chainIds"
                      value={formData.chainIds}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                      placeholder="List blockchain IDs where your token is deployed (e.g., Ethereum Mainnet (1), Polygon (137), etc.)"
                    />
                    <p className="text-sm text-gray-500 mt-2">Blockchains where your token is available</p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg">
                    <button
                      type="button"
                      className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
                    >
                      <span className="font-semibold text-gray-900">Smart Contract Security</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSubmitting && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  <span>{isSubmitting ? 'Submitting...' : 'Register Stablecoin'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Regulatory Guidance Tab */}
        {activeTab === 'guidance' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 border-t-0 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Stablecoin Issuer Regulatory Guidance</h2>
            <p className="text-gray-600 mb-8">Key compliance considerations for stablecoin projects and issuers.</p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Regulatory Considerations</h3>
                <p className="text-gray-600 mb-4">
                  Stablecoin issuers face unique regulatory requirements depending on backing asset type and jurisdiction:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Banking licenses and eMoney regulations</li>
                  <li>Reserve assets custody and audit requirements</li>
                  <li>Financial services licensing (MSB, PSP, etc.)</li>
                  <li>Enhanced AML/KYC requirements for fiat on/off ramps</li>
                  <li>Consumer protection disclosures</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Regulatory Developments</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">EU MiCA Regulations</h4>
                      <p className="text-gray-600">Specific asset-referenced token (ART) and e-money token (EMT) regulations.</p>
                    </div>
                    <a 
                      href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R1114"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <span>MiCA Text</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">US Presidential Executive Order</h4>
                      <p className="text-gray-600">Federal approach to regulating digital assets, including stablecoins.</p>
                    </div>
                    <a 
                      href="https://www.whitehouse.gov/briefing-room/presidential-actions/2022/03/09/executive-order-on-ensuring-responsible-development-of-digital-assets/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <span>EO Text</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">FATF Updated Guidance</h4>
                      <p className="text-gray-600">Standards for virtual assets and virtual asset service providers, including stablecoins.</p>
                    </div>
                    <a 
                      href="https://www.fatf-gafi.org/en/publications/fatfrecommendations/documents/guidance-rba-virtual-assets-2021.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <span>FATF Guidance</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Stablecoin Best Practices</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Regular attestation and/or audits of reserve assets</li>
                  <li>Clear redemption policies and procedures</li>
                  <li>Transparent reserve composition disclosures</li>
                  <li>Robust AML program with transaction monitoring</li>
                  <li>Risk disclosure documentation for users</li>
                  <li>Blacklisting capabilities for sanctioned addresses</li>
                  <li>Emergency response procedures for de-pegging scenarios</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
