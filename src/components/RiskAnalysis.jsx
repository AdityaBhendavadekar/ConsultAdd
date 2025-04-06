import React from 'react';

const RiskAnalysis = ({ risksData }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900">Contract Risk Analysis</h2>
      <div className="mt-6 space-y-4">
        {risksData.map((item) => (
          <div key={item.category || item.title} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">{item.category || item.title}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                item.risk === 'High' ? 'bg-red-100 text-red-800' :
                item.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {item.risk} Risk
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            <p className="text-sm font-medium text-blue-600">
              Suggestion: {item.suggestion}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskAnalysis;