import React, { useState, useEffect } from 'react';
import Step1BasicInfo from './RevenueOptimizerCustomBuildSteps/Step1BasicInfo';
import Step2Triggers from './RevenueOptimizerCustomBuildSteps/Step2Triggers';
import Step3Targeting from './RevenueOptimizerCustomBuildSteps/Step3Targeting';
import Step4Timing from './RevenueOptimizerCustomBuildSteps/Step4Timing';
import Step5Offers from './RevenueOptimizerCustomBuildSteps/Step5Offers';
import Step6Comms from './RevenueOptimizerCustomBuildSteps/Step6Comms';
import Step7Review from './RevenueOptimizerCustomBuildSteps/Step7Review';

function RevenueOptimizerCustomBuildNew({ 
  isOpen, 
  onClose, 
  onSave, 
  editingFunction = null,
  getBookingTypeIcon 
}) {
  const [customFunction, setCustomFunction] = useState({
    // Basic Info
    title: '',
    description: '',
    functionType: 'Select',
    objectives: [],
            priority: 'Medium',
    tags: [],
    status: 'Draft',
    
    // Trigger Definition
    triggerEvents: [],
    triggerConditions: [],
    triggerFrequency: 'One-time',
    eventSources: ['Booking event'],
    
    // Persona & Targeting
    personaGroups: [],
    exclusions: {
      personas: [],
      loyaltyTiers: [],
      geo: [],
      cardTypes: []
    },
    userLimits: {
      perUserPerDay: 1,
      perUserPerWeek: 3,
      maxTriggersPerProgram: 1000
    },
    
    // Timing Logic
    timingLogic: {
      timeWindows: {
        enabled: false,
        startTime: '08:00',
        endTime: '20:00',
        timezone: 'local'
      },
      bufferPeriod: {
        enabled: false,
        hours: 2
      }
    },
    
    // Offer/Action Definition
    offerSelection: [],
    offerFallback: {
      enabled: false,
      fallbackOffers: []
    },
    offerVisibilityRules: {
      maxPrice: null,
      minInventory: null
    },
    
    // Communication Setup
    channels: ['Concierge'],
    messageTemplate: {
      type: 'saved', // 'saved' or 'new'
      templateId: null,
      content: '',
      language: 'English',
      tone: 'Formal',
      aiCopywriting: false
    },
    
    // AI Support
    aiOptimization: {
      autoOptimization: false,
      suggestSegments: false
    },
    
    // Control & Auditing
    testMode: false,
    auditTrail: {
      createdBy: 'Current User',
      createdAt: new Date().toISOString(),
      lastModifiedBy: 'Current User',
      lastModifiedAt: new Date().toISOString()
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState({});
  const [tagInput, setTagInput] = useState('');
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const totalSteps = 7;

  // Available options
  const functionTypes = ['Select', 'Upsell', 'Cross-sell'];
  const objectives = [
    // Revenue & Commercial Objectives
    { id: 'revenue_uplift', name: 'Revenue uplift', description: 'Drive incremental revenue through offers', category: 'Revenue & Commercial' },
    { id: 'ancillary_attach', name: 'Ancillary attach rate', description: 'Increase % of bookings with ancillaries (bags, seats, lounge, etc.)', category: 'Revenue & Commercial' },
    { id: 'basket_size', name: 'Basket size increase', description: 'Drive higher average booking or transaction value', category: 'Revenue & Commercial' },
    { id: 'upgrade_conversion', name: 'Upgrade conversion', description: 'Convert more users to premium options (e.g. flight class, hotel room)', category: 'Revenue & Commercial' },
    { id: 'offer_redemption', name: 'Offer redemption rate', description: 'Track how often offered upsells are accepted', category: 'Revenue & Commercial' },
    { id: 'booking_completion', name: 'Booking completion rate', description: 'Reduce abandonment by nudging users who start but don\'t finish', category: 'Revenue & Commercial' },
    { id: 'payment_adoption', name: 'Payment method adoption', description: 'Promote preferred payment rails (e.g. proprietary card, BNPL)', category: 'Revenue & Commercial' },
    { id: 'supplier_mix', name: 'Supplier mix optimization', description: 'Shift bookings to preferred/negotiated suppliers', category: 'Revenue & Commercial' },
    
    // Retention & Loyalty Objectives
    { id: 'repeat_booking', name: 'Repeat booking rate', description: 'Increase how often a user books again in a set period', category: 'Retention & Loyalty' },
    { id: 'loyalty_participation', name: 'Loyalty program participation', description: 'Encourage more users to enroll in or engage with a loyalty program', category: 'Retention & Loyalty' },
    { id: 'points_redemption', name: 'Points redemption volume', description: 'Boost loyalty point usage (reduces financial liability for banks)', category: 'Retention & Loyalty' },
    { id: 'card_usage', name: 'Card usage frequency', description: 'Drive card spend through exclusive offers tied to usage', category: 'Retention & Loyalty' },
    { id: 'product_stickiness', name: 'Product stickiness', description: 'Encourage engagement with multiple bank products (e.g. travel + card + app)', category: 'Retention & Loyalty' },
    { id: 'tier_retention', name: 'Tier retention or uplift', description: 'Help users maintain or reach a higher tier by encouraging qualifying spend', category: 'Retention & Loyalty' },
    
    // Engagement & Experience Objectives
    { id: 'customer_delight', name: 'Customer delight', description: 'Surprise-and-delight offers to improve NPS or perception', category: 'Engagement & Experience' },
    { id: 'offer_engagement', name: 'Offer engagement rate', description: '% of customers clicking/opening an offer', category: 'Engagement & Experience' },
    { id: 'channel_engagement', name: 'Channel engagement', description: 'Track performance of SMS vs push vs concierge, etc.', category: 'Engagement & Experience' },
    { id: 'personalization', name: 'Personalization accuracy', description: 'Improve match rate of offer to persona or intent', category: 'Engagement & Experience' },
    { id: 'conversion_time', name: 'Conversion time reduction', description: 'Shorten the time between trigger → conversion', category: 'Engagement & Experience' },
    
    // Operational & Support Objectives
    { id: 'support_deflection', name: 'Support deflection', description: 'Reduce inbound customer service load by pre-emptively resolving gaps', category: 'Operational & Support' },
    { id: 'concierge_balancing', name: 'Concierge load balancing', description: 'Use functions to route or automate low-touch upsells', category: 'Operational & Support' },
    { id: 'disruption_mitigation', name: 'Involuntary disruption mitigation', description: 'Trigger compensatory or goodwill offers post-disruption', category: 'Operational & Support' },
    
    // Strategic & Long-Term Value Objectives
    { id: 'first_engagement', name: 'First-time engagement', description: 'Activate users who\'ve never booked travel', category: 'Strategic & Long-Term Value' },
    { id: 'persona_shift', name: 'Persona behavior shift', description: 'Guide a segment toward new behaviors (e.g. lounge usage, longer stays)', category: 'Strategic & Long-Term Value' },
    { id: 'cross_sell_trial', name: 'Product cross-sell trial', description: 'Encourage use of other verticals (e.g. user books hotel → offer eSIM)', category: 'Strategic & Long-Term Value' },
    { id: 'data_enrichment', name: 'Data enrichment', description: 'Incentivize users to share data (calendar sync, preferences)', category: 'Strategic & Long-Term Value' },
    { id: 'corporate_adoption', name: 'Corporate adoption', description: 'Drive SMEs into corporate travel module via incentive', category: 'Strategic & Long-Term Value' }
  ];
  const priorities = ['Low', 'Medium', 'High'];
  const triggerEvents = [
    'Flight Booking', 'Flight Departure', 'Flight Day', 'Hotel Booking', 
    'Hotel Check-in', 'Car Rental', 'Activity Booking', 'Package Purchase',
    'Lounge Visit', 'Transfer Booking', 'eSIM Activation'
  ];
  const triggerFrequencies = ['One-time', 'Repeating', 'Cooldown'];
  const eventSources = ['Booking event', 'Concierge event', 'External API event', 'CRM data', 'Travel signal'];
  const availableOffers = [
    'Hotel', 'Flight', 'Airport Lounge', 'Fast Track', 'Airport Transfer', 
    'eSIM', 'Seat Upgrade', 'Event Ticket', 'Spa Treatment', 'Dining', 'Wellness'
  ];
  const channels = ['Concierge', 'Email', 'SMS', 'App Push', 'WhatsApp', 'In-app Banner'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese'];
  const tones = ['Formal', 'Casual', 'Fun', 'Luxury', 'Match Persona Default'];

  // Initialize form when editing or when page opens
  useEffect(() => {
    if (editingFunction) {
      setCustomFunction({
        ...customFunction,
        ...editingFunction
      });
      setCurrentStep(editingFunction.progress || 1);
    } else {
      setCustomFunction({
        // Basic Info
        title: '',
        description: '',
        functionType: 'Select',
        objectives: [],
        priority: 'Medium',
        tags: [],
        status: 'Draft',
        
        // Trigger Definition
        triggerEvents: [],
        triggerConditions: [],
        triggerFrequency: 'One-time',
        eventSources: ['Booking event'],
        
        // Persona & Targeting
        personaGroups: [],
        exclusions: {
          personas: [],
          loyaltyTiers: [],
          geo: [],
          cardTypes: []
        },
        userLimits: {
          perUserPerDay: 1,
          perUserPerWeek: 3,
          maxTriggersPerProgram: 1000
        },
        
        // Timing Logic
        timingLogic: {
          timeWindows: {
            enabled: false,
            startTime: '08:00',
            endTime: '20:00',
            timezone: 'local'
          },
          bufferPeriod: {
            enabled: false,
            hours: 2
          }
        },
        
        // Offer/Action Definition
        offerSelection: [],
        offerFallback: {
          enabled: false,
          fallbackOffers: []
        },
        offerVisibilityRules: {
          maxPrice: null,
          minInventory: null
        },
        
        // Communication Setup
        channels: ['Concierge'],
        messageTemplate: {
          type: 'saved',
          templateId: null,
          content: '',
          language: 'English',
          tone: 'Formal',
          aiCopywriting: false
        },
        
        // AI Support
        aiOptimization: {
          autoOptimization: false,
          suggestSegments: false
        },
        
        // Control & Auditing
        testMode: false,
        auditTrail: {
          createdBy: 'Current User',
          createdAt: new Date().toISOString(),
          lastModifiedBy: 'Current User',
          lastModifiedAt: new Date().toISOString()
        }
      });
      setCurrentStep(1);
    }
  }, [editingFunction, isOpen]);

  const handleInputChange = (field, value) => {
    setCustomFunction(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parentField, childField, value) => {
    setCustomFunction(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value
      }
    }));
  };

  const handleArrayToggle = (field, value) => {
    setCustomFunction(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    setSaveStatus('Saving draft...');
    
    try {
      const functionToSave = {
        ...customFunction,
        progress: currentStep,
        lastModified: new Date().toISOString(),
        status: 'Draft'
      };

      if (editingFunction) {
        functionToSave.id = editingFunction.id;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(functionToSave);
      setSaveStatus('Draft saved successfully!');
      
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('Error saving draft');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAndComplete = async () => {
    setIsSaving(true);
    setSaveStatus('Saving function...');
    
    try {
      const functionToSave = {
        ...customFunction,
        progress: totalSteps,
        lastModified: new Date().toISOString(),
        status: 'Active'
      };

      if (editingFunction) {
        functionToSave.id = editingFunction.id;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(functionToSave);
      onClose();
    } catch (error) {
      setSaveStatus('Error saving function');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (step) => {
    // Only allow navigation to completed steps or current step
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const handleToggleCategory = (category) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const getSelectedCountForCategory = (category) => {
    const categoryObjectives = objectives.filter(obj => obj.category === category);
    return categoryObjectives.filter(obj => customFunction.objectives.includes(obj.id)).length;
  };

  // Pre-defined tags organized by category
  const predefinedTags = {
    '🎯 Engagement Type': ['upsell', 'cross-sell', 'delight', 'reminder', 'recovery', 'retargeting'],
    '✈️ Booking Type': ['flight', 'hotel', 'activity', 'ticket', 'airport transfer', 'fast track', 'lounge', 'dining', 'eSIM'],
    '👤 Persona / Customer Focus': ['VIP', 'frequent traveler', 'corporate', 'new user', 'high spender', 'inactive'],
    '💡 Objective Themes': ['loyalty', 'revenue', 'support', 'conversion', 'tier uplift', 'retention'],
    '🌎 Contextual or Situational': ['last minute', 'holiday season', 'pre trip', 'in trip', 'post trip', 'weather alert']
  };

  const allPredefinedTags = Object.values(predefinedTags).flat();

  const isPredefinedTag = (tag) => {
    return allPredefinedTags.includes(tag);
  };

  const getFilteredTagSuggestions = () => {
    if (!tagInput.trim()) return [];
    
    const input = tagInput.toLowerCase();
    const usedTags = customFunction.tags.map(tag => tag.toLowerCase());
    
    return allPredefinedTags.filter(tag => 
      tag.toLowerCase().includes(input) && !usedTags.includes(tag.toLowerCase())
    );
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
    setShowTagSuggestions(e.target.value.trim().length > 0);
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(tagInput.trim());
    } else if (e.key === 'Backspace' && tagInput === '' && customFunction.tags.length > 0) {
      // Remove last tag on backspace if input is empty
      removeTag(customFunction.tags[customFunction.tags.length - 1]);
    }
  };

  const addTag = (tag) => {
    if (!tag || customFunction.tags.includes(tag)) return;
    
    setCustomFunction(prev => ({
      ...prev,
      tags: [...prev.tags, tag]
    }));
    setTagInput('');
    setShowTagSuggestions(false);
  };

  const removeTag = (tagToRemove) => {
    setCustomFunction(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const selectSuggestion = (suggestion) => {
    addTag(suggestion);
  };

  const renderBreadcrumbs = () => (
    <div className="breadcrumbs">
      <button className="breadcrumb-link" onClick={onClose}>
        Revenue Optimizer
      </button>
      <span className="breadcrumb-separator">/</span>
      <button className="breadcrumb-link" onClick={onClose}>
        Build
      </button>
      <span className="breadcrumb-separator">/</span>
      <span className="breadcrumb-current">
        {editingFunction ? 'Edit Function' : 'New Function'}
      </span>
    </div>
  );

  const renderStepIndicator = () => (
    <div className="step-indicator">
      {[1, 2, 3, 4, 5, 6, 7].map(step => {
        const stepLabels = ['Basic Info', 'Triggers', 'Targeting', 'Timing', 'Offers', 'Comms', 'Review'];
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        const isClickable = step <= currentStep;
        
        return (
          <div 
            key={step} 
            className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isClickable ? 'clickable' : ''}`}
            onClick={() => isClickable && handleStepClick(step)}
          >
            <span className="step-number">
              {isCompleted ? '✓' : step}
            </span>
            <span className="step-label">{stepLabels[step - 1]}</span>
          </div>
        );
      })}
    </div>
  );

  const renderHeader = () => (
    <div className="builder-header">
      <div className="header-content">
        <h1>
          {editingFunction ? 'Edit Custom Function' : 'Create New Function'}
        </h1>
        <p className="header-subtitle">
          {editingFunction ? `Editing: ${editingFunction.title}` : 'Build advanced revenue functions with custom logic and targeting'}
        </p>
      </div>
      
      <div className="header-actions">
        <button 
          className="btn secondary"
          onClick={handleSaveDraft}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Draft'}
        </button>
        
        <button 
          className="btn secondary"
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="builder-step">
      <h4>Basic Information & Objective</h4>
      
      <div className="form-group">
        <label>Function Name *</label>
        <input
          type="text"
          value={customFunction.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="form-input"
          placeholder="Enter function name..."
        />
      </div>

      <div className="form-group">
        <label>Description *</label>
        <textarea
          value={customFunction.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="form-input"
          rows="3"
          placeholder="Describe what this function does..."
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Function Type</label>
          <select
            value={customFunction.functionType}
            onChange={(e) => handleInputChange('functionType', e.target.value)}
            className="form-input"
          >
            {functionTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Objectives *</label>
        <p className="help-text">Select one or more objectives that this function will help achieve</p>
        
        <div className="objectives-container">
          {['Revenue & Commercial', 'Retention & Loyalty', 'Engagement & Experience', 'Operational & Support', 'Strategic & Long-Term Value'].map(category => {
            const categoryObjectives = objectives.filter(obj => obj.category === category);
            const categoryIcon = {
              'Revenue & Commercial': '💰',
              'Retention & Loyalty': '🔁',
              'Engagement & Experience': '🎯',
              'Operational & Support': '🛟',
              'Strategic & Long-Term Value': '🔮'
            }[category];
            const selectedCount = getSelectedCountForCategory(category);
            const isCollapsed = collapsedCategories[category];
            
            return (
              <div key={category} className="objective-category">
                <div 
                  className="category-header clickable"
                  onClick={() => handleToggleCategory(category)}
                >
                  <div className="category-header-left">
                    <span className="category-icon">{categoryIcon}</span>
                    <span className="category-name">{category}</span>
                  </div>
                  <div className="category-header-right">
                    <span className="selected-count">{selectedCount} selected</span>
                    <span className={`collapse-icon ${isCollapsed ? 'collapsed' : ''}`}>
                      {isCollapsed ? '▼' : '▲'}
                    </span>
                  </div>
                </div>
                {!isCollapsed && (
                  <div className="objectives-grid">
                    {categoryObjectives.map(objective => (
                      <label key={objective.id} className="objective-checkbox">
                        <input
                          type="checkbox"
                          checked={customFunction.objectives.includes(objective.id)}
                          onChange={() => handleArrayToggle('objectives', objective.id)}
                        />
                        <div className="objective-content">
                          <span className="objective-name">{objective.name}</span>
                          <span className="objective-description">{objective.description}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Priority *</label>
          <select
            value={customFunction.priority}
            onChange={(e) => handleInputChange('priority', e.target.value)}
            className="form-input"
          >
            {priorities.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Tags (Optional)</label>
          <p className="help-text">Type and press Enter to add tags. You can select from suggestions or create custom tags.</p>
          
          <div className="tag-input-container">
            <div className="tag-input-wrapper">
              {customFunction.tags.map(tag => (
                <span key={tag} className={`tag ${isPredefinedTag(tag) ? 'tag-predefined' : 'tag-custom'}`}>
                  {tag}
                  <button 
                    type="button" 
                    className="tag-remove"
                    onClick={() => removeTag(tag)}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleTagInputKeyDown}
                onFocus={() => setShowTagSuggestions(true)}
                onBlur={() => setTimeout(() => setShowTagSuggestions(false), 200)}
                className="tag-input"
                placeholder={customFunction.tags.length === 0 ? "Type to add tags..." : ""}
              />
            </div>
            
            {showTagSuggestions && getFilteredTagSuggestions().length > 0 && (
              <div className="tag-suggestions">
                <div className="suggestions-header">
                  <span>Suggestions:</span>
                </div>
                <div className="suggestions-list">
                  {getFilteredTagSuggestions().slice(0, 8).map(suggestion => (
                    <button
                      key={suggestion}
                      type="button"
                      className="suggestion-item"
                      onClick={() => selectSuggestion(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          

        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="builder-step">
      <h4>Trigger Definition</h4>
      
      <div className="form-group">
        <label>Trigger Event *</label>
        <select
          value={customFunction.triggerEvent}
          onChange={(e) => handleInputChange('triggerEvent', e.target.value)}
          className="form-input"
        >
          {triggerEvents.map(event => (
            <option key={event} value={event}>{event}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Trigger Conditions</label>
        <div className="conditions-builder">
          <div className="condition-row">
            <select className="form-input">
              <option value="no_bag">Flight booked without a bag</option>
              <option value="international_long_layover">Flight is international AND &gt;5h layover</option>
              <option value="no_reward_used">No reward used on booking</option>
              <option value="high_value">Booking value &gt; £500</option>
              <option value="business_traveler">Business traveler</option>
            </select>
            <select className="form-input">
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
            <select className="form-input">
              <option value="no_bag">Flight booked without a bag</option>
              <option value="international_long_layover">Flight is international AND &gt;5h layover</option>
              <option value="no_reward_used">No reward used on booking</option>
              <option value="high_value">Booking value &gt; £500</option>
              <option value="business_traveler">Business traveler</option>
            </select>
            <button className="btn-icon">+</button>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Trigger Frequency</label>
          <select
            value={customFunction.triggerFrequency}
            onChange={(e) => handleInputChange('triggerFrequency', e.target.value)}
            className="form-input"
          >
            {triggerFrequencies.map(freq => (
              <option key={freq} value={freq}>{freq}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Cooldown Period (if applicable)</label>
          <input
            type="number"
            className="form-input"
            placeholder="7"
            disabled={customFunction.triggerFrequency !== 'Cooldown'}
          />
          <span className="input-suffix">days</span>
        </div>
      </div>

      <div className="form-group">
        <label>Event Sources</label>
        <div className="checkbox-grid">
          {eventSources.map(source => (
            <label key={source} className="checkbox-label">
              <input
                type="checkbox"
                checked={customFunction.eventSources.includes(source)}
                onChange={() => handleArrayToggle('eventSources', source)}
              />
              <span>{source}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="builder-step">
      <h4>Persona & User Targeting</h4>
      
      <div className="form-group">
        <label>Select Persona Groups</label>
        <div className="checkbox-grid">
          {['Business Travelers', 'Leisure Travelers', 'VIP Members', 'New Customers', 'Returning Customers', 'High Spenders'].map(persona => (
            <label key={persona} className="checkbox-label">
              <input
                type="checkbox"
                checked={customFunction.personaGroups.includes(persona)}
                onChange={() => handleArrayToggle('personaGroups', persona)}
              />
              <span>{persona}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Exclusions</label>
        <div className="exclusions-grid">
          <div className="exclusion-section">
            <h5>Personas</h5>
            <div className="checkbox-grid">
              {['Premium Members', 'Corporate Accounts', 'Group Bookings'].map(persona => (
                <label key={persona} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={customFunction.exclusions.personas.includes(persona)}
                    onChange={() => handleArrayToggle('exclusions.personas', persona)}
                  />
                  <span>{persona}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="exclusion-section">
            <h5>Loyalty Tiers</h5>
            <div className="checkbox-grid">
              {['Gold', 'Platinum', 'Diamond'].map(tier => (
                <label key={tier} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={customFunction.exclusions.loyaltyTiers.includes(tier)}
                    onChange={() => handleArrayToggle('exclusions.loyaltyTiers', tier)}
                  />
                  <span>{tier}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>User Limits</label>
        <div className="limits-grid">
          <div className="limit-item">
            <label>Per user per day</label>
            <input
              type="number"
              value={customFunction.userLimits.perUserPerDay}
              onChange={(e) => handleNestedInputChange('userLimits', 'perUserPerDay', parseInt(e.target.value))}
              className="form-input"
              min="1"
            />
          </div>
          <div className="limit-item">
            <label>Per user per week</label>
            <input
              type="number"
              value={customFunction.userLimits.perUserPerWeek}
              onChange={(e) => handleNestedInputChange('userLimits', 'perUserPerWeek', parseInt(e.target.value))}
              className="form-input"
              min="1"
            />
          </div>
          <div className="limit-item">
            <label>Max triggers per program</label>
            <input
              type="number"
              value={customFunction.userLimits.maxTriggersPerProgram}
              onChange={(e) => handleNestedInputChange('userLimits', 'maxTriggersPerProgram', parseInt(e.target.value))}
              className="form-input"
              min="1"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="builder-step">
      <h4>Timing Logic</h4>
      
      <div className="form-group">
        <label>Time Windows</label>
        <div className="time-window-config">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={customFunction.timingLogic.timeWindows.enabled}
              onChange={(e) => handleNestedInputChange('timingLogic.timeWindows', 'enabled', e.target.checked)}
            />
            <span>Enable time windows</span>
          </label>
          
          {customFunction.timingLogic.timeWindows.enabled && (
            <div className="time-inputs">
              <div className="time-input">
                <label>Start Time</label>
                <input
                  type="time"
                  value={customFunction.timingLogic.timeWindows.startTime}
                  onChange={(e) => handleNestedInputChange('timingLogic.timeWindows', 'startTime', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="time-input">
                <label>End Time</label>
                <input
                  type="time"
                  value={customFunction.timingLogic.timeWindows.endTime}
                  onChange={(e) => handleNestedInputChange('timingLogic.timeWindows', 'endTime', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="time-input">
                <label>Timezone</label>
                <select
                  value={customFunction.timingLogic.timeWindows.timezone}
                  onChange={(e) => handleNestedInputChange('timingLogic.timeWindows', 'timezone', e.target.value)}
                  className="form-input"
                >
                  <option value="local">Local time</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="form-group">
        <label>Buffer Period</label>
        <div className="buffer-config">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={customFunction.timingLogic.bufferPeriod.enabled}
              onChange={(e) => handleNestedInputChange('timingLogic.bufferPeriod', 'enabled', e.target.checked)}
            />
            <span>Wait before sending (for grouping/optimization)</span>
          </label>
          
          {customFunction.timingLogic.bufferPeriod.enabled && (
            <div className="buffer-input">
              <input
                type="number"
                value={customFunction.timingLogic.bufferPeriod.hours}
                onChange={(e) => handleNestedInputChange('timingLogic.bufferPeriod', 'hours', parseInt(e.target.value))}
                className="form-input"
                min="1"
              />
              <span className="input-suffix">hours</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="builder-step">
      <h4>Offer/Action Definition</h4>
      
      <div className="form-group">
        <label>Offer Selection *</label>
        <div className="offers-grid">
          {availableOffers.map(offer => (
            <label key={offer} className="offer-checkbox">
              <input
                type="checkbox"
                checked={customFunction.offerSelection.includes(offer)}
                onChange={() => handleArrayToggle('offerSelection', offer)}
              />
              <span className="offer-label">
                {getBookingTypeIcon(offer)} {offer}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Offer Fallback</label>
        <div className="fallback-config">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={customFunction.offerFallback.enabled}
              onChange={(e) => handleNestedInputChange('offerFallback', 'enabled', e.target.checked)}
            />
            <span>Enable fallback offers (if primary offer unavailable)</span>
          </label>
          
          {customFunction.offerFallback.enabled && (
            <div className="fallback-offers">
              <p className="help-text">Select fallback offers in order of preference</p>
              <div className="offers-grid">
                {availableOffers.map(offer => (
                  <label key={offer} className="offer-checkbox">
                    <input
                      type="checkbox"
                      checked={customFunction.offerFallback.fallbackOffers.includes(offer)}
                      onChange={() => handleArrayToggle('offerFallback.fallbackOffers', offer)}
                    />
                    <span className="offer-label">
                      {getBookingTypeIcon(offer)} {offer}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="form-group">
        <label>Offer Visibility Rules</label>
        <div className="visibility-rules">
          <div className="rule-input">
            <label>Max Price</label>
            <input
              type="number"
              value={customFunction.offerVisibilityRules.maxPrice || ''}
              onChange={(e) => handleNestedInputChange('offerVisibilityRules', 'maxPrice', e.target.value ? parseFloat(e.target.value) : null)}
              className="form-input"
              placeholder="50.00"
            />
            <span className="input-suffix">£</span>
          </div>
          <div className="rule-input">
            <label>Min Inventory</label>
            <input
              type="number"
              value={customFunction.offerVisibilityRules.minInventory || ''}
              onChange={(e) => handleNestedInputChange('offerVisibilityRules', 'minInventory', e.target.value ? parseInt(e.target.value) : null)}
              className="form-input"
              placeholder="10"
            />
            <span className="input-suffix">units</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="builder-step">
      <h4>Communication Setup</h4>
      
      <div className="form-group">
        <label>Communication Channels *</label>
        <div className="channels-grid">
          {channels.map(channel => (
            <label key={channel} className="checkbox-label">
              <input
                type="checkbox"
                checked={customFunction.channels.includes(channel)}
                onChange={() => handleArrayToggle('channels', channel)}
              />
              <span>{channel}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Message Template</label>
        <div className="template-config">
          <div className="template-type">
            <label className="radio-label">
              <input
                type="radio"
                name="templateType"
                value="saved"
                checked={customFunction.messageTemplate.type === 'saved'}
                onChange={(e) => handleNestedInputChange('messageTemplate', 'type', e.target.value)}
              />
              <span>Use saved template</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="templateType"
                value="new"
                checked={customFunction.messageTemplate.type === 'new'}
                onChange={(e) => handleNestedInputChange('messageTemplate', 'type', e.target.value)}
              />
              <span>Build new template</span>
            </label>
          </div>

          {customFunction.messageTemplate.type === 'saved' ? (
            <select
              value={customFunction.messageTemplate.templateId || ''}
              onChange={(e) => handleNestedInputChange('messageTemplate', 'templateId', e.target.value)}
              className="form-input"
            >
              <option value="">Select a template...</option>
              <option value="upsell_generic">Generic Upsell Template</option>
              <option value="lounge_offer">Lounge Access Offer</option>
              <option value="seat_upgrade">Seat Upgrade Promotion</option>
            </select>
          ) : (
            <textarea
              value={customFunction.messageTemplate.content}
              onChange={(e) => handleNestedInputChange('messageTemplate', 'content', e.target.value)}
              className="form-input"
              rows="4"
              placeholder="Enter your message template..."
            />
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Language</label>
          <select
            value={customFunction.messageTemplate.language}
            onChange={(e) => handleNestedInputChange('messageTemplate', 'language', e.target.value)}
            className="form-input"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Tone</label>
          <select
            value={customFunction.messageTemplate.tone}
            onChange={(e) => handleNestedInputChange('messageTemplate', 'tone', e.target.value)}
            className="form-input"
          >
            {tones.map(tone => (
              <option key={tone} value={tone}>{tone}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={customFunction.messageTemplate.aiCopywriting}
            onChange={(e) => handleNestedInputChange('messageTemplate', 'aiCopywriting', e.target.checked)}
          />
          <span>Let AI create/update comms dynamically</span>
        </label>
      </div>
    </div>
  );

  const renderStep7 = () => (
    <div className="builder-step">
      <h4>AI Support & Review</h4>
      
      <div className="form-group">
        <label>AI Optimization</label>
        <div className="ai-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={customFunction.aiOptimization.autoOptimization}
              onChange={(e) => handleNestedInputChange('aiOptimization', 'autoOptimization', e.target.checked)}
            />
            <span>Enable auto-optimization (Let AI test timings, channels, message copy)</span>
          </label>
          
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={customFunction.aiOptimization.suggestSegments}
              onChange={(e) => handleNestedInputChange('aiOptimization', 'suggestSegments', e.target.checked)}
            />
            <span>Use AI to suggest segments/personas (Based on prior conversions/booking behaviour)</span>
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Control & Testing</label>
        <div className="control-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={customFunction.testMode}
              onChange={(e) => handleInputChange('testMode', e.target.checked)}
            />
            <span>Preview/Test mode (Dry-run on sample data)</span>
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Function Summary</label>
        <div className="function-summary">
          <div className="summary-item">
            <strong>Name:</strong> {customFunction.title || 'Not set'}
          </div>
          <div className="summary-item">
            <strong>Type:</strong> {customFunction.functionType}
          </div>
          <div className="summary-item">
            <strong>Trigger:</strong> {customFunction.triggerEvent}
          </div>
          <div className="summary-item">
            <strong>Offers:</strong> {customFunction.offerSelection.length > 0 ? customFunction.offerSelection.join(', ') : 'None selected'}
          </div>
          <div className="summary-item">
            <strong>Channels:</strong> {customFunction.channels.join(', ')}
          </div>
          <div className="summary-item">
            <strong>Status:</strong> {customFunction.status}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1BasicInfo
            customFunction={customFunction}
            handleInputChange={handleInputChange}
            handleArrayToggle={handleArrayToggle}
            handleToggleCategory={handleToggleCategory}
            getSelectedCountForCategory={getSelectedCountForCategory}
            collapsedCategories={collapsedCategories}
            tagInput={tagInput}
            setTagInput={setTagInput}
            showTagSuggestions={showTagSuggestions}
            setShowTagSuggestions={setShowTagSuggestions}
            getFilteredTagSuggestions={getFilteredTagSuggestions}
            handleTagInputChange={handleTagInputChange}
            handleTagInputKeyDown={handleTagInputKeyDown}
            addTag={addTag}
            removeTag={removeTag}
            selectSuggestion={selectSuggestion}
            isPredefinedTag={isPredefinedTag}
          />
        );
      case 2:
        return (
          <Step2Triggers
            customFunction={customFunction}
            handleInputChange={handleInputChange}
            handleArrayToggle={handleArrayToggle}
          />
        );
      case 3:
        return (
          <Step3Targeting
            customFunction={customFunction}
            handleInputChange={handleInputChange}
            handleArrayToggle={handleArrayToggle}
            handleNestedInputChange={handleNestedInputChange}
          />
        );
      case 4:
        return (
          <Step4Timing
            customFunction={customFunction}
            handleNestedInputChange={handleNestedInputChange}
          />
        );
      case 5:
        return (
          <Step5Offers
            customFunction={customFunction}
            handleArrayToggle={handleArrayToggle}
            handleNestedInputChange={handleNestedInputChange}
            getBookingTypeIcon={getBookingTypeIcon}
          />
        );
      case 6:
        return (
          <Step6Comms
            customFunction={customFunction}
            handleArrayToggle={handleArrayToggle}
            handleNestedInputChange={handleNestedInputChange}
          />
        );
      case 7:
        return (
          <Step7Review
            customFunction={customFunction}
            handleInputChange={handleInputChange}
            handleNestedInputChange={handleNestedInputChange}
          />
        );
      default:
        return (
          <Step1BasicInfo
            customFunction={customFunction}
            handleInputChange={handleInputChange}
            handleArrayToggle={handleArrayToggle}
            handleToggleCategory={handleToggleCategory}
            getSelectedCountForCategory={getSelectedCountForCategory}
            collapsedCategories={collapsedCategories}
            tagInput={tagInput}
            setTagInput={setTagInput}
            showTagSuggestions={showTagSuggestions}
            setShowTagSuggestions={setShowTagSuggestions}
            getFilteredTagSuggestions={getFilteredTagSuggestions}
            handleTagInputChange={handleTagInputChange}
            handleTagInputKeyDown={handleTagInputKeyDown}
            addTag={addTag}
            removeTag={removeTag}
            selectSuggestion={selectSuggestion}
            isPredefinedTag={isPredefinedTag}
          />
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="custom-builder-page">
      <div className="builder-container">
        {renderBreadcrumbs()}
        
        {renderHeader()}
        
        {renderStepIndicator()}
        
        <div className="builder-content">
          {renderCurrentStep()}
        </div>
        
        <div className="builder-footer">
          <div className="footer-left">
            {saveStatus && (
              <span className="save-status">{saveStatus}</span>
            )}
          </div>
          
          <div className="footer-right">
            <button 
              className="btn secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            
            <div className="step-navigation">
              {currentStep > 1 && (
                <button 
                  className="btn secondary"
                  onClick={handlePrevStep}
                >
                  Previous
                </button>
              )}
              {currentStep < totalSteps ? (
                <button 
                  className="btn primary"
                  onClick={handleNextStep}
                >
                  Next
                </button>
              ) : (
                <button 
                  className="btn primary"
                  onClick={handleSaveAndComplete}
                >
                  {editingFunction ? 'Update Function' : 'Save & Activate'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueOptimizerCustomBuildNew; 