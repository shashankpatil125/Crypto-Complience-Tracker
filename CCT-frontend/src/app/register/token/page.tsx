'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavbarComponent from '@/components/common/Navbar';

// API Response Types
interface TokenRegistrationResponse {
    success: boolean;
    message?: string;
    data?: {
        _id: string;
        tokenName: string;
        tokenSymbol: string;
        tokenCategory: string;
        status: string;
        createdAt: string;
        [key: string]: unknown;
    };
    error?: string;
}

export default function TokenRegistrationPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    // API Base URL - use real backend API
    const API_BASE_URL = 'http://localhost:3001/api';

    const [formData, setFormData] = useState({
        tokenName: '',
        tokenSymbol: '',
        tokenCategory: 'UTILITY',
        tokenType: '',
        description: '',
        issuerName: '',
        legalEntityName: '',
        websiteUrl: '',
        whitepaperUrl: '',
        blockchainNetworks: [{ networkName: '', chainId: '' }],
        contractAddresses: [{ network: '', contractAddress: '' }],
        tokenStandard: '',
        totalSupply: '',
        regulatoryStatus: '',
        complianceContacts: [{ name: '', email: '', role: '' }],
        kycRequirements: '',
        transferRestrictions: '',
        amlPolicyUrl: '',
        usesWhitelist: false,
        lastSecurityAuditDate: ''
    });

    const tokenCategories = [
        { value: 'UTILITY', label: 'UTILITY' },
        { value: 'SECURITY', label: 'SECURITY' },
        { value: 'PAYMENT', label: 'PAYMENT' },
        { value: 'GOVERNANCE', label: 'GOVERNANCE' },
        { value: 'NFT', label: 'NFT' },
        { value: 'STABLECOIN', label: 'STABLECOIN' }
    ];

    const tokenTypes = {
        UTILITY: [
            { value: 'REWARD', label: 'Reward Token' },
            { value: 'ACCESS', label: 'Access Token' },
            { value: 'GAMING', label: 'Gaming Token' },
            { value: 'LOYALTY', label: 'Loyalty Token' }
        ],
        SECURITY: [
            { value: 'EQUITY', label: 'Equity Token' },
            { value: 'DEBT', label: 'Debt Token' },
            { value: 'REAL_ESTATE', label: 'Real Estate Token' },
            { value: 'COMMODITY', label: 'Commodity Token' }
        ],
        PAYMENT: [
            { value: 'CURRENCY', label: 'Currency Token' },
            { value: 'SETTLEMENT', label: 'Settlement Token' },
            { value: 'CROSS_BORDER', label: 'Cross-Border Payment Token' }
        ],
        GOVERNANCE: [
            { value: 'VOTING', label: 'Voting Token' },
            { value: 'PROPOSAL', label: 'Proposal Token' },
            { value: 'STAKE', label: 'Staking Token' }
        ],
        NFT: [
            { value: 'COLLECTIBLE', label: 'Collectible NFT' },
            { value: 'ART', label: 'Art NFT' },
            { value: 'GAMING', label: 'Gaming NFT' },
            { value: 'REAL_ESTATE', label: 'Real Estate NFT' }
        ],
        STABLECOIN: [
            { value: 'FIAT_COLLATERALIZED', label: 'Fiat-Collateralized' },
            { value: 'CRYPTO_COLLATERALIZED', label: 'Crypto-Collateralized' },
            { value: 'ALGORITHMIC', label: 'Algorithmic' }
        ]
    };

    const blockchainNetworks = [
        { name: "Ethereum Mainnet", chainId: "1" },
        { name: "Ethereum Sepolia", chainId: "11155111" },
        { name: "Polygon", chainId: "137" },
        { name: "Binance Smart Chain", chainId: "56" },
        { name: "Avalanche C-Chain", chainId: "43114" }
    ];

    const tokenStandards = [
        { value: 'ERC-20', label: 'ERC-20' },
        { value: 'ERC-721', label: 'ERC-721' },
        { value: 'ERC-777', label: 'ERC-777' },
        { value: 'ERC-1155', label: 'ERC-1155' },
        { value: 'BEP-20', label: 'BEP-20' },
        { value: 'SPL', label: 'SPL' }
    ];

    const regulatoryStatusOptions = [
        { value: 'Registered Security', label: 'Registered Security' },
        { value: 'Exempt Security', label: 'Exempt Security' },
        { value: 'Utility Token', label: 'Utility Token' },
        { value: 'Payment Token', label: 'Payment Token' },
        { value: 'Regulatory Sandbox', label: 'Regulatory Sandbox' },
        { value: 'Pending Review', label: 'Pending Review' },
        { value: 'Not Applicable', label: 'Not Applicable' }
    ];

    const handleInputChange = (field: string, value: string | boolean | Array<{ networkName: string; chainId: string }> | Array<{ network: string; contractAddress: string }> | Array<{ name: string; email: string; role: string }>) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const addBlockchainNetwork = () => {
        setFormData(prev => ({
            ...prev,
            blockchainNetworks: [...prev.blockchainNetworks, { networkName: '', chainId: '' }]
        }));
    };

    const updateBlockchainNetwork = (index: number, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            blockchainNetworks: prev.blockchainNetworks.map((network, i) => 
                i === index ? { ...network, [field]: value } : network
            )
        }));
    };

    const removeBlockchainNetwork = (index: number) => {
        setFormData(prev => ({
            ...prev,
            blockchainNetworks: prev.blockchainNetworks.filter((_, i) => i !== index)
        }));
    };

    const addContractAddress = () => {
        setFormData(prev => ({
            ...prev,
            contractAddresses: [...prev.contractAddresses, { network: '', contractAddress: '' }]
        }));
    };

    const updateContractAddress = (index: number, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            contractAddresses: prev.contractAddresses.map((contract, i) => 
                i === index ? { ...contract, [field]: value } : contract
            )
        }));
    };

    const removeContractAddress = (index: number) => {
        setFormData(prev => ({
            ...prev,
            contractAddresses: prev.contractAddresses.filter((_, i) => i !== index)
        }));
    };

    const addComplianceContact = () => {
        setFormData(prev => ({
            ...prev,
            complianceContacts: [...prev.complianceContacts, { name: '', email: '', role: '' }]
        }));
    };

    const updateComplianceContact = (index: number, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            complianceContacts: prev.complianceContacts.map((contact, i) => 
                i === index ? { ...contact, [field]: value } : contact
            )
        }));
    };

    const removeComplianceContact = (index: number) => {
        setFormData(prev => ({
            ...prev,
            complianceContacts: prev.complianceContacts.filter((_, i) => i !== index)
        }));
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess(false);

        try {
            // Get auth token from localStorage
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('Authentication required. Please login first.');
                setIsLoading(false);
                return;
            }

            // Basic form validation
            if (!formData.tokenName.trim()) {
                setError('Token name is required.');
                setIsLoading(false);
                return;
            }

            if (!formData.tokenSymbol.trim()) {
                setError('Token symbol is required.');
                setIsLoading(false);
                return;
            }

            if (!formData.description.trim()) {
                setError('Token description is required.');
                setIsLoading(false);
                return;
            }

            console.log('🚀 Submitting token registration...', formData);

            // Prepare data for API (map form data to API format)
            const apiData = {
                tokenName: String(formData.tokenName),
                tokenSymbol: String(formData.tokenSymbol),
                tokenCategory: String(formData.tokenCategory),
                tokenType: String(formData.tokenType),
                description: String(formData.description),
                issuerName: String(formData.issuerName),
                legalEntityName: String(formData.legalEntityName),
                websiteUrl: String(formData.websiteUrl),
                whitepaperUrl: formData.whitepaperUrl ? String(formData.whitepaperUrl) : undefined,
                blockchainNetworks: formData.blockchainNetworks.filter(network => 
                    network.networkName && network.chainId
                ).map(network => ({
                    networkName: String(network.networkName),
                    chainId: String(network.chainId)
                })),
                contractAddresses: formData.contractAddresses.filter(contract => 
                    contract.network && contract.contractAddress
                ).map(contract => ({
                    network: String(contract.network),
                    contractAddress: String(contract.contractAddress)
                })),
                tokenStandard: String(formData.tokenStandard),
                totalSupply: String(formData.totalSupply),
                regulatoryStatus: String(formData.regulatoryStatus),
                complianceContacts: formData.complianceContacts.filter(contact => 
                    contact.name && contact.email && contact.role
                ).map(contact => ({
                    name: String(contact.name),
                    email: String(contact.email),
                    role: String(contact.role)
                })),
                kycRequirements: String(formData.kycRequirements),
                transferRestrictions: String(formData.transferRestrictions),
                amlPolicyUrl: String(formData.amlPolicyUrl),
                usesWhitelist: Boolean(formData.usesWhitelist),
                lastSecurityAuditDate: String(formData.lastSecurityAuditDate)
            };

            console.log('📤 Sending data to API:', apiData);

            // Try the API call with timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

            const response = await fetch(`${API_BASE_URL}/tokens/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(apiData),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const textResponse = await response.text();
                console.error('❌ Non-JSON response received:', textResponse);
                
                // Try to parse as HTML and extract error message
                if (textResponse.includes('<!DOCTYPE') || textResponse.includes('<html')) {
                    setError(`Server returned HTML instead of JSON (${response.status}). This usually means the API endpoint doesn't exist or there's a server error.`);
                } else {
                    setError(`Server error: Received non-JSON response (${response.status}). Response: ${textResponse.substring(0, 200)}...`);
                }
                return;
            }

            let result: TokenRegistrationResponse;
            try {
                result = await response.json();
                console.log('📥 API Response:', result);
            } catch (parseError) {
                console.error('❌ JSON parsing error:', parseError);
                setError('Failed to parse server response. The server may be returning invalid JSON.');
                return;
            }

            if (result.success) {
                setSuccess(true);
                console.log('✅ Token registration submitted successfully!');
                
                // Show success message for 3 seconds, then redirect
                setTimeout(() => {
                    router.push('/dashboard');
                }, 3000);
            } else {
                setError(result.message || result.error || 'Failed to submit token registration');
                console.error('❌ Registration failed:', result.message || result.error);
            }
        } catch (error) {
            console.error('🌐 Error during registration:', error);
            
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    setError('Request timed out. Please check your connection and try again.');
                } else if (error instanceof SyntaxError && error.message.includes('JSON')) {
                    setError('Server returned invalid JSON response. Please try again or contact support.');
                } else if (error instanceof TypeError && error.message.includes('fetch')) {
                    setError('Network error. Please check your internet connection and try again.');
                } else if (error.message.includes('Failed to fetch')) {
                    setError('Cannot connect to server. Please ensure the application is running correctly.');
                } else {
                    setError(`Registration failed: ${error.message}`);
                }
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            tokenName: '',
            tokenSymbol: '',
            tokenCategory: 'UTILITY',
            tokenType: '',
            description: '',
            issuerName: '',
            legalEntityName: '',
            websiteUrl: '',
            whitepaperUrl: '',
            blockchainNetworks: [{ networkName: '', chainId: '' }],
            contractAddresses: [{ network: '', contractAddress: '' }],
            tokenStandard: '',
            totalSupply: '',
            regulatoryStatus: '',
            complianceContacts: [{ name: '', email: '', role: '' }],
            kycRequirements: '',
            transferRestrictions: '',
            amlPolicyUrl: '',
            usesWhitelist: false,
            lastSecurityAuditDate: ''
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <NavbarComponent selectedOption="token" />

            <div className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <h1 className="text-4xl font-bold text-gray-800 pb-8">
                    Register Your Token
                </h1>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-green-800">
                                    ✅ Token registration submitted successfully! Redirecting to dashboard...
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Form Card */}
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-6xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Token Registration Section */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-2xl font-bold text-black mb-3">Token Registration</h2>
                            <p className="text-gray-600 text-lg">
                                Register your token with comprehensive compliance information to ensure regulatory compliance across jurisdictions.
                            </p>
                        </div>

                        {/* Basic Token Information Section */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-black">Basic Token Information</h3>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-base font-medium text-gray-700 mb-2">
                                            Token Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.tokenName}
                                            onChange={(e) => handleInputChange('tokenName', e.target.value)}
                                            placeholder="Token Name"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800 placeholder-gray-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-base font-medium text-gray-700 mb-2">
                                            Token Category
                                        </label>
                                        <select
                                            value={formData.tokenCategory}
                                            onChange={(e) => handleInputChange('tokenCategory', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800"
                                        >
                                            {tokenCategories.map(category => (
                                                <option key={category.value} value={category.value}>
                                                    {category.label}
                                                </option>
                                            ))}
                                        </select>
                                        <p className="text-base text-gray-500 mt-2">
                                            Select the category that best describes your token
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-base font-medium text-gray-700 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            placeholder="Describe your token's purpose and functionality"
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base text-gray-800 placeholder-gray-500"
                                        />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-base font-medium text-gray-700 mb-2">
                                            Token Symbol
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.tokenSymbol}
                                            onChange={(e) => handleInputChange('tokenSymbol', e.target.value)}
                                            placeholder="Token Symbol"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800 placeholder-gray-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-base font-medium text-gray-700 mb-2">
                                            Token Type
                                        </label>
                                        <select
                                            value={formData.tokenType}
                                            onChange={(e) => handleInputChange('tokenType', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800"
                                        >
                                            <option value="">Select a token type</option>
                                            {tokenTypes[formData.tokenCategory as keyof typeof tokenTypes]?.map(type => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                        <p className="text-base text-gray-500 mt-2">
                                            Select the specific type within the chosen category
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Issuer Information Section */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-black">Issuer Information</h3>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-base font-medium text-gray-700 mb-2">
                                            Issuer Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.issuerName}
                                            onChange={(e) => handleInputChange('issuerName', e.target.value)}
                                            placeholder="Issuer Name"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800 placeholder-gray-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-base font-medium text-gray-700 mb-2">
                                            Website URL
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.websiteUrl}
                                            onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                                            placeholder="test or https://example.com"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800 placeholder-gray-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-base font-medium text-gray-700 mb-2">
                                            Legal Entity Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.legalEntityName}
                                            onChange={(e) => handleInputChange('legalEntityName', e.target.value)}
                                            placeholder="Legal Entity Name"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800 placeholder-gray-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-base font-medium text-gray-700 mb-2">
                                            Whitepaper URL (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.whitepaperUrl}
                                            onChange={(e) => handleInputChange('whitepaperUrl', e.target.value)}
                                            placeholder="test or https://example.com/whitepaper"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800 placeholder-gray-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Technical Information Section */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-black">Technical Information</h3>

                            {/* Blockchain Networks */}
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-800">Blockchain Networks</h4>
                                {formData.blockchainNetworks.map((network, index) => (
                                    <div key={index} className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Network Name
                                            </label>
                                            <select
                                                value={network.networkName}
                                                onChange={(e) => updateBlockchainNetwork(index, 'networkName', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800"
                                            >
                                                <option value="">Select a network</option>
                                                {blockchainNetworks.map(net => (
                                                    <option key={net.chainId} value={net.name}>
                                                        {net.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Chain ID
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={network.chainId}
                                                    onChange={(e) => updateBlockchainNetwork(index, 'chainId', e.target.value)}
                                                    placeholder="Chain ID"
                                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800 placeholder-gray-500"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => copyToClipboard(network.chainId)}
                                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        {formData.blockchainNetworks.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeBlockchainNetwork(index)}
                                                className="text-red-600 hover:text-red-800 text-sm"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addBlockchainNetwork}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    + Add Network
                                </button>
                            </div>

                            {/* Contract Addresses */}
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-800">Contract Addresses</h4>
                                {formData.contractAddresses.map((contract, index) => (
                                    <div key={index} className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Network
                                            </label>
                                            <input
                                                type="text"
                                                value={contract.network}
                                                onChange={(e) => updateContractAddress(index, 'network', e.target.value)}
                                                placeholder="Network"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800 placeholder-gray-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Contract Address
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={contract.contractAddress}
                                                    onChange={(e) => updateContractAddress(index, 'contractAddress', e.target.value)}
                                                    placeholder="0x..."
                                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800 placeholder-gray-500"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => copyToClipboard(contract.contractAddress)}
                                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        {formData.contractAddresses.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeContractAddress(index)}
                                                className="text-red-600 hover:text-red-800 text-sm"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addContractAddress}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    + Add Contract Address
                                </button>
                            </div>

                            {/* Token Standard and Total Supply */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-base font-medium text-gray-700 mb-2">
                                        Token Standard
                                    </label>
                                    <select
                                        value={formData.tokenStandard}
                                        onChange={(e) => handleInputChange('tokenStandard', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800"
                                    >
                                        <option value="">Select a token standard</option>
                                        {tokenStandards.map(standard => (
                                            <option key={standard.value} value={standard.value}>
                                                {standard.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-base font-medium text-gray-700 mb-2">
                                        Total Supply
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.totalSupply}
                                        onChange={(e) => handleInputChange('totalSupply', e.target.value)}
                                        placeholder="e.g. 1,000,000"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800 placeholder-gray-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Compliance Information Section */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-black">Compliance Information</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-base font-medium text-gray-700 mb-2">
                                        Regulatory Status
                                    </label>
                                    <select
                                        value={formData.regulatoryStatus}
                                        onChange={(e) => handleInputChange('regulatoryStatus', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800"
                                    >
                                        <option value="">Select regulatory status</option>
                                        {regulatoryStatusOptions.map(status => (
                                            <option key={status.value} value={status.value}>
                                                {status.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Compliance Contacts */}
                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-gray-800">Compliance Contacts</h4>
                                    {formData.complianceContacts.map((contact, index) => (
                                        <div key={index} className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={contact.name}
                                                    onChange={(e) => updateComplianceContact(index, 'name', e.target.value)}
                                                    placeholder="Contact Name"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800 placeholder-gray-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={contact.email}
                                                    onChange={(e) => updateComplianceContact(index, 'email', e.target.value)}
                                                    placeholder="contact@example.com"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800 placeholder-gray-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Role
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        value={contact.role}
                                                        onChange={(e) => updateComplianceContact(index, 'role', e.target.value)}
                                                        placeholder="Role"
                                                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800 placeholder-gray-500"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => copyToClipboard(contact.role)}
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            {formData.complianceContacts.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeComplianceContact(index)}
                                                    className="text-red-600 hover:text-red-800 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addComplianceContact}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        + Add Compliance Contact
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-base font-medium text-gray-700 mb-2">
                                            KYC Requirements
                                        </label>
                                        <textarea
                                            value={formData.kycRequirements}
                                            onChange={(e) => handleInputChange('kycRequirements', e.target.value)}
                                            placeholder="Describe KYC requirements for token holders"
                                            rows={3}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base text-gray-800 placeholder-gray-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-base font-medium text-gray-700 mb-2">
                                            Transfer Restrictions
                                        </label>
                                        <textarea
                                            value={formData.transferRestrictions}
                                            onChange={(e) => handleInputChange('transferRestrictions', e.target.value)}
                                            placeholder="Describe any transfer restrictions"
                                            rows={3}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base text-gray-800 placeholder-gray-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-base font-medium text-gray-700 mb-2">
                                        AML Policy URL
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.amlPolicyUrl}
                                        onChange={(e) => handleInputChange('amlPolicyUrl', e.target.value)}
                                        placeholder="test or https://example.com/aml-policy"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800 placeholder-gray-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Whitelist Status */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-gray-800">
                                Does your token use a whitelist for transfers or trading?
                            </h4>
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={() => handleInputChange('usesWhitelist', !formData.usesWhitelist)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                        formData.usesWhitelist ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            formData.usesWhitelist ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                                <span className="ml-3 text-sm text-gray-700">
                                    {formData.usesWhitelist ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>

                        {/* Last Security Audit Date */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-gray-800">Last Security Audit Date</h4>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={formData.lastSecurityAuditDate}
                                    onChange={(e) => handleInputChange('lastSecurityAuditDate', e.target.value)}
                                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800"
                                />
                                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="text-sm text-gray-500">
                                Date of the most recent security audit for your token
                            </p>
                        </div>

                        {/* Important Disclaimer */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-blue-800">Important</h3>
                                    <div className="mt-2 text-sm text-blue-700">
                                        <p>
                                            By submitting this form, you certify that all information provided is accurate and complete. False or misleading information may result in rejection of your token registration and potential regulatory consequences.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleReset}
                                className="px-8 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                            >
                                Reset Form
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Registration'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}