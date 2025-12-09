import React, { useState } from 'react';
import { getMetricDefinition } from '../services/metricDefinitions';
import './MetricTooltip.css';

function MetricTooltip({ metricName, children, position = 'top' }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const definition = getMetricDefinition(metricName);

  if (!definition || definition === 'Metric definition not available.') {
    return <>{children}</>;
  }

  return (
    <div 
      className="metric-tooltip-container"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div className={`metric-tooltip metric-tooltip-${position}`}>
          <div className="tooltip-header">
            <span className="tooltip-icon">ℹ️</span>
            <strong>{metricName}</strong>
          </div>
          <div className="tooltip-body">
            {definition}
          </div>
          <div className="tooltip-arrow"></div>
        </div>
      )}
    </div>
  );
}

export default MetricTooltip;

