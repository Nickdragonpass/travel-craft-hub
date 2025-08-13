import React, { useState } from 'react';

function Step3Targeting({ 
  customFunction, 
  handleInputChange, 
  handleArrayToggle, 
  handleNestedInputChange 
}) {
  const [exclusionsExpanded, setExclusionsExpanded] = useState(false);

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
        <div className="exclusions-header" onClick={() => setExclusionsExpanded(!exclusionsExpanded)}>
          <label>Exclusions (Optional)</label>
          <span className={`dropdown-arrow ${exclusionsExpanded ? 'expanded' : ''}`}>
            ▼
          </span>
        </div>
        
        {exclusionsExpanded && (
          <div className="exclusions-content">
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
        )}
      </div>

    </div>
  );
}

export default Step3Targeting; 