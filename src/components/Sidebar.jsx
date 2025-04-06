// components/Sidebar.jsx
import React from 'react';
import {
  Upload,
  Shield,
  FileCheck,
  Clock,
  Building,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { id: 'company', icon: Building, label: 'Upload Company Data' },
  { id: 'upload', icon: Upload, label: 'Upload RFP' },
  { id: 'compliance', icon: Shield, label: 'Compliance Checks' },
  { id: 'eligibility', icon: FileCheck, label: 'Eligibility Criteria' },
  { id: 'checklist', icon: Clock, label: 'Submission Checklist' },
  { id: 'risks', icon: AlertCircle, label: 'Risk Analysis' },
];

const Sidebar = ({ activeTab, setActiveTab }) => (
  <div className="w-1/4 max-w-xs bg-white shadow-md p-4 flex-none">
    <nav className="space-y-1">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
            activeTab === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <item.icon className="h-5 w-5 mr-3" />
          {item.label}
          <ChevronRight className={`ml-auto h-4 w-4 ${
            activeTab === item.id ? 'text-blue-700' : 'text-gray-400'
          }`} />
        </button>
      ))}
    </nav>
  </div>
);

export default Sidebar;
