import React, { useState } from 'react';
import axios from "axios";
import { 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Clock, 
  Settings, 
  ChevronRight,
  Shield,
  FileCheck,
  Scale,
  Building,
  Calendar,
  AlertCircle
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('company');
  const [selectedRfp, setSelectedRfp] = useState(null);

  const [companyFileUploaded, setCompanyFileUploaded] = useState(false);
  const [showData, setShowData] = useState(false);
  const [fileName, setFileName] = useState('');
  const [companyData, setCompanyData] = useState([]);

  const complianceData = {
    registration: [
      { label: 'SAM.gov Registration', status: 'valid', message: 'CAGE Code: 7ABC3, Active' },
      { label: 'State Registration (Texas)', status: 'valid', message: 'Registered and Active' },
      { label: 'Tax ID/FEIN', status: 'valid', message: 'Valid and Verified' },
      { label: 'Business Type', status: 'valid', message: 'LLC - Eligible' },
      { label: 'HUB Certification', status: 'warning', message: 'Renewal required in 60 days' }
    ],
    eligibility: [
      { requirement: 'Years in Business', value: '10 years', required: '5+ years', met: true },
      { requirement: 'Annual Revenue', value: '$50M+', required: '$25M+', met: true },
      { requirement: 'Past Performance', value: '8 similar contracts', required: '5 contracts', met: true },
      { requirement: 'Insurance Coverage', value: '$2M', required: '$5M', met: false },
      { requirement: 'Texas HQ', value: 'Dallas Office', required: 'Texas presence', met: true }
    ],
    submission: [
      { item: 'Technical Proposal', format: 'PDF, max 20 pages', status: 'pending', due: '2024-04-01' },
      { item: 'Price Proposal', format: 'Excel template', status: 'in-progress', due: '2024-04-01' },
      { item: 'Past Performance', format: '3 references', status: 'completed', due: '2024-03-25' },
      { item: 'Certifications', format: 'Scanned copies', status: 'pending', due: '2024-03-30' },
      { item: 'Financial Statements', format: 'Last 3 years', status: 'not-started', due: '2024-03-28' }
    ],
    risks: [
      { 
        category: 'Payment Terms',
        risk: 'High',
        description: 'Net-90 payment terms specified',
        suggestion: 'Request modification to Net-45'
      },
      {
        category: 'Termination Clause',
        risk: 'Medium',
        description: 'Unilateral termination with 15-day notice',
        suggestion: 'Negotiate for 30-day notice period'
      },
      {
        category: 'Liability',
        risk: 'High',
        description: 'Unlimited liability clause present',
        suggestion: 'Add cap at contract value'
      },
      {
        category: 'Performance Metrics',
        risk: 'Low',
        description: 'Standard SLA requirements',
        suggestion: 'Acceptable as is'
      }
    ]
  };


  const handleFileUpload = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setCompanyFileUploaded(true);
  
      try {
        const response = await fetch('https://complygen-ai-driven-rfp-compliance.onrender.com/get_company_data');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const result = await response.json();
        const extractedData = result.data?.data || []; // get the nested `data`
  
        setCompanyData(extractedData);
        setShowData(true);
      } catch (error) {
        console.error('Error fetching company data:', error);
        alert('Unable to fetch company data. Please try again later.');
      }
    }
  };
  
  

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
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

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden bg-gray-50">
        {/* Sidebar - Fixed, no scroll */}
        <div className="w-1/4 max-w-xs bg-white shadow-md p-4 flex-none">
          <nav className="space-y-1">
            {[
              { id: 'company', icon: Building, label: 'Upload Company Data' },
              { id: 'upload', icon: Upload, label: 'Upload RFP' },
              { id: 'compliance', icon: Shield, label: 'Compliance Checks' },
              { id: 'eligibility', icon: FileCheck, label: 'Eligibility Criteria' },
              { id: 'checklist', icon: Clock, label: 'Submission Checklist' },
              { id: 'risks', icon: AlertCircle, label: 'Risk Analysis' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
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

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {activeTab === 'company' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Company Data</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Building className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-900">
                      Upload your company's information file
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Supported format: CSV, XLSX, JSON
                    </p>
                  </div>
                  <div className="mt-4">
                    <input 
                      id="company-upload"
                      type="file"
                      accept=".json,.csv,.xlsx,.pdf, .docx, .doc"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <label 
                      htmlFor="company-upload" 
                      className="inline-block cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Choose File
                    </label>
                    {fileName && <p className="mt-2 text-sm text-gray-600">Selected: {fileName}</p>}
                  </div>
                  {companyFileUploaded && (
                    <div className="mt-4 px-4 py-2 bg-green-100 text-green-800 rounded">
                      ✅ File uploaded successfully!
                    </div>
                  )}
                </div>
                
                {/* Display company data section */}
                {showData && (
                  <div className="mt-6 border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    {showData && (
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
        <div className="grid grid-cols-1 grid-cols-2 gap-6">
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
)}               
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'upload' && (
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
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setSelectedRfp(e.target.files[0].name);
                      }
                    }}
                  />
                  <label 
                    htmlFor="rfp-upload" 
                    className="mt-4 inline-block cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Upload Document
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'compliance' && (
              <div className="bg-white rounded-lg shadow divide-y">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900">Standard Compliance Checks</h2>
                  <div className="mt-6 grid grid-cols-1 gap-4">
                    {complianceData.registration.map((item) => (
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
            )}

        {activeTab === 'eligibility' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900">Mandatory Eligibility Criteria</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {complianceData.eligibility.map((item) => (
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
            )}

            {activeTab === 'checklist' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900">Submission Requirements Checklist</h2>
                <div className="mt-6 space-y-4">
                  {complianceData.submission.map((item) => (
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;