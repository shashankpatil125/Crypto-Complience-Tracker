export default function FeaturesSectionComponent() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Compliance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to stay compliant across all jurisdictions and regulatory frameworks
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Compliance Automation */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Compliance Automation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Streamline regulatory compliance with automated reporting, risk assessment, and real-time monitoring across multiple jurisdictions.
                </p>
              </div>
            </div>
          </div>
          
          {/* Global Jurisdiction Database */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Global Jurisdiction Database</h3>
                <p className="text-gray-600 leading-relaxed">
                  Access comprehensive regulatory frameworks for 150+ countries with real-time updates on crypto regulations and compliance requirements.
                </p>
              </div>
            </div>
          </div>
          
          {/* Template Studio */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Template Studio</h3>
                <p className="text-gray-600 leading-relaxed">
                  Create, customize, and deploy compliance policy templates with version control and collaborative editing capabilities.
                </p>
              </div>
            </div>
          </div>
          
          {/* Risk Analytics */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Risk Analytics</h3>
                <p className="text-gray-600 leading-relaxed">
                  Advanced risk scoring algorithms with predictive analytics to identify compliance gaps before they become issues.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Built for Every Crypto Entity</h3>
          <p className="text-xl text-gray-600">Tailored compliance solutions for all types of blockchain businesses</p>
        </div>
      </div>
    </section>
  );
}
