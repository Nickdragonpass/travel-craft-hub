import React, { useState, useEffect } from 'react';
import RevenueOptimizerCustomBuild from './RevenueOptimizerCustomBuild';

function RevenueOptimizerBuild({ 
  buildSubTab, 
  setBuildSubTab, 
  templateSearch, 
  setTemplateSearch, 
  templateFilter, 
  setTemplateFilter, 
  templateProductFilter,
  setTemplateProductFilter,
  templatePopularityFilter,
  setTemplatePopularityFilter,
  filteredTemplates, 
  getBookingTypeIcon, 
  getTemplateStatus,
  handleActivateTemplate, 
  setShowFunctionBuilder,
  showTemplateModal,
  setShowTemplateModal,
  selectedTemplateForEdit,
  handlePrepareComms,
  handlePauseTemplate,
  handleEditTemplate
}) {
  const [editedTemplate, setEditedTemplate] = useState(null);

  // Initialize edited template when modal opens
  useEffect(() => {
    if (selectedTemplateForEdit) {
      setEditedTemplate({
        ...selectedTemplateForEdit,
        offerSelection: [...selectedTemplateForEdit.offerSelection],
        timingAmount: selectedTemplateForEdit.timingAmount || '24hrs',
        timingSequence: selectedTemplateForEdit.timingSequence || 'After'
      });
    }
  }, [selectedTemplateForEdit]);

  const handleInputChange = (field, value) => {
    if (editedTemplate) {
      setEditedTemplate(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleCloseModal = () => {
    setShowTemplateModal(false);
    setTimeout(() => setEditedTemplate(null), 100);
  };

  const handleOfferToggle = (offer) => {
    setEditedTemplate(prev => ({
      ...prev,
      offerSelection: prev.offerSelection.includes(offer)
        ? prev.offerSelection.filter(o => o !== offer)
        : [...prev.offerSelection, offer]
    }));
  };

  const availableOffers = [
    'Hotel', 'Flight', 'Airport Lounge', 'Fast Track', 'Airport Transfer', 
    'eSIM', 'Seat Upgrade', 'Event Ticket', 'Spa Treatment'
  ];

  return (
    <div className="build-section">
      {/* Build Sub-tabs */}
      <div className="build-sub-tabs">
        <button 
          className={`build-sub-tab ${buildSubTab === 'templates' ? 'active' : ''}`}
          onClick={() => setBuildSubTab('templates')}
        >
          <span className="sub-tab-icon">🚀</span>
          Templates
        </button>
        <button 
          className={`build-sub-tab ${buildSubTab === 'custom' ? 'active' : ''}`}
          onClick={() => setBuildSubTab('custom')}
        >
          <span className="sub-tab-icon">⚙️</span>
          Build Custom
        </button>
      </div>

      {/* Templates Sub-tab */}
      {buildSubTab === 'templates' && (
        <div className="templates-sub-section">
          <div className="template-library">
            <div className="template-controls">
              <div className="template-search">
                <label className="filter-label">Search</label>
                <input 
                  type="text" 
                  placeholder="Search templates..." 
                  value={templateSearch}
                  onChange={(e) => setTemplateSearch(e.target.value)}
                  className="template-search-input"
                />
              </div>
              <div className="template-filters">
                <div className="filter-group">
                  <label className="filter-label">Type</label>
                  <select 
                    value={templateFilter} 
                    onChange={(e) => setTemplateFilter(e.target.value)}
                    className="modern-select"
                  >
                    <option value="all">All Types</option>
                    <option value="Cross-Sell">Cross-Sell</option>
                    <option value="Upsell">Upsell</option>
                    <option value="Bundle">Bundle</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label className="filter-label">Product</label>
                  <select 
                    value={templateProductFilter} 
                    onChange={(e) => setTemplateProductFilter(e.target.value)}
                    className="modern-select"
                  >
                    <option value="all">All Products</option>
                    <option value="Flight">Flight</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Airport Lounge">Airport Lounge</option>
                    <option value="Fast Track">Fast Track</option>
                    <option value="Airport Transfer">Airport Transfer</option>
                    <option value="eSIM">eSIM</option>
                    <option value="Seat Upgrade">Seat Upgrade</option>
                    <option value="Event Ticket">Event Ticket</option>
                    <option value="Spa Treatment">Spa Treatment</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label className="filter-label">Popularity</label>
                  <select 
                    value={templatePopularityFilter} 
                    onChange={(e) => setTemplatePopularityFilter(e.target.value)}
                    className="modern-select"
                  >
                    <option value="all">All Templates</option>
                    <option value="popular">Popular (Active)</option>
                    <option value="new">New (Not Active)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="template-grid">
              {filteredTemplates.map(template => {
                const implementationStatus = getTemplateStatus(template);
                return (
                  <div key={template.id} className="template-card">
                    <div className="template-header">
                      <h4>{template.title}</h4>
                      <div className="template-meta">
                        <span className={`template-type ${template.type.toLowerCase()}`}>{template.type}</span>
                        {implementationStatus.status !== 'Not Implemented' ? (
                          <span className={`implementation-status ${implementationStatus.status.toLowerCase()}`}>
                            {implementationStatus.status === 'Active' ? '✅ Active' : '📝 Draft'}
                          </span>
                        ) : (
                          <span className={`template-status ${template.status.toLowerCase().replace(' ', '-')}`}>
                            {template.status}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="template-description">{template.description}</p>
                    
                    <div className="template-details">
                      <div className="template-trigger">
                        <span className="detail-label">Trigger:</span>
                        <span className="detail-value">{template.trigger}</span>
                      </div>
                      <div className="template-timing">
                        <span className="detail-label">Timing:</span>
                        <span className="detail-value">{template.timing}</span>
                      </div>
                      {template.conditions && (
                        <div className="template-conditions">
                          <span className="detail-label">Conditions:</span>
                          <span className="detail-value">{template.conditions}</span>
                        </div>
                      )}
                      <div className="template-offers">
                        <span className="detail-label">Offers:</span>
                        <div className="offer-icons">
                          {template.offerSelection.map(offer => (
                            <span key={offer} className="offer-icon">
                              {getBookingTypeIcon(offer)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {template.status === 'Active' && template.performance && (
                      <div className="template-performance">
                        <div className="perf-metric">
                          <span className="perf-label">Revenue</span>
                          <span className="perf-value">{template.performance.revenue}</span>
                        </div>
                        <div className="perf-metric">
                          <span className="perf-label">Conversion</span>
                          <span className="perf-value">{template.performance.conversionRate}</span>
                        </div>
                        <div className="perf-metric">
                          <span className="perf-label">Comms</span>
                          <span className="perf-value">{template.performance.comms}</span>
                        </div>
                      </div>
                    )}

                    <div className="template-actions">
                      {template.status === 'Active' || template.status === 'active' ? (
                        <div className="active-template-actions" style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            className="template-btn secondary"
                            onClick={() => handlePauseTemplate(template)}
                          >
                            Pause
                          </button>
                          <button 
                            className="template-btn primary"
                            onClick={() => handleEditTemplate(template)}
                          >
                            Edit
                          </button>
                        </div>
                      ) : implementationStatus.status === 'Active' ? (
                        <button className="template-btn primary">View Performance</button>
                      ) : implementationStatus.status === 'Draft' ? (
                        <button className="template-btn secondary">Continue Building</button>
                      ) : (
                        <button 
                          className="template-btn primary"
                          onClick={() => handleActivateTemplate(template)}
                        >
                          Activate
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Template Edit Modal */}
      {showTemplateModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
          {editedTemplate && (
            <>
              <div className="modal-header">
                <h3>Edit Revenue Function</h3>
                <button 
                  className="modal-close" 
                  onClick={handleCloseModal}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-body">
                <div className="template-edit-form">
                  <div className="form-section">
                    <h4>Basic Information</h4>
                    <div className="form-group">
                      <label>Function Name</label>
                      <input
                        type="text"
                        value={editedTemplate.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={editedTemplate.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="form-input"
                        rows="3"
                      />
                    </div>
                  </div>

                                      <div className="form-section">
                      <h4>Function Logic</h4>
                      <div className="form-group">
                        <label style={{ marginBottom: '0.5rem', display: 'block' }}>
                          <span style={{ fontWeight: 'normal' }}>
                            <strong>{editedTemplate.title || 'Function Name'}</strong> should be sent{' '}
                            <select
                              value={editedTemplate.timingAmount || '24hrs'}
                              onChange={(e) => handleInputChange('timingAmount', e.target.value)}
                              className="form-input"
                              style={{ 
                                display: 'inline-block', 
                                width: 'auto', 
                                minWidth: '120px',
                                margin: '0 0.25rem',
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.9rem'
                              }}
                            >
                              <option value="Immediately">Immediately</option>
                              <option value="24hrs">24hrs</option>
                              <option value="2 days">2 days</option>
                              <option value="3 days">3 days</option>
                              <option value="5 days">5 days</option>
                              <option value="1 week">1 week</option>
                              <option value="2 weeks">2 weeks</option>
                              <option value="1 month">1 month</option>
                              <option value="3 months">3 months</option>
                            </select>
                            {' '}
                            <select
                              value={editedTemplate.timingSequence || 'After'}
                              onChange={(e) => handleInputChange('timingSequence', e.target.value)}
                              className="form-input"
                              style={{ 
                                display: 'inline-block', 
                                width: 'auto', 
                                minWidth: '80px',
                                margin: '0 0.25rem',
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.9rem'
                              }}
                            >
                              <option value="Before">Before</option>
                              <option value="After">After</option>
                            </select>
                            {' '}
                            <select
                              value={editedTemplate.trigger}
                              onChange={(e) => handleInputChange('trigger', e.target.value)}
                              className="form-input"
                              style={{ 
                                display: 'inline-block', 
                                width: 'auto', 
                                minWidth: '140px',
                                margin: '0 0.25rem',
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.9rem'
                              }}
                            >
                              <option value="Flight Booking">Flight Booking</option>
                              <option value="Flight Departure">Flight Departure</option>
                              <option value="Flight Day">Flight Day</option>
                              <option value="Hotel Booking">Hotel Booking</option>
                              <option value="Hotel Check-in">Hotel Check-in</option>
                            </select>
                          </span>
                        </label>
                      </div>
                    </div>

                  <div className="form-section">
                    <h4>Offers</h4>
                    <div className="offers-grid">
                      {availableOffers.map(offer => (
                        <label key={offer} className="offer-checkbox">
                          <input
                            type="checkbox"
                            checked={editedTemplate.offerSelection.includes(offer)}
                            onChange={() => handleOfferToggle(offer)}
                          />
                          <span className="offer-label">
                            {getBookingTypeIcon(offer)} {offer}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  className="modal-btn secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button 
                  className="modal-btn primary"
                  onClick={() => handlePrepareComms(editedTemplate)}
                >
                  Prepare Comms
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      )}

      {/* Build Custom Sub-tab */}
      {buildSubTab === 'custom' && (
        <RevenueOptimizerCustomBuild
          setShowFunctionBuilder={setShowFunctionBuilder}
          getBookingTypeIcon={getBookingTypeIcon}
          handlePrepareComms={handlePrepareComms}
        />
      )}
    </div>
  );
}

export default RevenueOptimizerBuild; 