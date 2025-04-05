import React, { useState } from 'react';
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

  const companyData = [
    {
        "title": "Company Legal Name",
        "content": "FirstStaff Workforce Solutions, LLC"
    },
    {
        "title": "Principal Business Address",
        "content": "3105 Maple Avenue, Suite 1200, Dallas, TX 75201"
    },
    {
        "title": "Phone Number",
        "content": "(214) 832-4455"
    },
    {
        "title": "Fax Number",
        "content": "(214) 832-4460"
    },
    {
        "title": "Email Address",
        "content": "proposals@firststaffsolutions.com"
    },
    {
        "title": "Authorized Representative",
        "content": "Meredith Chan, Director of Contracts"
    },
    {
        "title": "Authorized Representative Phone",
        "content": "(212) 555-0199"
    },
    {
        "title": "Signature",
        "content": "Meredith Chan (signed manually)"
    },
    {
        "title": "Company Length of Existence",
        "content": "9 years"
    },
    {
        "title": "Years of Experience in Temporary Staffing",
        "content": "7 years"
    },
    {
        "title": "DUNS Number",
        "content": "07-842-1490"
    },
    {
        "title": "CAGE Code",
        "content": "8J4T7"
    },
    {
        "title": "SAM.gov Registration Date",
        "content": "03/01/2022"
    },
    {
        "title": "NAICS Codes",
        "content": "561320 – Temporary Help Services; 541611 – Admin Management"
    },
    {
        "title": "State of Incorporation",
        "content": "Delaware"
    },
    {
        "title": "Bank Letter of Creditworthiness",
        "content": "Not Available."
    },
    {
        "title": "State Registration Number",
        "content": "SRN-DE-0923847"
    },
    {
        "title": "Services Provided",
        "content": "Administrative, IT, Legal & Credentialing Staffing"
    },
    {
        "title": "Business Structure",
        "content": "Limited Liability Company (LLC)"
    },
    {
        "title": "W-9 Form",
        "content": "Attached (TIN: 47-6392011)"
    },
    {
        "title": "Certificate of Insurance",
        "content": "Travelers Insurance, Policy #TX-884529-A; includes Workers' Comp, Liability, and Auto"
    },
    {
        "title": "Licenses",
        "content": "Texas Employment Agency License #TXEA-34892"
    },
    {
        "title": "Historically Underutilized Business/DBE Status",
        "content": "Not certified."
    },
    {
        "title": "Key Personnel – Project Manager",
        "content": "Ramesh Iyer"
    },
    {
        "title": "Key Personnel – Technical Lead",
        "content": "Sarah Collins"
    },
    {
        "title": "Key Personnel – Security Auditor",
        "content": "James Wu"
    },
    {
        "title": "MBE Certification",
        "content": "NO MBE Certification"
    }
  ];

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // Get the filename and set it
      setFileName(e.target.files[0].name);
      // Mark the file as uploaded and show data
      setCompanyFileUploaded(true);
      setShowData(true);
      // No need to actually read the file since we're using predefined data
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
                      accept=".json,.csv,.xlsx,.pdf"
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
                    <h3 className="text-md font-medium text-gray-900 mb-3">Company Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {companyData.map((item, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded">
                          <h4 className="text-sm font-medium text-gray-700">{item.title}</h4>
                          <p className="text-gray-800 mt-1">{item.content}</p>
                        </div>
                      ))}
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
                <div className="mt-6 space-y-4">
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