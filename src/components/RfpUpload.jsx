import React from 'react';
import { Upload } from 'lucide-react';

const RfpUpload = ({ handleRfpUpload }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-900">
            Drop your RFP document here
          </p>
          <p className="mt-1 text-sm text-gray-500">
            or click to browse (PDF, DOC, DOCX up to 50MB)
          </p>
        </div>
        <input 
          id="rfp-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleRfpUpload}
        />
        <label 
          htmlFor="rfp-upload" 
          className="mt-4 inline-block cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Upload Document
        </label>
      </div>
    </div>
  );
};

export default RfpUpload;