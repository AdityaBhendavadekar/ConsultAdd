import React from 'react';
import { CheckCircle, AlertTriangle, Shield, ClipboardList, AlertCircle } from 'lucide-react';

const Dash = ({ activeTab, setActiveTab, complianceData }) => {
  const tabs = [
    { id: 'compliance', label: 'Compliance', icon: <Shield className="w-4 h-4" /> },
    { id: 'eligibility', label: 'Eligibility', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'checklist', label: 'Checklist', icon: <ClipboardList className="w-4 h-4" /> },
    { id: 'risks', label: 'Risks', icon: <AlertCircle className="w-4 h-4" /> },
  ];

  

  return (
    <div className="relative pb-24">
      {/* === Tab Content === */}
      {activeTab === 'compliance' && (
        <div className="bg-white rounded-lg shadow divide-y p-6">
          <h2 className="text-lg font-medium text-gray-900">Standard Compliance Checks</h2>
          <div className="mt-6 grid grid-cols-1 gap-4">
            {complianceData.registration.map((item) => (
              <div key={item.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.message}</p>
                </div>
                <div
                  className={`h-3 w-3 rounded-full ${
                    item.status === 'valid' ? 'bg-green-500' :
                    item.status === 'warning' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'eligibility' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900">Mandatory Eligibility Criteria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {complianceData.eligibility.map((item) => (
              <div key={item.requirement} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 h-5 w-5">
                  {item.met ? <CheckCircle className="text-green-500" /> : <AlertTriangle className="text-red-500" />}
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
      )}

      {activeTab === 'checklist' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900">Submission Requirements Checklist</h2>
          <div className="mt-6 space-y-4">
            {complianceData.submission.map((item) => (
              <div key={item.item} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center flex-grow">
                  <div
                    className={`h-4 w-4 rounded-full ${
                      item.status === 'completed' ? 'bg-green-500' :
                      item.status === 'in-progress' ? 'bg-yellow-500' :
                      item.status === 'not-started' ? 'bg-red-500' :
                      'bg-gray-300'
                    }`}
                  />
                  <div className="ml-3">
                    <span className="font-medium text-gray-900">{item.item}</span>
                    <p className="text-sm text-gray-500">{item.format}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">Due: {item.due}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'risks' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900">Contract Risk Analysis</h2>
          <div className="mt-6 space-y-4">
            {complianceData.risks.map((item) => (
              <div key={item.category} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{item.category}</h3>
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
      )}

      {/* === Bottom Tab Menu === */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around p-2 z-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center px-3 py-1 rounded-md transition-colors duration-200 ${
              activeTab === tab.id ? 'text-blue-600 font-semibold' : 'text-gray-500'
            }`}
          >
            {tab.icon}
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dash;
