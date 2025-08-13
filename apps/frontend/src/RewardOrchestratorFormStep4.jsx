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

  return (
    <div className="form-step">
      <div className="step-header">
        <h3>Review & Launch</h3>
        <p>Review all details and launch your program</p>
      </div>
      
      <div className="review-section">
        <div className={`review-card ${openSections.info ? 'expanded' : 'collapsed'}`}>
          <div className="review-card-header" onClick={() => toggle('info')} role="button">
            <h4><span className="section-icon">ℹ️</span> Program Information</h4>
            <span className="chevron">{openSections.info ? '−' : '+'}</span>
          </div>
          {openSections.info && (
            <div className="review-card-body">
              <div className="summary-row">
                <div className="summary-title">{formData?.programName || 'Untitled Program'}</div>
                <div className="summary-badges">
                  <span className="chip chip-outline">{benefits.length} benefits</span>
                  <span className="chip chip-outline">{targetPersonas.length} personas</span>
                  <span className="chip chip-outline">{targetProducts.length} products</span>
                  <span className="status-badge" style={{ backgroundColor: 'rgba(26,34,51,0.08)', color: 'var(--brand-primary)', border: '1px solid rgba(26,34,51,0.18)' }}>{formData?.status || 'Draft'}</span>
                </div>
              </div>
              <div className="review-item">
                <span className="review-label">Description:</span>
                <span className="review-value">{formData?.description || 'Not set'}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Dates:</span>
                <span className="review-value">{formatDate(formData?.startDate)} — {formatDate(formData?.endDate)}</span>
              </div>
            </div>
          )}
        </div>

        <div className={`review-card ${openSections.targeting ? 'expanded' : 'collapsed'}`}>
          <div className="review-card-header" onClick={() => toggle('targeting')} role="button">
            <h4><span className="section-icon">🎯</span> Targeting & Eligibility</h4>
            <span className="chevron">{openSections.targeting ? '−' : '+'}</span>
          </div>
          {openSections.targeting && (
            <div className="review-card-body">
              <div className="summary-row" style={{ marginBottom: 12 }}>
                <div className="summary-title">Audience Overview</div>
                <div className="summary-badges">
                  <span className="chip chip-outline">{targetPersonas.length} personas</span>
                  <span className="chip chip-outline">{targetProducts.length} products</span>
                  <span className="chip chip-outline">{eligibility.reduce((n,c)=>n + c.rules.length, 0)} rules</span>
                </div>
              </div>
              <div className="chips-group">
                <div className="chips-block">
                  <div className="chips-label">Target Personas</div>
                  <div className="chips">
                    {targetPersonas.length > 0 ? (
                      targetPersonas.map(p => (<span key={p} className="chip chip-outline">{p}</span>))
                    ) : (
                      <span className="chip chip-muted">None selected</span>
                    )}
                  </div>
                </div>
                <div className="chips-block">
                  <div className="chips-label">Target Products</div>
                  <div className="chips">
                    {targetProducts.length > 0 ? (
                      targetProducts.map(p => (<span key={p} className="chip chip-outline">{p}</span>))
                    ) : (
                      <span className="chip chip-muted">None selected</span>
                    )}
                  </div>
                </div>
              </div>

              {eligibility.length > 0 && (
                <div className="eligibility-review-section">
                  <h5>Eligibility Rules</h5>
                  {eligibility.map((category, index) => (
                    <div key={index} className="eligibility-review-category">
                      <h5>{category.category}</h5>
                      {category.rules.map((rule, ruleIndex) => (
                        <div key={ruleIndex} className="eligibility-rule-review">
                          <span className="rule-field">• {rule}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className={`review-card ${openSections.benefits ? 'expanded' : 'collapsed'}`}>
          <div className="review-card-header" onClick={() => toggle('benefits')} role="button">
            <h4><span className="section-icon">🎁</span> Benefits & Rewards</h4>
            <span className="chevron">{openSections.benefits ? '−' : '+'}</span>
          </div>
          {openSections.benefits && (
            <div className="review-card-body">
              {benefits.length > 0 ? (
                <div className="benefit-tiles">
                  {benefits.map((benefit) => (
                    <div key={benefit.id} className="benefit-tile">
                      <div className="benefit-header">
                        <div className="benefit-title">{benefit.title || benefit.name}</div>
                        {benefit.type && <span className="chip chip-accent">{benefit.type}</span>}
                      </div>
                      <div className="benefit-meta">
                        {benefit.supplier && <span className="meta-item">Supplier: <strong>{benefit.supplier}</strong></span>}
                        {(benefit.deliveryLogic || (benefit.deliveryMethods && benefit.deliveryMethods[0])) && (
                          <span className="meta-item">Delivery: <strong>{benefit.deliveryLogic || benefit.deliveryMethods[0]}</strong></span>
                        )}
                        {benefit.redemptionMethod && <span className="meta-item">Redemption: <strong>{benefit.redemptionMethod}</strong></span>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-benefits">
                  <p>No benefits added yet</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={`review-card ${openSections.additional ? 'expanded' : 'collapsed'}`}>
          <div className="review-card-header" onClick={() => toggle('additional')} role="button">
            <h4><span className="section-icon">📝</span> Additional Information</h4>
            <span className="chevron">{openSections.additional ? '−' : '+'}</span>
          </div>
          {openSections.additional && (
            <div className="review-card-body">
              <div className="chips-block">
                <div className="chips-label">Reporting Tags</div>
                <div className="chips">
                  {reportingTags.length > 0 ? (
                    reportingTags.map(t => (<span key={t} className="chip chip-outline">{t}</span>))
                  ) : (
                    <span className="chip chip-muted">None added</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RewardOrchestratorFormStep4; 