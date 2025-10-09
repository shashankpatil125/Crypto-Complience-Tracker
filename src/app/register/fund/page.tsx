'use client';

import NavbarComponent from '@/components/common/Navbar';
import { useState } from 'react';

export default function CryptoFundRegistration() {
  const [activeTab, setActiveTab] = useState('form');
  const [expandedSections, setExpandedSections] = useState<string[]>(['basic']);
  const [formData, setFormData] = useState({
    // Basic Information
    fundName: '',
    legalEntityType: '',
    jurisdiction: '',
    websiteUrl: '',
    contactPhone: '',
    fundType: '',
    registrationNumber: '',
    incorporationDate: '',
    contactEmail: '',
    
    // Fund Details
    assetsUnderManagement: '',
    minimumInvestment: '',
    targetReturns: '',
    performanceFee: '',
    fundCurrency: 'USD',
    redemptionTerms: '',
    managementFee: '',
    
    // Investment Strategy
    strategyDescription: '',
    bitcoinAllocation: '0',
    ethereumAllocation: '0',
    otherL1sAllocation: '0',
    defiAllocation: '0',
    nftsAllocation: '0',
    stablecoinsAllocation: '0',
    otherAllocation: '0',
    
    // Risk Profile & Custody
    riskLevel: '',
    volatilityTarget: '',
    maxDrawdown: '',
    riskManagementPractices: '',
    custodianName: '',
    jurisdictionOfCustody: '',
    insuranceDetails: '',
    coldStorage: false,
    
    // Compliance & Regulatory
    valuationMethodology: '',
    valuationFrequency: 'Daily',
    thirdPartyValuation: false,
    kycProvider: '',
    ongoingMonitoring: false,
    travelRuleCompliance: false,
    regulatoryLicenses: '',
    
    // Service Providers & Restrictions
    fundAdministrator: '',
    auditor: '',
    legalCounsel: '',
    taxAdvisor: '',
    restrictedCountries: '',
    additionalInvestorRestrictions: ''
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

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
    alert('Crypto Fund Registration submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarComponent />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Crypto Fund Registration</h1>
          <p className="text-lg text-gray-600">
            Register your crypto fund for regulatory compliance tracking and attestation services
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
        </div>

        {activeTab === 'form' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() => toggleSection('basic')}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    expandedSections.includes('basic') ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedSections.includes('basic') && (
                <div className="px-6 pb-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fund Name *
                      </label>
                      <input
                        type="text"
                        name="fundName"
                        value={formData.fundName}
                        onChange={handleInputChange}
                        placeholder="Enter fund name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fund Type *
                      </label>
                      <select
                        name="fundType"
                        value={formData.fundType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      >
                        <option value="">Select fund type</option>
                        <option value="hedge">Hedge Fund</option>
                        <option value="venture">Venture Capital</option>
                        <option value="private-equity">Private Equity</option>
                        <option value="mutual">Mutual Fund</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Legal Entity Type *
                      </label>
                      <select
                        name="legalEntityType"
                        value={formData.legalEntityType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      >
                        <option value="">Select entity type</option>
                        <option value="lp">Limited Partnership (LP)</option>
                        <option value="llc">Limited Liability Company (LLC)</option>
                        <option value="corporation">Corporation</option>
                        <option value="trust">Trust</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Registration Number *
                      </label>
                      <input
                        type="text"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleInputChange}
                        placeholder="Enter registration number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jurisdiction *
                      </label>
                      <select
                        name="jurisdiction"
                        value={formData.jurisdiction}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      >
                        <option value="">Select jurisdiction</option>
                        <option value="cayman">Cayman Islands</option>
                        <option value="switzerland">Switzerland</option>
                        <option value="singapore">Singapore</option>
                        <option value="usa">United States</option>
                        <option value="uk">United Kingdom</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Incorporation Date
                      </label>
                      <input
                        type="date"
                        name="incorporationDate"
                        value={formData.incorporationDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
                        placeholder="https://www.example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Email *
                      </label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        placeholder="contact@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fund Details */}
            <div className="bg-white rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() => toggleSection('fund-details')}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <h3 className="text-lg font-semibold text-gray-900">Fund Details</h3>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    expandedSections.includes('fund-details') ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedSections.includes('fund-details') && (
                <div className="px-6 pb-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Assets Under Management (USD)
                      </label>
                      <input
                        type="text"
                        name="assetsUnderManagement"
                        value={formData.assetsUnderManagement}
                        onChange={handleInputChange}
                        placeholder="e.g., 10,000,000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fund Currency
                      </label>
                      <select
                        name="fundCurrency"
                        value={formData.fundCurrency}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="CHF">CHF</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Investment
                      </label>
                      <input
                        type="text"
                        name="minimumInvestment"
                        value={formData.minimumInvestment}
                        onChange={handleInputChange}
                        placeholder="e.g., 100,000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Redemption Terms
                      </label>
                      <input
                        type="text"
                        name="redemptionTerms"
                        value={formData.redemptionTerms}
                        onChange={handleInputChange}
                        placeholder="e.g., Monthly with 30 days notice"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target Returns (% per annum)
                      </label>
                      <input
                        type="text"
                        name="targetReturns"
                        value={formData.targetReturns}
                        onChange={handleInputChange}
                        placeholder="e.g., 15-20%"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Management Fee (%)
                      </label>
                      <input
                        type="text"
                        name="managementFee"
                        value={formData.managementFee}
                        onChange={handleInputChange}
                        placeholder="e.g., 2%"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Performance Fee (%)
                      </label>
                      <input
                        type="text"
                        name="performanceFee"
                        value={formData.performanceFee}
                        onChange={handleInputChange}
                        placeholder="e.g., 20%"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Investment Strategy & Asset Allocation */}
            <div className="bg-white rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() => toggleSection('investment')}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <h3 className="text-lg font-semibold text-gray-900">Investment Strategy & Asset Allocation</h3>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    expandedSections.includes('investment') ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedSections.includes('investment') && (
                <div className="px-6 pb-6 border-t border-gray-200">
                  <div className="pt-6 space-y-6">
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-2">Investment Strategy</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Describe the fund's approach to crypto investing, strategies employed, and primary focus areas
                      </p>
                      <textarea
                        name="strategyDescription"
                        value={formData.strategyDescription}
                        onChange={handleInputChange}
                        placeholder="Describe your fund's investment strategy"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-2">Asset Allocation (%)</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Indicate the target allocation percentages across crypto assets (totaling 100%)
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Bitcoin (%)</label>
                          <input
                            type="number"
                            name="bitcoinAllocation"
                            value={formData.bitcoinAllocation}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Ethereum (%)</label>
                          <input
                            type="number"
                            name="ethereumAllocation"
                            value={formData.ethereumAllocation}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Other L1s (%)</label>
                          <input
                            type="number"
                            name="otherL1sAllocation"
                            value={formData.otherL1sAllocation}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">DeFi (%)</label>
                          <input
                            type="number"
                            name="defiAllocation"
                            value={formData.defiAllocation}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">NFTs (%)</label>
                          <input
                            type="number"
                            name="nftsAllocation"
                            value={formData.nftsAllocation}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Stablecoins (%)</label>
                          <input
                            type="number"
                            name="stablecoinsAllocation"
                            value={formData.stablecoinsAllocation}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Other (%)</label>
                          <input
                            type="number"
                            name="otherAllocation"
                            value={formData.otherAllocation}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Risk Profile & Custody */}
            <div className="bg-white rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() => toggleSection('risk')}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <h3 className="text-lg font-semibold text-gray-900">Risk Profile & Custody</h3>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    expandedSections.includes('risk') ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedSections.includes('risk') && (
                <div className="px-6 pb-6 border-t border-gray-200">
                  <div className="pt-6 space-y-6">
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Risk Profile</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
                          <select
                            name="riskLevel"
                            value={formData.riskLevel}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          >
                            <option value="">Select risk level</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Volatility Target (%)</label>
                          <input
                            type="text"
                            name="volatilityTarget"
                            value={formData.volatilityTarget}
                            onChange={handleInputChange}
                            placeholder="e.g., 20%"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Max Drawdown (%)</label>
                          <input
                            type="text"
                            name="maxDrawdown"
                            value={formData.maxDrawdown}
                            onChange={handleInputChange}
                            placeholder="e.g., 30%"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Risk Management Practices</label>
                          <textarea
                            name="riskManagementPractices"
                            value={formData.riskManagementPractices}
                            onChange={handleInputChange}
                            placeholder="Describe your risk management approach"
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Custody Arrangements</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Custodian Name</label>
                          <input
                            type="text"
                            name="custodianName"
                            value={formData.custodianName}
                            onChange={handleInputChange}
                            placeholder="e.g., Coinbase Custody, BitGo"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Jurisdiction of Custody</label>
                          <input
                            type="text"
                            name="jurisdictionOfCustody"
                            value={formData.jurisdictionOfCustody}
                            onChange={handleInputChange}
                            placeholder="e.g., United States"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Details</label>
                          <textarea
                            name="insuranceDetails"
                            value={formData.insuranceDetails}
                            onChange={handleInputChange}
                            placeholder="Describe insurance coverage"
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              name="coldStorage"
                              checked={formData.coldStorage}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Cold Storage</span>
                          </label>
                          <p className="text-sm text-gray-500 mt-1">The majority of assets are stored in cold wallets</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Compliance & Regulatory */}
            <div className="bg-white rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() => toggleSection('compliance')}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <h3 className="text-lg font-semibold text-gray-900">Compliance & Regulatory</h3>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    expandedSections.includes('compliance') ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedSections.includes('compliance') && (
                <div className="px-6 pb-6 border-t border-gray-200">
                  <div className="pt-6 space-y-6">
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Valuation Methods</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Valuation Methodology</label>
                          <textarea
                            name="valuationMethodology"
                            value={formData.valuationMethodology}
                            onChange={handleInputChange}
                            placeholder="Describe how assets are valued"
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Valuation Frequency</label>
                          <select
                            name="valuationFrequency"
                            value={formData.valuationFrequency}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                          </select>
                        </div>
                        <div>
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              name="thirdPartyValuation"
                              checked={formData.thirdPartyValuation}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Third-Party Valuation</span>
                          </label>
                          <p className="text-sm text-gray-500 mt-1">Fund uses independent third-party for asset valuation</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-4">AML/KYC Procedures</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">KYC Provider/Solution</label>
                          <input
                            type="text"
                            name="kycProvider"
                            value={formData.kycProvider}
                            onChange={handleInputChange}
                            placeholder="e.g., Chainalysis KYT, Elliptic"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              name="ongoingMonitoring"
                              checked={formData.ongoingMonitoring}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Ongoing Monitoring</span>
                          </label>
                          <p className="text-sm text-gray-500 mt-1">We conduct ongoing transaction monitoring</p>
                        </div>
                        <div>
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              name="travelRuleCompliance"
                              checked={formData.travelRuleCompliance}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Travel Rule Compliance</span>
                          </label>
                          <p className="text-sm text-gray-500 mt-1">We comply with FATF Travel Rule</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-2">Regulatory Licenses & Registrations</h4>
                      <p className="text-sm text-gray-600 mb-4">List all licenses and registrations held by the fund</p>
                      <input
                        type="text"
                        name="regulatoryLicenses"
                        value={formData.regulatoryLicenses}
                        onChange={handleInputChange}
                        placeholder="e.g., SEC Registered Investment Advisor, CFTC Commodity Pool Operator"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Service Providers & Restrictions */}
            <div className="bg-white rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() => toggleSection('service-providers')}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <h3 className="text-lg font-semibold text-gray-900">Service Providers & Restrictions</h3>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    expandedSections.includes('service-providers') ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedSections.includes('service-providers') && (
                <div className="px-6 pb-6 border-t border-gray-200">
                  <div className="pt-6 space-y-6">
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Service Providers</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Fund Administrator</label>
                          <input
                            type="text"
                            name="fundAdministrator"
                            value={formData.fundAdministrator}
                            onChange={handleInputChange}
                            placeholder="e.g., Apex Fund Services"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Auditor</label>
                          <input
                            type="text"
                            name="auditor"
                            value={formData.auditor}
                            onChange={handleInputChange}
                            placeholder="e.g., Deloitte, PwC"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Legal Counsel</label>
                          <input
                            type="text"
                            name="legalCounsel"
                            value={formData.legalCounsel}
                            onChange={handleInputChange}
                            placeholder="e.g., Cooley LLP"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Tax Advisor</label>
                          <input
                            type="text"
                            name="taxAdvisor"
                            value={formData.taxAdvisor}
                            onChange={handleInputChange}
                            placeholder="e.g., KPMG"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-2">Restricted Countries</h4>
                      <p className="text-sm text-gray-600 mb-4">List countries where the fund cannot accept investors (one per line)</p>
                      <textarea
                        name="restrictedCountries"
                        value={formData.restrictedCountries}
                        onChange={handleInputChange}
                        placeholder="e.g., North Korea, Iran, Cuba"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-2">Additional Investor Restrictions</h4>
                      <textarea
                        name="additionalInvestorRestrictions"
                        value={formData.additionalInvestorRestrictions}
                        onChange={handleInputChange}
                        placeholder="e.g., Accredited Investors Only, Qualified Purchasers Only"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Section */}
            <div className="flex items-center justify-between pt-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Fields marked with * are required</span>
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Register Crypto Fund
              </button>
            </div>
          </form>
        ) : (
          /* Regulatory Guidance Tab */
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Crypto Fund Regulatory Guidance</h2>
            <p className="text-gray-600 mb-8">Key information for crypto fund managers about compliance requirements</p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Regulatory Considerations</h3>
                <p className="text-gray-600 mb-4">
                  Depending on your fund's jurisdiction, strategy, and investor base, there are several regulatory frameworks that may apply:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Securities regulations for tokenized assets</li>
                  <li>Investment advisor/manager registration requirements</li>
                  <li>AML/KYC compliance for investor onboarding</li>
                  <li>Custody and safekeeping of crypto assets</li>
                  <li>Tax reporting obligations for crypto trades and gains</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Fund Jurisdictions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Cayman Islands</h4>
                    <p className="text-sm text-gray-600">Popular for offshore funds, with the CIMA's virtual asset service provider (VASP) regime</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Switzerland</h4>
                    <p className="text-sm text-gray-600">Clear regulatory framework via FINMA with favorable crypto taxation</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Singapore</h4>
                    <p className="text-sm text-gray-600">MAS licensing for fund managers, with clear guidelines for digital assets</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">United States</h4>
                    <p className="text-sm text-gray-600">SEC/CFTC oversight with various exemptions available for private funds</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Documentation Requirements</h3>
                <p className="text-gray-600 mb-4">
                  The following documentation is generally required for crypto fund formation and compliance:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Fund formation documents (LPA, Operating Agreement)</li>
                  <li>Private Placement Memorandum (PPM)</li>
                  <li>Subscription agreements</li>
                  <li>AML/KYC procedures manual</li>
                  <li>Custody and security policy</li>
                  <li>Valuation policy</li>
                  <li>Risk disclosure documents</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
