'use client';

import { useState } from 'react';
import NavbarComponent from '@/components/common/Navbar';

export default function NFTMarketplaceRegistration() {
  const [activeTab, setActiveTab] = useState('form');
  const [formData, setFormData] = useState({
    marketplaceName: '',
    businessEntityName: '',
    websiteUrl: '',
    supportedBlockchainNetworks: '',
    supportedNftStandards: '',
    jurisdiction: '',
    businessType: '',
    contactEmail: '',
    contactPhone: '',
    foundedDate: '',
    description: '',
    kycProvider: '',
    amlCompliance: false,
    ipProtection: false,
    consumerProtection: false,
    dataProtection: false,
    termsOfService: '',
    privacyPolicy: '',
    disputeResolution: '',
    feeStructure: '',
    escrowServices: false,
    fraudPrevention: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('NFT Marketplace Registration submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarComponent />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">NFT Marketplace Registration</h1>
          <p className="text-lg text-gray-600">
            Register your NFT marketplace for regulatory compliance tracking and attestation services
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'form'
                ? 'text-gray-900 border-b-2 border-blue-600 bg-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Registration Form
          </button>
          <button
            onClick={() => setActiveTab('guidance')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'guidance'
                ? 'text-gray-900 border-b-2 border-blue-600 bg-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Regulatory Guidance
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'checklist'
                ? 'text-gray-900 border-b-2 border-blue-600 bg-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Compliance Checklist
          </button>
        </div>

        {activeTab === 'form' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Important Information Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-sm font-semibold text-blue-900 mb-1">Important Information</h3>
                  <p className="text-sm text-blue-800">
                    This registration form collects essential information about your NFT marketplace for regulatory compliance analysis. Complete all required fields and provide accurate information.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marketplace Name *
                    </label>
                    <input
                      type="text"
                      name="marketplaceName"
                      value={formData.marketplaceName}
                      onChange={handleInputChange}
                      placeholder="Enter marketplace name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-500 text-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website URL *
                    </label>
                    <input
                      type="url"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                      placeholder="https://"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-500 text-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supported Blockchain Networks *
                    </label>
                    <textarea
                      name="supportedBlockchainNetworks"
                      value={formData.supportedBlockchainNetworks}
                      onChange={handleInputChange}
                      placeholder="Enter supported blockchain networks (one per line)"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-500 text-gray-900"
                      required
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Entity Name *
                    </label>
                    <input
                      type="text"
                      name="businessEntityName"
                      value={formData.businessEntityName}
                      onChange={handleInputChange}
                      placeholder="Enter legal business name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-500 text-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supported NFT Standards *
                    </label>
                    <textarea
                      name="supportedNftStandards"
                      value={formData.supportedNftStandards}
                      onChange={handleInputChange}
                      placeholder="Enter supported NFT standards (e.g., ERC-721, ERC-1155)"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-500 text-gray-900"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Register NFT Marketplace
                </button>
              </div>
            </div>
          </form>
        )}

        {activeTab === 'guidance' && (
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">NFT Marketplace Regulatory Guidance</h2>
            <p className="text-gray-600 mb-8">Key compliance considerations for NFT marketplaces and platforms</p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Regulatory Considerations</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Marketplace operator licensing requirements</li>
                  <li>Securities law applicability for certain NFT types</li>
                  <li>Intellectual property rights and protections</li>
                  <li>AML/KYC requirements for high-value transactions</li>
                  <li>Consumer protection for marketplace users</li>
                  <li>Data privacy and protection regulations</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Jurisdiction-Specific Regulations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">European Union</h4>
                    <p className="text-sm text-gray-600">MiCA, GDPR, and Digital Services Act requirements for NFT platforms</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">United States</h4>
                    <p className="text-sm text-gray-600">SEC/CFTC oversight, state-by-state regulatory frameworks</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">United Kingdom</h4>
                    <p className="text-sm text-gray-600">FCA guidance on cryptoassets, including NFTs with investment characteristics</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Singapore</h4>
                    <p className="text-sm text-gray-600">MAS licensing requirements based on NFT functionality</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Updated Guidance</h3>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">FATF Updated Guidance on NFTs</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        FATF has updated its guidance to clarify that certain NFTs which enable transfer or investment functions may be treated as Virtual Assets, requiring enhanced AML/KYC measures by marketplaces.
                      </p>
                      <p className="text-xs text-gray-500">Updated June 2024</p>
                    </div>
                    <a
                      href="#"
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <span>Read More</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Disclaimer:</strong> This information is for guidance only and should not be considered legal advice. Regulations are subject to change. Consult with qualified legal counsel in your jurisdiction.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">NFT Marketplace Compliance Checklist</h2>
            <p className="text-gray-600 mb-8">Essential compliance requirements for NFT marketplaces</p>
            
            <div className="space-y-6">
              {/* AML/KYC Program */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">AML/KYC Program</h3>
                    <p className="text-gray-600 mb-4">Implement appropriate customer due diligence procedures</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Customer identification procedures</li>
                      <li>Transaction monitoring systems</li>
                      <li>Risk-based approach to verification</li>
                      <li>High-value transaction reporting</li>
                    </ul>
                  </div>
                  <button className="ml-4 p-2 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Intellectual Property Rights */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Intellectual Property Rights</h3>
                    <p className="text-gray-600 mb-4">Ensure proper protection of creator and collector rights</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Creator verification process</li>
                      <li>Copyright/trademark infringement procedures</li>
                      <li>IP ownership documentation</li>
                      <li>Royalty and resale rights enforcement</li>
                    </ul>
                  </div>
                  <button className="ml-4 p-2 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Consumer Protection Measures */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Consumer Protection Measures</h3>
                    <p className="text-gray-600 mb-4">Protect marketplace users with appropriate safeguards</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Clear terms of service and privacy policy</li>
                      <li>Transparent fee structures</li>
                      <li>Dispute resolution procedures</li>
                      <li>Escrow services for high-value transactions</li>
                      <li>Fraud prevention mechanisms</li>
                    </ul>
                  </div>
                  <button className="ml-4 p-2 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Data Protection Compliance */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Protection Compliance</h3>
                    <p className="text-gray-600 mb-4">Ensure compliance with relevant data privacy laws</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>User data collection limitations</li>
                      <li>Data subject access rights</li>
                      <li>Breach notification procedures</li>
                      <li>Data retention policies</li>
                    </ul>
                  </div>
                  <button className="ml-4 p-2 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
