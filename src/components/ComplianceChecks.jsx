import React from 'react';

const ComplianceChecks = ({ registrationData }) => {
  return (
    <div className="bg-white rounded-lg shadow divide-y">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900">Standard Compliance Checks</h2>
        <div className="mt-6 grid grid-cols-1 gap-4">
          {registrationData.map((item) => (
            <div key={item.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-500">{item.message}</p>
              </div>
              <div className={`h-3 w-3 rounded-full ${
                item.status === 'valid' ? 'bg-green-500' :
                item.status === 'warning' ? 'bg-yellow-500' :
                'bg-red-500'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplianceChecks;