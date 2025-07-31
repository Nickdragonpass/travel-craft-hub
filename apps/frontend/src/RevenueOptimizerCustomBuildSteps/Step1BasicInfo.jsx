import React from 'react';

function Step1BasicInfo({ 
  customFunction, 
  handleInputChange, 
  handleArrayToggle, 
  handleToggleCategory, 
  getSelectedCountForCategory,
  collapsedCategories,
  tagInput,
  setTagInput,
  showTagSuggestions,
  setShowTagSuggestions,
  getFilteredTagSuggestions,
  handleTagInputChange,
  handleTagInputKeyDown,
  addTag,
  removeTag,
  selectSuggestion,
  isPredefinedTag
}) {
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

  return (
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
}

export default Step1BasicInfo; 