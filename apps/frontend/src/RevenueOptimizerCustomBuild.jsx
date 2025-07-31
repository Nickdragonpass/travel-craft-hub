import React, { useState, useEffect } from 'react';
import RevenueOptimizerCustomBuildNew from './RevenueOptimizerCustomBuildNew';

function RevenueOptimizerCustomBuild({ 
  setShowFunctionBuilder,
  getBookingTypeIcon,
  handlePrepareComms
}) {
  // Mock data for in-progress functions - in real app this would come from backend
  const [inProgressFunctions, setInProgressFunctions] = useState([
    {
      id: 1,
      title: 'Premium Flight Upsell',
      description: 'Upsell premium seats and lounge access for business travelers',
      type: 'Upsell',
      trigger: 'Flight Booking',
      timingAmount: '24hrs',
      timingSequence: 'After',
      offerSelection: ['Seat Upgrade', 'Airport Lounge'],
      progress: 3, // Step 3 of 4
      lastModified: '2024-01-15T10:30:00Z',
      status: 'Draft'
    },
    {
      id: 2,
      title: 'Hotel Cross-Sell Bundle',
      description: 'Cross-sell airport transfers and activities for hotel bookings',
      type: 'Cross-Sell',
      trigger: 'Hotel Booking',
      timingAmount: '2 days',
      timingSequence: 'After',
      offerSelection: ['Airport Transfer', 'Event Ticket'],
      progress: 2, // Step 2 of 4
      lastModified: '2024-01-14T16:45:00Z',
      status: 'Draft'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingFunction, setEditingFunction] = useState(null);

  const availableOffers = [
    'Hotel', 'Flight', 'Airport Lounge', 'Fast Track', 'Airport Transfer', 
    'eSIM', 'Seat Upgrade', 'Event Ticket', 'Spa Treatment'
  ];

  const availableTriggers = [
    'Flight Booking', 'Flight Departure', 'Flight Day', 'Hotel Booking', 
    'Hotel Check-in', 'Car Rental', 'Activity Booking', 'Package Purchase'
  ];

  const timingOptions = [
    'Immediately', '24hrs', '2 days', '3 days', '5 days', 
    '1 week', '2 weeks', '1 month', '3 months'
  ];

  const handleStartBuilding = () => {
    setEditingFunction(null);
    setShowModal(true);
  };

  const handleContinueBuilding = (functionData) => {
    setEditingFunction(functionData);
    setShowModal(true);
  };

  const handleDeleteFunction = (functionId) => {
    setInProgressFunctions(prev => prev.filter(f => f.id !== functionId));
  };

  const formatLastModified = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const handleSaveFunction = (functionToSave) => {
    if (editingFunction) {
      // Update existing function
      setInProgressFunctions(prev => 
        prev.map(f => f.id === editingFunction.id ? functionToSave : f)
      );
    } else {
      // Create new function
      const newFunction = {
        ...functionToSave,
        id: Date.now() // Simple ID generation for demo
      };
      setInProgressFunctions(prev => [...prev, newFunction]);
    }

    console.log('Saving custom function:', functionToSave);
    handlePrepareComms(functionToSave);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFunction(null);
  };



  const renderDraftButton = () => (
    <div className="draft-button-container">
      <button className="draft-button">
        Draft Functions [{inProgressFunctions.length}]
      </button>
    </div>
  );

  const renderEmptyState = () => (
    <div className="empty-state">
      <div className="empty-icon">🎯</div>
      <h4>No Custom Functions Yet</h4>
      <p>Start building your first custom revenue function to unlock advanced targeting and logic</p>
      <button className="build-btn primary" onClick={handleStartBuilding}>
        <span className="btn-icon">⚙️</span>
        Create Your First Function
      </button>
    </div>
  );

  const renderLandingPage = () => (
    <div className="custom-builder-content">
      <div className="content-header">
        <div className="header-top">
          <div className="header-left">
            <h4>Custom Revenue Function Builder</h4>
            <p>Create advanced revenue functions with custom logic, conditions, and targeting</p>
          </div>
          <div className="header-right">
            {renderDraftButton()}
          </div>
        </div>
      </div>

      <div className="new-function-section">
        <button className="build-btn primary large" onClick={handleStartBuilding}>
          <span className="btn-icon">⚙️</span>
          Start New Function
        </button>
      </div>

      <div className="builder-features">
        <div className="feature-item">
          <span className="feature-icon">🎯</span>
          <span>Advanced Triggers</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">⚡</span>
          <span>Custom Logic</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">📊</span>
          <span>Conditional Rules</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🎨</span>
          <span>Flexible Offers</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="custom-builder-section">
      {renderLandingPage()}
      
      <RevenueOptimizerCustomBuildNew
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveFunction}
        editingFunction={editingFunction}
        getBookingTypeIcon={getBookingTypeIcon}
      />
    </div>
  );
}

export default RevenueOptimizerCustomBuild; 