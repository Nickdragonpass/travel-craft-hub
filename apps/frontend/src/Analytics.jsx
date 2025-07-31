import React from 'react';
import './App.css';

function Analytics() {
  return (
    <div className="analytics-page">
      <h1 className="page-title">Analytics & Insights</h1>
      <p className="page-subtitle">Comprehensive view of all metrics and performance indicators</p>
      
      <div className="analytics-grid">
        
        {/* Available Metrics Library */}
        <section className="analytics-section">
          <h2 className="section-title">Available Metrics</h2>
          <div className="metrics-library">
            <div className="metric-option">
              <div className="metric-name">Bookings</div>
              <div className="metric-desc">Total bookings per period</div>
              <button className="add-metric-btn">Add to Dashboard</button>
            </div>
            <div className="metric-option">
              <div className="metric-name">Revenue Generated</div>
              <div className="metric-desc">Total revenue across all channels</div>
              <button className="add-metric-btn">Add to Dashboard</button>
            </div>
            <div className="metric-option">
              <div className="metric-name">Support Issues</div>
              <div className="metric-desc">Open support tickets and resolution rate</div>
              <button className="add-metric-btn">Add to Dashboard</button>
            </div>
            <div className="metric-option">
              <div className="metric-name">Loyalty Redemptions</div>
              <div className="metric-desc">Points/miles redeemed value</div>
              <button className="add-metric-btn">Add to Dashboard</button>
            </div>
            <div className="metric-option">
              <div className="metric-name">Customer Acquisition Cost</div>
              <div className="metric-desc">Average cost to acquire new customer</div>
              <button className="add-metric-btn">Add to Dashboard</button>
            </div>
            <div className="metric-option">
              <div className="metric-name">Conversion Rate</div>
              <div className="metric-desc">Visitors to booking conversion</div>
              <button className="add-metric-btn">Add to Dashboard</button>
            </div>
            <div className="metric-option">
              <div className="metric-name">Average Booking Value</div>
              <div className="metric-desc">Mean transaction value</div>
              <button className="add-metric-btn">Add to Dashboard</button>
            </div>
            <div className="metric-option">
              <div className="metric-name">Churn Rate</div>
              <div className="metric-desc">Customer retention metrics</div>
              <button className="add-metric-btn">Add to Dashboard</button>
            </div>
            <div className="metric-option">
              <div className="metric-name">Net Promoter Score</div>
              <div className="metric-desc">Customer satisfaction rating</div>
              <button className="add-metric-btn">Add to Dashboard</button>
            </div>
            <div className="metric-option">
              <div className="metric-name">Active Users</div>
              <div className="metric-desc">Daily/monthly active user count</div>
              <button className="add-metric-btn">Add to Dashboard</button>
            </div>
          </div>
        </section>

        {/* Detailed Charts Section */}
        <section className="analytics-section">
          <h2 className="section-title">Detailed Performance Charts</h2>
          <div className="charts-grid">
            <div className="chart-card">
              <h3>Revenue Trends (Last 12 Months)</h3>
              <div className="chart-placeholder">
                📊 Revenue trending upward with seasonal variations
              </div>
            </div>
            <div className="chart-card">
              <h3>Booking Volume by Channel</h3>
              <div className="chart-placeholder">
                📈 Direct: 45%, Mobile: 35%, Partner: 20%
              </div>
            </div>
            <div className="chart-card">
              <h3>Customer Segments</h3>
              <div className="chart-placeholder">
                👥 Gold: 40%, Silver: 35%, Bronze: 25%
              </div>
            </div>
            <div className="chart-card">
              <h3>Geographic Distribution</h3>
              <div className="chart-placeholder">
                🌍 UK: 45%, EU: 30%, US: 15%, Asia: 10%
              </div>
            </div>
            <div className="chart-card">
              <h3>Service Type Performance</h3>
              <div className="chart-placeholder">
                ✈️ Flights: 60%, Hotels: 25%, Services: 15%
              </div>
            </div>
            <div className="chart-card">
              <h3>Seasonal Patterns</h3>
              <div className="chart-placeholder">
                📅 Q4 peak, Q1 dip, summer recovery
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Analytics; 