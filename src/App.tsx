import React, { useState, useEffect } from 'react';
import axios from "axios";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// import Dash from './components/Dash'

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
import { data } from 'framer-motion/client';

function App() {
  const [activeTab, setActiveTab] = useState('company');
  const [selectedRfp, setSelectedRfp] = useState(null);
  const [complianceData1, setComplianceData] = useState(null); // response data

  const [companyFileUploaded, setCompanyFileUploaded] = useState(false);
  const [showData, setShowData] = useState(false);
  const [fileName, setFileName] = useState('');
  const [companyData, setCompanyData] = useState([]);

  const [criteriaData, setCriteriaData] = useState([]);

// const [selectedRfp, setSelectedRfp] = useState(null);
const [loading, setLoading] = useState(false);
const [uploadProgress, setUploadProgress] = useState(0);



  // useEffect(() => {
  //   if (companyFileUploaded) {
  //     alert('✅ File uploaded successfully!');
  //   }
  // }, [companyFileUploaded]);

  const navigate = useNavigate();


  const categoryMap = {
    "Compliance Check": { id: 'compliance', icon: '🛡️', label: 'Compliance Checks' },
    "Preference": { id: 'preference', icon: '🌟', label: 'Preference' },
    "Forms/Attachments": { id: 'forms', icon: '📎', label: 'Forms/Attachments' },
    "Format of Document": { id: 'format', icon: '📝', label: 'Format of Document' },
    "Evaluation Criteria": { id: 'evaluation', icon: '📊', label: 'Evaluation Criteria' },
    "Payment Criteria": { id: 'payment', icon: '💰', label: 'Payment Criteria' },
    "Submission": { id: 'submission', icon: '📤', label: 'Submission' },
    "Risk Analysis": { id: 'risks', icon: '⚠️', label: 'Risk Analysis' },
  };
  
  

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
        title: 'Liability',
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

  useEffect(() => {
    if (activeTab === 'company') {
      fetchCompanyDataOnLoad();
    }
  }, [activeTab]);

  const fetchCompanyDataOnLoad = async () => {
    try {
      const response = await fetch('https://complygen-ai-driven-rfp-compliance.onrender.com/get_company_data');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const extractedData = result.data?.data || [];

      // Simulating post-upload state change
      // setCompanyFileUploaded(true);
      setFileName("AutoFetchedCompanyData.json");
      setCompanyData(extractedData);
      setShowData(true);
    } catch (error) {
      console.error('Error fetching company data:', error);
      alert('Unable to fetch company data. Please try again later.');
    }
  };


  const handleGenerate = async (file) => {
    setLoading(true);
    setUploadProgress(10);
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('https://complygen-ai-driven-rfp-compliance.onrender.com/criteria_generator', {
        method: 'POST',
        body: formData,
      });
  
      setUploadProgress(80);
  
      if (!response.ok) {
        throw new Error('Failed to generate criteria');
      }
  
      const data = await response.json();
  
      setUploadProgress(100);
      console.log('✅ API Response:', data);
      // You can store or use the data as needed

      setActiveTab('dashboard');
  
    } catch (error) {
      console.error('❌ Error:', error);
      alert("Something went wrong while processing the RFP.");
    } finally {
      setTimeout(() => {
        setLoading(false);
        setUploadProgress(0);
      }, 500);
    }
  };
  

  
  const handleFileUpload = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      setCompanyFileUploaded(true);
  
      const formData = new FormData();
      formData.append('file', file); // If backend expects a different field name, change 'file'
  
      try {
        const response = await fetch('https://complygen-ai-driven-rfp-compliance.onrender.com/extract_company_data', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const result = await response.json();
        const extractedData = result.data?.data || []; // Adjust according to your API structure

        setCompanyFileUploaded(true)
        setCompanyData(extractedData);
        setShowData(true);
        fetchCompanyDataOnLoad();
      } catch (error) {
        console.error('Error fetching company data:', error);
        alert('Unable to fetch company data. Please try again later.');
      }
    }
  };

  useEffect(() => {
    fetch("https://complygen-ai-driven-rfp-compliance.onrender.com/get_criteria")
      .then((res) => res.json())
      .then((data) => {
        const merged = data.data.reduce((acc, curr) => {
          const existing = acc.find((item) => item.category === curr.category);
          if (existing) {
            existing.len += curr.len;
          } else {
            acc.push({ ...curr });
          }
          return acc;
        }, []);
        setCriteriaData(merged);
      });
  }, []);

  const [showDashboardSubmenu, setShowDashboardSubmenu] = useState(false);

  
   
  

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
        { id: 'company', icon: Building, label: 'Company Data' },
        { id: 'upload', icon: Upload, label: 'Upload RFP' }
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
        </button>
      ))}

      {/* Dashboard with submenu */}
      <div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-grow flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
              activeTab === 'dashboard'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <CheckCircle className="h-5 w-5 mr-3" />
            Dashboard
          </button>
          <button
            onClick={() => setShowDashboardSubmenu((prev) => !prev)}
            className="px-2 py-3 text-gray-500 hover:text-blue-600"
          >
            <ChevronRight
              className={`h-4 w-4 transform transition-transform ${
                showDashboardSubmenu ? 'rotate-90 text-blue-700' : 'text-gray-400'
              }`}
            />
          </button>
        </div>

        {showDashboardSubmenu && (
          <div className="ml-8 mt-1 space-y-1">
            {[
              // { id: 'compliance', icon: Shield, label: 'Compliance Checks' },
              { id: 'preference', icon: Shield, label: 'Preference' },
              { id: 'forms', icon: Shield, label: 'Forms and Attachments' },
              { id: 'format', icon: Shield, label: 'Proposal Format' },
              { id: 'evaluation', icon: Shield, label: 'Evaluation' },
              { id: 'payment', icon: Shield, label: 'Payment Crieteria' },
              { id: 'submission', icon: Shield, label: 'Submission Type' },
              { id: 'eligibility', icon: FileCheck, label: 'Eligibility Criteria' },
              { id: 'checklist', icon: Clock, label: 'Submission Checklist' },
              { id: 'risks', icon: AlertCircle, label: 'Risk Analysis' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                  activeTab === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  </div>


        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
          {activeTab === 'company' && (
            
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

{showData && (
  <motion.div
    className="mt-6 border border-gray-200 rounded-lg p-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
      <div className="mt-6 space-y-8">
        <motion.h3
          className="text-xl font-semibold text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Company Information
        </motion.h3>

        {Object.entries(
          companyData.reduce((groups, item) => {
            const { category } = item;
            if (!groups[category]) groups[category] = [];
            groups[category].push(item);
            return groups;
          }, {})
        ).map(([category, items], i) => (
          <motion.div
            key={category}
            className="bg-white shadow rounded-lg p-6 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <h4 className="text-lg font-medium text-blue-700 mb-4 border-b border-blue-100 pb-2">
              {category}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 bg-gray-50 border border-gray-100 p-4 rounded-lg shadow-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
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
      
      {/* Conditionally show Generate button */}
      {selectedRfp && (
  <>
    <button
      onClick={() => handleGenerate(selectedRfp)}
      className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
      disabled={loading}
    >
      {loading ? 'Generating...' : 'Generate'}
    </button>

    {loading && (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${uploadProgress}%` }}
        ></div>
      </div>
    )}
  </>
)}
  </div>
)}



{/* Dashboard Dummy */}
{activeTab === 'dashboard' && (
  <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-2xl shadow-xl p-10 space-y-10">
    <h2 className="text-3xl font-bold text-blue-900 flex items-center gap-2">
      📊 RFP Progress Overview
      <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
        Live Preview
      </span>
    </h2>    

    {/* Individual Checks Section */}
    <div>
      <h3 className="text-2xl font-semibold text-blue-800 mb-6">✅ Individual Checks</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(() => {
          const totalCount = criteriaData.reduce((sum, item) => sum + item.len, 0) || 1;

          return criteriaData.map((item, index) => {
            const iconMap = {
              "Compliance Check": "📋",
              "Preference": "🌟",
              "Forms/Attachments": "📎",
              "Format of Document": "📝",
              "Evaluation Criteria": "📊",
              "Payment Criteria": "💰",
              "Submission": "📤",
              "Risk Analysis": "⚠️",
            };

            const icon = iconMap[item.category] || "📁";
            const status = item.len > 0 ? "🟢 Complete" : "🟡 Pending";
            const width = (item.len / totalCount) * 100;
            const mapped = categoryMap[item.category] || { id: 'default', icon: '📁', label: item.category };

            return (
              <div
                key={index}
                onClick={() => {
                    setActiveTab(mapped.id);          // set which tab to show
                    // navigate('/dashboard');           
                }}
                
                className="bg-white/80 backdrop-blur-sm border border-blue-100 p-6 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out"
              >
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl shadow-inner">
                    {icon}
                  </div>
                  <p className="text-lg font-semibold text-blue-900 text-center">{item.category}</p>
                  <p className="text-sm text-gray-600">{status}</p>
                  <p className="text-xs text-gray-500">Findings: {item.len}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">{item.len} of {totalCount}</p>
                </div>
              </div>
            );
          });
        })()}
      </div>
    </div>
  </div>
)}




{activeTab === 'submission' && (
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

{activeTab === 'payment' && (
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


{activeTab === 'evaluation' && (
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

{activeTab === 'format' && (
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

{activeTab === 'forms' && (
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


{activeTab === 'preference' && (
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