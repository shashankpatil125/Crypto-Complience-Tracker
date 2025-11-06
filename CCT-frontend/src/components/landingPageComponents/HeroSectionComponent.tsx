'use client';

import { useRouter } from 'next/navigation';

export default function HeroSectionComponent() {
  const router = useRouter();

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Tagline */}
        <div className="inline-flex items-center px-4 py-2 bg-gray-50 border border-gray-200 rounded-full mb-8">
          <span className="text-lg mr-2">⚡</span>
          <span className="text-gray-700 font-medium">Web3 Compliance Platform</span>
        </div>
        
        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Simplify Crypto<br />
          Regulatory Compliance
        </h1>
        
        {/* Description */}
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          The comprehensive platform that streamlines blockchain ecosystem compliance through intelligent automation, global regulatory intelligence, and seamless reporting workflows.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button 
            onClick={() => router.push('/get-started')}
            className="px-8 py-4 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium text-lg flex items-center"
          >
            Start Free Trial →
          </button>
          <button 
            onClick={() => router.push('/demo')}
            className="px-8 py-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 font-medium text-lg"
          >
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}
