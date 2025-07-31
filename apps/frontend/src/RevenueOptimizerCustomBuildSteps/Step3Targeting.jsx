import React from 'react';

function Step3Targeting({ 
  customFunction, 
  handleInputChange, 
  handleArrayToggle, 
  handleNestedInputChange 
}) {
  return (
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
}

export default Step3Targeting; 