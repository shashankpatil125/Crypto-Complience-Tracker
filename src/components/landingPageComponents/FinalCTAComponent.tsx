'use client';

import { useRouter } from 'next/navigation';

export default function FinalCTAComponent() {
  const router = useRouter();

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Transform Your Compliance?</h2>
        <p className="text-xl text-gray-600 mb-12">
          Join the leading crypto businesses that rely on DARA for seamless regulatory compliance.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button 
            onClick={() => router.push('/get-started')}
            className="px-8 py-4 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium text-lg flex items-center"
          >
            Start Your Free Trial →
          </button>
          <button 
            onClick={() => router.push('/demo')}
            className="px-8 py-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 font-medium text-lg"
          >
            Schedule Demo
          </button>
        </div>
        
        <p className="text-sm text-gray-500">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
}
