import React from 'react';

function RewardOrchestratorFormStep2({ formData, handleInputChange, addEligibilityRule, updateEligibilityRule, removeEligibilityRule, getRuleTypeById, eligibilityRuleOptions, comparisonOperators, timePeriods, targetPersonas, targetProducts }) {
  const personaOptions = ['Business Travelers','Leisure Travelers','Frequent Flyers','Luxury Travelers','Budget Travelers','Family Travelers','Solo Travelers','Group Travelers'];
  const productOptions = ['Platinum Credit Card','Gold Credit Card','Travel Credit Card','Golf Credit Card','Student Credit Card','Premium Debit Card','Savings Account','Wealth Account'];

  const toggleMultiSelect = (field, value) => {
    const current = formData[field] || [];
    const exists = current.includes(value);
    const updated = exists ? current.filter(v => v !== value) : [...current, value];
    handleInputChange(field, updated);
  };

  return (
    <div className="form-step">
      <div className="step-header">
        <h3>Targeting & Eligibility</h3>
        <p>Define who can access this program and when</p>
      </div>
      
      <div className="form-grid">
        {/* Targeting Multi-selects */}
        <div className="form-group full-width">
          <label>Target Personas</label>
          <div className="checkbox-grid">
            {personaOptions.map((p) => (
              <label key={p} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={Boolean(formData.targetPersonas?.includes(p))}
                  onChange={() => toggleMultiSelect('targetPersonas', p)}
                />
                <span>{p}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group full-width">
          <label>Target Products</label>
          <div className="checkbox-grid">
            {productOptions.map((p) => (
              <label key={p} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={Boolean(formData.targetProducts?.includes(p))}
                  onChange={() => toggleMultiSelect('targetProducts', p)}
                />
                <span>{p}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group full-width">
          <label>Eligibility Rules</label>
          <p className="field-description">
            Define specific criteria that customers must meet to be eligible for this program. 
            Rules are combined with AND logic - all conditions must be met.
          </p>
          
          <div className="eligibility-rules-container">
            {/* Add New Rule Section */}
            <div className="add-rule-section">
              <div className="add-rule-controls">
                <div className="modern-dropdown">
                  <select
                    className="modern-dropdown-select"
                    onChange={(e) => {
                      const selectedCategory = e.target.value;
                      if (selectedCategory) {
                        addEligibilityRule(selectedCategory, eligibilityRuleOptions[selectedCategory][0]);
                        e.target.value = ''; // Reset dropdown
                      }
                    }}
                    defaultValue=""
                  >
                    <option value="">Select eligibility category...</option>
                    {Object.entries(eligibilityRuleOptions).map(([category, rules]) => (
                      <option key={category} value={category}>
                        {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Display Rules by Category */}
              {Object.entries(eligibilityRuleOptions).map(([category, rules]) => {
                const categoryRules = formData.eligibilityRules[category];
                if (categoryRules.length === 0) return null;
                
                return (
                  <div key={category} className="eligibility-category">
                    <div className="category-header">
                      <h4>
                        {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        <span className="rule-count">{categoryRules.length}</span>
                      </h4>
                      <button
                        type="button"
                        className="btn enhanced secondary small"
                        onClick={() => addEligibilityRule(category, rules[0])}
                      >
                        Add Another Rule
                      </button>
                    </div>
                    
                    <div className="rules-list">
                      {categoryRules.map((rule) => {
                        const ruleType = getRuleTypeById(category, rule.type.id);
                        return (
                          <div key={rule.id} className="rule-item">
                            <div className="rule-content">
                              <div className="rule-field">
                                <label>Field:</label>
                                <div className="modern-select">
                                  <select
                                    value={rule.type.id}
                                    onChange={(e) => {
                                      const newRuleType = rules.find(r => r.id === e.target.value);
                                      updateEligibilityRule(category, rule.id, 'type', newRuleType);
                                    }}
                                    className="form-input small enhanced"
                                  >
                                    {rules.map(ruleOption => (
                                      <option key={ruleOption.id} value={ruleOption.id}>
                                        {ruleOption.label}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              
                              <div className="rule-operator">
                                <label>Operator:</label>
                                <div className="modern-select">
                                  <select
                                    value={rule.operator}
                                    onChange={(e) => updateEligibilityRule(category, rule.id, 'operator', e.target.value)}
                                    className="form-input small enhanced"
                                  >
                                    {comparisonOperators.map(op => (
                                      <option key={op.value} value={op.value}>
                                        {op.label}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              
                              <div className="rule-value">
                                <label>Value:</label>
                                {ruleType.type === 'select' ? (
                                  <div className="modern-select">
                                    <select
                                      value={rule.value}
                                      onChange={(e) => updateEligibilityRule(category, rule.id, 'value', e.target.value)}
                                      className="form-input small enhanced"
                                    >
                                      <option value="">Select value</option>
                                      {ruleType.options.map(option => (
                                        <option key={option} value={option}>
                                          {option}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                ) : ruleType.type === 'number' ? (
                                  <input
                                    type="number"
                                    value={rule.value}
                                    onChange={(e) => updateEligibilityRule(category, rule.id, 'value', e.target.value)}
                                    placeholder="Enter value"
                                    className="form-input small enhanced"
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    value={rule.value}
                                    onChange={(e) => updateEligibilityRule(category, rule.id, 'value', e.target.value)}
                                    placeholder="Enter value"
                                    className="form-input small enhanced"
                                  />
                                )}
                              </div>
                              
                              {ruleType.period && (
                                <div className="rule-period">
                                  <label>Period:</label>
                                  <div className="modern-select">
                                    <select
                                      value={rule.period}
                                      onChange={(e) => updateEligibilityRule(category, rule.id, 'period', e.target.value)}
                                      className="form-input small enhanced"
                                    >
                                      {timePeriods.map(period => (
                                        <option key={period.value} value={period.value}>
                                          {period.label}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              )}
                              
                              {rule.operator === 'between' && (
                                <div className="rule-second-value">
                                  <label>To:</label>
                                  <input
                                    type={ruleType.type === 'number' ? 'number' : 'text'}
                                    value={rule.secondValue || ''}
                                    onChange={(e) => updateEligibilityRule(category, rule.id, 'secondValue', e.target.value)}
                                    placeholder="Enter second value"
                                    className="form-input small enhanced"
                                  />
                                </div>
                              )}
                            </div>
                            
                            <button
                              type="button"
                              className="remove-rule-btn"
                              onClick={() => removeEligibilityRule(category, rule.id)}
                            >
                              ×
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              
              {/* No Rules Message */}
              {Object.values(formData.eligibilityRules).every(rules => rules.length === 0) && (
                <div className="no-rules-message">
                  <p>No eligibility rules defined yet. Use the dropdown above to add your first rule.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Start/End Date inputs removed from Step 2 */}

      </div>
    </div>
  );
}

export default RewardOrchestratorFormStep2; 