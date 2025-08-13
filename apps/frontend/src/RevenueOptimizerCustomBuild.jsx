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
      progress: 3, // Step 3 of 7
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
      progress: 2, // Step 2 of 7
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
      <button className="build-btn primary" onClick={handleStartBuilding}>
        <span className="btn-icon">⚙️</span>
        Start New Function
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

      {inProgressFunctions.length > 0 && (
        <div className="draft-functions-section">
          <div className="section-header">
            <h4 className="draft-functions-title">Draft Functions ({inProgressFunctions.length})</h4>
            <p>Continue building your revenue functions</p>
          </div>
          
          <div className="draft-functions-grid">
            {inProgressFunctions.map(func => (
              <div key={func.id} className="draft-function-card">
                <div className="draft-function-header">
                  <div className="draft-function-info">
                    <h5>{func.title}</h5>
                    <p>{func.description}</p>
                    <div className="draft-function-meta">
                      <span className="category-badge">{func.type}</span>
                      <span className="status-badge warning">Draft</span>
                      <span className="progress-text">Step {func.progress} of 7</span>
                    </div>
                  </div>
                  <div className="draft-function-actions">
                    <button 
                      className="function-btn primary"
                      onClick={() => handleContinueBuilding(func)}
                    >
                      Continue Building
                    </button>
                    <button 
                      className="function-btn secondary"
                      onClick={() => handleDeleteFunction(func.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                <div className="draft-function-details">
                  <div className="draft-function-triggers">
                    <span className="section-label">Trigger:</span>
                    <span className="booking-type-tag">
                      {getBookingTypeIcon(func.trigger)} {func.trigger}
                    </span>
                  </div>
                  <div className="draft-function-timing">
                    <span className="section-label">Timing:</span>
                    <span className="timing-text">{func.timingAmount} {func.timingSequence}</span>
                  </div>
                  <div className="draft-function-offers">
                    <span className="section-label">Offers:</span>
                    {func.offerSelection.map(offer => (
                      <span key={offer} className="booking-type-tag target">
                        {getBookingTypeIcon(offer)} {offer}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="draft-function-footer">
                  <span className="last-modified">Last modified: {formatLastModified(func.lastModified)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {inProgressFunctions.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🎯</div>
          <h4>No Custom Functions Yet</h4>
          <p>Start building your first custom revenue function to unlock advanced targeting and logic</p>
          <button className="build-btn primary" onClick={handleStartBuilding}>
            <span className="btn-icon">⚙️</span>
            Create Your First Function
          </button>
        </div>
      )}

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