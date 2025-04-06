import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const EligibilityCriteria = ({ eligibilityData }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900">Mandatory Eligibility Criteria</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {eligibilityData.map((item) => (
          <div key={item.requirement} className="flex items-center p-4 bg-gray-50 rounded-lg">
            <div className={`flex-shrink-0 h-5 w-5 ${
              item.met ? 'text-green-500' : 'text-red-500'
            }`}>
              {item.met ? <CheckCircle /> : <AlertTriangle />}
            </div>
            <div className="ml-4 flex-grow">
              <p className="font-medium text-gray-900">{item.requirement}</p>
              <p className="text-sm text-gray-500">Required: {item.required}</p>
              <p className="text-sm text-gray-500">Current: {item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EligibilityCriteria;