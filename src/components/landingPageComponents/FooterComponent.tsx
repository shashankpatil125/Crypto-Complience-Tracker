export default function FooterComponent() {
  return (
    <footer className="bg-white border-t border-gray-200 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
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
            <p className="text-gray-600">
              The leading Web3 compliance platform for modern crypto businesses.
            </p>
          </div>
          
          {/* Product Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Product</h3>
            <div className="space-y-2">
              <button className="block text-gray-600 hover:text-gray-900 transition-colors">Features</button>
              <button className="block text-gray-600 hover:text-gray-900 transition-colors">Pricing</button>
              <button className="block text-gray-600 hover:text-gray-900 transition-colors">API</button>
              <button className="block text-gray-600 hover:text-gray-900 transition-colors">Documentation</button>
            </div>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Company</h3>
            <div className="space-y-2">
              <button className="block text-gray-600 hover:text-gray-900 transition-colors">About</button>
              <button className="block text-gray-600 hover:text-gray-900 transition-colors">Blog</button>
              <button className="block text-gray-600 hover:text-gray-900 transition-colors">Careers</button>
              <button className="block text-gray-600 hover:text-gray-900 transition-colors">Contact</button>
            </div>
          </div>
          
          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
            <div className="space-y-2">
              <button className="block text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</button>
              <button className="block text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</button>
              <button className="block text-gray-600 hover:text-gray-900 transition-colors">Security</button>
              <button className="block text-gray-600 hover:text-gray-900 transition-colors">Compliance</button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            © 2024 DARA Compliance Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
