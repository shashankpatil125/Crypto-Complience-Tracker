'use client';

import { useState } from 'react';
import NavbarComponent from '@/components/common/Navbar';

export default function TokenRegistrationPage() {
    const [formData, setFormData] = useState({
        tokenName: '',
        tokenSymbol: '',
        tokenCategory: 'UTILITY',
        tokenType: '',
        description: '',
        issuerName: '',
        issuerLegalEntity: '',
        websiteUrl: '',
        whitepaperUrl: '',
        blockchainNetworks: [{ networkName: '', chainId: '' }],
        contractAddresses: [{ network: '', address: '' }],
        tokenStandard: '',
        totalSupply: '',
        regulatoryStatus: '',
        complianceContacts: [{ name: '', email: '', role: '' }],
        kycRequirements: '',
        transferRestrictions: '',
        amlPolicyUrl: '',
        whitelistStatus: false,
        lastAuditDate: ''
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

    const handleInputChange = (field: string, value: any) => {
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
            contractAddresses: [...prev.contractAddresses, { network: '', address: '' }]
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission logic here
    };

    const handleReset = () => {
        setFormData({
            tokenName: '',
            tokenSymbol: '',
            tokenCategory: 'UTILITY',
            tokenType: '',
            description: '',
            issuerName: '',
            issuerLegalEntity: '',
            websiteUrl: '',
            whitepaperUrl: '',
            blockchainNetworks: [{ networkName: '', chainId: '' }],
            contractAddresses: [{ network: '', address: '' }],
            tokenStandard: '',
            totalSupply: '',
            regulatoryStatus: '',
            complianceContacts: [{ name: '', email: '', role: '' }],
            kycRequirements: '',
            transferRestrictions: '',
            amlPolicyUrl: '',
            whitelistStatus: false,
            lastAuditDate: ''
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
                                            type="url"
                                            value={formData.websiteUrl}
                                            onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                                            placeholder="https://example.com"
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
                                            value={formData.issuerLegalEntity}
                                            onChange={(e) => handleInputChange('issuerLegalEntity', e.target.value)}
                                            placeholder="Legal Entity Name"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800 placeholder-gray-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-base font-medium text-gray-700 mb-2">
                                            Whitepaper URL (Optional)
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.whitepaperUrl}
                                            onChange={(e) => handleInputChange('whitepaperUrl', e.target.value)}
                                            placeholder="https://example.com/whitepaper"
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
                                                    value={contract.address}
                                                    onChange={(e) => updateContractAddress(index, 'address', e.target.value)}
                                                    placeholder="0x..."
                                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-gray-800 placeholder-gray-500"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => copyToClipboard(contract.address)}
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
                                        type="url"
                                        value={formData.amlPolicyUrl}
                                        onChange={(e) => handleInputChange('amlPolicyUrl', e.target.value)}
                                        placeholder="https://example.com/aml-policy"
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
                                    onClick={() => handleInputChange('whitelistStatus', !formData.whitelistStatus)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                        formData.whitelistStatus ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            formData.whitelistStatus ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                                <span className="ml-3 text-sm text-gray-700">
                                    {formData.whitelistStatus ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>

                        {/* Last Security Audit Date */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-gray-800">Last Security Audit Date</h4>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={formData.lastAuditDate}
                                    onChange={(e) => handleInputChange('lastAuditDate', e.target.value)}
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
                                className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                            >
                                Submit Registration
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}