import React, { useState } from 'react';

function RevenueOptimizerFunctionDetails({ functionId, onBack }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30');
  const [selectedView, setSelectedView] = useState('overview');
  const [showImprovementModal, setShowImprovementModal] = useState(false);
  const [selectedCommId, setSelectedCommId] = useState(null);
  const [selectedImprovements, setSelectedImprovements] = useState([]);
  const [showABTestModal, setShowABTestModal] = useState(false);
  const [abTestConfig, setABTestConfig] = useState({});
  const [activeABTests, setActiveABTests] = useState({});
  const [activeImprovements, setActiveImprovements] = useState({});
  const [expandedComms, setExpandedComms] = useState({});

  // Mock detailed function data
  const [functionData, setFunctionData] = useState({
    id: functionId,
    name: 'Pre-Departure Seat Upgrade',
    description: '3 days before flight departure, offer seat bookability with discount',
    category: 'Upsell',
    status: 'Active',
    performance: {
      impressions: 125000,
      clicks: 8750,
      conversions: 4375,
      revenue: 141750,
      conversionRate: 5.0,
      avgOrderValue: 32.4
    },
    objectives: ['Increase Revenue', 'Improve Customer Experience'],
    communications: [
      {
        id: 'comm-1',
        name: 'Spanish Email Campaign',
        type: 'Email',
        status: 'Active',
        performance: {
          impressions: 18750,
          opens: 18750,
          clicks: 1875,
          conversions: 938,
          revenue: 30391,
          openRate: 15.0,
          clickRate: 10.0,
          conversionRate: 5.0
        }
      },
      {
        id: 'comm-2',
        name: 'Portuguese Email Campaign',
        type: 'Email',
        status: 'Active',
        performance: {
          impressions: 16250,
          opens: 16250,
          clicks: 1625,
          conversions: 812,
          revenue: 26309,
          openRate: 13.0,
          clickRate: 10.0,
          conversionRate: 5.0
        }
      },
      {
        id: 'comm-3',
        name: 'Digital Concierge A/B Test A',
        type: 'In-App',
        status: 'Active',
        performance: {
          impressions: 45000,
          clicks: 3150,
          conversions: 1575,
          revenue: 51030,
          clickRate: 7.0,
          conversionRate: 5.0
        }
      },
      {
        id: 'comm-4',
        name: 'Digital Concierge A/B Test B',
        type: 'In-App',
        status: 'Active',
        performance: {
          impressions: 45000,
          clicks: 2100,
          conversions: 1050,
          revenue: 34020,
          clickRate: 4.7,
          conversionRate: 5.0
        }
      }
    ]
  });

  const calculatePerformanceScore = (performance) => {
    const revenueScore = Math.min((performance.revenue / 100000) * 40, 40);
    const conversionScore = Math.min((performance.conversionRate / 10) * 30, 30);
    const activityScore = Math.min((performance.conversions / 1000) * 30, 30);
    return Math.round(revenueScore + conversionScore + activityScore);
  };

  const performanceScore = calculatePerformanceScore(functionData.performance);

  const handleImprovePerformance = (commId) => {
    setSelectedCommId(commId);
    setShowImprovementModal(true);
  };

  const handleCloseModal = () => {
    setShowImprovementModal(false);
    setSelectedCommId(null);
    setSelectedImprovements([]);
  };

  const handleImprovementSelection = (improvementId, isSelected) => {
    if (isSelected) {
      setSelectedImprovements(prev => [...prev, improvementId]);
    } else {
      setSelectedImprovements(prev => prev.filter(id => id !== improvementId));
    }
  };

  const handleRunImprovements = () => {
    if (selectedImprovements.length === 0) return;
    
    // Create direct improvement entries for each selected improvement
    const newImprovements = {};
    selectedImprovements.forEach(improvementId => {
      const improvementData = {
        id: `improvement-${improvementId}-${Date.now()}`,
        parentCommId: selectedCommId,
        improvementType: improvementId,
        name: getImprovementName(improvementId),
        status: 'running',
        performance: {
          impressions: 0,
          clicks: 0,
          conversions: 0,
          revenue: 0,
          conversionRate: 0
        },
        startDate: new Date().toISOString()
      };
      newImprovements[improvementData.id] = improvementData;
    });
    
    setActiveImprovements(prev => ({ ...prev, ...newImprovements }));
    handleCloseModal();
  };

  const getImprovementName = (improvementId) => {
    const names = {
      'cta-colors': 'Optimized CTA Colors',
      'send-timing': 'Optimized Send Timing',
      'discount-amounts': 'Optimized Discount Amounts'
    };
    return names[improvementId] || improvementId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleABTest = () => {
    setShowABTestModal(true);
  };

  const handleCloseABTestModal = () => {
    setShowABTestModal(false);
    setABTestConfig({});
  };

  const handleABTestConfig = (improvementId, testType, value) => {
    setABTestConfig(prev => ({
      ...prev,
      [improvementId]: {
        ...prev[improvementId],
        [testType]: value
      }
    }));
  };

  const handleRunABTests = () => {
    console.log('Running A/B tests with config:', abTestConfig);
    
    // Create A/B test entries for each configured improvement
    const newABTests = {};
    Object.keys(abTestConfig).forEach(improvementId => {
      const config = abTestConfig[improvementId];
      if (config.testA && config.testB) {
        newABTests[improvementId] = {
          id: `ab-test-${improvementId}-${Date.now()}`,
          parentCommId: selectedCommId,
          improvementType: improvementId,
          testA: {
            id: `test-a-${improvementId}`,
            name: `Test A (${config.testA})`,
            config: config.testA,
            performance: {
              impressions: 0,
              clicks: 0,
              conversions: 0,
              revenue: 0,
              conversionRate: 0
            },
            status: 'running'
          },
          testB: {
            id: `test-b-${improvementId}`,
            name: `Test B (${config.testB})`,
            config: config.testB,
            performance: {
              impressions: 0,
              clicks: 0,
              conversions: 0,
              revenue: 0,
              conversionRate: 0
            },
            status: 'running'
          },
          startDate: new Date().toISOString(),
          status: 'running'
        };
      }
    });
    
    setActiveABTests(prev => ({ ...prev, ...newABTests }));
    handleCloseABTestModal();
    handleCloseModal();
  };

  const handleToggleCommExpansion = (commId) => {
    setExpandedComms(prev => ({
      ...prev,
      [commId]: !prev[commId]
    }));
  };

  const handleStopABTest = (testId) => {
    setActiveABTests(prev => {
      const updated = { ...prev };
      if (updated[testId]) {
        updated[testId].status = 'stopped';
        updated[testId].testA.status = 'stopped';
        updated[testId].testB.status = 'stopped';
      }
      return updated;
    });
  };

  const handlePromoteABTest = (testId, variant) => {
    setActiveABTests(prev => {
      const updated = { ...prev };
      if (updated[testId]) {
        const test = updated[testId];
        const promotedVariant = variant === 'A' ? test.testA : test.testB;
        
        // Create a new communication from the promoted variant
        const newComm = {
          id: `promoted-${testId}-${variant}`,
          name: `${promotedVariant.name} (Promoted)`,
          type: 'Email', // You might want to make this dynamic based on the original comm type
          status: 'Active',
          performance: {
            ...promotedVariant.performance,
            // Start with the test performance data
            revenue: promotedVariant.performance.revenue,
            conversionRate: promotedVariant.performance.conversionRate,
            clicks: promotedVariant.performance.clicks,
            conversions: promotedVariant.performance.conversions,
            impressions: promotedVariant.performance.impressions
          }
        };
        
        // Add the new communication to the function data
        setFunctionData(prev => ({
          ...prev,
          communications: [...prev.communications, newComm]
        }));
        
        // Mark the test as promoted
        updated[testId].status = 'promoted';
        updated[testId].promotedVariant = variant;
        updated[testId].testA.status = variant === 'A' ? 'promoted' : 'stopped';
        updated[testId].testB.status = variant === 'B' ? 'promoted' : 'stopped';
      }
      return updated;
    });
  };

  const handleStopImprovement = (improvementId) => {
    setActiveImprovements(prev => {
      const updated = { ...prev };
      if (updated[improvementId]) {
        updated[improvementId].status = 'stopped';
      }
      return updated;
    });
  };

  const handlePromoteImprovement = (improvementId) => {
    setActiveImprovements(prev => {
      const updated = { ...prev };
      if (updated[improvementId]) {
        const improvement = updated[improvementId];
        
        // Create a new communication from the promoted improvement
        const newComm = {
          id: `promoted-improvement-${improvementId}`,
          name: `${improvement.name} (Promoted)`,
          type: 'Email', // You might want to make this dynamic based on the original comm type
          status: 'Active',
          performance: {
            ...improvement.performance,
            // Start with the improvement performance data
            revenue: improvement.performance.revenue,
            conversionRate: improvement.performance.conversionRate,
            clicks: improvement.performance.clicks,
            conversions: improvement.performance.conversions,
            impressions: improvement.performance.impressions
          }
        };
        
        // Add the new communication to the function data
        setFunctionData(prev => ({
          ...prev,
          communications: [...prev.communications, newComm]
        }));
        
        // Mark the improvement as promoted
        updated[improvementId].status = 'promoted';
      }
      return updated;
    });
  };

  return (
    <div className="function-details">
      {/* Back Button */}
      <div className="back-button-section">
        <button className="back-btn" onClick={onBack}>
          ← Back to Performance
        </button>
      </div>

      {/* Filters - Temporarily removed to fix layout */}
      {/* <div className="details-filters">
        <div className="filter-group">
          <label className="filter-label">Timeframe</label>
          <select 
            value={selectedTimeframe} 
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="filter-select"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label">View</label>
          <select 
            value={selectedView} 
            onChange={(e) => setSelectedView(e.target.value)}
            className="filter-select"
          >
            <option value="overview">Overview</option>
            <option value="communications">Communications</option>
            <option value="ab-testing">A/B Testing</option>
            <option value="analytics">Analytics</option>
            <option value="actions">Actions</option>
          </select>
        </div>
      </div> */}

            {/* Main Content */}
      <div className="details-content">
        {selectedView === 'overview' && (
          <div className="overview-section">
            {/* Performance Summary */}
            <div className="performance-summary">
              <div className="summary-header">
                <div className="function-info">
                  <h2>{functionData.name}</h2>
                  <p className="function-description">{functionData.description}</p>
                  <div className="function-meta">
                    <span className="category-badge">{functionData.category}</span>
                    <span className={`status-badge ${functionData.status.toLowerCase()}`}>
                      {functionData.status}
                    </span>
                  </div>
                </div>
                <div className="performance-score">
                  <div className={`score-circle large ${performanceScore < 70 ? 'low-score' : ''}`}>
                    <span className="score-number">{performanceScore}</span>
                    <span className="score-label">Score</span>
                  </div>
                </div>
              </div>
              
              <div className="metrics-row">
                <div className="metric-card">
                  <div className="metric-icon">👥</div>
                  <div className="metric-content">
                    <h3>Impressions</h3>
                    <p className="metric-value">{functionData.performance.impressions.toLocaleString()}</p>
                    <p className="metric-trend positive">+15.2% vs last period</p>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon">🖱️</div>
                  <div className="metric-content">
                    <h3>Click Through Rate</h3>
                    <p className="metric-value">{((functionData.performance.clicks / functionData.performance.impressions) * 100).toFixed(1)}%</p>
                    <p className="metric-trend positive">+2.3% vs last period</p>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon">📊</div>
                  <div className="metric-content">
                    <h3>Conversion Rate</h3>
                    <p className="metric-value">{functionData.performance.conversionRate}%</p>
                    <p className="metric-trend positive">+1.2% vs last period</p>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon">💰</div>
                  <div className="metric-content">
                    <h3>Total Revenue</h3>
                    <p className="metric-value">£{functionData.performance.revenue.toLocaleString()}</p>
                    <p className="metric-trend positive">+12.5% vs last period</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Communications Analysis */}
            <div className="communications-analysis">
              <div className="section-header">
                <h2>Communications Analysis</h2>
                <button className="ai-optimize-all-btn">
                  <span className="ai-icon">✨</span>
                  AI Optimize All
                </button>
              </div>
              
              <div className="comms-list">
                {functionData.communications.map((comm) => {
                  const commABTests = Object.values(activeABTests).filter(test => test.parentCommId === comm.id);
                  const commImprovements = Object.values(activeImprovements).filter(improvement => improvement.parentCommId === comm.id);
                  const hasABTests = commABTests.length > 0;
                  const hasImprovements = commImprovements.length > 0;
                  const hasChildren = hasABTests || hasImprovements;
                  const isExpanded = expandedComms[comm.id];
                  
                  return (
                    <div key={comm.id} className="comm-item">
                      <div className="comm-main-info">
                        <div className="comm-name-type">
                          <h3>{comm.name}</h3>
                          <span className="comm-type">{comm.type}</span>
                          <span className={`comm-status ${comm.status.toLowerCase()}`}>{comm.status}</span>
                          {hasChildren && (
                            <span className="ab-test-badge">
                              {hasABTests && `🧪 ${commABTests.length}`}
                              {hasABTests && hasImprovements && ' + '}
                              {hasImprovements && `✨ ${commImprovements.length}`}
                            </span>
                          )}
                        </div>
                        <div className="comm-performance">
                          <div className={`performance-status ${comm.performance.conversionRate >= 5 ? 'good' : 'needs-improvement'}`}>
                            {comm.performance.conversionRate >= 5 ? '✓ Performing Well' : '⚠ Needs Attention'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="comm-metrics">
                        <div className="metric-pair">
                          <div className="metric">
                            <span className="label">Impressions</span>
                            <span className="value">{comm.performance.impressions?.toLocaleString() || '0'}</span>
                          </div>
                          <div className="metric">
                            <span className="label">Click Through Rate</span>
                            <span className="value">{comm.performance.clickRate ? comm.performance.clickRate + '%' : ((comm.performance.clicks / comm.performance.impressions * 100) || 0).toFixed(1) + '%'}</span>
                          </div>
                        </div>
                        <div className="metric-pair">
                          <div className="metric">
                            <span className="label">Conversion Rate</span>
                            <span className="value">{comm.performance.conversionRate}%</span>
                          </div>
                          <div className="metric">
                            <span className="label">Revenue</span>
                            <span className="value">£{comm.performance.revenue.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="comm-actions">
                        <button className="btn-secondary">Pause</button>
                        <button className="btn-ai" onClick={() => handleImprovePerformance(comm.id)}>
                          <span className="ai-icon">✨</span>
                          Improve Performance
                        </button>
                        {hasChildren && (
                          <button 
                            className="btn-expand"
                            onClick={() => handleToggleCommExpansion(comm.id)}
                          >
                            {isExpanded ? '▼' : '▶'} Tests
                          </button>
                        )}
                      </div>
                      
                      {/* Expandable Tests and Improvements Section */}
                      {isExpanded && hasChildren && (
                        <div className="comm-ab-tests">
                                                      <div className="ab-tests-header">
                              <h4>Active Tests & Improvements</h4>
                              <span className="tests-count">
                                {hasABTests && `${commABTests.length} A/B tests`}
                                {hasABTests && hasImprovements && ' + '}
                                {hasImprovements && `${commImprovements.length} improvements`}
                                {' running'}
                              </span>
                            </div>
                                                      <div className="ab-tests-list">
                              {/* A/B Tests */}
                              {commABTests.map((test) => (
                              <div key={test.id} className="ab-test-item">
                                <div className="test-header">
                                  <div className="test-info">
                                    <h5>{test.improvementType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h5>
                                    <span className={`test-status ${test.status}`}>{test.status}</span>
                                  </div>
                                  <div className="test-actions">
                                    {test.status === 'running' && (
                                      <>
                                        <button 
                                          className="action-btn small primary"
                                          onClick={() => handlePromoteABTest(test.id, 'A')}
                                        >
                                          Promote A
                                        </button>
                                        <button 
                                          className="action-btn small primary"
                                          onClick={() => handlePromoteABTest(test.id, 'B')}
                                        >
                                          Promote B
                                        </button>
                                        <button 
                                          className="action-btn small secondary"
                                          onClick={() => handleStopABTest(test.id)}
                                        >
                                          Stop Test
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="test-variants">
                                  <div className="variant-item">
                                    <div className="variant-header">
                                      <span className="variant-name">{test.testA.name}</span>
                                      <span className={`variant-status ${test.testA.status}`}>{test.testA.status}</span>
                                    </div>
                                    <div className="variant-metrics">
                                      <div className="metric">
                                        <span className="label">Conversion Rate</span>
                                        <span className="value">{test.testA.performance.conversionRate}%</span>
                                      </div>
                                      <div className="metric">
                                        <span className="label">Revenue</span>
                                        <span className="value">£{test.testA.performance.revenue.toLocaleString()}</span>
                                      </div>
                                      <div className="metric">
                                        <span className="label">Clicks</span>
                                        <span className="value">{test.testA.performance.clicks.toLocaleString()}</span>
                                      </div>
                                      <div className="metric">
                                        <span className="label">Conversions</span>
                                        <span className="value">{test.testA.performance.conversions.toLocaleString()}</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="variant-item">
                                    <div className="variant-header">
                                      <span className="variant-name">{test.testB.name}</span>
                                      <span className={`variant-status ${test.testB.status}`}>{test.testB.status}</span>
                                    </div>
                                    <div className="variant-metrics">
                                      <div className="metric">
                                        <span className="label">Conversion Rate</span>
                                        <span className="value">{test.testB.performance.conversionRate}%</span>
                                      </div>
                                      <div className="metric">
                                        <span className="label">Revenue</span>
                                        <span className="value">£{test.testB.performance.revenue.toLocaleString()}</span>
                                      </div>
                                      <div className="metric">
                                        <span className="label">Clicks</span>
                                        <span className="value">{test.testB.performance.clicks.toLocaleString()}</span>
                                      </div>
                                      <div className="metric">
                                        <span className="label">Conversions</span>
                                        <span className="value">{test.testB.performance.conversions.toLocaleString()}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                            
                            {/* Direct Improvements */}
                            {commImprovements.map((improvement) => (
                              <div key={improvement.id} className="improvement-item">
                                <div className="test-header">
                                  <div className="test-info">
                                    <h5>{improvement.name}</h5>
                                    <span className={`test-status ${improvement.status}`}>{improvement.status}</span>
                                  </div>
                                  <div className="test-actions">
                                    {improvement.status === 'running' && (
                                      <>
                                        <button 
                                          className="action-btn small primary"
                                          onClick={() => handlePromoteImprovement(improvement.id)}
                                        >
                                          Promote
                                        </button>
                                        <button 
                                          className="action-btn small secondary"
                                          onClick={() => handleStopImprovement(improvement.id)}
                                        >
                                          Stop Improvement
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="improvement-metrics">
                                  <div className="metric">
                                    <span className="label">Conversion Rate</span>
                                    <span className="value">{improvement.performance.conversionRate}%</span>
                                  </div>
                                  <div className="metric">
                                    <span className="label">Revenue</span>
                                    <span className="value">£{improvement.performance.revenue.toLocaleString()}</span>
                                  </div>
                                  <div className="metric">
                                    <span className="label">Clicks</span>
                                    <span className="value">{improvement.performance.clicks.toLocaleString()}</span>
                                  </div>
                                  <div className="metric">
                                    <span className="label">Conversions</span>
                                    <span className="value">{improvement.performance.conversions.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>


          </div>
        )}

        {selectedView === 'communications' && (
          <div className="communications-section">
            <div className="comms-header">
              <h3>Communication Performance</h3>
              <button className="ai-magic-btn">
                <span className="ai-icon">✨</span>
                AI Optimize All
              </button>
            </div>
            
            <div className="comms-detailed">
              {functionData.communications.map((comm) => (
                <div key={comm.id} className="comm-detailed-card">
                  <div className="comm-detailed-header">
                    <div className="comm-info">
                      <h4>{comm.name}</h4>
                      <span className="comm-type">{comm.type}</span>
                      <div className="comm-status-indicator">
                        <span className={`status-dot ${comm.status.toLowerCase()}`}></span>
                        {comm.status}
                      </div>
                    </div>
                    <div className="comm-actions">
                      <button className="action-btn secondary">Pause</button>
                      <button className="action-btn primary">Run A/B Test</button>
                      <button className="action-btn ai-btn" onClick={() => handleImprovePerformance(comm.id)}>
                        <span className="ai-icon">✨</span>
                        Improve Performance
                      </button>
                    </div>
                  </div>
                  
                  <div className="comm-detailed-metrics">
                    <div className="metric-row">
                      <div className="metric-item">
                        <span className="metric-label">Revenue</span>
                        <span className="metric-value">£{comm.performance.revenue.toLocaleString()}</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Conversions</span>
                        <span className="metric-value">{comm.performance.conversions.toLocaleString()}</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Conversion Rate</span>
                        <span className="metric-value">{comm.performance.conversionRate}%</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Clicks</span>
                        <span className="metric-value">{comm.performance.clicks.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* A/B Test Section */}
                  <div className="ab-test-section">
                    <div className="ab-test-header">
                      <h5>A/B Test Variations</h5>
                      <button className="add-variation-btn">+ Add Variation</button>
                    </div>
                    <div className="variations-grid">
                      <div className="variation-card control">
                        <div className="variation-header">
                          <span className="variation-label">Control (Current)</span>
                          <span className="variation-status active">Active</span>
                        </div>
                        <div className="variation-metrics">
                          <div className="metric">
                            <span className="metric-label">Click Rate</span>
                            <span className="metric-value">7.0%</span>
                          </div>
                          <div className="metric">
                            <span className="metric-label">Conversion</span>
                            <span className="metric-value">5.0%</span>
                          </div>
                        </div>
                      </div>
                      <div className="variation-card test">
                        <div className="variation-header">
                          <span className="variation-label">Test A</span>
                          <span className="variation-status running">Running</span>
                        </div>
                        <div className="variation-metrics">
                          <div className="metric">
                            <span className="metric-label">Click Rate</span>
                            <span className="metric-value">4.7%</span>
                            <span className="metric-trend negative">-33%</span>
                          </div>
                          <div className="metric">
                            <span className="metric-label">Conversion</span>
                            <span className="metric-value">5.0%</span>
                            <span className="metric-trend neutral">0%</span>
                          </div>
                        </div>
                        <div className="variation-actions">
                          <button className="action-btn small">Stop Test</button>
                          <button className="action-btn small">View Details</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'ab-testing' && (
          <div className="ab-testing-section">
            <div className="ab-testing-header">
              <h3>A/B Testing Center</h3>
              <button className="ai-magic-btn large">
                <span className="ai-icon">✨</span>
                AI Create Test
              </button>
            </div>

            {/* Active Tests Summary */}
            <div className="active-tests-summary">
              <div className="summary-card">
                <div className="summary-icon">🧪</div>
                <div className="summary-content">
                  <h4>Active Tests</h4>
                  <p className="summary-number">3</p>
                  <p className="summary-desc">Running across communications</p>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">📈</div>
                <div className="summary-content">
                  <h4>Avg Improvement</h4>
                  <p className="summary-number">+18%</p>
                  <p className="summary-desc">Across all test variations</p>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">🎯</div>
                <div className="summary-content">
                  <h4>Confidence Level</h4>
                  <p className="summary-number">87%</p>
                  <p className="summary-desc">Statistical significance</p>
                </div>
              </div>
            </div>

            {/* AI Test Suggestions */}
            <div className="ai-test-suggestions">
              <h4>AI-Powered Test Suggestions</h4>
              <div className="suggestions-grid">
                <div className="suggestion-card">
                  <div className="suggestion-header">
                    <div className="suggestion-icon">🎨</div>
                    <div className="suggestion-badge">High Impact</div>
                  </div>
                  <h5>Test Different CTA Colors</h5>
                  <p>AI suggests testing red vs blue CTA buttons. Historical data shows red CTAs perform 23% better in travel industry.</p>
                  <div className="suggestion-metrics">
                    <span className="metric">Expected Lift: +23%</span>
                    <span className="metric">Confidence: 94%</span>
                  </div>
                  <button className="action-btn primary">Create Test</button>
                </div>

                <div className="suggestion-card">
                  <div className="suggestion-header">
                    <div className="suggestion-icon">⏰</div>
                    <div className="suggestion-badge">Timing</div>
                  </div>
                  <h5>Test Send Timing</h5>
                  <p>Test sending emails at 9 AM vs 6 PM. Morning emails show 15% higher open rates for business travelers.</p>
                  <div className="suggestion-metrics">
                    <span className="metric">Expected Lift: +15%</span>
                    <span className="metric">Confidence: 89%</span>
                  </div>
                  <button className="action-btn primary">Create Test</button>
                </div>

                <div className="suggestion-card">
                  <div className="suggestion-header">
                    <div className="suggestion-icon">💰</div>
                    <div className="suggestion-badge">Pricing</div>
                  </div>
                  <h5>Test Discount Amounts</h5>
                  <p>Test 10% vs 15% discount offers. AI predicts 15% discount will increase conversions by 28% with minimal revenue impact.</p>
                  <div className="suggestion-metrics">
                    <span className="metric">Expected Lift: +28%</span>
                    <span className="metric">Confidence: 91%</span>
                  </div>
                  <button className="action-btn primary">Create Test</button>
                </div>
              </div>
            </div>

            {/* Active Tests */}
            <div className="active-tests">
              <h4>Active A/B Tests</h4>
              <div className="tests-grid">
                <div className="test-card">
                  <div className="test-header">
                    <h5>Email Subject Line Test</h5>
                    <span className="test-status running">Running</span>
                  </div>
                  <div className="test-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '65%'}}></div>
                    </div>
                    <span className="progress-text">65% complete</span>
                  </div>
                  <div className="test-variations">
                    <div className="variation">
                      <span className="variation-name">Control: "Upgrade Your Seat"</span>
                      <span className="variation-performance">Open Rate: 15.2%</span>
                    </div>
                    <div className="variation">
                      <span className="variation-name">Test A: "Get Premium Comfort"</span>
                      <span className="variation-performance">Open Rate: 18.7% (+23%)</span>
                    </div>
                  </div>
                  <div className="test-actions">
                    <button className="action-btn secondary">Stop Test</button>
                    <button className="action-btn primary">View Details</button>
                  </div>
                </div>

                <div className="test-card">
                  <div className="test-header">
                    <h5>Digital Concierge CTA Test</h5>
                    <span className="test-status running">Running</span>
                  </div>
                  <div className="test-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '45%'}}></div>
                    </div>
                    <span className="progress-text">45% complete</span>
                  </div>
                  <div className="test-variations">
                    <div className="variation">
                      <span className="variation-name">Control: "Book Now"</span>
                      <span className="variation-performance">Click Rate: 7.0%</span>
                    </div>
                    <div className="variation">
                      <span className="variation-name">Test A: "Upgrade Seat"</span>
                      <span className="variation-performance">Click Rate: 4.7% (-33%)</span>
                    </div>
                  </div>
                  <div className="test-actions">
                    <button className="action-btn secondary">Stop Test</button>
                    <button className="action-btn primary">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'actions' && (
          <div className="actions-section">
            <div className="actions-header">
              <h3>AI-Powered Recommendations</h3>
              <div className="ai-magic-indicator">
                <span className="ai-icon">✨</span>
                <span className="ai-text">AI Magic</span>
              </div>
            </div>
            
            {/* AI Insights Summary */}
            <div className="ai-insights-summary">
              <div className="insight-highlight">
                <div className="highlight-icon">🎯</div>
                <div className="highlight-content">
                  <h4>Performance Opportunity</h4>
                  <p>Your function has a <strong>15% improvement potential</strong> based on similar high-performing campaigns in your industry.</p>
                </div>
              </div>
            </div>

            <div className="actions-grid">
              <div className="action-card ai-powered">
                <div className="action-header">
                  <div className="action-icon">🚀</div>
                  <div className="ai-badge">AI Suggested</div>
                </div>
                <h4>Optimize A/B Test B</h4>
                <p>Digital Concierge A/B Test B has 33% lower click rate than Test A. <strong>AI suggests:</strong> Update imagery to match Test A's style and test different call-to-action text.</p>
                <div className="action-metrics">
                  <span className="metric">Expected Impact: +25% click rate</span>
                  <span className="metric">Confidence: 87%</span>
                </div>
                <button className="action-btn primary">Run A/B Test</button>
              </div>
              
              <div className="action-card ai-powered">
                <div className="action-header">
                  <div className="action-icon">📧</div>
                  <div className="ai-badge">AI Suggested</div>
                </div>
                <h4>Expand Email Campaigns</h4>
                <p>Email campaigns are performing well. <strong>AI suggests:</strong> Expand to French and German markets where similar campaigns show 40% higher engagement.</p>
                <div className="action-metrics">
                  <span className="metric">Expected Impact: +40% engagement</span>
                  <span className="metric">Confidence: 92%</span>
                </div>
                <button className="action-btn primary">Create Campaign</button>
              </div>
              
              <div className="action-card ai-powered">
                <div className="action-header">
                  <div className="action-icon">⏰</div>
                  <div className="ai-badge">AI Suggested</div>
                </div>
                <h4>Optimize Timing Strategy</h4>
                <p><strong>AI suggests:</strong> Test sending seat upgrade offers 2 days before departure instead of 3 days. Historical data shows 18% higher conversion rates.</p>
                <div className="action-metrics">
                  <span className="metric">Expected Impact: +18% conversion</span>
                  <span className="metric">Confidence: 89%</span>
                </div>
                <button className="action-btn primary">Test Timing</button>
              </div>

              <div className="action-card ai-powered">
                <div className="action-header">
                  <div className="action-icon">🎨</div>
                  <div className="ai-badge">AI Suggested</div>
                </div>
                <h4>Personalize Content</h4>
                <p><strong>AI suggests:</strong> Implement dynamic content based on customer's previous booking history. This could increase conversion rates by 22%.</p>
                <div className="action-metrics">
                  <span className="metric">Expected Impact: +22% conversion</span>
                  <span className="metric">Confidence: 85%</span>
                </div>
                <button className="action-btn primary">Setup Personalization</button>
              </div>
            </div>

            {/* AI Tools Section */}
            <div className="ai-tools-section">
              <h4>AI-Powered Tools</h4>
              <div className="ai-tools-grid">
                <div className="ai-tool-card">
                  <div className="tool-icon">🤖</div>
                  <h5>Smart A/B Testing</h5>
                  <p>Let AI automatically test variations and optimize for the best performance.</p>
                  <button className="action-btn secondary">Launch AI Test</button>
                </div>
                <div className="ai-tool-card">
                  <div className="tool-icon">📊</div>
                  <h5>Performance Predictor</h5>
                  <p>Get AI predictions on how changes will impact your conversion rates.</p>
                  <button className="action-btn secondary">Get Prediction</button>
                </div>
                <div className="ai-tool-card">
                  <div className="tool-icon">🎯</div>
                  <h5>Audience Optimizer</h5>
                  <p>AI will find the best audience segments for your campaigns.</p>
                  <button className="action-btn secondary">Optimize Audience</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Improvement Performance Modal */}
      {showImprovementModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content improvement-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Improve Performance</h2>
              <button className="modal-close" onClick={handleCloseModal}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="improvement-opportunities">
                <div className="opportunity-item">
                  <div className="opportunity-header">
                    <div className="opportunity-icon">🎨</div>
                    <div className="opportunity-info">
                      <h3>Optimize CTA Colors</h3>
                      <p>Test red vs blue CTA buttons for better conversion</p>
                    </div>
                    <div className="opportunity-metrics">
                      <span className="expected-lift">+23%</span>
                      <span className="confidence">94% confidence</span>
                    </div>
                  </div>
                  <div className="opportunity-actions">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={selectedImprovements.includes('cta-colors')}
                        onChange={(e) => handleImprovementSelection('cta-colors', e.target.checked)}
                      />
                      <span>Select this improvement</span>
                    </label>
                  </div>
                </div>

                <div className="opportunity-item">
                  <div className="opportunity-header">
                    <div className="opportunity-icon">⏰</div>
                    <div className="opportunity-info">
                      <h3>Optimize Send Timing</h3>
                      <p>Test 9 AM vs 6 PM send times for better engagement</p>
                    </div>
                    <div className="opportunity-metrics">
                      <span className="expected-lift">+15%</span>
                      <span className="confidence">89% confidence</span>
                    </div>
                  </div>
                  <div className="opportunity-actions">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={selectedImprovements.includes('send-timing')}
                        onChange={(e) => handleImprovementSelection('send-timing', e.target.checked)}
                      />
                      <span>Select this improvement</span>
                    </label>
                  </div>
                </div>

                <div className="opportunity-item">
                  <div className="opportunity-header">
                    <div className="opportunity-icon">💰</div>
                    <div className="opportunity-info">
                      <h3>Test Discount Amounts</h3>
                      <p>Test 10% vs 15% discounts for optimal revenue</p>
                    </div>
                    <div className="opportunity-metrics">
                      <span className="expected-lift">+28%</span>
                      <span className="confidence">91% confidence</span>
                    </div>
                  </div>
                  <div className="opportunity-actions">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={selectedImprovements.includes('discount-amounts')}
                        onChange={(e) => handleImprovementSelection('discount-amounts', e.target.checked)}
                      />
                      <span>Select this improvement</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="modal-btn secondary" onClick={handleCloseModal}>
                Cancel
              </button>
              <div className="modal-actions">
                <button 
                  className="modal-btn secondary" 
                  onClick={handleABTest}
                  disabled={selectedImprovements.length === 0}
                >
                  🧪 A/B Test
                </button>
                <button 
                  className="modal-btn primary"
                  onClick={handleRunImprovements}
                  disabled={selectedImprovements.length === 0}
                >
                  <span className="ai-icon">✨</span>
                  Run Selected Improvements
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* A/B Test Configuration Modal */}
      {showABTestModal && (
        <div className="modal-overlay" onClick={handleCloseABTestModal}>
          <div className="modal-content ab-test-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Configure A/B Tests</h2>
              <button className="modal-close" onClick={handleCloseABTestModal}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="ab-test-config">
                {selectedImprovements.includes('cta-colors') && (
                  <div className="test-config-item">
                    <div className="test-config-header">
                      <div className="test-icon">🎨</div>
                      <h3>CTA Colors Test</h3>
                    </div>
                    <div className="test-variables">
                      <div className="variable-group">
                        <label>Test A (Control)</label>
                        <input 
                          type="text" 
                          placeholder="Blue CTA"
                          value={abTestConfig['cta-colors']?.testA || ''}
                          onChange={(e) => handleABTestConfig('cta-colors', 'testA', e.target.value)}
                        />
                      </div>
                      <div className="variable-group">
                        <label>Test B (Variant)</label>
                        <input 
                          type="text" 
                          placeholder="Red CTA"
                          value={abTestConfig['cta-colors']?.testB || ''}
                          onChange={(e) => handleABTestConfig('cta-colors', 'testB', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedImprovements.includes('send-timing') && (
                  <div className="test-config-item">
                    <div className="test-config-header">
                      <div className="test-icon">⏰</div>
                      <h3>Send Timing Test</h3>
                    </div>
                    <div className="test-variables">
                      <div className="variable-group">
                        <label>Test A (Control)</label>
                        <input 
                          type="text" 
                          placeholder="9:00 AM"
                          value={abTestConfig['send-timing']?.testA || ''}
                          onChange={(e) => handleABTestConfig('send-timing', 'testA', e.target.value)}
                        />
                      </div>
                      <div className="variable-group">
                        <label>Test B (Variant)</label>
                        <input 
                          type="text" 
                          placeholder="6:00 PM"
                          value={abTestConfig['send-timing']?.testB || ''}
                          onChange={(e) => handleABTestConfig('send-timing', 'testB', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedImprovements.includes('discount-amounts') && (
                  <div className="test-config-item">
                    <div className="test-config-header">
                      <div className="test-icon">💰</div>
                      <h3>Discount Amounts Test</h3>
                    </div>
                    <div className="test-variables">
                      <div className="variable-group">
                        <label>Test A (Control)</label>
                        <input 
                          type="text" 
                          placeholder="10% discount"
                          value={abTestConfig['discount-amounts']?.testA || ''}
                          onChange={(e) => handleABTestConfig('discount-amounts', 'testA', e.target.value)}
                        />
                      </div>
                      <div className="variable-group">
                        <label>Test B (Variant)</label>
                        <input 
                          type="text" 
                          placeholder="15% discount"
                          value={abTestConfig['discount-amounts']?.testB || ''}
                          onChange={(e) => handleABTestConfig('discount-amounts', 'testB', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="modal-btn secondary" onClick={handleCloseABTestModal}>
                Cancel
              </button>
              <button 
                className="modal-btn primary"
                onClick={handleRunABTests}
                disabled={Object.keys(abTestConfig).length === 0}
              >
                🧪 Run A/B Tests
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RevenueOptimizerFunctionDetails; 