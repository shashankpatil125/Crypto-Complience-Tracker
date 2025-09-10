'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ExchangeRegistrationPage() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['general']);
  const [formData, setFormData] = useState({
    // General Information
    exchangeName: '',
    legalEntityName: '',
    businessRegistrationNumber: '',
    headquartersLocation: '',
    websiteUrl: '',
    yearEstablished: '',
    exchangeType: 'Centralized (CEX)',
    
    // Compliance Contact
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    
    // Security & Risk Management
    automatedBotDetection: false,
    spoofingDetection: false,
    
    // Custody & Storage
    coldStoragePercentage: 0,
    hotWalletPercentage: 0,
    userFundSegregation: false,
    
    // Sanctions Compliance
    ofacCompliant: false,
    fatfCompliant: false,
    euSanctionsCompliant: false
  });
  const router = useRouter();

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Exchange registration submitted:', formData);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <span className="text-2xl font-bold text-gray-800">DARA</span>
            <div className="flex items-center space-x-6">
              <button className="text-gray-700 hover:text-gray-900 transition-colors">Dashboard</button>
              <div className="relative">
                <button className="flex items-center text-gray-700 hover:text-gray-900 transition-colors">
                  Register
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <div className="relative">
                <button className="flex items-center text-gray-700 hover:text-gray-900 transition-colors">
                  Compliance
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <div className="relative">
                <button className="flex items-center text-gray-700 hover:text-gray-900 transition-colors">
                  Jurisdictions
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Connect Wallet
            </button>
            <button className="text-gray-700 hover:text-gray-900 transition-colors">Logout</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Exchange Registration</h1>
        
        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Exchange Registration</h2>
            <p className="text-gray-600">
              Please provide detailed information about your cryptocurrency exchange. Fields will be validated as you type.
            </p>
          </div>

          {/* Connect Wallet Section */}
          <div className="mb-8">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium">
              Connect Wallet
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Connect your wallet to create an on-chain attestation of your registration
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Information */}
            <div className="border border-gray-200 rounded-lg">
              <button
                type="button"
                onClick={() => toggleSection('general')}
                className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
              >
                <span className="font-semibold text-gray-900">General Information</span>
                <svg 
                  className={`w-5 h-5 transition-transform ${expandedSections.includes('general') ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections.includes('general') && (
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Exchange Name</label>
                      <input
                        type="text"
                        name="exchangeName"
                        value={formData.exchangeName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                        placeholder="Enter exchange name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Legal Entity Name</label>
                      <input
                        type="text"
                        name="legalEntityName"
                        value={formData.legalEntityName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                        placeholder="Enter legal entity name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Registration Number</label>
                      <input
                        type="text"
                        name="businessRegistrationNumber"
                        value={formData.businessRegistrationNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                        placeholder="Enter registration number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Headquarters Location</label>
                      <input
                        type="text"
                        name="headquartersLocation"
                        value={formData.headquartersLocation}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                        placeholder="Country, City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                      <input
                        type="url"
                        name="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                        placeholder="https://"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Year Established</label>
                      <input
                        type="text"
                        name="yearEstablished"
                        value={formData.yearEstablished}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                        placeholder="YYYY"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Exchange Type</label>
                    <select
                      name="exchangeType"
                      value={formData.exchangeType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    >
                      <option value="Centralized (CEX)">Centralized (CEX)</option>
                      <option value="Decentralized (DEX)">Decentralized (DEX)</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Compliance Contact */}
            <div className="border border-gray-200 rounded-lg">
              <button
                type="button"
                onClick={() => toggleSection('compliance')}
                className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
              >
                <span className="font-semibold text-gray-900">Compliance Contact</span>
                <svg 
                  className={`w-5 h-5 transition-transform ${expandedSections.includes('compliance') ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections.includes('compliance') && (
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                        placeholder="Enter contact name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                        placeholder="Enter contact email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                        placeholder="Enter contact phone"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Security & Risk Management */}
            <div className="border border-gray-200 rounded-lg">
              <button
                type="button"
                onClick={() => toggleSection('security')}
                className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
              >
                <span className="font-semibold text-gray-900">Security & Risk Management</span>
                <svg 
                  className={`w-5 h-5 transition-transform ${expandedSections.includes('security') ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections.includes('security') && (
                <div className="p-6 space-y-4">
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="automatedBotDetection"
                        checked={formData.automatedBotDetection}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700">Automated Bot Detection System</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="spoofingDetection"
                        checked={formData.spoofingDetection}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700">Spoofing Detection Algorithms</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Custody & Storage */}
            <div className="border border-gray-200 rounded-lg">
              <button
                type="button"
                onClick={() => toggleSection('custody')}
                className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
              >
                <span className="font-semibold text-gray-900">Custody & Storage</span>
                <svg 
                  className={`w-5 h-5 transition-transform ${expandedSections.includes('custody') ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections.includes('custody') && (
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cold Storage Percentage</label>
                      <input
                        type="number"
                        name="coldStoragePercentage"
                        value={formData.coldStoragePercentage}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                        placeholder="0"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hot Wallet Percentage</label>
                      <input
                        type="number"
                        name="hotWalletPercentage"
                        value={formData.hotWalletPercentage}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder-gray-600 text-gray-900"
                        placeholder="0"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="userFundSegregation"
                        checked={formData.userFundSegregation}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700">User Fund Segregation</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Sanctions Compliance */}
            <div className="border border-gray-200 rounded-lg">
              <button
                type="button"
                onClick={() => toggleSection('sanctions')}
                className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
              >
                <span className="font-semibold text-gray-900">Sanctions Compliance</span>
                <svg 
                  className={`w-5 h-5 transition-transform ${expandedSections.includes('sanctions') ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSections.includes('sanctions') && (
                <div className="p-6 space-y-4">
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="ofacCompliant"
                        checked={formData.ofacCompliant}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700">OFAC Compliant</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="fatfCompliant"
                        checked={formData.fatfCompliant}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700">FATF Compliant</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="euSanctionsCompliant"
                        checked={formData.euSanctionsCompliant}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700">EU Sanctions Compliant</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-4 px-6 rounded-md hover:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium text-lg"
              >
                Submit Registration
              </button>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Connect your wallet to submit registration
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
