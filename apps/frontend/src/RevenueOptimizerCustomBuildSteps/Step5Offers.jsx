import React from 'react';

function Step5Offers({ 
  customFunction, 
  handleArrayToggle, 
  handleNestedInputChange,
  getBookingTypeIcon 
}) {
  const availableOffers = [
    'Hotel', 'Flight', 'Airport Lounge', 'Fast Track', 'Airport Transfer', 
    'eSIM', 'Seat Upgrade', 'Event Ticket', 'Spa Treatment', 'Dining', 'Wellness'
  ];

  return (
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
}

export default Step5Offers; 