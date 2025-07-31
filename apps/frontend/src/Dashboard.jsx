import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

// Chart Component with Timeline Controls
function MetricChart({ metric, selectedTimeframe, onTimeframeChange }) {
  // Mock data generator based on timeframe
  const generateChartData = (timeframe) => {
    const dataPoints = {
      '1D': 24,   // 24 hours
      '1W': 7,    // 7 days
      '1M': 30,   // 30 days
      '3M': 90,   // 90 days
      '1Y': 12,   // 12 months
      'Max': 24   // 24 months
    };
    
    const points = dataPoints[timeframe] || 30;
    const baseValue = parseInt(metric.value.replace(/[£,]/g, '')) || 1000;
    
    return Array.from({ length: points }, (_, i) => {
      const variation = (Math.random() - 0.5) * 0.3; // ±30% variation
      const trend = metric.trendType === 'positive' ? 0.02 : metric.trendType === 'negative' ? -0.02 : 0;
      const value = baseValue * (1 + trend * i + variation);
      return {
        index: i,
        value: Math.max(0, value),
        label: timeframe === '1D' ? `${i}:00` : 
               timeframe === '1W' ? `Day ${i + 1}` :
               timeframe === '1M' ? `Day ${i + 1}` :
               timeframe === '3M' ? `Week ${Math.floor(i/7) + 1}` :
               `Month ${i + 1}`
      };
    });
  };

  const chartData = generateChartData(selectedTimeframe);
  const maxValue = Math.max(...chartData.map(d => d.value));
  const minValue = Math.min(...chartData.map(d => d.value));
  const range = maxValue - minValue;

  // SVG path generator for line chart
  const generatePath = (data) => {
    const width = 500;
    const height = 200;
    const padding = 20;
    
    const xStep = (width - 2 * padding) / (data.length - 1);
    
    return data.map((point, index) => {
      const x = padding + index * xStep;
      const y = height - padding - ((point.value - minValue) / range) * (height - 2 * padding);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'Max'];

  return (
    <div className="metric-chart-container">
      <div className="chart-header">
        <h3>Historical Data - {selectedTimeframe}</h3>
        <div className="timeframe-controls">
          {timeframes.map(tf => (
            <button
              key={tf}
              className={`timeframe-btn ${selectedTimeframe === tf ? 'active' : ''}`}
              onClick={() => onTimeframeChange(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      
      <div className="chart-area">
        <svg viewBox="0 0 500 200" className="line-chart">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="50" height="40" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Chart line */}
          <path
            d={generatePath(chartData)}
            fill="none"
            stroke={metric.trendType === 'positive' ? '#10b981' : 
                   metric.trendType === 'negative' ? '#ef4444' : '#6b7280'}
            strokeWidth="2"
            className="chart-line"
          />
          
          {/* Data points */}
          {chartData.map((point, index) => {
            const x = 20 + index * ((500 - 40) / (chartData.length - 1));
            const y = 200 - 20 - ((point.value - minValue) / range) * 160;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="3"
                fill={metric.trendType === 'positive' ? '#10b981' : 
                     metric.trendType === 'negative' ? '#ef4444' : '#6b7280'}
                className="data-point"
              />
            );
          })}
          
          {/* Y-axis labels */}
          <text x="10" y="25" fontSize="10" fill="#6b7280" textAnchor="end">
            {metric.value.includes('£') ? `£${Math.round(maxValue).toLocaleString()}` : Math.round(maxValue).toLocaleString()}
          </text>
          <text x="10" y="185" fontSize="10" fill="#6b7280" textAnchor="end">
            {metric.value.includes('£') ? `£${Math.round(minValue).toLocaleString()}` : Math.round(minValue).toLocaleString()}
          </text>
        </svg>
        
        <div className="chart-stats">
          <div className="chart-stat">
            <span className="stat-label">Current</span>
            <span className="stat-value">{metric.value}</span>
          </div>
          <div className="chart-stat">
            <span className="stat-label">High ({selectedTimeframe})</span>
            <span className="stat-value">
              {metric.value.includes('£') ? `£${Math.round(maxValue).toLocaleString()}` : Math.round(maxValue).toLocaleString()}
            </span>
          </div>
          <div className="chart-stat">
            <span className="stat-label">Low ({selectedTimeframe})</span>
            <span className="stat-value">
              {metric.value.includes('£') ? `£${Math.round(minValue).toLocaleString()}` : Math.round(minValue).toLocaleString()}
            </span>
          </div>
          <div className="chart-stat">
            <span className="stat-label">Change</span>
            <span className={`stat-value trend-${metric.trendType}`}>{metric.trend}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [chartTimeframe, setChartTimeframe] = useState('1M');


  // Mock metrics data
  const [dashboardMetrics, setDashboardMetrics] = useState([
    { id: 'bookings', label: 'Bookings', value: '1,245', subtitle: 'This Week', trend: '+12%', trendType: 'positive', icon: '📈' },
    { id: 'support', label: 'Support Issues', value: '98', subtitle: 'Open Cases', trend: '-4%', trendType: 'negative', icon: '📉' },
    { id: 'loyalty', label: 'Loyalty Redemptions', value: '£8,210', subtitle: 'Value Redeemed', trend: '--', trendType: 'neutral', icon: '💎' },
    { id: 'revenue', label: 'Revenue Generated', value: '£93,440', subtitle: 'MoM', trend: '+9%', trendType: 'positive', icon: '💰' }
  ]);

  // Available metrics to choose from
  const availableMetrics = [
    { id: 'bookings', label: 'Bookings', value: '1,245', subtitle: 'This Week', trend: '+12%', trendType: 'positive', icon: '📈' },
    { id: 'support', label: 'Support Issues', value: '98', subtitle: 'Open Cases', trend: '-4%', trendType: 'negative', icon: '📉' },
    { id: 'loyalty', label: 'Loyalty Redemptions', value: '£8,210', subtitle: 'Value Redeemed', trend: '--', trendType: 'neutral', icon: '💎' },
    { id: 'revenue', label: 'Revenue Generated', value: '£93,440', subtitle: 'MoM', trend: '+9%', trendType: 'positive', icon: '💰' },
    { id: 'cac', label: 'Customer Acquisition Cost', value: '£45', subtitle: 'Per Customer', trend: '-8%', trendType: 'positive', icon: '💸' },
    { id: 'conversion', label: 'Conversion Rate', value: '3.2%', subtitle: 'Visitors to Booking', trend: '+15%', trendType: 'positive', icon: '🎯' },
    { id: 'avg_booking', label: 'Average Booking Value', value: '£890', subtitle: 'Per Transaction', trend: '+6%', trendType: 'positive', icon: '💳' },
    { id: 'churn', label: 'Churn Rate', value: '2.1%', subtitle: 'Monthly', trend: '-12%', trendType: 'positive', icon: '📉' }
  ];

  const openMetricModal = (metric) => {
    setSelectedMetric(metric);
    setModalOpen(true);
    setChartTimeframe('1M'); // Reset to default timeframe
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMetric(null);
    setEditMode(false);
    setChartTimeframe('1M');
  };

  const handleMetricChange = (metricId) => {
    const newMetric = availableMetrics.find(m => m.id === metricId);
    if (newMetric && !dashboardMetrics.find(m => m.id === metricId)) {
      const updatedMetrics = [...dashboardMetrics];
      // Find the index to replace (for now, replace the last one)
      updatedMetrics[3] = newMetric;
      setDashboardMetrics(updatedMetrics);
    }
  };

  const goToAnalytics = () => {
    navigate('/analytics');
  };

  return (
    <div className="dashboard-grid">
      
      {/* Key Metrics Snapshot */}
      <section className="dashboard-section metrics-section">
        <div className="metrics-header">
          <h2 className="section-title">Key Metrics Snapshot</h2>
          <div className="metrics-actions">
            <button className="edit-metrics-btn" onClick={() => setEditMode(!editMode)}>
              {editMode ? 'Done' : 'Edit Metrics'}
            </button>
            <button className="view-all-btn" onClick={goToAnalytics}>View All</button>
          </div>
        </div>
        <div className="metrics-grid">
          {dashboardMetrics.map((metric, index) => (
            <div key={metric.id} className="metric-card" onClick={() => openMetricModal(metric)}>
              <div className="metric-header">
                <span className="metric-label">{metric.label}</span>
                <span className={`trend-${metric.trendType}`}>{metric.trend}</span>
              </div>
              <div className="metric-value">{metric.value}</div>
              <div className="metric-subtitle">{metric.subtitle}</div>
              <div className="mini-chart">{metric.icon}</div>
              {editMode && (
                <div className="metric-edit-overlay">
                  <select 
                    className="metric-selector"
                    value={metric.id}
                    onChange={(e) => handleMetricChange(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {availableMetrics.map(option => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Live Operational Feed */}
      <section className="dashboard-section feed-section">
        <h2 className="section-title">Live Operational Feed</h2>
        <div className="activity-feed">
          <div className="feed-item">
            <div className="feed-icon booking">✈️</div>
            <div className="feed-content">
              <div className="feed-title">New booking created</div>
              <div className="feed-subtitle">LHR → JFK • Business Class • £2,340</div>
              <div className="feed-time">2 min ago</div>
            </div>
          </div>
          
          <div className="feed-item">
            <div className="feed-icon support">🎧</div>
            <div className="feed-content">
              <div className="feed-title">Support ticket resolved</div>
              <div className="feed-subtitle">Flight change request #TK-4891</div>
              <div className="feed-time">5 min ago</div>
            </div>
          </div>
          
          <div className="feed-item">
            <div className="feed-icon reward">🏆</div>
            <div className="feed-content">
              <div className="feed-title">Reward redeemed</div>
              <div className="feed-subtitle">Gold member • Airport lounge access</div>
              <div className="feed-time">8 min ago</div>
            </div>
          </div>
          
          <div className="feed-item">
            <div className="feed-icon vip">⭐</div>
            <div className="feed-content">
              <div className="feed-title">VIP check-in flagged</div>
              <div className="feed-subtitle">Platinum member arriving CDG</div>
              <div className="feed-time">12 min ago</div>
            </div>
          </div>
          
          <div className="feed-item">
            <div className="feed-icon danger">⚠️</div>
            <div className="feed-content">
              <div className="feed-title">Danger zone alert</div>
              <div className="feed-subtitle">Weather delay affecting 12 flights</div>
              <div className="feed-time">15 min ago</div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Center Widget */}
      <section className="dashboard-section action-section">
        <h2 className="section-title">Action Center</h2>
        <div className="action-cards">
          <div className="action-card urgent">
            <div className="action-header">
              <span className="action-count">12</span>
              <span className="action-tag">Urgent</span>
            </div>
            <div className="action-title">Flight Changes Required</div>
            <div className="action-subtitle">Weather delays affecting multiple routes</div>
            <button className="action-btn">Resolve Now</button>
          </div>
          
          <div className="action-card warning">
            <div className="action-header">
              <span className="action-count">8</span>
              <span className="action-tag">Review</span>
            </div>
            <div className="action-title">Support Tickets</div>
            <div className="action-subtitle">High priority customer issues</div>
            <button className="action-btn">Review</button>
          </div>
          
          <div className="action-card info">
            <div className="action-header">
              <span className="action-count">24</span>
              <span className="action-tag">Pending</span>
            </div>
            <div className="action-title">Reward Approvals</div>
            <div className="action-subtitle">Loyalty program redemptions</div>
            <button className="action-btn">Process</button>
          </div>
        </div>
      </section>

      {/* Revenue Optimisation Panel */}
      <section className="dashboard-section revenue-section">
        <h2 className="section-title">Revenue Optimisation</h2>
        <div className="revenue-content">
          <div className="revenue-chart">
            <div className="chart-bar">
              <div className="bar-label">Flight Bookings</div>
              <div className="bar-container">
                <div className="bar-fill" style={{width: '85%'}}></div>
                <span className="bar-value">£45,230</span>
              </div>
            </div>
            <div className="chart-bar">
              <div className="bar-label">Hotel Stays</div>
              <div className="bar-container">
                <div className="bar-fill" style={{width: '72%'}}></div>
                <span className="bar-value">£28,450</span>
              </div>
            </div>
            <div className="chart-bar">
              <div className="bar-label">Lounge Access</div>
              <div className="bar-container">
                <div className="bar-fill" style={{width: '45%'}}></div>
                <span className="bar-value">£12,890</span>
              </div>
            </div>
            <div className="chart-bar">
              <div className="bar-label">Premium Services</div>
              <div className="bar-container">
                <div className="bar-fill" style={{width: '38%'}}></div>
                <span className="bar-value">£6,870</span>
              </div>
            </div>
          </div>
          
          <div className="revenue-summary">
            <div className="summary-card">
              <div className="summary-title">Total Revenue</div>
              <div className="summary-value">£93,440</div>
              <div className="summary-trend positive">+9% vs last month</div>
            </div>
            <div className="summary-card">
              <div className="summary-title">Average Order Value</div>
              <div className="summary-value">£890</div>
              <div className="summary-trend positive">+6% vs last month</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Suggestions */}
      <section className="dashboard-section ai-section">
        <h2 className="section-title">AI Assistant Suggestions</h2>
        <div className="ai-suggestions">
          <div className="ai-suggestion">
            <div className="suggestion-icon">🤖</div>
            <div className="suggestion-content">
              <div className="suggestion-title">Revenue Opportunity Detected</div>
              <div className="suggestion-text">Based on recent booking patterns, consider promoting premium lounge access to business travelers departing from LHR Terminal 5.</div>
            </div>
          </div>
          
          <div className="ai-suggestion">
            <div className="suggestion-icon">📊</div>
            <div className="suggestion-content">
              <div className="suggestion-title">Customer Segment Alert</div>
              <div className="suggestion-text">Gold members are 23% more likely to book premium services. Consider targeted marketing campaigns.</div>
            </div>
          </div>
          
          <div className="ai-suggestion">
            <div className="suggestion-icon">⚡</div>
            <div className="suggestion-content">
              <div className="suggestion-title">Operational Efficiency</div>
              <div className="suggestion-text">Support ticket resolution time has improved by 15%. Consider expanding the automated response system.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Geo Activity Map */}
      <section className="dashboard-section map-section">
        <h2 className="section-title">Global Activity Map</h2>
        <div className="map-controls">
          <button className="map-toggle active">Heat Map</button>
          <button className="map-toggle">Activity Pins</button>
          <button className="map-toggle">Risk Zones</button>
        </div>
        <div className="map-container">
          <div className="world-map-placeholder">
            <div className="map-overlay">
              <div className="map-legend">
                <div className="legend-item">
                  <span className="legend-color high"></span>
                  <span>High Activity</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color medium"></span>
                  <span>Medium Activity</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color low"></span>
                  <span>Low Activity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Communications & Marketing */}
      <section className="dashboard-section marketing-section">
        <h2 className="section-title">Marketing Performance</h2>
        <div className="marketing-content">
          <div className="campaign-stats">
            <div className="stat-card">
              <div className="stat-title">Email CTR</div>
              <div className="stat-value">4.2%</div>
              <div className="stat-change positive">+0.8%</div>
            </div>
            <div className="stat-card">
              <div className="stat-title">SMS Open Rate</div>
              <div className="stat-value">89%</div>
              <div className="stat-change positive">+2.1%</div>
            </div>
            <div className="stat-card">
              <div className="stat-title">Push Notifications</div>
              <div className="stat-value">56%</div>
              <div className="stat-change negative">-1.3%</div>
            </div>
          </div>
          
          <div className="upcoming-campaigns">
            <div className="campaign-card">
              <div className="campaign-title">Summer Sale Campaign</div>
              <div className="campaign-schedule">Scheduled: Tomorrow 9:00 AM</div>
              <div className="campaign-audience">Target: 12,450 Gold members</div>
              <button className="campaign-btn">Edit Campaign</button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Metric Details */}
      {modalOpen && selectedMetric && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedMetric.label} - Detailed Analysis</h2>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="metric-detail-stats">
                <div className="detail-stat">
                  <div className="detail-label">Current Value</div>
                  <div className="detail-value">{selectedMetric.value}</div>
                </div>
                <div className="detail-stat">
                  <div className="detail-label">Trend</div>
                  <div className={`detail-trend trend-${selectedMetric.trendType}`}>{selectedMetric.trend}</div>
                </div>
                <div className="detail-stat">
                  <div className="detail-label">Period</div>
                  <div className="detail-value">{selectedMetric.subtitle}</div>
                </div>
              </div>
              
              <div className="metric-chart-area">
                <div className="chart-header-with-insights">
                  <MetricChart 
                    metric={selectedMetric}
                    selectedTimeframe={chartTimeframe}
                    onTimeframeChange={setChartTimeframe}
                  />
                  <div className="insights-icon-container">
                    <div className="insights-icon" title="Hover for insights">
                      💡
                    </div>
                    <div className="insights-tooltip">
                      <h4>Key Insights</h4>
                      <ul>
                        <li>Peak performance observed during weekends and holiday periods</li>
                        <li>Seasonal variations indicate opportunity for targeted campaigns in Q4</li>
                        <li>Geographic analysis shows strong performance in UK and EU markets</li>
                        <li>Mobile conversion rates are 23% higher than desktop</li>
                        <li>Customer segment analysis reveals premium travelers drive 67% of revenue</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn secondary" onClick={goToAnalytics}>View in Analytics</button>
              <button className="modal-btn primary" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard; 