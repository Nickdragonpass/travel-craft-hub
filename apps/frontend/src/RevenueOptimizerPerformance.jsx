import React from 'react';

function RevenueOptimizerPerformance({ revenueFunctions }) {
  return (
    <div className="review-section">
      <div className="review-header">
        <h3>Performance Review</h3>
        <div className="review-filters">
          <select className="review-select">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Last 6 Months</option>
          </select>
          <select className="review-select">
            <option>All Functions</option>
            <option>Cross-Sell</option>
            <option>Upsell</option>
            <option>Bundle</option>
          </select>
        </div>
      </div>

      <div className="review-overview">
        <div className="overview-metrics">
          <div className="metric-card large">
            <div className="metric-icon">💰</div>
            <div className="metric-content">
              <h3>Total Revenue Generated</h3>
              <div className="metric-value">£47,010</div>
              <div className="metric-change positive">+12.5% vs last month</div>
            </div>
          </div>
          <div className="metric-card large">
            <div className="metric-icon">📈</div>
            <div className="metric-content">
              <h3>Overall Conversion Rate</h3>
              <div className="metric-value">6.8%</div>
              <div className="metric-change positive">+1.2% vs last month</div>
            </div>
          </div>
          <div className="metric-card large">
            <div className="metric-icon">📧</div>
            <div className="metric-content">
              <h3>Avg Communication Performance</h3>
              <div className="metric-value">24.2%</div>
              <div className="metric-change positive">+2.1% vs last month</div>
            </div>
          </div>
        </div>

        <div className="performance-breakdown">
          <div className="breakdown-section">
            <h4>Function Performance</h4>
            <div className="function-performance-list">
              {revenueFunctions.map(func => (
                <div key={func.id} className="performance-item">
                  <div className="perf-info">
                    <h5>{func.name}</h5>
                    <span className="perf-category">{func.category}</span>
                  </div>
                  <div className="perf-metrics">
                    <div className="perf-metric">
                      <span className="perf-label">Revenue</span>
                      <span className="perf-value">{func.performance.revenue}</span>
                    </div>
                    <div className="perf-metric">
                      <span className="perf-label">Conversion</span>
                      <span className="perf-value">{func.performance.conversionRate}</span>
                    </div>
                    <div className="perf-metric">
                      <span className="perf-label">Comms</span>
                      <span className="perf-value">{func.comms.length}</span>
                    </div>
                  </div>
                  <div className="perf-trend">
                    <span className="trend-indicator positive">↗</span>
                    <span className="trend-value">+8.3%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="breakdown-section">
            <h4>Communication Performance</h4>
            <div className="comms-performance-list">
              {revenueFunctions.flatMap(func => 
                func.comms.map(comm => ({
                  ...comm,
                  functionName: func.name
                }))
              ).map(comm => (
                <div key={comm.id} className="performance-item">
                  <div className="perf-info">
                    <h5>{comm.name}</h5>
                    <span className="perf-category">{comm.functionName}</span>
                  </div>
                  <div className="perf-metrics">
                    {comm.performance.opens && (
                      <div className="perf-metric">
                        <span className="perf-label">Open Rate</span>
                        <span className="perf-value">{comm.performance.opens}</span>
                      </div>
                    )}
                    {comm.performance.clicks && (
                      <div className="perf-metric">
                        <span className="perf-label">Click Rate</span>
                        <span className="perf-value">{comm.performance.clicks}</span>
                      </div>
                    )}
                  </div>
                  <div className="perf-trend">
                    <span className="trend-indicator positive">↗</span>
                    <span className="trend-value">+5.2%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueOptimizerPerformance; 