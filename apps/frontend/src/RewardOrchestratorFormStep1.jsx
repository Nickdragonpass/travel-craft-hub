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
      <div className="step-header">
        <h3>Basic Program Information</h3>
        <p>Set up the basic information for your reward program.</p>
      </div>
      
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
        
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <div className="tag-input-container">
            <div className="tag-input-wrapper" onClick={() => setShowTagSuggestions(true)}>
              {formData.tags.map(tag => (
                <span key={tag} className={`tag ${isPredefined(tag) ? 'tag-predefined' : 'tag-custom'}`}>
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="tag-remove">×</button>
                </span>
              ))}
              <input
                className="tag-input"
                value={tagInputValue}
                onChange={(e) => setTagInputValue(e.target.value)}
                onFocus={() => setShowTagSuggestions(true)}
                onKeyDown={onTagInputKeyDown}
                placeholder="Add tags..."
              />
            </div>

            {showTagSuggestions && filteredSuggestions.length > 0 && (
              <div className="tag-suggestions">
                <div className="suggestions-header">Suggestions</div>
                <div className="suggestions-list">
                  {filteredSuggestions.map(s => (
                    <button key={s} className="suggestion-item" type="button" onClick={() => addTag(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RewardOrchestratorFormStep1; 