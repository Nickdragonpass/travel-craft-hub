import React from 'react';
import './MetricChart.css';

function MetricChart({ 
  title, 
  children, 
  subtitle,
  actions,
  loading = false,
  className = '' 
}) {
  if (loading) {
    return (
      <div className={`analytics-chart-container ${className}`}>
        <div className="chart-header">
          <h3>{title}</h3>
        </div>
        <div className="chart-placeholder">
          Loading chart...
        </div>
      </div>
    );
  }

  return (
    <div className={`analytics-chart-container ${className}`}>
      <div className="chart-header">
        <div className="chart-header-content">
          <h3>{title}</h3>
          {subtitle && <p className="chart-subtitle">{subtitle}</p>}
        </div>
        {actions && <div className="chart-actions">{actions}</div>}
      </div>
      <div className="chart-content">
        {children}
      </div>
    </div>
  );
}

export default MetricChart;

