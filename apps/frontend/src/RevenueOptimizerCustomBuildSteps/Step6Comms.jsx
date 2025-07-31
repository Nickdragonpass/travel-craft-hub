import React from 'react';

function Step6Comms({ 
  customFunction, 
  handleArrayToggle, 
  handleNestedInputChange 
}) {
  const channels = ['Concierge', 'Email', 'SMS', 'App Push', 'WhatsApp', 'In-app Banner'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese'];
  const tones = ['Formal', 'Casual', 'Fun', 'Luxury', 'Match Persona Default'];

  return (
    <div className="builder-step">
      <h4>Communication Setup</h4>
      
      <div className="form-group">
        <label>Communication Channels *</label>
        <div className="channels-grid">
          {channels.map(channel => (
            <label key={channel} className="checkbox-label">
              <input
                type="checkbox"
                checked={customFunction.channels.includes(channel)}
                onChange={() => handleArrayToggle('channels', channel)}
              />
              <span>{channel}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Message Template</label>
        <div className="template-config">
          <div className="template-type">
            <label className="radio-label">
              <input
                type="radio"
                name="templateType"
                value="saved"
                checked={customFunction.messageTemplate.type === 'saved'}
                onChange={(e) => handleNestedInputChange('messageTemplate', 'type', e.target.value)}
              />
              <span>Use saved template</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="templateType"
                value="new"
                checked={customFunction.messageTemplate.type === 'new'}
                onChange={(e) => handleNestedInputChange('messageTemplate', 'type', e.target.value)}
              />
              <span>Build new template</span>
            </label>
          </div>

          {customFunction.messageTemplate.type === 'saved' ? (
            <select
              value={customFunction.messageTemplate.templateId || ''}
              onChange={(e) => handleNestedInputChange('messageTemplate', 'templateId', e.target.value)}
              className="form-input"
            >
              <option value="">Select a template...</option>
              <option value="upsell_generic">Generic Upsell Template</option>
              <option value="lounge_offer">Lounge Access Offer</option>
              <option value="seat_upgrade">Seat Upgrade Promotion</option>
            </select>
          ) : (
            <textarea
              value={customFunction.messageTemplate.content}
              onChange={(e) => handleNestedInputChange('messageTemplate', 'content', e.target.value)}
              className="form-input"
              rows="4"
              placeholder="Enter your message template..."
            />
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Language</label>
          <select
            value={customFunction.messageTemplate.language}
            onChange={(e) => handleNestedInputChange('messageTemplate', 'language', e.target.value)}
            className="form-input"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Tone</label>
          <select
            value={customFunction.messageTemplate.tone}
            onChange={(e) => handleNestedInputChange('messageTemplate', 'tone', e.target.value)}
            className="form-input"
          >
            {tones.map(tone => (
              <option key={tone} value={tone}>{tone}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={customFunction.messageTemplate.aiCopywriting}
            onChange={(e) => handleNestedInputChange('messageTemplate', 'aiCopywriting', e.target.checked)}
          />
          <span>Let AI create/update comms dynamically</span>
        </label>
      </div>
    </div>
  );
}

export default Step6Comms; 