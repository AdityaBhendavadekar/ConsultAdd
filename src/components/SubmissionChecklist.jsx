import React from 'react';

const SubmissionChecklist = ({ submissionData }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900">Submission Requirements Checklist</h2>
      <div className="mt-6 space-y-4">
        {submissionData.map((item) => (
          <div key={item.item} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center flex-grow">
              <div className={`h-4 w-4 rounded-full ${
                item.status === 'completed' ? 'bg-green-500' :
                item.status === 'in-progress' ? 'bg-yellow-500' :
                item.status === 'not-started' ? 'bg-red-500' :
                'bg-gray-300'
              }`} />
              <div className="ml-3">
                <span className="font-medium text-gray-900">{item.item}</span>
                <p className="text-sm text-gray-500">{item.format}</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Due: {item.due}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmissionChecklist;