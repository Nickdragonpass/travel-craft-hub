import React from 'react';

function RevenueOptimizerOverview({ revenueFunctions, setActiveTab, getBookingTypeIcon, getStatusColor }) {
  return (
    <div className="build-section">
      <div className="build-header">
        <div className="build-header-left">
          <h3>Revenue Functions</h3>
          <p>Overview of your active and draft revenue functions</p>
        </div>
      </div>

      <div className="functions-overview">
        <div className="functions-stats">
          <div className="stat-card">
            <span className="stat-number">{revenueFunctions.length}</span>
            <span className="stat-label">Total Functions</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{revenueFunctions.filter(f => f.status === 'Active').length}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">£{revenueFunctions.reduce((sum, f) => sum + parseFloat(f.performance.revenue.replace('£', '').replace(',', '')), 0).toLocaleString()}</span>
            <span className="stat-label">Total Revenue</span>
          </div>
        </div>

        <div className="functions-list">
          {revenueFunctions.map(func => (
            <div key={func.id} className="function-card">
              <div className="function-header">
                <div className="function-info">
                  <h4>{func.name}</h4>
                  <p>{func.description}</p>
                  <div className="function-meta">
                    <span className="category-badge">{func.category}</span>
                    <span className={`status-badge ${getStatusColor(func.status)}`}>{func.status}</span>
                  </div>
                </div>
                <div className="function-actions">
                  {func.status === 'Active' ? (
                    <button 
                      className="function-btn primary"
                      onClick={() => setActiveTab('review')}
                    >
                      View Performance
                    </button>
                  ) : func.status === 'Draft' ? (
                    // Check if function has comms (build phase is complete)
                    func.comms.length > 0 ? (
                      <button 
                        className="function-btn primary"
                        onClick={() => setActiveTab('comms')}
                      >
                        Continue to Comms
                      </button>
                    ) : (
                      <button 
                        className="function-btn primary"
                        onClick={() => setActiveTab('build')}
                      >
                        Continue Building
                      </button>
                    )
                  ) : (
                    <button className="function-btn secondary">Edit</button>
                  )}
                </div>
              </div>

              <div className="function-details">
                <div className="function-triggers">
                  <span className="section-label">Triggers:</span>
                  {func.bookingTypes.map(type => (
                    <span key={type} className="booking-type-tag">
                      {getBookingTypeIcon(type)} {type}
                    </span>
                  ))}
                </div>
                <div className="function-targets">
                  <span className="section-label">Offers:</span>
                  {func.targetTypes.map(type => (
                    <span key={type} className="booking-type-tag target">
                      {getBookingTypeIcon(type)} {type}
                    </span>
                  ))}
                </div>
                <div className="function-timing">
                  <span className="section-label">Timing:</span>
                  <span className="timing-text">{func.timing || 'Immediate'}</span>
                </div>
              </div>

              <div className="function-performance">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RevenueOptimizerOverview; 