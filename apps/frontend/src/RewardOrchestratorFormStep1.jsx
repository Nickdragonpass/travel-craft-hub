import React, { useMemo } from 'react';

function RewardOrchestratorFormStep1({ formData, handleInputChange, showTagSuggestions, setShowTagSuggestions, tagInputValue, setTagInputValue }) {
  // Predefined tags available for search/typeahead
  const predefinedTags = useMemo(() => (
    ['Summer', 'Business', 'Luxury', 'Family', 'Adventure', 'Student', 'Premium', 'Wellness', 'Golf', 'Platinum']
  ), []);

  const normalise = (s) => (s || '').trim();

  const addTag = (rawTag) => {
    const tag = normalise(rawTag);
    if (!tag) return;
    if (!formData.tags.includes(tag)) {
      const newTags = [...formData.tags, tag];
      handleInputChange({ target: { name: 'tags', value: newTags } });
    }
    setTagInputValue('');
    setShowTagSuggestions(false);
  };

  const removeTag = (tagToRemove) => {
    const newTags = formData.tags.filter(tag => tag !== tagToRemove);
    handleInputChange({ target: { name: 'tags', value: newTags } });
  };

  const filteredSuggestions = useMemo(() => {
    const q = normalise(tagInputValue).toLowerCase();
    if (!q) return [];
    return predefinedTags
      .filter(t => !formData.tags.includes(t))
      .filter(t => t.toLowerCase().includes(q))
      .slice(0, 8);
  }, [tagInputValue, predefinedTags, formData.tags]);

  const onTagInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Prefer matching predefined option; otherwise create a new custom tag
      const match = predefinedTags.find(
        t => t.toLowerCase() === normalise(tagInputValue).toLowerCase()
      );
      addTag(match || tagInputValue);
    } else if (e.key === 'Backspace' && !tagInputValue) {
      // Backspace removes last tag when input empty
      if (formData.tags.length > 0) {
        removeTag(formData.tags[formData.tags.length - 1]);
      }
    }
  };

  const isPredefined = (tag) => predefinedTags.includes(tag);

  return (
    <div className="form-step">
      
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="programName" className="required">Program Name</label>
          <input
            type="text"
            id="programName"
            name="programName"
            value={formData.programName}
            onChange={handleInputChange}
            placeholder="Enter program name"
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description" className="required">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your reward program..."
            rows="4"
            className="form-input"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="allocationEntitlements">Target audience size</label>
            <input
              type="number"
              id="allocationEntitlements"
              name="allocationEntitlements"
              value={formData.allocationEntitlements}
              onChange={handleInputChange}
              placeholder="e.g. 10000000"
              className="form-input"
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="allocationBudget">Budget (GBP)</label>
            <input
              type="number"
              id="allocationBudget"
              name="allocationBudget"
              value={formData.allocationBudget}
              onChange={handleInputChange}
              placeholder="e.g. 10000000"
              className="form-input"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {(() => {
          const POINT_VALUE_GBP = 30; // 1 point ~= £30 (avg lounge entitlement)
          const budget = parseFloat(formData.allocationBudget || 0);
          const entitlements = parseFloat(formData.allocationEntitlements || 0);
          const budgetPerCustomer = entitlements > 0 && budget > 0 ? (budget / entitlements) : 0;
          const pointsPerCustomer = budgetPerCustomer > 0 ? (budgetPerCustomer / POINT_VALUE_GBP) : 0;
          const formattedPoints = pointsPerCustomer ? Number(pointsPerCustomer.toFixed(2)) : '';
          const approxSpend = pointsPerCustomer ? Math.round(pointsPerCustomer * POINT_VALUE_GBP) : 0;
          const hasCalculated = Boolean(pointsPerCustomer);
          return (
            <div className="form-row">
              <div className="form-group">
                <label>Calculated points per customer</label>
                <input
                  type="text"
                  value={formattedPoints || ''}
                  disabled
                  className="form-input"
                  aria-readonly="true"
                  placeholder="Calculated after audience & budget"
                  style={{ background: 'var(--brand-bg, #f5f7fb)', borderStyle: 'dashed', borderColor: 'var(--brand-card-border, #d9e1ee)', color: 'var(--brand-text, #1a2233)' }}
                />
              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
}

export default RewardOrchestratorFormStep1; 