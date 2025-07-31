import React from 'react';

function Step4Timing({ 
  customFunction, 
  handleNestedInputChange 
}) {
  return (
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
}

export default Step4Timing; 