import React from 'react';

function Step5Offers({ 
  customFunction, 
  handleArrayToggle, 
  handleNestedInputChange,
  handleInputChange,
  getBookingTypeIcon 
}) {
  // Offer types with descriptions
  const offerTypes = [
    { id: 'discount', name: 'Discount', description: 'Percentage or fixed amount off', icon: '💰' },
    { id: 'free', name: 'Free/Entitlement', description: 'Complimentary service or product', icon: '🎁' },
    { id: 'upgrade', name: 'Upgrade', description: 'Enhanced service or product', icon: '⬆️' },
    { id: 'bundle', name: 'Bundle', description: 'Multiple services at reduced price', icon: '📦' },
    { id: 'cashback', name: 'Cashback', description: 'Money back after purchase', icon: '💳' },
    { id: 'points', name: 'Points/Rewards', description: 'Loyalty points or rewards', icon: '⭐' }
  ];

  // Available offers based on what was selected in triggers
  const availableOffers = [
    { id: 'hotel', name: 'Hotel', icon: '🏨', category: 'hotel_upgrade' },
    { id: 'flight', name: 'Flight', icon: '✈️', category: 'flight' },
    { id: 'airport_lounge', name: 'Airport Lounge', icon: '🛋', category: 'airport_lounge' },
    { id: 'fast_track', name: 'Fast Track', icon: '🛃', category: 'airport_fast_track' },
    { id: 'airport_transfer', name: 'Airport Transfer', icon: '🚐', category: 'airport_transfer' },
    { id: 'esim', name: 'eSIM', icon: '🌍', category: 'esim' },
    { id: 'seat_upgrade', name: 'Seat Upgrade', icon: '💺', category: 'flight_seat' },
    { id: 'event_ticket', name: 'Event Ticket', icon: '🎟', category: 'ticket' },
    { id: 'spa_treatment', name: 'Spa Treatment', icon: '💆', category: 'wellness' },
    { id: 'dining', name: 'Dining', icon: '🍽', category: 'airport_dining' },
    { id: 'wellness', name: 'Wellness', icon: '🧘', category: 'health_wellness' }
  ];

  // Provider options based on offer type
  const providerOptions = {
    hotel: [
      { id: 'hilton', name: 'Hilton Hotels', logo: '🏨' },
      { id: 'marriott', name: 'Marriott International', logo: '🏨' },
      { id: 'ihg', name: 'IHG Hotels & Resorts', logo: '🏨' },
      { id: 'accor', name: 'Accor Hotels', logo: '🏨' },
      { id: 'hyatt', name: 'Hyatt Hotels', logo: '🏨' },
      { id: 'any', name: 'Any Hotel Provider', logo: '🏨' }
    ],
    flight: [
      { id: 'british_airways', name: 'British Airways', logo: '✈️' },
      { id: 'lufthansa', name: 'Lufthansa', logo: '✈️' },
      { id: 'air_france', name: 'Air France', logo: '✈️' },
      { id: 'klm', name: 'KLM Royal Dutch Airlines', logo: '✈️' },
      { id: 'emirates', name: 'Emirates', logo: '✈️' },
      { id: 'any', name: 'Any Airline', logo: '✈️' }
    ],
    airport_lounge: [
      { id: 'priority_pass', name: 'Priority Pass', logo: '🛋' },
      { id: 'lounge_key', name: 'LoungeKey', logo: '🛋' },
      { id: 'dragonpass', name: 'DragonPass', logo: '🛋' },
      { id: 'any', name: 'Any Lounge Network', logo: '🛋' }
    ],
    fast_track: [
      { id: 'fast_track_global', name: 'Fast Track Global', logo: '🛃' },
      { id: 'airport_express', name: 'Airport Express', logo: '🛃' },
      { id: 'any', name: 'Any Fast Track Service', logo: '🛃' }
    ],
    airport_transfer: [
      { id: 'uber', name: 'Uber', logo: '🚐' },
      { id: 'lyft', name: 'Lyft', logo: '🚐' },
      { id: 'blacklane', name: 'Blacklane', logo: '🚐' },
      { id: 'any', name: 'Any Transfer Service', logo: '🚐' }
    ],
    esim: [
      { id: 'airalo', name: 'Airalo', logo: '🌍' },
      { id: 'holafly', name: 'Holafly', logo: '🌍' },
      { id: 'esimdb', name: 'eSIMdb', logo: '🌍' },
      { id: 'any', name: 'Any eSIM Provider', logo: '🌍' }
    ]
  };



  // Get providers for a specific offer
  const getProvidersForOffer = (offerId) => {
    return providerOptions[offerId] || [];
  };

  // Supplier selector state and functions (similar to Step1BasicInfo)
  const [showSupplierSuggestions, setShowSupplierSuggestions] = React.useState(false);

  // Get all predefined suppliers from providerOptions
  const getAllPredefinedSuppliers = () => {
    const allSuppliers = [];
    Object.values(providerOptions).forEach(category => {
      category.forEach(provider => {
        allSuppliers.push(provider.name);
      });
    });
    return allSuppliers;
  };

  const predefinedSuppliers = getAllPredefinedSuppliers();

  // Check if a supplier is predefined
  const isPredefinedSupplier = (supplier) => {
    return predefinedSuppliers.includes(supplier);
  };

  // Get display name for supplier (handle both predefined and custom)
  const getSupplierDisplayName = (supplier) => {
    return supplier; // For now, just return the supplier name
  };

  // Handle supplier input change
  const handleSupplierInputChange = (e) => {
    handleInputChange('supplierInput', e.target.value);
  };

  // Handle supplier input key down
  const handleSupplierInputKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      addSupplier(e.target.value.trim());
    } else if (e.key === 'Backspace' && e.target.value === '' && (customFunction.selectedSuppliers || []).length > 0) {
      removeSupplier((customFunction.selectedSuppliers || []).slice(-1)[0]);
    }
  };

  // Add supplier
  const addSupplier = (supplier) => {
    if (supplier && !(customFunction.selectedSuppliers || []).includes(supplier)) {
      const newSuppliers = [...(customFunction.selectedSuppliers || []), supplier];
      handleInputChange('selectedSuppliers', newSuppliers);
      handleInputChange('supplierInput', '');
    }
  };

  // Remove supplier
  const removeSupplier = (supplier) => {
    const newSuppliers = (customFunction.selectedSuppliers || []).filter(s => s !== supplier);
    handleInputChange('selectedSuppliers', newSuppliers);
  };

  // Get filtered supplier suggestions
  const getFilteredSupplierSuggestions = () => {
    const input = (customFunction.supplierInput || '').toLowerCase();
    return predefinedSuppliers.filter(supplier => 
      supplier.toLowerCase().includes(input) && 
      !(customFunction.selectedSuppliers || []).includes(supplier)
    );
  };

  // Select supplier suggestion
  const selectSupplierSuggestion = (suggestion) => {
    addSupplier(suggestion);
    setShowSupplierSuggestions(false);
  };

  return (
    <div className="builder-step">
      <h4>Offer Definition</h4>
      
      {/* Offer Type Selection */}
      <div className="form-group">
        <label className="required">Offer Type</label>
        <p className="help-text">Select the type of offer you want to provide</p>
        <div className="offers-grid">
          {offerTypes.map(offerType => (
            <label key={offerType.id} className={`offer-checkbox ${customFunction.offerType === offerType.id ? 'selected' : ''}`}>
              <input
                type="radio"
                name="offerType"
                value={offerType.id}
                checked={customFunction.offerType === offerType.id}
                onChange={(e) => handleInputChange('offerType', e.target.value)}
              />
              <span className="offer-label">
                <span className="offer-icon">{offerType.icon}</span>
                <div className="offer-content">
                  <div className="offer-name">{offerType.name}</div>
                  <div className="offer-description">{offerType.description}</div>
                </div>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Offer Details */}
      {customFunction.offerType && (
        <div className="form-group">
          <label className="required">Offer Details</label>
          <p className="help-text">Configure the specific details of your offer</p>
          
          <div className="offer-details-config">
            {/* Offer Detail Type Selection */}
            <div className="details-section">
              <div className="offer-detail-types-grid">
                {[
                  { id: 'discount_amount', name: 'Discount Amount', description: 'e.g. 15% or £20 off', icon: '💰' },
                  { id: 'quantity_count', name: 'Quantity / Count', description: 'e.g. 1 lounge access, 2 SIMs', icon: '📦' },
                  { id: 'max_value', name: 'Max Value', description: 'Optional cap per redemption', icon: '💳' },
                  { id: 'duration_validity', name: 'Duration of Offer Validity', description: 'e.g. offer available for 24h', icon: '⏰' },
                  { id: 'redemption_limit', name: 'Redemption Limit', description: 'e.g. can be redeemed once per trip', icon: '🔄' }
                ].map(detailType => (
                  <label key={detailType.id} className={`offer-detail-checkbox ${customFunction.offerDetailType === detailType.id ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="offerDetailType"
                      value={detailType.id}
                      checked={customFunction.offerDetailType === detailType.id}
                      onChange={(e) => handleInputChange('offerDetailType', e.target.value)}
                    />
                    <span className="offer-detail-label">
                      <span className="offer-detail-icon">{detailType.icon}</span>
                      <div className="offer-detail-content">
                        <div className="offer-detail-name">{detailType.name}</div>
                        <div className="offer-detail-description">{detailType.description}</div>
                      </div>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Offer Detail Value Configuration */}
            {customFunction.offerDetailType && (
              <div className="details-section">
                
                <div className="details-grid">
                  {/* Discount Amount */}
                  {customFunction.offerDetailType === 'discount_amount' && (
                    <>
                      <div className="input-group">
                        <label className="required">Discount Type</label>
                        <select
                          value={customFunction.discountType || 'percentage'}
                          onChange={(e) => handleInputChange('discountType', e.target.value)}
                          className="form-input"
                        >
                          <option value="percentage">Percentage (%)</option>
                          <option value="fixed">Fixed Amount (£)</option>
                        </select>
                      </div>
                      
                      <div className="input-group">
                        <label className="required">Discount Value</label>
                        <div className="input-with-suffix">
                          <input
                            type="number"
                            value={customFunction.discountValue || ''}
                            onChange={(e) => handleInputChange('discountValue', e.target.value)}
                            className="form-input no-arrows"
                            placeholder={customFunction.discountType === 'percentage' ? '15' : '20'}
                            min="0"
                            max={customFunction.discountType === 'percentage' ? '100' : '1000'}
                          />
                          <span className="input-suffix">
                            {customFunction.discountType === 'percentage' ? '%' : '£'}
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Quantity / Count */}
                  {customFunction.offerDetailType === 'quantity_count' && (
                    <div className="input-group full-width">
                      <label className="required">Quantity / Count</label>
                      <input
                        type="text"
                        value={customFunction.quantityCount || ''}
                        onChange={(e) => handleInputChange('quantityCount', e.target.value)}
                        className="form-input"
                        placeholder="e.g., 1 lounge access, 2 SIMs, 1 fast track pass"
                      />
                    </div>
                  )}

                  {/* Max Value */}
                  {customFunction.offerDetailType === 'max_value' && (
                    <div className="input-group full-width">
                      <label className="required">Max Value Per Redemption</label>
                      <div className="input-with-suffix">
                        <input
                          type="number"
                          value={customFunction.maxValuePerRedemption || ''}
                          onChange={(e) => handleInputChange('maxValuePerRedemption', e.target.value)}
                          className="form-input no-arrows"
                          placeholder="50"
                          min="0"
                        />
                        <span className="input-suffix">£</span>
                      </div>
                    </div>
                  )}

                  {/* Duration of Offer Validity */}
                  {customFunction.offerDetailType === 'duration_validity' && (
                    <div className="input-group full-width">
                      <label className="required">Offer Validity Duration</label>
                      <input
                        type="text"
                        value={customFunction.offerValidity || ''}
                        onChange={(e) => handleInputChange('offerValidity', e.target.value)}
                        className="form-input"
                        placeholder="e.g., 24 hours, 7 days, until departure"
                      />
                    </div>
                  )}

                  {/* Redemption Limit */}
                  {customFunction.offerDetailType === 'redemption_limit' && (
                    <>
                      <div className="input-group">
                        <label className="required">Redemption Limit Type</label>
                        <select
                          value={customFunction.redemptionLimit || 'once_per_trip'}
                          onChange={(e) => handleInputChange('redemptionLimit', e.target.value)}
                          className="form-input"
                        >
                          <option value="once_per_trip">Once per trip</option>
                          <option value="once_per_user">Once per user (ever)</option>
                          <option value="multiple_per_trip">Multiple times per trip</option>
                          <option value="unlimited">Unlimited</option>
                        </select>
                      </div>
                      
                      {customFunction.redemptionLimit === 'multiple_per_trip' && (
                        <div className="input-group">
                          <label className="required">Max Redemptions Per Trip</label>
                          <input
                            type="number"
                            value={customFunction.maxRedemptionsPerTrip || ''}
                            onChange={(e) => handleInputChange('maxRedemptionsPerTrip', e.target.value)}
                            className="form-input no-arrows"
                            placeholder="3"
                            min="1"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

            {/* Specific Supplier Selector */}
      {customFunction.offerType && (
        <div className="form-group">
          <label>Specific Supplier Selector (Optional)</label>
          <p className="help-text">Type and press Enter to add suppliers. You can select from suggestions or create custom suppliers.</p>
          
          <div className="supplier-input-container">
            <div className="supplier-input-wrapper">
              {(customFunction.selectedSuppliers || []).map(supplier => (
                <span key={supplier} className={`supplier-tag ${isPredefinedSupplier(supplier) ? 'supplier-predefined' : 'supplier-custom'}`}>
                  {getSupplierDisplayName(supplier)}
                  <button 
                    type="button" 
                    className="supplier-tag-remove"
                    onClick={() => removeSupplier(supplier)}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={customFunction.supplierInput || ''}
                onChange={handleSupplierInputChange}
                onKeyDown={handleSupplierInputKeyDown}
                onFocus={() => setShowSupplierSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSupplierSuggestions(false), 200)}
                className="supplier-input"
                placeholder={(customFunction.selectedSuppliers || []).length === 0 ? "Type to add suppliers..." : ""}
              />
            </div>
            
            {showSupplierSuggestions && getFilteredSupplierSuggestions().length > 0 && (
              <div className="supplier-suggestions">
                <div className="suggestions-header">
                  <span>Suggestions:</span>
                </div>
                <div className="suggestions-list">
                  {getFilteredSupplierSuggestions().slice(0, 8).map(suggestion => (
                    <button
                      key={suggestion}
                      type="button"
                      className="suggestion-item"
                      onClick={() => selectSupplierSuggestion(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Eligibility / Limitations */}
      {customFunction.offerType && (
        <div className="form-group">
          <label>Eligibility / Limitations (Optional)</label>
          <p className="help-text">Set restrictions and limitations for your offer</p>
          
          <div className="eligibility-limitations">
            {/* Eligibility Type Selection */}
            <div className="eligibility-types-section">
              <div className="eligibility-types-grid">
                {[
                  { id: 'inventory_cap', name: 'Inventory Cap', description: 'e.g. only 500 redemptions globally', icon: '📦' },
                  { id: 'offer_quota', name: 'Offer Quota Per User', description: 'e.g. 2 redemptions per user', icon: '👤' },
                  { id: 'geo_limitations', name: 'Geo or Market Limitations', description: 'e.g. only for UK users', icon: '🌍' },
                  { id: 'loyalty_gating', name: 'Loyalty Tier Gating', description: 'e.g. only for Gold+ customers', icon: '👑' }
                ].map(eligibilityType => (
                  <label key={eligibilityType.id} className={`eligibility-checkbox ${customFunction.eligibilityType === eligibilityType.id ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="eligibilityType"
                      value={eligibilityType.id}
                      checked={customFunction.eligibilityType === eligibilityType.id}
                      onChange={(e) => handleInputChange('eligibilityType', e.target.value)}
                    />
                    <span className="eligibility-label">
                      <span className="eligibility-icon">{eligibilityType.icon}</span>
                      <div className="eligibility-content">
                        <div className="eligibility-name">{eligibilityType.name}</div>
                        <div className="eligibility-description">{eligibilityType.description}</div>
                      </div>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Eligibility Value Configuration */}
            {customFunction.eligibilityType && (
              <div className="eligibility-config-section">
                <div className="eligibility-config-grid">
                  {/* Inventory Cap */}
                  {customFunction.eligibilityType === 'inventory_cap' && (
                    <div className="input-group full-width">
                      <label className="required">Global Redemption Limit</label>
                      <input
                        type="number"
                        value={customFunction.inventoryCap || ''}
                        onChange={(e) => handleInputChange('inventoryCap', e.target.value)}
                        className="form-input no-arrows"
                        placeholder="e.g., 500"
                        min="1"
                      />
                    </div>
                  )}

                  {/* Offer Quota Per User */}
                  {customFunction.eligibilityType === 'offer_quota' && (
                    <div className="input-group full-width">
                      <label className="required">Redemptions Per User</label>
                      <input
                        type="number"
                        value={customFunction.offerQuotaPerUser || ''}
                        onChange={(e) => handleInputChange('offerQuotaPerUser', e.target.value)}
                        className="form-input no-arrows"
                        placeholder="e.g., 2"
                        min="1"
                      />
                    </div>
                  )}

                  {/* Geo/Market Limitations */}
                  {customFunction.eligibilityType === 'geo_limitations' && (
                    <div className="input-group full-width">
                      <label className="required">Target Markets</label>
                      <input
                        type="text"
                        value={customFunction.geoLimitations || ''}
                        onChange={(e) => handleInputChange('geoLimitations', e.target.value)}
                        className="form-input"
                        placeholder="e.g., UK, US, EU only"
                      />
                    </div>
                  )}

                  {/* Loyalty Tier Gating */}
                  {customFunction.eligibilityType === 'loyalty_gating' && (
                    <div className="input-group full-width">
                      <label className="required">Minimum Loyalty Tier</label>
                      <select
                        value={customFunction.loyaltyTierGating || ''}
                        onChange={(e) => handleInputChange('loyaltyTierGating', e.target.value)}
                        className="form-input"
                      >
                        <option value="">Select minimum tier</option>
                        <option value="bronze">Bronze+</option>
                        <option value="silver">Silver+</option>
                        <option value="gold">Gold+</option>
                        <option value="platinum">Platinum+</option>
                        <option value="diamond">Diamond+</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Offer Schedule */}
      {customFunction.offerType && (
        <div className="form-group">
          <label>Offer Schedule (Optional)</label>
          <p className="help-text">Set when this offer should start and end</p>
          
          <div className="schedule-config">
            <div className="schedule-inputs">
              <div className="input-group">
                <label className="required">Start Date</label>
                <input
                  type="datetime-local"
                  value={customFunction.startDate || ''}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="form-input"
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>
              
              <div className="input-group">
                <label className="required">End Date</label>
                <input
                  type="datetime-local"
                  value={customFunction.endDate || ''}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="form-input"
                  min={customFunction.startDate || new Date().toISOString().slice(0, 16)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
}

export default Step5Offers; 