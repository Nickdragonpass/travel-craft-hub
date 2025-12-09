import React, { useState } from 'react';

function RewardOrchestratorFormStep4({ formData, personaOptions, productOptions, eligibilityRuleOptions, comparisonOperators, timePeriods, getRuleTypeById }) {
  const [openSections, setOpenSections] = useState({});

  const safeArray = (val) => Array.isArray(val) ? val : [];

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? 'Not set' : d.toLocaleDateString();
  };

  const toggle = (key) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  const formatEligibilityRules = () => {
    const allRules = [];
    const rulesByCategory = formData?.eligibilityRules || {};
    Object.entries(rulesByCategory).forEach(([category, rules]) => {
      const list = Array.isArray(rules) ? rules : [];
      if (list.length > 0) {
        allRules.push({
          category: category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
          rules: list.map(rule => {
            const ruleType = getRuleTypeById(category, rule?.type?.id);
            const label = ruleType?.label || rule?.type?.label || 'Field';
            const op = rule?.operator || '';
            const v1 = rule?.value ?? '';
            const v2 = rule?.secondValue ?? '';
            let ruleText = `${label} ${op} ${v1}`.trim();
            if (op === 'between' && v2) ruleText = `${label} between ${v1} and ${v2}`;
            if (rule?.period) ruleText += ` (${rule.period})`;
            return ruleText;
          })
        });
      }
    });
    return allRules;
  };

  const eligibility = formatEligibilityRules();
  const targetPersonas = safeArray(formData?.targetPersonas);
  const targetProducts = safeArray(formData?.targetProducts);
  const benefits = safeArray(formData?.benefits);
  const reportingTags = safeArray(formData?.reportingTags || formData?.tags);
  const targetContinents = safeArray(formData?.targetContinents);
  const targetCountries = safeArray(formData?.targetCountries);
  const targetRegionsCities = safeArray(formData?.targetRegionsCities);

  // Package summary calculations
  const POINT_VALUE_GBP = 30;
  const budget = parseFloat(formData?.allocationBudget || 0);
  const audience = parseFloat(formData?.allocationEntitlements || 0);
  const pointsPerType = formData?.pointsPerBenefitType || {};
  const getUnitCost = (b) => {
    const pts = Number(pointsPerType[b?.type]);
    if (Number.isFinite(pts)) return Math.round(pts * POINT_VALUE_GBP);
    // fallback minimal
    return 0;
  };
  const costPerCustomer = benefits.reduce((sum, b) => {
    const qty = Number.isFinite(b?.quantity) ? b.quantity : 1;
    const unit = Number.isFinite(b?.costToBank) ? b.costToBank : getUnitCost(b);
    return sum + unit * qty;
  }, 0);
  const totalCost = audience > 0 ? Math.round(costPerCustomer * audience) : 0;

  return (
    <div className="form-step">
      
      <div className="review-section">
        {/* Package Summary (single confirmation card) */}
        <div className={`review-card expanded`} style={{ border: '1px solid var(--brand-card-border)', borderRadius: 12 }}>
          <div className="review-card-header" style={{ background: '#f8fafc' }}>
            <h4 style={{ color: 'var(--brand-primary)' }}><span className="section-icon">📦</span> Package Summary</h4>
          </div>
          <div className="review-card-body" style={{ paddingTop: 12 }}>
              {/* Headline + stats strip */}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--brand-primary)' }}>{formData?.programName || 'Untitled Program'}</div>
                  {formData?.description && (
                    <div style={{ color: 'var(--brand-text-secondary)', marginTop: 6 }}>{formData.description}</div>
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 10 }}>
                  <div className="chip chip-outline">Audience: {audience || '—'}</div>
                  <div className="chip chip-outline">Budget: {budget ? `£${budget.toLocaleString()}` : '—'}</div>
                  <div className="chip chip-outline">Cost/Customer: £{Math.round(costPerCustomer)}</div>
                  <div className="chip chip-outline">Total: {totalCost ? `£${totalCost.toLocaleString()}` : '—'}</div>
                </div>
              </div>

              {/* Content grid: targeting (left) and benefits (right) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 20 }}>
                {/* Targeting */}
                <div style={{ background: '#ffffff', border: '1px solid var(--brand-card-border)', borderRadius: 12, padding: 14 }}>
                  <div style={{ fontWeight: 700, marginBottom: 8, color: 'var(--brand-primary)' }}>Who you’re targeting</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
                    <div>
                      <div className="chips-label">Personas</div>
                      <div className="chips">
                        {targetPersonas.length ? targetPersonas.map(p => (<span key={p} className="chip chip-outline">{p}</span>)) : <span className="chip chip-muted">None</span>}
                      </div>
                    </div>
                    <div>
                      <div className="chips-label">Products</div>
                      <div className="chips">
                        {targetProducts.length ? targetProducts.map(p => (<span key={p} className="chip chip-outline">{p}</span>)) : <span className="chip chip-muted">None</span>}
                      </div>
                    </div>
                    <div>
                      <div className="chips-label">Geography</div>
                      <div className="chips">
                        {[...targetContinents, ...targetCountries, ...targetRegionsCities].length ? (
                          [...targetContinents, ...targetCountries, ...targetRegionsCities].map(g => (<span key={g} className="chip chip-outline">{g}</span>))
                        ) : (
                          <span className="chip chip-muted">None</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div style={{ background: '#ffffff', border: '1px solid var(--brand-card-border)', borderRadius: 12, padding: 14 }}>
                  <div style={{ fontWeight: 700, marginBottom: 8, color: 'var(--brand-primary)' }}>Included benefits (per customer)</div>
                  {benefits.length ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 10, alignItems: 'center' }}>
                      <div style={{ fontSize: 12, color: 'var(--brand-text-secondary)' }}>Benefit</div>
                      <div style={{ fontSize: 12, color: 'var(--brand-text-secondary)', textAlign: 'right' }}>Qty</div>
                      <div style={{ fontSize: 12, color: 'var(--brand-text-secondary)', textAlign: 'right' }}>Unit £</div>
                      {benefits.map(b => (
                        <React.Fragment key={b.id}>
                          <div style={{ fontWeight: 600 }}>{b.title || b.name}</div>
                          <div style={{ textAlign: 'right' }}>{Number.isFinite(b?.quantity) ? b.quantity : 1}</div>
                          <div style={{ textAlign: 'right' }}>£{Number.isFinite(b?.costToBank) ? Math.round(b.costToBank) : Math.round(getUnitCost(b))}</div>
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <div className="no-benefits"><p>No benefits added</p></div>
                  )}
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default RewardOrchestratorFormStep4; 