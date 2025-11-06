'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarComponentProps {
  selectedOption?: string;
}

export default function NavbarComponent({ selectedOption: propSelectedOption }: NavbarComponentProps) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);
  const [isJurisdictionsOpen, setIsJurisdictionsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(propSelectedOption || '');

  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(()=>{
    if(selectedOption){
      router.push(`/register/${selectedOption}`);
    }
  },[selectedOption, router])

  // Options object for the dropdown
  const registerOptions = [
    { id: 'token', label: 'Token Registration', description: 'Register and classify tokenized assets' },
    { id: 'exchange', label: 'Exchange Registration', description: 'Register and manage cryptocurrency exchange compliance' },
    { id: 'stablecoin', label: 'Stablecoin Registration', description: 'Register stablecoin issuance and management' },
    { id: 'defi', label: 'DeFi Protocol Registration', description: 'Register decentralized finance protocols' },
    { id: 'nft', label: 'NFT Marketplace Registration', description: 'Register NFT marketplace operations' },
    { id: 'fund', label: 'Crypto Fund Registration', description: 'Register cryptocurrency investment funds' }
  ];

  const complianceOptions = [
    { id: 'monitoring', label: 'Compliance Monitoring', description: 'Monitor regulatory compliance status' },
    { id: 'reporting', label: 'Compliance Reporting', description: 'Generate compliance reports' },
    { id: 'audit', label: 'Compliance Audit', description: 'Conduct compliance audits' }
  ];

  const jurisdictionsOptions = [
    { id: 'us', label: 'United States', description: 'US regulatory requirements' },
    { id: 'eu', label: 'European Union', description: 'EU regulatory requirements' },
    { id: 'uk', label: 'United Kingdom', description: 'UK regulatory requirements' },
    { id: 'singapore', label: 'Singapore', description: 'Singapore regulatory requirements' },
    { id: 'japan', label: 'Japan', description: 'Japan regulatory requirements' }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left side - DARA logo */}
        <div className="text-3xl font-bold text-gray-800 uppercase">DARA</div>
        
        {/* Center - Navigation Links */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Dashboard
          </button>
          
          {/* Register dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRegisterOpen(!isRegisterOpen)}
              className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <span>Register</span>
              <svg 
                className={`w-4 h-4 transition-transform ${isRegisterOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown menu */}
            {isRegisterOpen && (
              <div className="absolute left-0 top-full mt-1 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-10 flex flex-col p-2">
                <div className="py-1">
                  {registerOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSelectedOption(option.id);
                        setIsRegisterOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors rounded-md"
                    >
                      <div className="font-semibold text-black text-lg">{option.label}</div>
                      <div className="text-gray-500 mt-1 text-md">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Compliance dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsComplianceOpen(!isComplianceOpen)}
              className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <span>Compliance</span>
              <svg 
                className={`w-4 h-4 transition-transform ${isComplianceOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown menu */}
            {isComplianceOpen && (
              <div className="absolute left-0 top-full mt-1 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-10 flex flex-col p-2">
                <div className="py-1">
                  {complianceOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setIsComplianceOpen(false);
                        // Handle compliance navigation
                      }}
                      className="block w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors rounded-md"
                    >
                      <div className="font-semibold text-black text-lg">{option.label}</div>
                      <div className="text-gray-500 mt-1 text-md">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Jurisdictions dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsJurisdictionsOpen(!isJurisdictionsOpen)}
              className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <span>Jurisdictions</span>
              <svg 
                className={`w-4 h-4 transition-transform ${isJurisdictionsOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown menu */}
            {isJurisdictionsOpen && (
              <div className="absolute left-0 top-full mt-1 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-10 flex flex-col p-2">
                <div className="py-1">
                  {jurisdictionsOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setIsJurisdictionsOpen(false);
                        // Handle jurisdiction navigation
                      }}
                      className="block w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors rounded-md"
                    >
                      <div className="font-semibold text-black text-lg">{option.label}</div>
                      <div className="text-gray-500 mt-1 text-md">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side - User info, Connect Wallet and Logout */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="text-sm text-gray-600">
              Welcome, <span className="font-medium text-gray-900">{user.username}</span>
            </div>
          )}
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Connect Wallet
          </button>
          <button 
            onClick={logout}
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
