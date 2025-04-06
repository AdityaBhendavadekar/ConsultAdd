// components/Header.jsx
import React from 'react';
import { FileText, Settings } from 'lucide-react';

const Header = ({ selectedRfp }) => (
  <header className="bg-white shadow-sm flex-none">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FileText className="h-8 w-8 text-blue-600" />
          <h1 className="ml-2 text-2xl font-bold text-gray-900">RFP Analyzer</h1>
        </div>
        {selectedRfp && (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Analyzing: {selectedRfp}</span>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        )}
      </div>
    </div>
  </header>
);

export default Header;
