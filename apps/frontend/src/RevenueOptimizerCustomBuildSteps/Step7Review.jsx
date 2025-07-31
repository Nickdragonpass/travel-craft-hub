import React from 'react';

function Step7Review({ 
  customFunction, 
  handleInputChange, 
  handleNestedInputChange 
}) {
  return (
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
}

export default Step7Review; 