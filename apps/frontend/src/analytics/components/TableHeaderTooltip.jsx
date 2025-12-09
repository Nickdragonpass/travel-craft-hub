import React, { useState } from 'react';
import { getMetricDefinition } from '../services/metricDefinitions';
import './TableHeaderTooltip.css';

function TableHeaderTooltip({ label, definition }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipText = definition || getMetricDefinition(label);

  if (!tooltipText || tooltipText === 'Metric definition not available.') {
    return <th>{label}</th>;
  }

  return (
    <th 
      className="table-header-with-tooltip"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="table-header-label">
        {label}
        <span className="table-header-icon">ℹ️</span>
      </span>
      {showTooltip && (
        <div className="table-header-tooltip">
          <div className="tooltip-header">
            <span className="tooltip-icon">ℹ️</span>
            <strong>{label}</strong>
          </div>
          <div className="tooltip-body">
            {tooltipText}
          </div>
          <div className="tooltip-arrow"></div>
        </div>
      )}
    </th>
  );
}

export default TableHeaderTooltip;

