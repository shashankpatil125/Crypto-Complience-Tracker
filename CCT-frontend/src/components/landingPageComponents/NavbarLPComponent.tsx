'use client';

import { useRouter } from 'next/navigation';

export default function ModernNavbar() {
  const router = useRouter();

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo with shield icon */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-gray-800"
              >
                <path d="M12 2L3 7l9 5 9-5-9-5z"/>
                <path d="M3 7v10l9 5 9-5V7"/>
                <path d="M12 12l9-5"/>
              </svg>
            </div>
            <span className="text-xl font-semibold text-gray-800">DARA</span>
          </div>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => router.push('/features')}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Features
            </button>
            <button 
              onClick={() => router.push('/solutions')}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Solutions
            </button>
            <button 
              onClick={() => router.push('/pricing')}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Pricing
            </button>
          </div>

          {/* Right side - Action Buttons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.push('/login')}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Sign In
            </button>
            <button 
              onClick={() => router.push('/get-started')}
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
