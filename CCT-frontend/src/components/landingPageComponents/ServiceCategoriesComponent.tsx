export default function ServiceCategoriesComponent() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-16">
          {/* Crypto Exchanges */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Crypto Exchanges</h3>
            <p className="text-gray-600 text-sm">CEX & DEX compliance management</p>
          </div>
          
          {/* Stablecoin Issuers */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Stablecoin Issuers</h3>
            <p className="text-gray-600 text-sm">Regulatory reporting & reserves</p>
          </div>
          
          {/* NFT Marketplaces */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-2">NFT Marketplaces</h3>
            <p className="text-gray-600 text-sm">Digital asset compliance</p>
          </div>
          
          {/* Payment Processors */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Payment Processors</h3>
            <p className="text-gray-600 text-sm">Transaction monitoring</p>
          </div>
          
          {/* Crypto Funds */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Crypto Funds</h3>
            <p className="text-gray-600 text-sm">Investment compliance</p>
          </div>
        </div>
      </div>
    </section>
  );
}
