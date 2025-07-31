import React, { useState } from 'react';
import './App.css';
import RevenueOptimizerOverview from './RevenueOptimizerOverview';
import RevenueOptimizerBuild from './RevenueOptimizerBuild';
import RevenueOptimizerComms from './RevenueOptimizerComms';
import RevenueOptimizerPerformance from './RevenueOptimizerPerformance';

function RevenueOptimizer() {
  const [activeTab, setActiveTab] = useState('overview');
  const [buildSubTab, setBuildSubTab] = useState('templates');
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [showFunctionBuilder, setShowFunctionBuilder] = useState(false);
  const [showCommsBuilder, setShowCommsBuilder] = useState(false);
  const [templateSearch, setTemplateSearch] = useState('');
  const [templateFilter, setTemplateFilter] = useState('all');
  const [templateProductFilter, setTemplateProductFilter] = useState('all');
  const [templatePopularityFilter, setTemplatePopularityFilter] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplateForEdit, setSelectedTemplateForEdit] = useState(null);

  // Mock data for revenue functions
  const revenueFunctions = [
    {
      id: 'func-1',
      name: 'Flight to Hotel Cross-Sell',
      description: 'Automatically suggest hotel bookings when customers book flights',
      category: 'Cross-Sell',
      bookingTypes: ['Flight'],
      targetTypes: ['Hotel'],
      timing: '3 days after flight booking',
      status: 'Active',
      performance: {
        impressions: 1247,
        clicks: 312,
        conversions: 89,
        revenue: '£40,050',
        conversionRate: '7.1%'
      },
      comms: [
        { id: 'comm-1', name: 'Email Campaign A', status: 'Active', performance: { opens: '23%', clicks: '8.2%' } },
        { id: 'comm-2', name: 'In-App Notification', status: 'Active', performance: { impressions: 892, clicks: '12.4%' } }
      ]
    },
    {
      id: 'func-2',
      name: 'Airport Services Bundle',
      description: 'Offer fast track, lounge access, and transfers as a package',
      category: 'Bundle',
      bookingTypes: ['Flight'],
      targetTypes: ['Fast Track', 'Airport Lounge', 'Airport Transfer'],
      timing: '24 hours before departure',
      status: 'Active',
      performance: {
        impressions: 892,
        clicks: 267,
        conversions: 58,
        revenue: '£6,960',
        conversionRate: '6.5%'
      },
      comms: [
        { id: 'comm-3', name: 'SMS Bundle Offer', status: 'Active', performance: { deliveries: '98%', clicks: '15.1%' } },
        { id: 'comm-4', name: 'Website Banner', status: 'Paused', performance: { impressions: 445, clicks: '3.2%' } }
      ]
    },
    {
      id: 'func-3',
      name: 'Premium Upgrade Path',
      description: 'Suggest premium services to high-value customers',
      category: 'Upsell',
      bookingTypes: ['Flight', 'Hotel'],
      targetTypes: ['Airport Lounge', 'Fast Track', 'eSIM'],
      timing: 'Immediate after booking',
      status: 'Draft',
      performance: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        revenue: '£0',
        conversionRate: '0%'
      },
      comms: []
    }
  ];

  // Comprehensive template library
  const templateLibrary = [
    {
      id: 'template-1',
      title: 'Post-Flight Hotel Cross-Sell',
      description: '3 days after flight booking, offer hotel options for the destination',
      type: 'Cross-Sell',
      status: 'Active',
      trigger: 'Flight Booking',
      timing: '3 days after booking',
      offerSelection: ['Hotel'],
      performance: {
        revenue: '£15,230',
        conversionRate: '8.2%',
        comms: 2
      }
    },
    {
      id: 'template-2',
      title: 'Pre-Departure Seat Upgrade',
      description: '3 days before flight departure, offer seat bookability with discount',
      type: 'Upsell',
      status: 'Active',
      trigger: 'Flight Departure',
      timing: '3 days before departure',
      offerSelection: ['Seat Upgrade'],
      performance: {
        revenue: '£8,450',
        conversionRate: '12.1%',
        comms: 1
      }
    },
    {
      id: 'template-3',
      title: 'Day-of Lounge Access',
      description: 'Day of flight, offer lounge access if NOT in premium cabins',
      type: 'Upsell',
      status: 'Not Active',
      trigger: 'Flight Day',
      timing: 'Day of departure',
      offerSelection: ['Airport Lounge'],
      conditions: 'Not in premium cabins'
    },
    {
      id: 'template-4',
      title: 'Pre-Departure eSIM Package',
      description: '24hrs before flight departure, send offer for eSIM package',
      type: 'Cross-Sell',
      status: 'Not Active',
      trigger: 'Flight Departure',
      timing: '24 hours before departure',
      offerSelection: ['eSIM']
    },
    {
      id: 'template-5',
      title: 'Pre-Departure Airport Transfer',
      description: '24hrs before flight departure, send offer for airport transfer',
      type: 'Cross-Sell',
      status: 'Not Active',
      trigger: 'Flight Departure',
      timing: '24 hours before departure',
      offerSelection: ['Airport Transfer']
    },
    {
      id: 'template-6',
      title: 'Post-Hotel Check-in Activities',
      description: 'Immediately after hotel check in time, offer ticket around the area of hotel',
      type: 'Cross-Sell',
      status: 'Not Active',
      trigger: 'Hotel Check-in',
      timing: 'Immediately after check-in',
      offerSelection: ['Event Ticket']
    },
    {
      id: 'template-7',
      title: 'VIP Hotel Spa Treatment',
      description: 'For VIP client, IF hotel is booked, offer spa treatment at hotel or nearby location',
      type: 'Upsell',
      status: 'Not Active',
      trigger: 'Hotel Booking',
      timing: 'After hotel booking',
      offerSelection: ['Spa Treatment'],
      conditions: 'VIP clients only'
    },
    {
      id: 'template-8',
      title: 'Weekend Hotel Event Bundle',
      description: 'IF hotel booking includes weekend stay, offer ticket event over the weekend, within the area',
      type: 'Cross-Sell',
      status: 'Not Active',
      trigger: 'Hotel Booking',
      timing: 'After hotel booking',
      offerSelection: ['Event Ticket'],
      conditions: 'Weekend stays only'
    }
  ];

  // Mock data for templates
  const functionTemplates = [
    {
      id: 'template-1',
      name: 'Flight to Hotel Cross-Sell',
      description: 'Automatically suggest hotel bookings when customers book flights',
      category: 'Cross-Sell',
      complexity: 'Beginner',
      successRate: '78%',
      avgRevenue: '£450'
    },
    {
      id: 'template-2',
      name: 'Airport Services Bundle',
      description: 'Offer fast track, lounge access, and transfers as a package',
      category: 'Bundle',
      complexity: 'Beginner',
      successRate: '65%',
      avgRevenue: '£120'
    },
    {
      id: 'template-3',
      name: 'Premium Upgrade Path',
      description: 'Suggest premium services to high-value customers',
      category: 'Upsell',
      complexity: 'Intermediate',
      successRate: '82%',
      avgRevenue: '£280'
    }
  ];

  const commsTemplates = [
    {
      id: 'comm-template-1',
      name: 'Email Sequence',
      description: '3-part email sequence for cross-sell opportunities',
      type: 'Email',
      avgOpenRate: '24%',
      avgClickRate: '8.5%'
    },
    {
      id: 'comm-template-2',
      name: 'SMS Bundle Offer',
      description: 'Time-sensitive SMS for airport services',
      type: 'SMS',
      avgDeliveryRate: '98%',
      avgClickRate: '15.2%'
    },
    {
      id: 'comm-template-3',
      name: 'In-App Notification',
      description: 'Contextual push notification during booking',
      type: 'Push',
      avgImpressionRate: '95%',
      avgClickRate: '12.8%'
    }
  ];

  const getBookingTypeIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'flight': return '✈️';
      case 'hotel': return '🏨';
      case 'event ticket': return '🎫';
      case 'esim': return '📱';
      case 'fast track': return '⚡';
      case 'airport lounge': return '🛋️';
      case 'airport dining': return '🍽️';
      case 'airport transfer': return '🚗';
      case 'seat upgrade': return '💺';
      case 'spa treatment': return '💆';
      default: return '📋';
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'active': return 'success';
      case 'draft': return 'warning';
      case 'paused': return 'danger';
      case 'not active': return 'neutral';
      default: return 'neutral';
    }
  };

  const handleActivateTemplate = (template) => {
    setSelectedTemplateForEdit(template);
    setShowTemplateModal(true);
  };

  const handlePrepareComms = (editedTemplate) => {
    setShowTemplateModal(false);
    setSelectedTemplateForEdit(null);
    setToastMessage(`"${editedTemplate.title}" has been added to the Comms tab. Please plan your communications before activating.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  // Function to check if a template matches any existing revenue functions
  const getTemplateStatus = (template) => {
    // Check if template matches any existing function by comparing key attributes
    const matchingFunction = revenueFunctions.find(func => {
      // Compare by name similarity or key characteristics
      const nameMatch = func.name.toLowerCase().includes(template.title.toLowerCase()) ||
                       template.title.toLowerCase().includes(func.name.toLowerCase());
      
      // Compare by type/category
      const typeMatch = func.category === template.type;
      
      // Compare by target types (offers)
      const offerMatch = func.targetTypes.some(target => 
        template.offerSelection.some(offer => 
          target.toLowerCase().includes(offer.toLowerCase()) ||
          offer.toLowerCase().includes(target.toLowerCase())
        )
      );
      
      return nameMatch || (typeMatch && offerMatch);
    });
    
    if (matchingFunction) {
      return {
        status: matchingFunction.status,
        functionId: matchingFunction.id,
        functionName: matchingFunction.name
      };
    }
    
    return { status: 'Not Implemented' };
  };

  const filteredTemplates = templateLibrary.filter(template => {
    const searchTerm = templateSearch.toLowerCase();
    const matchesSearch = 
      template.title.toLowerCase().includes(searchTerm) ||
      template.description.toLowerCase().includes(searchTerm) ||
      template.trigger.toLowerCase().includes(searchTerm) ||
      template.timing.toLowerCase().includes(searchTerm) ||
      template.offerSelection.some(offer => offer.toLowerCase().includes(searchTerm)) ||
      (template.conditions && template.conditions.toLowerCase().includes(searchTerm));
    
    const matchesTypeFilter = templateFilter === 'all' || template.type.toLowerCase() === templateFilter.toLowerCase();
    
    const matchesProductFilter = templateProductFilter === 'all' || 
      template.trigger.toLowerCase().includes(templateProductFilter.toLowerCase()) ||
      template.offerSelection.some(offer => offer.toLowerCase().includes(templateProductFilter.toLowerCase()));
    
    const matchesPopularityFilter = templatePopularityFilter === 'all' || 
      (templatePopularityFilter === 'popular' && template.status === 'Active' && template.performance) ||
      (templatePopularityFilter === 'new' && template.status === 'Not Active');
    
    return matchesSearch && matchesTypeFilter && matchesProductFilter && matchesPopularityFilter;
  });

  return (
    <div className="revenue-optimizer-page">
      <div className="page-header">
        <h1 className="page-title">Revenue Optimizer</h1>
        <p className="page-subtitle">Build, communicate, and optimize your revenue functions</p>
      </div>

      {/* Core Capabilities Tabs */}
      <div className="capabilities-tabs">
        <button 
          className={`capability-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <span className="capability-icon">📋</span>
          <span className="capability-text">Overview</span>
          <span className="capability-desc">View your functions</span>
        </button>
        <button 
          className={`capability-tab ${activeTab === 'build' ? 'active' : ''}`}
          onClick={() => setActiveTab('build')}
        >
          <span className="capability-icon">🔨</span>
          <span className="capability-text">Build</span>
          <span className="capability-desc">Create revenue functions</span>
          <span className="tab-badge">{templateLibrary.length}</span>
        </button>
        <button 
          className={`capability-tab ${activeTab === 'comms' ? 'active' : ''}`}
          onClick={() => setActiveTab('comms')}
        >
          <span className="capability-icon">📢</span>
          <span className="capability-text">Comms</span>
          <span className="capability-desc">Manage communications</span>
          <span className="tab-badge">{revenueFunctions.reduce((total, func) => total + func.comms.length, 0)}</span>
        </button>
        <button 
          className={`capability-tab ${activeTab === 'review' ? 'active' : ''}`}
          onClick={() => setActiveTab('review')}
        >
          <span className="capability-icon">📊</span>
          <span className="capability-text">Performance</span>
          <span className="capability-desc">Analyze performance</span>
          <span className="tab-badge">{revenueFunctions.filter(func => func.status === 'Active').length}</span>
        </button>
      </div>

      <div className="capability-content">
        {/* OVERVIEW Tab */}
        {activeTab === 'overview' && (
          <RevenueOptimizerOverview 
            revenueFunctions={revenueFunctions}
            setActiveTab={setActiveTab}
            getBookingTypeIcon={getBookingTypeIcon}
            getStatusColor={getStatusColor}
          />
        )}

        {/* BUILD Tab */}
        {activeTab === 'build' && (
          <RevenueOptimizerBuild 
            buildSubTab={buildSubTab}
            setBuildSubTab={setBuildSubTab}
            templateSearch={templateSearch}
            setTemplateSearch={setTemplateSearch}
            templateFilter={templateFilter}
            setTemplateFilter={setTemplateFilter}
            templateProductFilter={templateProductFilter}
            setTemplateProductFilter={setTemplateProductFilter}
            templatePopularityFilter={templatePopularityFilter}
            setTemplatePopularityFilter={setTemplatePopularityFilter}
            filteredTemplates={filteredTemplates}
            getBookingTypeIcon={getBookingTypeIcon}
            getTemplateStatus={getTemplateStatus}
            handleActivateTemplate={handleActivateTemplate}
            setShowFunctionBuilder={setShowFunctionBuilder}
            showTemplateModal={showTemplateModal}
            setShowTemplateModal={setShowTemplateModal}
            selectedTemplateForEdit={selectedTemplateForEdit}
            handlePrepareComms={handlePrepareComms}
          />
        )}

        {/* COMMS Tab */}
        {activeTab === 'comms' && (
          <RevenueOptimizerComms 
            revenueFunctions={revenueFunctions}
            getStatusColor={getStatusColor}
            setShowCommsBuilder={setShowCommsBuilder}
          />
        )}

        {/* PERFORMANCE Tab */}
        {activeTab === 'review' && (
          <RevenueOptimizerPerformance 
            revenueFunctions={revenueFunctions}
          />
        )}
      </div>



      {/* Function Builder Modal */}
      {showFunctionBuilder && (
        <div className="modal-overlay" onClick={() => setShowFunctionBuilder(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create Revenue Function</h3>
              <button className="modal-close" onClick={() => setShowFunctionBuilder(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="function-builder">
                <div className="builder-section">
                  <h4>Function Name</h4>
                  <input type="text" placeholder="Enter function name..." className="function-name-input" />
                </div>

                <div className="builder-section">
                  <h4>Category</h4>
                  <select className="category-select">
                    <option>Cross-Sell</option>
                    <option>Upsell</option>
                    <option>Bundle</option>
                  </select>
                </div>

                <div className="builder-section">
                  <h4>Trigger Booking Types</h4>
                  <div className="booking-types-selector">
                    <label className="checkbox-label">
                      <input type="checkbox" /> ✈️ Flight
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" /> 🏨 Hotel
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" /> 🎫 Event Ticket
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" /> 📱 eSIM
                    </label>
                  </div>
                </div>

                <div className="builder-section">
                  <h4>Target Offers</h4>
                  <div className="offers-selector">
                    <label className="checkbox-label">
                      <input type="checkbox" /> 🏨 Hotel
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" /> ⚡ Fast Track
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" /> 🛋️ Airport Lounge
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" /> 🍽️ Airport Dining
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" /> 🚗 Airport Transfer
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn secondary" onClick={() => setShowFunctionBuilder(false)}>Cancel</button>
              <button className="btn primary">Create Function</button>
            </div>
          </div>
        </div>
      )}

      {/* Comms Builder Modal */}
      {showCommsBuilder && (
        <div className="modal-overlay" onClick={() => setShowCommsBuilder(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create Communication</h3>
              <button className="modal-close" onClick={() => setShowCommsBuilder(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="comms-builder">
                <div className="builder-section">
                  <h4>Communication Name</h4>
                  <input type="text" placeholder="Enter communication name..." className="comms-name-input" />
                </div>

                <div className="builder-section">
                  <h4>Type</h4>
                  <select className="comms-type-select">
                    <option>Email</option>
                    <option>SMS</option>
                    <option>Push Notification</option>
                    <option>In-App Message</option>
                  </select>
                </div>

                <div className="builder-section">
                  <h4>Associated Function</h4>
                  <select className="function-select">
                    <option>Flight to Hotel Cross-Sell</option>
                    <option>Airport Services Bundle</option>
                    <option>Premium Upgrade Path</option>
                  </select>
                </div>

                <div className="builder-section">
                  <h4>Message Content</h4>
                  <textarea 
                    placeholder="Enter your message content..." 
                    className="message-content"
                    rows="4"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn secondary" onClick={() => setShowCommsBuilder(false)}>Cancel</button>
              <button className="btn primary">Create Communication</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification">
          <div className="toast-content">
            <span className="toast-icon">✅</span>
            <span className="toast-message">{toastMessage}</span>
            <button className="toast-close" onClick={() => setShowToast(false)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RevenueOptimizer; 