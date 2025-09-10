export default function StatisticsComponent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
      <div className="text-center">
        <div className="text-4xl font-bold text-gray-900 mb-2">150+</div>
        <div className="text-gray-600">Global Jurisdictions</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-gray-900 mb-2">99.9%</div>
        <div className="text-gray-600">Compliance Accuracy</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-gray-900 mb-2">70%</div>
        <div className="text-gray-600">Cost Reduction</div>
      </div>
    </div>
  );
}
