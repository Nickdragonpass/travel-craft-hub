import React, { useState, useEffect, useMemo } from 'react';
import RewardOrchestratorForm from './RewardOrchestratorForm';
import RewardOrchestratorABTest from './RewardOrchestratorABTest';
import './App.css';

function RewardOrchestrator() {
  const [activeTab, setActiveTab] = useState('manage');
  const [rewardPrograms, setRewardPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [expandedPrograms, setExpandedPrograms] = useState(new Set());
  const [importFormData, setImportFormData] = useState(null);
  const [editingProgramId, setEditingProgramId] = useState(null);
  const [showABTestModal, setShowABTestModal] = useState(false);
  const [abTests, setAbTests] = useState([]);
  const [editingTest, setEditingTest] = useState(null);
  const [expandedTests, setExpandedTests] = useState(new Set());
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [selectedProgramForTopUp, setSelectedProgramForTopUp] = useState(null);

  useEffect(() => {
    const mockRewardPrograms = [
      {
        id: 'rp-1',
        name: 'Gold Card Rewards',
        description: 'Premium rewards for Gold card holders',
        targetPersonas: ['Gold Card Holders'],
        linkedProducts: ['Gold Credit Card'],
        status: 'active',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        // Budget/Planned values
        allocationBudget: 150000,
        allocationEntitlements: 5000,
        allocationAudience: 8000,
        // Actual/Used values
        actualCostSpent: 108000,
        actualEntitlementsUsed: 3250,
        actualAudienceReached: 5800,
        benefits: [
          { id: 'ben-1', title: '4 Free Lounge Passes', type: 'Entitlement' },
          { id: 'ben-2', title: '2x Points on Travel', type: 'Points / Miles Redemption' }
        ],
        performance: { totalRedemptions: 12470, activeUsers: 3120, revenueGenerated: '£267,000', conversionRate: '7.1%' }
      },
      {
        id: 'rp-2',
        name: 'Platinum Elite Benefits',
        description: 'Exclusive benefits for Platinum Elite members',
        targetPersonas: ['Platinum Elite'],
        linkedProducts: ['Platinum Card'],
        status: 'active',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        // Budget/Planned values
        allocationBudget: 250000,
        allocationEntitlements: 3000,
        allocationAudience: 4500,
        // Actual/Used values
        actualCostSpent: 217500,
        actualEntitlementsUsed: 2610,
        actualAudienceReached: 3950,
        benefits: [ 
          { id: 'ben-3', title: 'Unlimited Lounge Access', type: 'Access Pass' },
          { id: 'ben-4', title: 'Priority Boarding', type: 'Access Pass' },
          { id: 'ben-5', title: 'Hotel Room Upgrade', type: 'Upgrade' }
        ],
        performance: { totalRedemptions: 8920, activeUsers: 2670, revenueGenerated: '£445,000', conversionRate: '8.3%' }
      }
    ];
    setRewardPrograms(mockRewardPrograms);

    const seedTests = [
      {
        id: 'ab-1',
        programId: 'rp-1',
        programName: 'Gold Card Rewards',
        name: 'Lounge Pass Quantity Test',
        status: 'active',
        variants: {
          A: { benefits: [ { id: 'ben-1', title: '4 Free Lounge Passes', type: 'Entitlement', quantity: 4, perScope: 'user', perPeriod: 'year' } ] },
          B: { benefits: [ { id: 'ben-1', title: '4 Free Lounge Passes', type: 'Entitlement', quantity: 1, perScope: 'user', perPeriod: 'year' } ] }
        },
        performance: { A: { redemptions: 320, revenue: '£28,800' }, B: { redemptions: 170, revenue: '£14,450' } }
      },
      {
        id: 'ab-2',
        programId: 'rp-1',
        programName: 'Gold Card Rewards',
        name: 'Points vs Cashback',
        status: 'paused',
        variants: {
          A: { benefits: [ { id: 'ben-2', title: '2x Points on Travel', type: 'Points / Miles Redemption', quantity: 2, perScope: 'booking', perPeriod: 'trip' } ] },
          B: { benefits: [ { id: 'mk-cash-1', title: '£10 Cashback', type: 'Cashback / Rebate', quantity: 1, perScope: 'booking', perPeriod: 'trip' } ] }
        },
        performance: { A: { redemptions: 210, revenue: '£9,600' }, B: { redemptions: 240, revenue: '£11,200' } }
      },
      {
        id: 'ab-3',
        programId: 'rp-2',
        programName: 'Platinum Elite Benefits',
        name: 'Access Pass vs Upgrade',
        status: 'active',
        variants: {
          A: { benefits: [ { id: 'ben-3', title: 'Unlimited Lounge Access', type: 'Access Pass', quantity: 1, perScope: 'user', perPeriod: 'year' } ] },
          B: { benefits: [ { id: 'mk-upg-1', title: 'Hotel Room Upgrade', type: 'Upgrade', quantity: 1, perScope: 'booking', perPeriod: 'trip' } ] }
        },
        performance: { A: { redemptions: 95, revenue: '£7,800' }, B: { redemptions: 120, revenue: '£9,900' } }
      }
    ];
    setAbTests(seedTests);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'paused': return '#f59e0b';
      case 'expired': return '#ef4444';
      case 'draft': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusBadge = (status) => (
    <span className="status-badge" style={{ backgroundColor: `${getStatusColor(status)}20`, color: getStatusColor(status), border: `1px solid ${getStatusColor(status)}` }}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
  );

  const getTestsForProgram = (programId) => abTests.filter(t => t.programId === programId);

  const toggleProgramExpansion = (programId) => {
    const next = new Set(expandedPrograms);
    next.has(programId) ? next.delete(programId) : next.add(programId);
    setExpandedPrograms(next);
  };

  const toggleTestExpansion = (testId) => {
    const next = new Set(expandedTests);
    next.has(testId) ? next.delete(testId) : next.add(testId);
    setExpandedTests(next);
  };

  const normalizeProgram = (raw) => {
    const safeArray = (v) => (Array.isArray(v) ? v : (v ? [v] : []));

    const program = {
      programName: raw.programName || raw.name || '',
      description: raw.description || '',
      targetPersonas: raw.targetPersonas || raw.personas || [],
      targetProducts: raw.linkedProducts || raw.products || raw.targetProducts || [],
      eligibilityRules: raw.eligibilityRules || {},
      geography: raw.geography || undefined,
      startDate: raw.startDate || '',
      endDate: raw.endDate || '',
      status: (raw.status || 'draft'),
      reportingTags: raw.reportingTags || raw.tags || [],
      benefits: safeArray(raw.benefits).map((b) => ({
        id: b.id || Date.now() + Math.random(),
        title: b.title || b.name || '',
        name: b.name || b.title || '',
        type: b.type || '',
        supplier: b.supplier || '',
        redemptionMethod: b.redemptionMethod || '',
        deliveryLogic: b.deliveryLogic || '',
        redemptionWindowStart: b.redemptionWindowStart || b.startDate || '',
        redemptionWindowEnd: b.redemptionWindowEnd || b.endDate || '',
        customerUsageLimit: b.customerUsageLimit || b.maxRedemptions || '',
        inventory: b.inventory || '',
        costToBank: b.costToBank || '',
        visibleInUI: Boolean(b.visibleInUI)
      }))
    };

    // Map status to lowercase expected in badges
    program.status = String(program.status).toLowerCase();

    return program;
  };

  const programHasRequiredGaps = (p) => {
    if (!p.programName || !p.description) return true;
    if (!Array.isArray(p.targetPersonas) || p.targetPersonas.length === 0) return true;
    if (!Array.isArray(p.targetProducts) || p.targetProducts.length === 0) return true;
    if (!p.status) return true;
    if (!Array.isArray(p.benefits) || p.benefits.length === 0) return true;
    // Check required benefit fields
    const missingBenefitFields = p.benefits.some((b) => {
      return !b.title || !b.type || !b.supplier || !b.redemptionMethod || !(b.deliveryLogic || (Array.isArray(b.deliveryMethods) && b.deliveryMethods[0])) || !b.redemptionWindowStart || !b.redemptionWindowEnd;
    });
    if (missingBenefitFields) return true;
    return false;
  };

  // Map list program -> form initialData
  const mapProgramToForm = (p) => ({
    programName: p.name || '',
    description: p.description || '',
    targetPersonas: Array.isArray(p.targetPersonas) ? p.targetPersonas : [],
    targetProducts: Array.isArray(p.linkedProducts) ? p.linkedProducts : [],
    status: p.status || 'draft',
    startDate: p.startDate || '',
    endDate: p.endDate || '',
    benefits: Array.isArray(p.benefits) ? p.benefits : [],
    tags: [],
    reportingTags: [],
    eligibilityRules: {
      customerProfileRules: [],
      bookingHistoryRules: [],
      currentTripContext: [],
      financialProductRules: [],
      activityEngagement: [],
      geographicLocation: [],
      externalDataRules: []
    }
  });

  const ImportModal = () => {
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const [parsed, setParsed] = useState(null);

    const parseInput = (val) => {
      try {
        const json = JSON.parse(val);
        setParsed(json);
        setError('');
      } catch (e) {
        setParsed(null);
        setError('Invalid JSON');
      }
    };

    const handleFile = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        const content = String(evt.target?.result || '');
        setText(content);
        parseInput(content);
      };
      reader.readAsText(file);
    };

    const normalizedPrograms = useMemo(() => {
      if (!parsed) return [];
      const list = Array.isArray(parsed) ? parsed : [parsed];
      return list.map(normalizeProgram);
    }, [parsed]);

    const onImport = () => {
      if (!normalizedPrograms.length) return;

      // If any normalized program misses required fields, route to form with first one
      const firstWithGaps = normalizedPrograms.find(programHasRequiredGaps);
      if (firstWithGaps) {
        setImportFormData(firstWithGaps);
        setShowImportModal(false);
        setShowCreateModal(true);
        return;
      }

      // Otherwise, add all to list
      const toAdd = normalizedPrograms.map((p) => ({
        id: `rp-${Date.now()}-${Math.floor(Math.random()*10000)}`,
        name: p.programName,
        description: p.description,
        targetPersonas: p.targetPersonas,
        linkedProducts: p.targetProducts,
        status: p.status,
        startDate: p.startDate,
        endDate: p.endDate,
        benefits: p.benefits,
        performance: {
          totalRedemptions: 0,
          activeUsers: 0,
          revenueGenerated: '£0',
          conversionRate: '0%'
        }
      }));
      setRewardPrograms((prev) => [...prev, ...toAdd]);
      setShowImportModal(false);
    };

    if (!showImportModal) return null;
    return (
      <div className="modal-overlay">
        <div className="modal-card">
          <div className="modal-header">
            <h3>Import Reward Programs</h3>
            <button className="close-btn" onClick={() => setShowImportModal(false)}>×</button>
          </div>
          <div className="modal-body">
            <div className="upload-row">
              <input type="file" accept="application/json" onChange={handleFile} />
            </div>
            <div className="textarea-row">
              <textarea
                className="form-input"
                placeholder="Paste JSON here (single program or array of programs)"
                rows={12}
                value={text}
                onChange={(e) => { setText(e.target.value); parseInput(e.target.value); }}
              />
            </div>
            {error && <div className="error-text">{error}</div>}
            {normalizedPrograms.length > 0 && (
              <div className="preview-box">
                <div className="preview-title">Preview</div>
                <div className="preview-content">
                  <div>{normalizedPrograms.length} program(s) parsed</div>
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn secondary" onClick={() => setShowImportModal(false)}>Cancel</button>
            <button className="btn primary" disabled={!normalizedPrograms.length || Boolean(error)} onClick={onImport}>Import</button>
          </div>
        </div>
      </div>
    );
  };

  const renderManageTab = () => (
    <div className="manage-tab">
      <div className="tab-header">
        <h2>Manage Reward Programs</h2>
        <div className="header-buttons">
          <button 
            className="btn secondary"
            onClick={() => setShowImportModal(true)}
          >
            Import Programs
          </button>
          <button 
            className="btn primary"
            onClick={() => { setEditingProgramId(null); setImportFormData(null); setShowCreateModal(true); }}
          >
            Create New Program
          </button>
        </div>
      </div>
      
      <div className="tab-subtitle">
        <p>Create, import, and manage your reward programs and benefits</p>
      </div>

      <div className="programs-overview">
        <div className="overview-stats">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>{rewardPrograms.length}</h3>
              <p>Total Programs</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎁</div>
            <div className="stat-content">
              <h3>{rewardPrograms.reduce((acc, program) => acc + program.benefits.length, 0)}</h3>
              <p>Active Benefits</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>{rewardPrograms.reduce((acc, program) => acc + program.performance.activeUsers, 0)}</h3>
              <p>Active Users</p>
            </div>
          </div>
        </div>

        <div className="programs-list">
          <div className="list-header">
            <h3>Your Reward Programs</h3>
            <div className="list-filters">
              <select className="modern-select">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="draft">Draft</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          <div className="programs-grid">
            {rewardPrograms.map((program) => {
              // Calculate if package needs attention (any metric > 85%)
              const needsTopUp = program.status === 'active' && (
                (program.actualCostSpent && program.allocationBudget && (program.actualCostSpent / program.allocationBudget) > 0.85) ||
                (program.actualEntitlementsUsed && program.allocationEntitlements && (program.actualEntitlementsUsed / program.allocationEntitlements) > 0.85) ||
                (program.actualAudienceReached && program.allocationAudience && (program.actualAudienceReached / program.allocationAudience) > 0.85)
              );
              
              return (
              <div key={program.id} className={`program-card ${expandedPrograms.has(program.id) ? 'expanded' : 'collapsed'}`}>
                <div className="program-header">
                  <div className="program-info">
                    <h4>{program.name}</h4>
                    <p>{program.description}</p>
                  </div>
                  <div className="program-meta">
                    <div className="program-status">
                      {getStatusBadge(program.status)}
                      {needsTopUp && (
                        <span className="status-badge status-warning" style={{ backgroundColor: '#fef3c7', color: '#d97706', border: '1px solid #f59e0b', marginLeft: '8px' }}>
                          ⚠️ Top-up needed
                        </span>
                      )}
                    </div>
                    <button 
                      className="expand-btn"
                      onClick={() => toggleProgramExpansion(program.id)}
                    >
                      {expandedPrograms.has(program.id) ? '−' : '+'}
                    </button>
                  </div>
                </div>
                
                {expandedPrograms.has(program.id) ? (
                  <>
                    {/* Live Usage Tracking - Only for Active Programs */}
                    {program.status === 'active' && (program.allocationBudget || program.allocationEntitlements || program.allocationAudience) && (
                      <div className="program-usage-tracking">
                        <h4>Budget vs Actuals</h4>
                        <div className="usage-metrics-grid">
                          {program.allocationEntitlements && program.actualEntitlementsUsed !== undefined && (
                            <div className="usage-metric">
                              <div className="metric-header">
                                <span className="metric-label">Entitlements</span>
                                <span className="metric-value">
                                  {program.actualEntitlementsUsed.toLocaleString()} / {program.allocationEntitlements.toLocaleString()}
                                </span>
                              </div>
                              <div className="metric-progress">
                                <div className="progress-bar">
                                  <div className="progress-fill" style={{ 
                                    width: `${(program.actualEntitlementsUsed / program.allocationEntitlements * 100).toFixed(1)}%`, 
                                    backgroundColor: (program.actualEntitlementsUsed / program.allocationEntitlements) > 0.85 ? '#ef4444' : (program.actualEntitlementsUsed / program.allocationEntitlements) > 0.7 ? '#f59e0b' : '#10b981'
                                  }} />
                                </div>
                                <span className="progress-label">
                                  {(program.actualEntitlementsUsed / program.allocationEntitlements * 100).toFixed(1)}% used • {(program.allocationEntitlements - program.actualEntitlementsUsed).toLocaleString()} remaining
                                </span>
                              </div>
                            </div>
                          )}
                          {program.allocationAudience && program.actualAudienceReached !== undefined && (
                            <div className="usage-metric">
                              <div className="metric-header">
                                <span className="metric-label">Audience</span>
                                <span className="metric-value">
                                  {program.actualAudienceReached.toLocaleString()} / {program.allocationAudience.toLocaleString()}
                                </span>
                              </div>
                              <div className="metric-progress">
                                <div className="progress-bar">
                                  <div className="progress-fill" style={{ 
                                    width: `${(program.actualAudienceReached / program.allocationAudience * 100).toFixed(1)}%`, 
                                    backgroundColor: (program.actualAudienceReached / program.allocationAudience) > 0.85 ? '#ef4444' : (program.actualAudienceReached / program.allocationAudience) > 0.7 ? '#f59e0b' : '#10b981'
                                  }} />
                                </div>
                                <span className="progress-label">
                                  {(program.actualAudienceReached / program.allocationAudience * 100).toFixed(1)}% reached • {(program.allocationAudience - program.actualAudienceReached).toLocaleString()} remaining
                                </span>
                              </div>
                            </div>
                          )}
                          {program.allocationBudget && program.actualCostSpent !== undefined && (
                            <div className="usage-metric">
                              <div className="metric-header">
                                <span className="metric-label">Cost</span>
                                <span className="metric-value">
                                  £{program.actualCostSpent.toLocaleString()} / £{program.allocationBudget.toLocaleString()}
                                </span>
                              </div>
                              <div className="metric-progress">
                                <div className="progress-bar">
                                  <div className="progress-fill" style={{ 
                                    width: `${(program.actualCostSpent / program.allocationBudget * 100).toFixed(1)}%`, 
                                    backgroundColor: (program.actualCostSpent / program.allocationBudget) > 0.85 ? '#ef4444' : (program.actualCostSpent / program.allocationBudget) > 0.7 ? '#f59e0b' : '#10b981'
                                  }} />
                                </div>
                                <span className="progress-label">
                                  {(program.actualCostSpent / program.allocationBudget * 100).toFixed(1)}% spent • £{(program.allocationBudget - program.actualCostSpent).toLocaleString()} remaining
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        {program.actualCostSpent && program.actualAudienceReached && (
                          <div className="usage-summary">
                            <div className="summary-item">
                              <span className="summary-label">Actual Cost/User:</span>
                              <span className="summary-value">£{Math.round(program.actualCostSpent / program.actualAudienceReached)}</span>
                            </div>
                            {program.allocationBudget && program.allocationAudience && (
                              <div className="summary-item">
                                <span className="summary-label">Planned Cost/User:</span>
                                <span className="summary-value">£{Math.round(program.allocationBudget / program.allocationAudience)}</span>
                              </div>
                            )}
                            <div className="summary-item">
                              <span className="summary-label">Status:</span>
                              <span className="summary-value" style={{ color: (program.actualCostSpent / program.allocationBudget) > 0.85 ? '#ef4444' : '#10b981' }}>
                                {(program.actualCostSpent / program.allocationBudget) > 0.85 ? '⚠️ Consider top-up' : '✓ On track'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="program-details">
                      <h4>Benefits</h4>
                      <div className="benefit-tiles">
                        {program.benefits.map(benefit => (
                          <div key={benefit.id} className="benefit-tile">
                            <div className="benefit-header">
                              <div className="benefit-title">{benefit.title}</div>
                              <span className="chip chip-outline">{benefit.type}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Program-level performance removed from Manage expanded card per request */}

                    <div className="program-actions">
                        <button className="action-btn secondary" onClick={() => { setEditingProgramId(program.id); setImportFormData(mapProgramToForm(program)); setShowCreateModal(true); }}>Edit</button>
                        {program.status === 'active' && (
                          <button className="action-btn primary" onClick={() => { setSelectedProgramForTopUp(program); setShowTopUpModal(true); }}>Top Up Package</button>
                        )}
                        {program.status === 'draft' && (
                          <button className="action-btn primary" onClick={() => setRewardPrograms(prev => prev.map(p => p.id === program.id ? { ...p, status: 'active' } : p))}>Launch</button>
                        )}
                    </div>
                  </>
                ) : (
                  <div className="program-summary">
                    <div className="summary-stats">
                      <div className="summary-stat">
                        <span className="stat-label">Target:</span>
                        <span className="stat-value">{program.targetPersonas.join(', ')}</span>
                      </div>
                      <div className="summary-stat">
                        <span className="stat-label">Benefits:</span>
                        <span className="stat-value">{program.benefits.length} benefits</span>
                      </div>
                      <div className="summary-stat">
                        <span className="stat-label">Revenue:</span>
                        <span className="stat-value">{program.performance.revenueGenerated}</span>
                      </div>
                    </div>
                    <div className="program-actions-compact">
                        <button className="action-btn secondary small" onClick={() => { setEditingProgramId(program.id); setImportFormData(mapProgramToForm(program)); setShowCreateModal(true); }}>Edit</button>
                        {program.status === 'active' ? (
                          <button className="action-btn primary small" onClick={() => { setSelectedProgramForTopUp(program); setShowTopUpModal(true); }}>Top Up</button>
                        ) : (
                          <button className="action-btn primary small" onClick={() => setRewardPrograms(prev => prev.map(p => p.id === program.id ? { ...p, status: 'active' } : p))}>Launch</button>
                        )}
                    </div>
                  </div>
                )}
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  // Helpers for test KPIs
  const computeScore = (t) => {
    const a = t.performance?.A || { redemptions: 0, revenue: '£0' };
    const b = t.performance?.B || { redemptions: 0, revenue: '£0' };
    const aVal = Number(String(a.revenue).replace(/[^0-9.]/g, '')) || 0;
    const bVal = Number(String(b.revenue).replace(/[^0-9.]/g, '')) || 0;
    const total = aVal + bVal;
    if (total === 0) return '—';
    const pct = ((Math.max(aVal, bVal) - Math.min(aVal, bVal)) / (total / 2)) * 100;
    return `${pct.toFixed(1)}% diff`;
  };

  const pauseTest = (id) => setAbTests(prev => prev.map(t => t.id === id ? { ...t, status: 'paused' } : t));
  const resumeTest = (id) => setAbTests(prev => prev.map(t => t.id === id ? { ...t, status: 'active' } : t));
  const deleteTest = (id) => setAbTests(prev => prev.filter(t => t.id !== id));

  const handleTopUp = (updates) => {
    const { programId, type, additionalBudget, additionalEntitlements, extendEndDate } = updates;
    
    setRewardPrograms(prev => prev.map(p => {
      if (p.id !== programId) return p;
      
      const updated = { ...p };
      
      if (type === 'budget' || type === 'both') {
        updated.allocationBudget = (p.allocationBudget || 0) + parseFloat(additionalBudget || 0);
      }
      
      if (type === 'entitlements' || type === 'both') {
        updated.allocationEntitlements = (p.allocationEntitlements || 0) + parseFloat(additionalEntitlements || 0);
      }
      
      if (extendEndDate) {
        updated.endDate = extendEndDate;
      }
      
      return updated;
    }));
  };

  const groupTestsByProgram = useMemo(() => {
    const map = new Map();
    for (const t of abTests) {
      if (!map.has(t.programId)) map.set(t.programId, []);
      map.get(t.programId).push(t);
    }
    return map;
  }, [abTests]);

  // Render a concise summary of differences between variants
  const perLabel = (b) => {
    if (b.perPeriod === 'lifetime') return 'lifetime';
    const scope = b.perScope ? `per ${b.perScope}` : '';
    const period = b.perPeriod ? ` per ${b.perPeriod}` : '';
    return `${scope}${period}`.trim();
  };

  const diffSummary = (t) => {
    const a = t.variants?.A?.benefits || [];
    const b = t.variants?.B?.benefits || [];
    const map = new Map();
    for (const x of a) map.set((x.title || '').toLowerCase(), { A: x });
    for (const y of b) {
      const k = (y.title || '').toLowerCase();
      map.set(k, { ...(map.get(k) || {}), B: y });
    }
    const lines = [];
    for (const [k, val] of map.entries()) {
      const A = val.A; const B = val.B;
      if (A && B) {
        const qtyDiff = (A.quantity || 0) !== (B.quantity || 0);
        const typeDiff = (A.type || '') !== (B.type || '');
        const perDiff = (A.perScope || '') !== (B.perScope || '') || (A.perPeriod || '') !== (B.perPeriod || '');
        if (qtyDiff || typeDiff || perDiff) {
          lines.push(`${A.title || B.title}: ${A.quantity || 0}x ${A.type || ''} ${perLabel(A)} vs ${B.quantity || 0}x ${B.type || ''} ${perLabel(B)}`.trim());
        }
      } else if (A && !B) {
        lines.push(`${A.title}: A only (${A.quantity || 0}x ${A.type || ''} ${perLabel(A)})`);
      } else if (!A && B) {
        lines.push(`${B.title}: B only (${B.quantity || 0}x ${B.type || ''} ${perLabel(B)})`);
      }
    }
    return lines;
  };

  const formatVariantOffers = (variant) => {
    const list = (variant?.benefits || []).map(b => `${b.quantity || 1}x ${b.type || 'Benefit'} ${perLabel(b)} • ${b.title}`).slice(0, 3);
    const more = Math.max(0, (variant?.benefits || []).length - list.length);
    return { list, more };
  };

  const renderTestTab = () => (
    <div className="test-tab">
      <div className="tab-header">
        <h2>A/B Testing</h2>
        <button className="btn primary" onClick={() => { setEditingTest(null); setShowABTestModal(true); }}>Create A/B Test</button>
      </div>
      
      <div className="tab-subtitle"><p>Test different reward program variations to optimize performance</p></div>

      <div className="ab-testing-overview">
        {/* metric tiles removed per request */}

        {abTests.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🧪</div>
            <h4>No A/B Tests Yet</h4>
            <p>Start testing different reward program variations to optimize performance and increase customer engagement.</p>
            <button className="btn primary" onClick={() => { setEditingTest(null); setShowABTestModal(true); }}>Create Your First Test</button>
          </div>
        )}

        {abTests.length > 0 && (
          <div className="programs-list">
            {[...groupTestsByProgram.entries()].map(([programId, tests]) => {
              const program = rewardPrograms.find(p => p.id === programId);
              return (
                <div key={programId} className="program-card expanded" style={{ marginBottom: 16 }}>
                  <div className="program-header">
                    <div className="program-info">
                      <h4>{program?.name || 'Program'}</h4>
                      <p>Tests for this reward package</p>
                    </div>
                  </div>
                  <div className="benefit-tiles">
                    {tests.map(t => {
                      const diffs = diffSummary(t);
                      const shown = diffs.slice(0, 3);
                      const more = diffs.length - shown.length;
                      const aOffers = formatVariantOffers(t.variants?.A);
                      const bOffers = formatVariantOffers(t.variants?.B);
                      const isOpen = expandedTests.has(t.id);
                      return (
                        <div key={t.id} className={`benefit-tile ${isOpen ? 'expanded' : 'collapsed'}`}>
                          <div className="benefit-header">
                            <div className="benefit-title">{t.name}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span className="chip chip-accent">{t.status}</span>
                              <button className="expand-btn" onClick={() => toggleTestExpansion(t.id)}>{isOpen ? '−' : '+'}</button>
                            </div>
                          </div>
                          <div className="benefit-meta">
                            <span className="meta-item">A: <strong>{t.performance?.A?.redemptions ?? 0}</strong> • <strong>{t.performance?.A?.revenue ?? '£0'}</strong></span>
                            <span className="meta-item">B: <strong>{t.performance?.B?.redemptions ?? 0}</strong> • <strong>{t.performance?.B?.revenue ?? '£0'}</strong></span>
                            <span className="meta-item">Score: <strong>{computeScore(t)}</strong></span>
                          </div>
                          {isOpen && (
                            <>
                              {(aOffers.list.length > 0 || bOffers.list.length > 0) && (
                                <div className="chips-group" style={{ marginTop: 8 }}>
                                  <div className="chips-block"><div className="chips-label">Variant A</div><div className="chips">{aOffers.list.map((s, i) => (<span key={i} className="chip chip-outline">{s}</span>))}{aOffers.more > 0 && (<span className="chip chip-muted">+{aOffers.more} more</span>)}</div></div>
                                  <div className="chips-block"><div className="chips-label">Variant B</div><div className="chips">{bOffers.list.map((s, i) => (<span key={i} className="chip chip-outline">{s}</span>))}{bOffers.more > 0 && (<span className="chip chip-muted">+{bOffers.more} more</span>)}</div></div>
                                </div>
                              )}
                              {shown.length > 0 && (
                                <div className="chips" style={{ marginTop: 6 }}>
                                  {shown.map((d, i) => (<span key={i} className="chip chip-outline">{d}</span>))}
                                  {more > 0 && (<span className="chip chip-muted">+{more} more</span>)}
                                </div>
                              )}
                            </>
                          )}
                          <div className="program-actions" style={{ marginTop: 8 }}>
                            {t.status === 'active' ? (
                              <button className="action-btn secondary" onClick={() => pauseTest(t.id)}>Pause</button>
                            ) : (
                              <button className="action-btn secondary" onClick={() => resumeTest(t.id)}>Resume</button>
                            )}
                            <button className="action-btn secondary" onClick={() => { setEditingTest(t); setShowABTestModal(true); }}>Edit</button>
                            <button className="action-btn secondary" onClick={() => deleteTest(t.id)}>Delete</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showABTestModal && (
        <RewardOrchestratorABTest
          programs={rewardPrograms}
          editingTest={editingTest}
          onSaveEdit={(updated) => setAbTests(prev => prev.map(t => t.id === updated.id ? updated : t))}
          onCreateTest={(test) => setAbTests(prev => [...prev, test])}
          onClose={() => { setShowABTestModal(false); setEditingTest(null); }}
        />
      )}
    </div>
  );

  const renderPerformanceTab = () => (
    <div className="performance-tab">
      <div className="tab-header">
        <h2>Performance Analytics</h2>
        <div className="header-buttons">
          <button className="btn secondary">Export Data</button>
          <button className="btn primary">Generate Report</button>
        </div>
      </div>
      
      <div className="tab-subtitle">
        <p>Track and analyze the performance of your reward programs</p>
      </div>

      <div className="performance-overview">
        <div className="overview-stats">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>5,790</h3>
              <p>Active Users</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎁</div>
            <div className="stat-content">
              <h3>21,390</h3>
              <p>Total Redemptions</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>7.7%</h3>
              <p>Avg. Conversion Rate</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>£712,000</h3>
              <p>Total Revenue Generated</p>
            </div>
          </div>
        </div>



        <div className="top-performers">
          <h3>Top Performing Programs</h3>
          <div className="performers-grid">
            {rewardPrograms.map((program) => (
              <div key={program.id} className="performer-card">
                <div className="performer-header">
                  <h4>{program.name}</h4>
                  {getStatusBadge(program.status)}
                </div>
                <div className="performer-metrics">
                  <div className="metric">
                    <span className="metric-label">Redemptions</span>
                    <span className="metric-value">{program.performance.totalRedemptions.toLocaleString()}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Conversion</span>
                    <span className="metric-value">{program.performance.conversionRate}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Revenue</span>
                    <span className="metric-value">{program.performance.revenueGenerated}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="reward-orchestrator-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Benefit Orchestrator</h1>
          <p className="header-subtitle">Define, manage, test, and track your reward offerings to maximize customer engagement and retention</p>
        </div>
      </div>

      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
          onClick={() => setActiveTab('manage')}
        >
          <span className="tab-icon">📋</span>
          <span className="tab-text">Manage</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'test' ? 'active' : ''}`}
          onClick={() => setActiveTab('test')}
        >
          <span className="tab-icon">🧪</span>
          <span className="tab-text">Test</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'performance' ? 'active' : ''}`}
          onClick={() => setActiveTab('performance')}
        >
          <span className="tab-icon">📊</span>
          <span className="tab-text">Performance</span>
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'manage' && renderManageTab()}
        {activeTab === 'test' && renderTestTab()}
        {activeTab === 'performance' && renderPerformanceTab()}
      </div>

      <RewardOrchestratorForm
        isOpen={showCreateModal}
        onClose={() => { setShowCreateModal(false); setEditingProgramId(null); setImportFormData(null); }}
        initialData={importFormData || undefined}
        saveButtonText={editingProgramId ? 'Save Changes' : 'Save Draft'}
        onSave={(newProgram) => {
          const programWithId = {
            ...newProgram,
            id: editingProgramId || `rp-${Date.now()}`,
            status: (newProgram.status || 'draft').toLowerCase(),
            performance: { totalRedemptions: 0, activeUsers: 0, revenueGenerated: '£0', conversionRate: '0%' }
          };

          if (editingProgramId) {
            setRewardPrograms(prev => prev.map(p => p.id === editingProgramId ? { ...p, name: programWithId.programName, description: programWithId.description, targetPersonas: programWithId.targetPersonas || [], linkedProducts: programWithId.targetProducts || [], status: programWithId.status, startDate: programWithId.startDate || '', endDate: programWithId.endDate || '', benefits: programWithId.benefits || [] } : p));
          } else {
            setRewardPrograms(prev => [...prev, { id: programWithId.id, name: programWithId.programName, description: programWithId.description, targetPersonas: programWithId.targetPersonas || [], linkedProducts: programWithId.targetProducts || [], status: (programWithId.status || 'draft').toLowerCase(), startDate: programWithId.startDate || '', endDate: programWithId.endDate || '', benefits: programWithId.benefits || [], performance: programWithId.performance }]);
          }

          setEditingProgramId(null);
          setImportFormData(null);
          setShowCreateModal(false);
        }}
      />

      {ImportModal()}

      {showABTestModal && (
        <RewardOrchestratorABTest
          programs={rewardPrograms}
          editingTest={editingTest}
          onSaveEdit={(updated) => setAbTests(prev => prev.map(t => t.id === updated.id ? updated : t))}
          onCreateTest={(test) => setAbTests(prev => [...prev, test])}
          onClose={() => { setShowABTestModal(false); setEditingTest(null); }}
        />
      )}

      {/* Top Up Modal */}
      {showTopUpModal && selectedProgramForTopUp && (
        <div className="modal-overlay" onClick={() => setShowTopUpModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3>Top Up: {selectedProgramForTopUp.name}</h3>
              <button className="close-btn" onClick={() => setShowTopUpModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              {/* Current Status */}
              <div className="topup-current-status">
                <h4>Current Status</h4>
                <div className="status-grid">
                  {selectedProgramForTopUp.allocationBudget && (
                    <div className="status-item">
                      <span className="status-label">Budget:</span>
                      <span className="status-value">£{Math.floor(selectedProgramForTopUp.allocationBudget * 0.72).toLocaleString()} / £{selectedProgramForTopUp.allocationBudget.toLocaleString()}</span>
                      <span className="status-percentage">72% used</span>
                    </div>
                  )}
                  {selectedProgramForTopUp.allocationEntitlements && (
                    <div className="status-item">
                      <span className="status-label">Entitlements:</span>
                      <span className="status-value">{Math.floor(selectedProgramForTopUp.allocationEntitlements * 0.65).toLocaleString()} / {selectedProgramForTopUp.allocationEntitlements.toLocaleString()}</span>
                      <span className="status-percentage">65% used</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Top Up Form */}
              <div className="topup-form">
                <div className="form-group">
                  <label>Add Budget (£)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="Enter additional budget amount"
                    id="topup-budget-input"
                  />
                </div>

                <div className="form-group">
                  <label>Add Entitlements</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="Enter additional number of users"
                    id="topup-entitlements-input"
                  />
                </div>

                <div className="form-group">
                  <label>Extend End Date (Optional)</label>
                  <input
                    type="date"
                    className="form-input"
                    defaultValue={selectedProgramForTopUp.endDate || ''}
                    id="topup-date-input"
                  />
                </div>

                <div className="form-group">
                  <label>Reason for Top Up</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    placeholder="Provide a reason for audit trail (optional)"
                    id="topup-reason-input"
                  />
                </div>
              </div>

              <div className="topup-info-box">
                <div className="info-icon">💡</div>
                <div>
                  <strong>Tip:</strong> Top-ups are applied immediately and will extend the package capacity. All eligible users will continue to have access to the benefits.
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn secondary" onClick={() => setShowTopUpModal(false)}>Cancel</button>
              <button 
                className="btn primary"
                onClick={() => {
                  const additionalBudget = parseFloat(document.getElementById('topup-budget-input').value) || 0;
                  const additionalEntitlements = parseFloat(document.getElementById('topup-entitlements-input').value) || 0;
                  const newEndDate = document.getElementById('topup-date-input').value;
                  
                  if (additionalBudget > 0 || additionalEntitlements > 0) {
                    handleTopUp({
                      programId: selectedProgramForTopUp.id,
                      additionalBudget,
                      additionalEntitlements,
                      extendEndDate: newEndDate !== selectedProgramForTopUp.endDate ? newEndDate : null
                    });
                    setShowTopUpModal(false);
                    setSelectedProgramForTopUp(null);
                  }
                }}
              >
                Confirm Top Up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RewardOrchestrator; 