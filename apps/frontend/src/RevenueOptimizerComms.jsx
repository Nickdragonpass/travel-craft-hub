import React from 'react';

function RevenueOptimizerComms({ revenueFunctions, setActiveTab, getBookingTypeIcon, getStatusColor }) {
  return (
    <div className="comms-section">
      <div className="comms-header">
        <div className="comms-header-left">
          <h3>Communication Channels</h3>
          <p>Manage how your revenue functions communicate with customers</p>
        </div>
        <div className="comms-header-right">
          <button 
            className="comms-btn primary"
            onClick={() => setActiveTab('review')}
          >
            Review Performance
          </button>
          <button className="comms-btn secondary">
            Back to Build
          </button>
        </div>
      </div>

      <div className="comms-overview">
        <div className="comms-stats">
          <div className="stat-card">
            <span className="stat-number">{revenueFunctions.filter(f => f.comms.length > 0).length}</span>
            <span className="stat-label">Functions with Comms</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{revenueFunctions.reduce((sum, f) => sum + f.comms.length, 0)}</span>
            <span className="stat-label">Total Comms</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{revenueFunctions.reduce((sum, f) => sum + f.comms.filter(c => c.status === 'Active').length, 0)}</span>
            <span className="stat-label">Active Comms</span>
          </div>
        </div>

        <div className="comms-by-function">
          {revenueFunctions.map(func => (
            <div key={func.id} className="function-comms-group">
              <div className="function-comms-header">
                <div className="function-comms-header-left">
                  <h4>{func.name}</h4>
                  <p>{func.description}</p>
                </div>
                <button className="add-comm-btn primary">
                  Add Communication
                </button>
              </div>

              {func.comms.length > 0 ? (
                <div className="comms-list">
                  {func.comms.map(comm => (
                    <div key={comm.id} className="comm-card">
                      <div className="comm-info">
                        <h5>{comm.name}</h5>
                        <div className="comm-performance">
                          {Object.entries(comm.performance).map(([key, value]) => (
                            <span key={key} className="perf-metric">
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="comm-actions">
                        <button className="comm-btn secondary">Edit</button>
                        <button className="comm-btn secondary">Pause</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-comms">
                  <p>No communications set up for this function yet.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RevenueOptimizerComms;