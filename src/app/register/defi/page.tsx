'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavbarComponent from '@/components/common/Navbar';

export default function DeFiProtocolRegistrationPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    protocolName: '',
    websiteUrl: '',
    supportedTokens: '',
    protocolType: 'Lending Protocol',
    smartContractAddresses: '',
    blockchainNetworks: ''
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Auto-save to localStorage
    const updatedData = {
      ...formData,
      [name]: value
    };
    localStorage.setItem('defiFormData', JSON.stringify(updatedData));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.protocolName.trim()) newErrors.protocolName = 'Protocol name is required';
    if (!formData.websiteUrl.trim()) newErrors.websiteUrl = 'Website URL is required';
    else if (!/^https?:\/\/.+/.test(formData.websiteUrl)) {
      newErrors.websiteUrl = 'Please enter a valid URL';
    }
    if (!formData.protocolType) newErrors.protocolType = 'Protocol type is required';
    if (!formData.smartContractAddresses.trim()) newErrors.smartContractAddresses = 'Smart contract addresses are required';
    if (!formData.blockchainNetworks.trim()) newErrors.blockchainNetworks = 'Blockchain networks are required';
    
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
        console.log('DeFi Protocol registration submitted:', formData);
        localStorage.removeItem('defiFormData');
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
      protocolName: '',
      websiteUrl: '',
      supportedTokens: '',
      protocolType: 'Lending Protocol',
      smartContractAddresses: '',
      blockchainNetworks: ''
    });
    setErrors({});
    localStorage.removeItem('defiFormData');
  };

  // Load saved data on component mount
  React.useEffect(() => {
    const savedData = localStorage.getItem('defiFormData');
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">DeFi Protocol Registration</h1>
          <p className="text-gray-600">
            Register your decentralized finance protocol for regulatory compliance tracking and monitoring.
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Protocol Name *</label>
                  <input
                    type="text"
                    name="protocolName"
                    value={formData.protocolName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900 ${
                      errors.protocolName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter protocol name"
                  />
                  {errors.protocolName && (
                    <p className="text-xs text-red-500 mt-1">{errors.protocolName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website URL *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-sm">https://</span>
                    </div>
                    <input
                      type="text"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                      className={`w-full pl-16 pr-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900 ${
                        errors.websiteUrl ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="www.example.com"
                    />
                  </div>
                  {errors.websiteUrl && (
                    <p className="text-xs text-red-500 mt-1">{errors.websiteUrl}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Supported Tokens</label>
                  <textarea
                    name="supportedTokens"
                    value={formData.supportedTokens}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900 resize-none"
                    placeholder="Enter supported tokens (one per line)"
                  />
                  <p className="text-xs text-gray-500 mt-1">List all tokens supported by your protocol</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Protocol Type *</label>
                  <select
                    name="protocolType"
                    value={formData.protocolType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                      errors.protocolType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="Lending Protocol">Lending Protocol</option>
                    <option value="DEX Protocol">DEX Protocol</option>
                    <option value="Yield Farming">Yield Farming</option>
                    <option value="Staking Protocol">Staking Protocol</option>
                    <option value="Insurance Protocol">Insurance Protocol</option>
                    <option value="Derivatives Protocol">Derivatives Protocol</option>
                    <option value="Asset Management">Asset Management</option>
                    <option value="Cross-chain Bridge">Cross-chain Bridge</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.protocolType && (
                    <p className="text-xs text-red-500 mt-1">{errors.protocolType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Smart Contract Addresses *</label>
                  <textarea
                    name="smartContractAddresses"
                    value={formData.smartContractAddresses}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900 resize-none ${
                      errors.smartContractAddresses ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter smart contract addresses (one per line)"
                  />
                  {errors.smartContractAddresses && (
                    <p className="text-xs text-red-500 mt-1">{errors.smartContractAddresses}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">List all deployed smart contract addresses</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blockchain Networks *</label>
                  <textarea
                    name="blockchainNetworks"
                    value={formData.blockchainNetworks}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900 resize-none ${
                      errors.blockchainNetworks ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter supported blockchain networks (one per line)"
                  />
                  {errors.blockchainNetworks && (
                    <p className="text-xs text-red-500 mt-1">{errors.blockchainNetworks}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">List all blockchain networks where your protocol operates</p>
                </div>
              </div>
            </div>

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
                <span>{isSubmitting ? 'Submitting...' : 'Register DeFi Protocol'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
