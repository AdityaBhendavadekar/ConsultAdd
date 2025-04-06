import React from 'react';

const CompanyUpload = ({ handleFileUpload, showData, companyData }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Header with Button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Upload Company Data</h2>
        <label
          htmlFor="company-upload"
          className="inline-block cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Choose File
        </label>
      </div>

      {/* Hidden Input for File Upload */}
      <input
        id="company-upload"
        type="file"
        accept=".json,.csv,.xlsx,.pdf,.docx,.doc"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Display company data section */}
      {showData && (
        <div className="mt-6 border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div className="mt-6 space-y-8">
              <h3 className="text-xl font-semibold text-gray-800">Company Information</h3>

              {Object.entries(
                companyData.reduce((groups, item) => {
                  const { category } = item;
                  if (!groups[category]) groups[category] = [];
                  groups[category].push(item);
                  return groups;
                }, {})
              ).map(([category, items]) => (
                <div key={category} className="bg-white shadow rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-medium text-blue-700 mb-4 border-b border-blue-100 pb-2">
                    {category}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 bg-gray-50 border border-gray-100 p-4 rounded-lg shadow-sm"
                      >
                        <span className="mt-1 text-lg">
                          {item.available === "yes" ? (
                            <span className="text-green-600">✅</span>
                          ) : (
                            <span className="text-yellow-500">⚠️</span>
                          )}
                        </span>
                        <div>
                          <h5 className="text-sm font-semibold text-gray-800">{item.title}</h5>
                          <p className="text-sm text-gray-700 mt-1">{item.content || "N/A"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyUpload;