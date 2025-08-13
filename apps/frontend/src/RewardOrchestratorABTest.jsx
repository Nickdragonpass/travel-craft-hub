import React, { useMemo, useState, useEffect } from 'react';

function RewardOrchestratorABTest({ programs = [], onCreateTest, onClose, editingTest = null, onSaveEdit }) {
  const [selectedProgramId, setSelectedProgramId] = useState('');
  const [testName, setTestName] = useState('');

  // Variant configuration state (benefits only)
  const [variantA, setVariantA] = useState({ benefits: [] });
  const [variantB, setVariantB] = useState({ benefits: [] });

  const isEdit = Boolean(editingTest && editingTest.id);

  const selectedProgram = useMemo(() => programs.find(p => p.id === selectedProgramId) || null, [programs, selectedProgramId]);

  // Preset benefits catalog (subset of marketplace used in the main form)
  const presetBenefitsCatalog = useMemo(() => ([
    { id: 'market-1', title: '2x Lounge Passes', type: 'Lounge Access' },
    { id: 'market-2', title: 'Airport Fast Track', type: 'Fast Track' },
    { id: 'market-3', title: 'Priority Boarding', type: 'Priority Service' },
    { id: 'market-4', title: 'Seat Upgrade', type: 'Upgrade' },
    { id: 'market-5', title: 'Hotel Room Upgrade', type: 'Upgrade' },
    { id: 'market-6', title: 'Free Checked Bag', type: 'Baggage' },
    { id: 'market-8', title: 'Travel Insurance Discount', type: 'Discount' },
    { id: 'market-12', title: 'Coffee Voucher', type: 'Food & Beverage' },
    { id: 'market-15', title: 'Lounge Guest Pass +1', type: 'Lounge Access' },
    { id: 'market-16', title: 'Meal Voucher', type: 'Food & Beverage' },
    { id: 'market-17', title: 'eSIM Data Pack', type: 'Connectivity' },
    { id: 'market-18', title: 'Taxi Voucher', type: 'Transport' }
  ]), []);

  // Combine program benefits with preset catalog and de-duplicate by title
  const availableBenefitOptions = useMemo(() => {
    const programBenefitOptions = (selectedProgram?.benefits || []).map(b => ({ id: b.id, title: b.title || b.name, type: b.type || '' }));
    const map = new Map();
    [...programBenefitOptions, ...presetBenefitsCatalog].forEach(b => {
      const key = (b.title || '').toLowerCase();
      if (!key) return;
      if (!map.has(key)) map.set(key, b);
    });
    return Array.from(map.values());
  }, [selectedProgram, presetBenefitsCatalog]);

  // Prefill for edit mode
  useEffect(() => {
    if (isEdit) {
      setSelectedProgramId(editingTest.programId);
      setTestName(editingTest.name || '');
      const aBenefits = (editingTest.variants?.A?.benefits || []).map(b => ({ id: b.id, title: b.title, type: b.type || '', quantity: b.quantity || 1, perScope: b.perScope || 'user', perPeriod: b.perPeriod || 'year' }));
      const bBenefits = (editingTest.variants?.B?.benefits || []).map(b => ({ id: b.id, title: b.title, type: b.type || '', quantity: b.quantity || 1, perScope: b.perScope || 'user', perPeriod: b.perPeriod || 'year' }));
      setVariantA({ benefits: aBenefits });
      setVariantB({ benefits: bBenefits });
    }
  }, [isEdit, editingTest]);

  // On program change, preselect current program benefits for both variants (create mode only)
  useEffect(() => {
    if (isEdit) return;
    const current = (selectedProgram?.benefits || []).map(b => ({ id: b.id, title: b.title || b.name, type: b.type || '', quantity: 1, perScope: 'user', perPeriod: 'year' }));
    setVariantA({ benefits: current });
    setVariantB({ benefits: current });
  }, [selectedProgram, isEdit]);

  // Benefit type dropdown options (Core Redemption Methods)
  const benefitTypeOptions = [
    'Entitlement',
    'Discount',
    'Cashback / Rebate',
    'Points / Miles Redemption',
    'Voucher / Promo Code',
    'Upgrade',
    'Freebie / Complimentary Item',
    'Bundle / Package Inclusion',
    'Access Pass',
    'Credit for Future Use'
  ];

  // Per-X dropdown options
  const benefitPerScopeOptions = ['user', 'account', 'booking', 'trip', 'itinerary'];
  const benefitPerPeriodOptions = ['day', 'week', 'month', 'quarter', 'year', 'lifetime'];

  const ensureBenefitInVariant = (variantSetter, benefitId) => {
    variantSetter(prev => {
      const exists = prev.benefits.some(b => b.id === benefitId);
      if (exists) return prev;
      const src = availableBenefitOptions.find(b => b.id === benefitId);
      if (!src) return prev;
      return { ...prev, benefits: [...prev.benefits, { id: src.id, title: src.title, type: src.type, quantity: 1, perScope: 'user', perPeriod: 'year' }] };
    });
  };

  const updateVariantBenefit = (variantSetter, benefitId, patch) => {
    variantSetter(prev => ({
      ...prev,
      benefits: prev.benefits.map(b => (b.id === benefitId ? { ...b, ...patch } : b))
    }));
  };

  const removeVariantBenefit = (variantSetter, benefitId) => {
    variantSetter(prev => ({ ...prev, benefits: prev.benefits.filter(b => b.id !== benefitId) }));
  };

  const handleLaunch = () => {
    if (!selectedProgram) return;
    const name = testName || `A/B Test for ${selectedProgram.name}`;
    const base = {
      id: isEdit ? editingTest.id : `ab-${Date.now()}`,
      programId: selectedProgram.id,
      programName: selectedProgram.name,
      name,
      status: isEdit ? editingTest.status : 'active',
      variants: {
        A: { benefits: variantA.benefits },
        B: { benefits: variantB.benefits }
      },
      performance: isEdit ? (editingTest.performance || { A: { redemptions: 0, revenue: '£0' }, B: { redemptions: 0, revenue: '£0' } }) : { A: { redemptions: 0, revenue: '£0' }, B: { redemptions: 0, revenue: '£0' } }
    };
    if (isEdit && typeof onSaveEdit === 'function') {
      onSaveEdit(base);
    } else {
      onCreateTest?.(base);
    }
    onClose?.();
  };

  // Helper for labeling current program offers
  const currentBenefitTitleSet = useMemo(() => new Set((selectedProgram?.benefits || []).map(b => (b.title || b.name || '').toLowerCase())), [selectedProgram]);
  const isCurrentOffer = (b) => currentBenefitTitleSet.has((b.title || '').toLowerCase());

  // Comparison helpers
  const getQty = (variantBenefits, id) => (variantBenefits.find(x => x.id === id)?.quantity) || 0;
  const getScope = (variantBenefits, id) => (variantBenefits.find(x => x.id === id)?.perScope) || 'user';
  const getPeriod = (variantBenefits, id) => (variantBenefits.find(x => x.id === id)?.perPeriod) || 'year';

  const renderPerLabel = (perScope, perPeriod) => {
    if (!perScope && !perPeriod) return '';
    if (perPeriod === 'lifetime') return 'lifetime';
    const scope = perScope ? `per ${perScope}` : '';
    const period = perPeriod ? ` per ${perPeriod}` : '';
    return `${scope}${period}`.trim();
  };

  const tinyLabelStyle = { fontSize: 12, color: 'var(--brand-footer-light)', marginBottom: 4, display: 'block' };

  return (
    <div className="modal-overlay fullscreen" onClick={onClose}>
      <div className="modal-card fullscreen" onClick={(e) => e.stopPropagation()}>
        {/* Header aligned with RewardOrchestratorForm */}
        <div className="form-header">
          <div className="header-content">
            <h1>{isEdit ? 'Edit A/B Test' : 'Create A/B Test'}</h1>
            <p>{isEdit ? 'Adjust variants for this A/B test' : 'Configure variants for a selected reward program'}</p>
          </div>
          <div className="header-actions">
            <button className="btn secondary" onClick={onClose}>Cancel</button>
          </div>
        </div>

        <div className="form-content" style={{ padding: 20 }}>
          <div className="form-grid">
            <div className="form-group">
              <label className="required">Select Program</label>
              <select className="form-input enhanced" value={selectedProgramId} onChange={(e) => setSelectedProgramId(e.target.value)} disabled={isEdit}>
                <option value="">Choose a program...</option>
                {programs.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Test Name</label>
              <input className="form-input" placeholder="Optional test name" value={testName} onChange={(e) => setTestName(e.target.value)} />
            </div>
          </div>

          {!!selectedProgram && (
            <div className="abtest-variants" style={{ marginTop: 12 }}>
              <div className="form-grid">
                {/* Variant A */}
                <div className="form-group full-width" style={{ border: '1px solid var(--brand-card-border)', borderRadius: 12, padding: 16 }}>
                  <div className="step-header"><h3>Variant A</h3></div>

                  <div className="form-group full-width">
                    <label>Benefits (select and adjust quantity/type)</label>
                    <div className="checkbox-grid">
                      {availableBenefitOptions.map(b => {
                        const checked = variantA.benefits.some(x => x.id === b.id);
                        return (
                          <label key={b.id} className="checkbox-item">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => {
                                if (e.target.checked) ensureBenefitInVariant(setVariantA, b.id);
                                else removeVariantBenefit(setVariantA, b.id);
                              }}
                            />
                            <span>{b.title}</span>
                            {isCurrentOffer(b) && <span className="chip chip-outline" style={{ marginLeft: 8 }}>Current</span>}
                          </label>
                        );
                      })}
                    </div>
                    {variantA.benefits.length > 0 && (
                      <div className="benefits-list compact" style={{ marginTop: 8 }}>
                        {variantA.benefits.map(b => {
                          const qtyA = b.quantity || 1;
                          const qtyB = getQty(variantB.benefits, b.id) || 0;
                          const perScopeA = b.perScope || 'user';
                          const perPeriodA = b.perPeriod || 'year';
                          const perLabelA = renderPerLabel(perScopeA, perPeriodA);
                          return (
                            <div key={b.id} className="benefit-item">
                              <div className="benefit-info">
                                <h5>{b.title}</h5>
                                <p>{qtyA}x {b.type || 'Benefit'}{perLabelA ? ` • ${perLabelA}` : ''}</p>
                              </div>
                              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                  <span style={tinyLabelStyle}>A vs B</span>
                                  <span className="chip chip-outline" title="A vs B">{qtyA} vs {qtyB}</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <span style={tinyLabelStyle}>Qty</span>
                                  <input type="number" min="1" className="form-input small enhanced" value={qtyA}
                                    onChange={(e) => updateVariantBenefit(setVariantA, b.id, { quantity: Math.max(1, Number(e.target.value) || 1) })}
                                    placeholder="Qty" style={{ width: 80 }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <span style={tinyLabelStyle}>Method</span>
                                  <select className="form-input small enhanced" value={b.type || ''}
                                    onChange={(e) => updateVariantBenefit(setVariantA, b.id, { type: e.target.value })}
                                    style={{ width: 180 }}>
                                    <option value="">Select type</option>
                                    {benefitTypeOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
                                  </select>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <span style={tinyLabelStyle}>Scope</span>
                                  <select className="form-input small enhanced" value={perScopeA}
                                    onChange={(e) => updateVariantBenefit(setVariantA, b.id, { perScope: e.target.value })}
                                    style={{ width: 140 }}>
                                    {benefitPerScopeOptions.map(opt => (<option key={opt} value={opt}>{`per ${opt}`}</option>))}
                                  </select>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <span style={tinyLabelStyle}>Period</span>
                                  <select className="form-input small enhanced" value={perPeriodA}
                                    onChange={(e) => updateVariantBenefit(setVariantA, b.id, { perPeriod: e.target.value })}
                                    style={{ width: 140 }}>
                                    {benefitPerPeriodOptions.map(opt => (<option key={opt} value={opt}>{opt === 'lifetime' ? 'lifetime' : `per ${opt}`}</option>))}
                                  </select>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <span style={{ ...tinyLabelStyle, visibility: 'hidden' }}>Remove</span>
                                  <button className="remove-benefit-btn" onClick={() => removeVariantBenefit(setVariantA, b.id)}>×</button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Variant B */}
                <div className="form-group full-width" style={{ border: '1px solid var(--brand-card-border)', borderRadius: 12, padding: 16 }}>
                  <div className="step-header"><h3>Variant B</h3></div>

                  <div className="form-group full-width">
                    <label>Benefits (select and adjust quantity/type)</label>
                    <div className="checkbox-grid">
                      {availableBenefitOptions.map(b => {
                        const checked = variantB.benefits.some(x => x.id === b.id);
                        return (
                          <label key={b.id} className="checkbox-item">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => {
                                if (e.target.checked) ensureBenefitInVariant(setVariantB, b.id);
                                else removeVariantBenefit(setVariantB, b.id);
                              }}
                            />
                            <span>{b.title}</span>
                            {isCurrentOffer(b) && <span className="chip chip-outline" style={{ marginLeft: 8 }}>Current</span>}
                          </label>
                        );
                      })}
                    </div>
                    {variantB.benefits.length > 0 && (
                      <div className="benefits-list compact" style={{ marginTop: 8 }}>
                        {variantB.benefits.map(b => {
                          const qtyB = b.quantity || 1;
                          const qtyA = getQty(variantA.benefits, b.id) || 0;
                          const perScopeB = b.perScope || 'user';
                          const perPeriodB = b.perPeriod || 'year';
                          const perLabelB = renderPerLabel(perScopeB, perPeriodB);
                          return (
                            <div key={b.id} className="benefit-item">
                              <div className="benefit-info">
                                <h5>{b.title}</h5>
                                <p>{qtyB}x {b.type || 'Benefit'}{perLabelB ? ` • ${perLabelB}` : ''}</p>
                              </div>
                              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                  <span style={tinyLabelStyle}>A vs B</span>
                                  <span className="chip chip-outline" title="A vs B">{qtyA} vs {qtyB}</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <span style={tinyLabelStyle}>Qty</span>
                                  <input type="number" min="1" className="form-input small enhanced" value={qtyB}
                                    onChange={(e) => updateVariantBenefit(setVariantB, b.id, { quantity: Math.max(1, Number(e.target.value) || 1) })}
                                    placeholder="Qty" style={{ width: 80 }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <span style={tinyLabelStyle}>Method</span>
                                  <select className="form-input small enhanced" value={b.type || ''}
                                    onChange={(e) => updateVariantBenefit(setVariantB, b.id, { type: e.target.value })}
                                    style={{ width: 180 }}>
                                    <option value="">Select type</option>
                                    {benefitTypeOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
                                  </select>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <span style={tinyLabelStyle}>Scope</span>
                                  <select className="form-input small enhanced" value={perScopeB}
                                    onChange={(e) => updateVariantBenefit(setVariantB, b.id, { perScope: e.target.value })}
                                    style={{ width: 140 }}>
                                    {benefitPerScopeOptions.map(opt => (<option key={opt} value={opt}>{`per ${opt}`}</option>))}
                                  </select>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <span style={tinyLabelStyle}>Period</span>
                                  <select className="form-input small enhanced" value={perPeriodB}
                                    onChange={(e) => updateVariantBenefit(setVariantB, b.id, { perPeriod: e.target.value })}
                                    style={{ width: 140 }}>
                                    {benefitPerPeriodOptions.map(opt => (<option key={opt} value={opt}>{opt === 'lifetime' ? 'lifetime' : `per ${opt}`}</option>))}
                                  </select>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <span style={{ ...tinyLabelStyle, visibility: 'hidden' }}>Remove</span>
                                  <button className="remove-benefit-btn" onClick={() => removeVariantBenefit(setVariantB, b.id)}>×</button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="form-footer">
          <div className="footer-left"></div>
          <div className="footer-right">
            <button className="btn secondary" onClick={onClose}>Cancel</button>
            <button className="btn primary" disabled={!selectedProgramId} onClick={handleLaunch}>{isEdit ? 'Save Changes' : 'Launch A/B Test'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RewardOrchestratorABTest; 