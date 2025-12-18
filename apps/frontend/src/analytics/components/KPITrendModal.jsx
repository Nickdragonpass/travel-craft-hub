import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './KPITrendModal.css';

function KPITrendModal({ isOpen, onClose, metric }) {
  if (!isOpen || !metric) return null;

  const formatValue = (value, formatType) => {
    if (formatType === 'currency') {
      if (value >= 1000000) return `£${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `£${(value / 1000).toFixed(1)}K`;
      return `£${value.toLocaleString()}`;
    }
    if (formatType === 'percentage') {
      return `${value}%`;
    }
    if (formatType === 'number') {
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
      return value.toLocaleString();
    }
    return value;
  };

  const formatTooltipValue = (value, formatType) => {
    if (formatType === 'currency') {
      return `£${value.toLocaleString()}`;
    }
    if (formatType === 'percentage') {
      return `${value}%`;
    }
    return value.toLocaleString();
  };

  const getChartColor = () => {
    // Use DragonPass branding colors
    if (metric.trendType === 'positive') return '#e94f3d'; // Red
    if (metric.trendType === 'negative') return '#4f46e5'; // Blue
    return '#1a2233'; // Navy
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content kpi-trend-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="kpi-trend-header">
            <div className="kpi-trend-title-section">
              {metric.icon && <span className="kpi-trend-icon">{metric.icon}</span>}
              <div>
                <h3 className="kpi-trend-title">{metric.label}</h3>
                {metric.subtitle && (
                  <p className="kpi-trend-subtitle">{metric.subtitle}</p>
                )}
              </div>
            </div>
            <div className="kpi-trend-value-section">
              <div className="kpi-trend-current-value">
                {metric.value}
              </div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body kpi-trend-body">
          {metric.trendData && metric.trendData.length > 0 ? (
            <div className="kpi-trend-chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={metric.trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="period" 
                    stroke="#6b7280"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                    tickFormatter={(value) => {
                      if (metric.formatType === 'currency') {
                        if (value >= 1000000) return `£${(value / 1000000).toFixed(1)}M`;
                        if (value >= 1000) return `£${(value / 1000).toFixed(1)}K`;
                        return `£${value}`;
                      }
                      if (metric.formatType === 'percentage') {
                        return `${value}%`;
                      }
                      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                      if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                      return value;
                    }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '8px 12px'
                    }}
                    formatter={(value) => formatTooltipValue(value, metric.formatType || 'number')}
                    labelStyle={{ color: '#1a2233', fontWeight: 600, marginBottom: '4px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={getChartColor()}
                    strokeWidth={3}
                    dot={{ fill: getChartColor(), r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="kpi-trend-no-data">
              <p>No trend data available for this metric.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default KPITrendModal;

