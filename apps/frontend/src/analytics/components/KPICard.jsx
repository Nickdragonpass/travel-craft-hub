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
  timePeriod // Current selected time period from filter
}) {
  const getTrendClass = () => {
    if (trendType === 'positive') return 'trend-positive';
    if (trendType === 'negative') return 'trend-negative';
    return 'trend-neutral';
  };

  const formatTrend = (trend) => {
    if (!trend) return null;
    const isPositive = parseFloat(trend) >= 0;
    const symbol = isPositive ? '↗' : '↘';
    const sign = isPositive ? '+' : '';
    return `${sign}${trend}${typeof trend === 'number' ? '%' : ''} ${symbol}`;
  };

  if (loading) {
    return (
      <div className="kpi-card loading">
        <div className="kpi-card-skeleton"></div>
      </div>
    );
  }

  return (
    <MetricTooltip metricName={label} position="top">
      <div className="metric-card kpi-card">
        <div className="metric-header">
          <div className="metric-label-wrapper">
            <span className="metric-label">{label}</span>
            <span className="metric-info-icon">ℹ️</span>
          </div>
          {trend && (
            <span className={`${getTrendClass()}`}>
              {formatTrend(trend)}
            </span>
          )}
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
      </div>
    </MetricTooltip>
  );
}

export default KPICard;

