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
      <div className="step-header">
        <h4>Communication Setup</h4>
        <button
          type="button"
          className="ai-magic-button"
          onClick={() => {
            // AI magic functionality would go here
            console.log('AI magic activated!');
          }}
          title="Let AI create/update comms dynamically"
        >
          <span className="ai-magic-icon">✨</span>
          <span className="ai-magic-text">AI Magic</span>
        </button>
      </div>
      
      <div className="form-group">
        <label className="required">Communication Channels</label>
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
            <div className="new-template-fields">
              {/* Email Template Fields */}
              {customFunction.channels.includes('Email') && (
                <>
                  <div className="input-group">
                    <label className="required">Email Subject Line</label>
                    <input
                      type="text"
                      value={customFunction.messageTemplate.emailSubject || ''}
                      onChange={(e) => handleNestedInputChange('messageTemplate', 'emailSubject', e.target.value)}
                      className="form-input"
                      placeholder="Enter email subject line..."
                    />
                  </div>
                  <div className="input-group">
                    <label className="required">Email Body</label>
                    <textarea
                      value={customFunction.messageTemplate.emailBody || ''}
                      onChange={(e) => handleNestedInputChange('messageTemplate', 'emailBody', e.target.value)}
                      className="form-input"
                      rows="6"
                      placeholder="Enter email body content..."
                    />
                  </div>
                </>
              )}

              {/* SMS Template Fields */}
              {customFunction.channels.includes('SMS') && (
                <div className="input-group">
                  <label className="required">SMS Message</label>
                  <textarea
                    value={customFunction.messageTemplate.smsMessage || ''}
                    onChange={(e) => handleNestedInputChange('messageTemplate', 'smsMessage', e.target.value)}
                    className="form-input"
                    rows="3"
                    placeholder="Enter SMS message (max 160 characters)..."
                    maxLength="160"
                  />
                  <div className="char-count">
                    {customFunction.messageTemplate.smsMessage?.length || 0}/160 characters
                  </div>
                </div>
              )}

              {/* WhatsApp Template Fields */}
              {customFunction.channels.includes('WhatsApp') && (
                <div className="input-group">
                  <label className="required">WhatsApp Message</label>
                  <textarea
                    value={customFunction.messageTemplate.whatsappMessage || ''}
                    onChange={(e) => handleNestedInputChange('messageTemplate', 'whatsappMessage', e.target.value)}
                    className="form-input"
                    rows="4"
                    placeholder="Enter WhatsApp message..."
                  />
                </div>
              )}

              {/* App Push Template Fields */}
              {customFunction.channels.includes('App Push') && (
                <>
                  <div className="input-group">
                    <label className="required">Push Notification Title</label>
                    <input
                      type="text"
                      value={customFunction.messageTemplate.pushTitle || ''}
                      onChange={(e) => handleNestedInputChange('messageTemplate', 'pushTitle', e.target.value)}
                      className="form-input"
                      placeholder="Enter push notification title..."
                    />
                  </div>
                  <div className="input-group">
                    <label className="required">Push Notification Body</label>
                    <textarea
                      value={customFunction.messageTemplate.pushBody || ''}
                      onChange={(e) => handleNestedInputChange('messageTemplate', 'pushBody', e.target.value)}
                      className="form-input"
                      rows="3"
                      placeholder="Enter push notification body..."
                    />
                  </div>
                </>
              )}

              {/* In-app Banner Template Fields */}
              {customFunction.channels.includes('In-app Banner') && (
                <>
                  <div className="input-group">
                    <label className="required">Banner Title</label>
                    <input
                      type="text"
                      value={customFunction.messageTemplate.bannerTitle || ''}
                      onChange={(e) => handleNestedInputChange('messageTemplate', 'bannerTitle', e.target.value)}
                      className="form-input"
                      placeholder="Enter banner title..."
                    />
                  </div>
                  <div className="input-group">
                    <label className="required">Banner Description</label>
                    <textarea
                      value={customFunction.messageTemplate.bannerDescription || ''}
                      onChange={(e) => handleNestedInputChange('messageTemplate', 'bannerDescription', e.target.value)}
                      className="form-input"
                      rows="3"
                      placeholder="Enter banner description..."
                    />
                  </div>
                </>
              )}

              {/* Concierge Template Fields */}
              {customFunction.channels.includes('Concierge') && (
                <div className="input-group">
                  <label className="required">Concierge Script</label>
                  <textarea
                    value={customFunction.messageTemplate.conciergeScript || ''}
                    onChange={(e) => handleNestedInputChange('messageTemplate', 'conciergeScript', e.target.value)}
                    className="form-input"
                    rows="6"
                    placeholder="Enter concierge conversation script..."
                  />
                </div>
              )}

              {/* Generic Template Field (fallback) */}
              {customFunction.channels.length === 0 && (
                <div className="input-group">
                  <label className="required">Message Content</label>
                  <textarea
                    value={customFunction.messageTemplate.content || ''}
                    onChange={(e) => handleNestedInputChange('messageTemplate', 'content', e.target.value)}
                    className="form-input"
                    rows="4"
                    placeholder="Enter your message template..."
                  />
                </div>
              )}
            </div>
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


    </div>
  );
}

export default Step6Comms; 