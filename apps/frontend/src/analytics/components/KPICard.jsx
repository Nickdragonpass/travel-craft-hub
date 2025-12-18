import React from 'react';
import MetricTooltip from './MetricTooltip';
import { shouldShowTimePeriodIndicator, getTimePeriodLabel } from '../services/metricTimePeriodConfig';
import './KPICard.css';

function KPICard({ 
  label, 
  value, 
  subtitle, 
  trend, 
  trendType = 'neutral',
  icon,
  loading = false,
  description,
  timePeriod, // Current selected time period from filter
  onClick, // Click handler for opening trend modal
  metricId, // Identifier for fetching trend data
  formatType // Format type for value display (number, currency, percentage)
}) {
  if (loading) {
    return (
      <div className="kpi-card loading">
        <div className="kpi-card-skeleton"></div>
      </div>
    );
  }

  const handleClick = () => {
    if (onClick && metricId) {
      onClick(metricId);
    }
  };

  return (
    <MetricTooltip metricName={label} position="top">
      <div 
        className={`metric-card kpi-card ${onClick ? 'kpi-card-clickable' : ''}`}
        onClick={handleClick}
      >
        <div className="metric-header">
          <div className="metric-label-wrapper">
            <span className="metric-label">{label}</span>
            <span className="metric-info-icon">ℹ️</span>
          </div>
        </div>
        <div className="metric-value">{value}</div>
        {subtitle && (
          <div className="metric-subtitle">
            {subtitle}
            {timePeriod && shouldShowTimePeriodIndicator(label, timePeriod) && (
              <span className="metric-period-badge">
                {' • '}
                <span className="badge-text">{getTimePeriodLabel(label, timePeriod)}</span>
              </span>
            )}
          </div>
        )}
        {icon && <div className="mini-chart">{icon}</div>}
        {onClick && (
          <div className="kpi-card-trend-hint">Click to view trend</div>
        )}
      </div>
    </MetricTooltip>
  );
}

export default KPICard;

