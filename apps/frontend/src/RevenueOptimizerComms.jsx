import React, { useState, useEffect } from 'react';

function RevenueOptimizerComms({ revenueFunctions, setActiveTab, getBookingTypeIcon, getStatusColor }) {
  // State for template management
  const [activeView, setActiveView] = useState('overview'); // overview, templates, create, edit, import
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterRevenueType, setFilterRevenueType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Form state
  const [templateForm, setTemplateForm] = useState({
    name: '',
    description: '',
    type: 'email',
    revenueType: 'upsell',
    channels: ['email'],
    messageTemplate: {
      emailSubject: '',
      emailBody: '',
      smsMessage: '',
      pushTitle: '',
      pushMessage: '',
      inAppTitle: '',
      inAppMessage: '',
      tiktokCaption: '',
      tiktokHashtags: '',
      instagramCaption: '',
      instagramHashtags: '',
      facebookCaption: '',
      facebookLink: ''
    },
    images: {
      emailHeaderImage: null,
      emailBodyImage: null,
      pushIcon: null,
      inAppBanner: null,
      tiktokVideo: null,
      instagramPost: null,
      facebookPost: null
    },
    language: 'english',
    tone: 'professional'
  });

  const channels = ['email', 'sms', 'push', 'in-app', 'tiktok', 'instagram', 'facebook'];

  // Mock data
  const mockTemplates = [
    {
      id: 1,
      name: 'Social Media Acquisition Campaign',
      description: 'New acquisition campaign for TikTok & Instagram ads',
      type: 'email',
      revenueType: 'acquisition',
      status: 'active',
      createdAt: '2024-01-15',
      performance: { impressions: 1200, clickThroughRate: 66.7, converted: 3.8 },
      images: {
        emailHeaderImage: '/social-media-acquisition-ad.png',
        emailBodyImage: null,
        pushIcon: null,
        inAppBanner: null,
        tiktokVideo: null,
        instagramPost: null,
        facebookPost: null
      }
    },
    {
      id: 2,
      name: 'Cross-sell SMS Template',
      description: 'SMS for cross-selling related products',
      type: 'email',
      revenueType: 'cross-sell',
      status: 'draft',
      createdAt: '2024-01-20',
      performance: { impressions: 500, clickThroughRate: 60.0, converted: 2.4 },
      images: {
        emailHeaderImage: '/sapphire-reserve-ad.png',
        emailBodyImage: null,
        pushIcon: null,
        inAppBanner: null,
        tiktokVideo: null,
        instagramPost: null,
        facebookPost: null
      }
    },
    {
      id: 3,
      name: 'Push Notification Template',
      description: 'Push notification for app users',
      type: 'email',
      revenueType: 'upsell',
      status: 'active',
      createdAt: '2024-01-25',
      performance: { impressions: 800, clickThroughRate: 75.0, converted: 3.5 },
      images: {
        emailHeaderImage: '/chase-travel-ad.png',
        emailBodyImage: null,
        pushIcon: null,
        inAppBanner: null,
        tiktokVideo: null,
        instagramPost: null,
        facebookPost: null
      }
    }
  ];

  useEffect(() => {
    setTemplates(mockTemplates);
  }, []);

  useEffect(() => {
    let filtered = templates;
    
    if (searchTerm) {
      filtered = filtered.filter(template => 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterType !== 'all') {
      filtered = filtered.filter(template => template.type === filterType);
    }
    
    if (filterRevenueType !== 'all') {
      filtered = filtered.filter(template => template.revenueType === filterRevenueType);
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(template => template.status === filterStatus);
    }
    
    setFilteredTemplates(filtered);
  }, [templates, searchTerm, filterType, filterRevenueType, filterStatus]);

  const handleCreateTemplate = () => {
    const newTemplate = {
      id: Date.now(),
      ...templateForm,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      performance: { impressions: 0, clickThroughRate: 0, converted: 0 }
    };
    
    setTemplates(prev => [...prev, newTemplate]);
    setShowCreateModal(false);
    resetForm();
    setSelectedTemplate(null);
  };

  const handleEditTemplate = () => {
    if (selectedTemplate) {
      setTemplates(prev => prev.map(template => 
        template.id === selectedTemplate.id 
          ? { ...templateForm, id: template.id, status: template.status, createdAt: template.createdAt, performance: template.performance }
          : template
      ));
      setShowCreateModal(false);
      setSelectedTemplate(null);
      resetForm();
    }
  };

  const handleDeleteTemplate = () => {
    if (selectedTemplate) {
      setTemplates(prev => prev.filter(template => template.id !== selectedTemplate.id));
      setShowDeleteConfirm(false);
      setSelectedTemplate(null);
    }
  };

  const handleImportTemplate = (importedTemplate) => {
    const newTemplate = {
      ...importedTemplate,
      id: Date.now(),
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      performance: { impressions: 0, clickThroughRate: 0, converted: 0 }
    };
    
    setTemplates(prev => [...prev, newTemplate]);
    setShowImportModal(false);
  };

  const handleArrayToggle = (field, value) => {
    setTemplateForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleNestedInputChange = (parentField, childField, value) => {
    setTemplateForm(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value
      }
    }));
  };

  const handleImageUpload = (imageType, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTemplateForm(prev => ({
          ...prev,
          images: {
            ...prev.images,
            [imageType]: e.target.result
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (imageType) => {
    setTemplateForm(prev => ({
      ...prev,
      images: {
        ...prev.images,
        [imageType]: null
      }
    }));
  };

  const resetForm = () => {
    setTemplateForm({
      name: '',
      description: '',
      type: 'email',
      revenueType: 'upsell',
      channels: ['email'],
      messageTemplate: {
        emailSubject: '',
        emailBody: '',
        smsMessage: '',
        pushTitle: '',
        pushMessage: '',
        inAppTitle: '',
        inAppMessage: '',
        tiktokCaption: '',
        tiktokHashtags: '',
        instagramCaption: '',
        instagramHashtags: '',
        facebookCaption: '',
        facebookLink: ''
      },
      images: {
        emailHeaderImage: null,
        emailBodyImage: null,
        pushIcon: null,
        inAppBanner: null,
        tiktokVideo: null,
        instagramPost: null,
        facebookPost: null
      },
      language: 'english',
      tone: 'professional'
    });
  };

  const openEditModal = (template) => {
    setSelectedTemplate(template);
    setTemplateForm({
      name: template.name,
      description: template.description,
      type: template.type,
      revenueType: template.revenueType,
      channels: template.channels || ['email'],
      messageTemplate: template.messageTemplate || {
        emailSubject: '',
        emailBody: '',
        smsMessage: '',
        pushTitle: '',
        pushMessage: '',
        inAppTitle: '',
        inAppMessage: '',
        tiktokCaption: '',
        tiktokHashtags: '',
        instagramCaption: '',
        instagramHashtags: '',
        facebookCaption: '',
        facebookLink: ''
      },
      images: template.images || {
        emailHeaderImage: null,
        emailBodyImage: null,
        pushIcon: null,
        inAppBanner: null,
        tiktokVideo: null,
        instagramPost: null,
        facebookPost: null
      },
      language: template.language || 'english',
      tone: template.tone || 'professional'
    });
    setShowCreateModal(true);
  };

  const getTemplateStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'draft': return '#f59e0b';
      case 'archived': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'email': return '📧';
      case 'sms': return '📱';
      case 'push': return '🔔';
      case 'in-app': return '📱';
      default: return '📧';
    }
  };

  const getRevenueTypeColor = (type) => {
    switch (type) {
      case 'upsell': return '#3b82f6';
      case 'cross-sell': return '#8b5cf6';
      case 'pre-sell': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="comms-section">
      {/* Header */}
      <div className="comms-header">
        <div className="comms-header-left">
          <h3>Communication Templates</h3>
          <p>Manage and create communication templates for your revenue functions</p>
        </div>
        <div className="comms-header-right">
          <button 
            className="comms-btn secondary"
            onClick={() => setShowImportModal(true)}
          >
            Import Template
          </button>
          <button 
            className="comms-btn primary"
            onClick={() => {
              setSelectedTemplate(null);
              resetForm();
              setShowCreateModal(true);
            }}
          >
            Create Template
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="comms-overview">
        {/* Filters */}
        <div className="template-controls">
          <div className="template-search">
            <label className="filter-label">Search</label>
            <input 
              type="text" 
              placeholder="Search templates..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="template-search-input"
            />
          </div>
          <div className="template-filters">
            <div className="filter-group">
              <label className="filter-label">Type</label>
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="modern-select"
              >
                <option value="all">All Types</option>
                <option value="email">Email</option>
                <option value="push">Push Notification</option>
                <option value="sms">SMS</option>
                <option value="in-app">In-App</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Revenue Type</label>
              <select 
                value={filterRevenueType} 
                onChange={(e) => setFilterRevenueType(e.target.value)}
                className="modern-select"
              >
                <option value="all">All Types</option>
                <option value="upsell">Up-sell</option>
                <option value="cross-sell">Cross-sell</option>
                <option value="pre-sell">Pre-sell (New acquisition)</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Status</label>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="modern-select"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="template-grid">
          {filteredTemplates.map(template => (
            <div key={template.id} className="template-card">
              <div className="template-header">
                <div className="template-icon">{getTypeIcon(template.type)}</div>
                <div className="template-info">
                  <h4>{template.name}</h4>
                  <p>{template.description}</p>
                </div>
                <div className="template-status">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getTemplateStatusColor(template.status) }}
                  >
                    {template.status}
                  </span>
                </div>
              </div>
              <div className="template-meta-horizontal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="meta-item-horizontal" style={{ flex: 1 }}>
                  <span className="meta-label">Type:</span>
                  <span className="meta-value">{template.type}</span>
                </div>
                <div className="meta-item-horizontal" style={{ flex: 1 }}>
                  <span className="meta-label">Revenue:</span>
                  <span 
                    className="meta-value"
                    style={{ color: getRevenueTypeColor(template.revenueType) }}
                  >
                    {template.revenueType}
                  </span>
                </div>
                <div className="meta-item-horizontal" style={{ flex: 1 }}>
                  <span className="meta-label">Created:</span>
                  <span className="meta-value">{template.createdAt}</span>
                </div>
              </div>
              <div className="template-performance" style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginTop: '12px' }}>
                <div className="perf-item" style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  backgroundColor: '#f8fafc', 
                  padding: '8px 12px', 
                  borderRadius: '6px', 
                  flex: 1,
                  border: '1px solid #e2e8f0'
                }}>
                  <span className="perf-number" style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: '#1e293b',
                    lineHeight: '1.2'
                  }}>{template.performance?.impressions || 0}</span>
                  <span className="perf-label" style={{ 
                    fontSize: '12px', 
                    color: '#64748b', 
                    fontWeight: '500',
                    marginTop: '2px'
                  }}>Impressions</span>
                </div>
                <div className="perf-item" style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  backgroundColor: '#f0f9ff', 
                  padding: '8px 12px', 
                  borderRadius: '6px', 
                  flex: 1,
                  border: '1px solid #bae6fd'
                }}>
                  <span className="perf-number" style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: '#0369a1',
                    lineHeight: '1.2'
                  }}>{template.performance?.clickThroughRate || 0}%</span>
                  <span className="perf-label" style={{ 
                    fontSize: '12px', 
                    color: '#0284c7', 
                    fontWeight: '500',
                    marginTop: '2px'
                  }}>CTR</span>
                </div>
                <div className="perf-item" style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  backgroundColor: '#f0fdf4', 
                  padding: '8px 12px', 
                  borderRadius: '6px', 
                  flex: 1,
                  border: '1px solid #bbf7d0'
                }}>
                  <span className="perf-number" style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: '#166534',
                    lineHeight: '1.2'
                  }}>{template.performance?.converted || 0}%</span>
                  <span className="perf-label" style={{ 
                    fontSize: '12px', 
                    color: '#16a34a', 
                    fontWeight: '500',
                    marginTop: '2px'
                  }}>Converted</span>
                </div>
              </div>
              <div className="template-actions">
                <button 
                  className="template-btn secondary"
                  onClick={() => {
                    setSelectedTemplate(template);
                    setShowPreviewModal(true);
                  }}
                >
                  Preview
                </button>
                <button 
                  className="template-btn secondary"
                  onClick={() => openEditModal(template)}
                >
                  Edit
                </button>
                <button 
                  className="template-btn secondary"
                  onClick={() => {
                    setSelectedTemplate(template);
                    setShowDeleteConfirm(true);
                  }}
                >
                  Delete
                </button>
                <button className="template-btn primary">
                  {template.status === 'active' ? 'Pause' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📧</div>
            <h4>No templates found</h4>
            <p>Create your first communication template to get started</p>
            <button 
              className="comms-btn primary"
              onClick={() => setShowCreateModal(true)}
            >
              Create Template
            </button>
          </div>
        )}
      </div>

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content modal-large">
            <div className="modal-header">
              <h3 style={{ color: 'white' }}>{selectedTemplate ? 'Edit Communication Template' : 'Create Communication Template'}</h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                  setSelectedTemplate(null);
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="template-edit-form">
                {/* Basic Information Section */}
                <div className="form-section">
                  <h4>Basic Information</h4>
                  <div className="form-group">
                    <label className="required">Template Name</label>
                    <input 
                      type="text"
                      className="form-input"
                      value={templateForm.name}
                      onChange={(e) => setTemplateForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter template name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea 
                      className="form-input"
                      value={templateForm.description}
                      onChange={(e) => setTemplateForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the purpose of this template"
                      rows="3"
                    />
                  </div>
                  <div className="form-group">
                    <label>Revenue Type</label>
                    <select 
                      className="form-input"
                      value={templateForm.revenueType}
                      onChange={(e) => setTemplateForm(prev => ({ ...prev, revenueType: e.target.value }))}
                    >
                      <option value="upsell">Up-sell</option>
                      <option value="cross-sell">Cross-sell</option>
                      <option value="pre-sell">Pre-sell (New acquisition)</option>
                    </select>
                  </div>
                </div>

                {/* Communication Channels Section */}
                <div className="form-section">
                  <h4>Communication Channels</h4>
                  <div className="channels-grid">
                    {channels.map(channel => (
                      <label key={channel} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={templateForm.channels.includes(channel)}
                          onChange={() => handleArrayToggle('channels', channel)}
                        />
                        <span className="checkbox-text">{channel.charAt(0).toUpperCase() + channel.slice(1)}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Message Template Section */}
                <div className="form-section">
                  <h4>Message Template</h4>
                  {templateForm.channels.includes('email') && (
                    <div className="form-group">
                      <label>Email Subject</label>
                      <input 
                        type="text"
                        className="form-input"
                        value={templateForm.messageTemplate.emailSubject}
                        onChange={(e) => handleNestedInputChange('messageTemplate', 'emailSubject', e.target.value)}
                        placeholder="Enter email subject"
                      />
                    </div>
                  )}
                  {templateForm.channels.includes('email') && (
                    <div className="form-group">
                      <label>Email Body</label>
                      <textarea 
                        className="form-input"
                        value={templateForm.messageTemplate.emailBody}
                        onChange={(e) => handleNestedInputChange('messageTemplate', 'emailBody', e.target.value)}
                        placeholder="Enter email body content"
                        rows="6"
                      />
                    </div>
                  )}
                  {templateForm.channels.includes('sms') && (
                    <div className="form-group">
                      <label>SMS Message</label>
                      <textarea 
                        className="form-input"
                        value={templateForm.messageTemplate.smsMessage}
                        onChange={(e) => handleNestedInputChange('messageTemplate', 'smsMessage', e.target.value)}
                        placeholder="Enter SMS message (160 characters max)"
                        rows="3"
                        maxLength="160"
                      />
                      <div className="char-count">{templateForm.messageTemplate.smsMessage.length}/160</div>
                    </div>
                  )}
                  {templateForm.channels.includes('push') && (
                    <div className="form-group">
                      <label>Push Notification Title</label>
                      <input 
                        type="text"
                        className="form-input"
                        value={templateForm.messageTemplate.pushTitle}
                        onChange={(e) => handleNestedInputChange('messageTemplate', 'pushTitle', e.target.value)}
                        placeholder="Enter push notification title"
                      />
                    </div>
                  )}
                  {templateForm.channels.includes('push') && (
                    <div className="form-group">
                      <label>Push Notification Message</label>
                      <textarea 
                        className="form-input"
                        value={templateForm.messageTemplate.pushMessage}
                        onChange={(e) => handleNestedInputChange('messageTemplate', 'pushMessage', e.target.value)}
                        placeholder="Enter push notification message"
                        rows="3"
                      />
                    </div>
                  )}
                  {templateForm.channels.includes('in-app') && (
                    <div className="form-group">
                      <label>In-App Notification Title</label>
                      <input 
                        type="text"
                        className="form-input"
                        value={templateForm.messageTemplate.inAppTitle}
                        onChange={(e) => handleNestedInputChange('messageTemplate', 'inAppTitle', e.target.value)}
                        placeholder="Enter in-app notification title"
                      />
                    </div>
                  )}
                  {templateForm.channels.includes('in-app') && (
                    <div className="form-group">
                      <label>In-App Notification Message</label>
                      <textarea 
                        className="form-input"
                        value={templateForm.messageTemplate.inAppMessage}
                        onChange={(e) => handleNestedInputChange('messageTemplate', 'inAppMessage', e.target.value)}
                        placeholder="Enter in-app notification message"
                        rows="3"
                      />
                    </div>
                  )}
                  {templateForm.channels.includes('tiktok') && (
                    <>
                      <div className="form-group">
                        <label>TikTok Caption</label>
                        <textarea 
                          className="form-input"
                          value={templateForm.messageTemplate.tiktokCaption}
                          onChange={(e) => handleNestedInputChange('messageTemplate', 'tiktokCaption', e.target.value)}
                          placeholder="Enter TikTok video caption"
                          rows="4"
                        />
                      </div>
                      <div className="form-group">
                        <label>TikTok Hashtags</label>
                        <input 
                          type="text"
                          className="form-input"
                          value={templateForm.messageTemplate.tiktokHashtags}
                          onChange={(e) => handleNestedInputChange('messageTemplate', 'tiktokHashtags', e.target.value)}
                          placeholder="#travel #deals #upsell"
                        />
                      </div>
                    </>
                  )}
                  {templateForm.channels.includes('instagram') && (
                    <>
                      <div className="form-group">
                        <label>Instagram Caption</label>
                        <textarea 
                          className="form-input"
                          value={templateForm.messageTemplate.instagramCaption}
                          onChange={(e) => handleNestedInputChange('messageTemplate', 'instagramCaption', e.target.value)}
                          placeholder="Enter Instagram post caption"
                          rows="4"
                        />
                      </div>
                      <div className="form-group">
                        <label>Instagram Hashtags</label>
                        <input 
                          type="text"
                          className="form-input"
                          value={templateForm.messageTemplate.instagramHashtags}
                          onChange={(e) => handleNestedInputChange('messageTemplate', 'instagramHashtags', e.target.value)}
                          placeholder="#travel #vacation #upgrade"
                        />
                      </div>
                    </>
                  )}
                  {templateForm.channels.includes('facebook') && (
                    <>
                      <div className="form-group">
                        <label>Facebook Post Caption</label>
                        <textarea 
                          className="form-input"
                          value={templateForm.messageTemplate.facebookCaption}
                          onChange={(e) => handleNestedInputChange('messageTemplate', 'facebookCaption', e.target.value)}
                          placeholder="Enter Facebook post caption"
                          rows="4"
                        />
                      </div>
                      <div className="form-group">
                        <label>Facebook Link (Optional)</label>
                        <input 
                          type="url"
                          className="form-input"
                          value={templateForm.messageTemplate.facebookLink}
                          onChange={(e) => handleNestedInputChange('messageTemplate', 'facebookLink', e.target.value)}
                          placeholder="https://example.com/offer"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Images Section */}
                <div className="form-section">
                  <h4>Images & Assets</h4>
                  {templateForm.channels.includes('email') && (
                    <div className="image-upload-group">
                      <div className="form-group">
                        <label>Email Header Image</label>
                        <div className="image-upload-container">
                          {templateForm.images.emailHeaderImage ? (
                            <div className="image-preview">
                              <img src={templateForm.images.emailHeaderImage} alt="Email header" className="preview-image" />
                              <button 
                                type="button" 
                                className="remove-image-btn"
                                onClick={() => removeImage('emailHeaderImage')}
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <label className="image-upload-label">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload('emailHeaderImage', e.target.files[0])}
                                className="image-upload-input"
                              />
                              <div className="upload-placeholder">
                                <span>📷</span>
                                <span>Upload Header Image</span>
                              </div>
                            </label>
                          )}
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Email Body Image</label>
                        <div className="image-upload-container">
                          {templateForm.images.emailBodyImage ? (
                            <div className="image-preview">
                              <img src={templateForm.images.emailBodyImage} alt="Email body" className="preview-image" />
                              <button 
                                type="button" 
                                className="remove-image-btn"
                                onClick={() => removeImage('emailBodyImage')}
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <label className="image-upload-label">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload('emailBodyImage', e.target.files[0])}
                                className="image-upload-input"
                              />
                              <div className="upload-placeholder">
                                <span>📷</span>
                                <span>Upload Body Image</span>
                              </div>
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {templateForm.channels.includes('push') && (
                    <div className="form-group">
                      <label>Push Notification Icon</label>
                      <div className="image-upload-container">
                        {templateForm.images.pushIcon ? (
                          <div className="image-preview">
                            <img src={templateForm.images.pushIcon} alt="Push icon" className="preview-image icon-preview" />
                            <button 
                              type="button" 
                              className="remove-image-btn"
                              onClick={() => removeImage('pushIcon')}
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <label className="image-upload-label">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload('pushIcon', e.target.files[0])}
                              className="image-upload-input"
                            />
                            <div className="upload-placeholder">
                              <span>🔔</span>
                              <span>Upload Push Icon</span>
                            </div>
                          </label>
                        )}
                      </div>
                    </div>
                  )}
                  {templateForm.channels.includes('in-app') && (
                    <div className="form-group">
                      <label>In-App Banner Image</label>
                      <div className="image-upload-container">
                        {templateForm.images.inAppBanner ? (
                          <div className="image-preview">
                            <img src={templateForm.images.inAppBanner} alt="In-app banner" className="preview-image" />
                            <button 
                              type="button" 
                              className="remove-image-btn"
                              onClick={() => removeImage('inAppBanner')}
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <label className="image-upload-label">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload('inAppBanner', e.target.files[0])}
                              className="image-upload-input"
                            />
                            <div className="upload-placeholder">
                              <span>🖼️</span>
                              <span>Upload Banner Image</span>
                            </div>
                          </label>
                        )}
                      </div>
                    </div>
                  )}
                  {templateForm.channels.includes('tiktok') && (
                    <div className="form-group">
                      <label>TikTok Video Thumbnail</label>
                      <div className="image-upload-container">
                        {templateForm.images.tiktokVideo ? (
                          <div className="image-preview">
                            <img src={templateForm.images.tiktokVideo} alt="TikTok video" className="preview-image" />
                            <button 
                              type="button" 
                              className="remove-image-btn"
                              onClick={() => removeImage('tiktokVideo')}
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <label className="image-upload-label">
                            <input
                              type="file"
                              accept="image/*,video/*"
                              onChange={(e) => handleImageUpload('tiktokVideo', e.target.files[0])}
                              className="image-upload-input"
                            />
                            <div className="upload-placeholder">
                              <span>🎬</span>
                              <span>Upload Video/Thumbnail</span>
                            </div>
                          </label>
                        )}
                      </div>
                    </div>
                  )}
                  {templateForm.channels.includes('instagram') && (
                    <div className="form-group">
                      <label>Instagram Post Image</label>
                      <div className="image-upload-container">
                        {templateForm.images.instagramPost ? (
                          <div className="image-preview">
                            <img src={templateForm.images.instagramPost} alt="Instagram post" className="preview-image" />
                            <button 
                              type="button" 
                              className="remove-image-btn"
                              onClick={() => removeImage('instagramPost')}
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <label className="image-upload-label">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload('instagramPost', e.target.files[0])}
                              className="image-upload-input"
                            />
                            <div className="upload-placeholder">
                              <span>📸</span>
                              <span>Upload Post Image</span>
                            </div>
                          </label>
                        )}
                      </div>
                    </div>
                  )}
                  {templateForm.channels.includes('facebook') && (
                    <div className="form-group">
                      <label>Facebook Post Image</label>
                      <div className="image-upload-container">
                        {templateForm.images.facebookPost ? (
                          <div className="image-preview">
                            <img src={templateForm.images.facebookPost} alt="Facebook post" className="preview-image" />
                            <button 
                              type="button" 
                              className="remove-image-btn"
                              onClick={() => removeImage('facebookPost')}
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <label className="image-upload-label">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload('facebookPost', e.target.files[0])}
                              className="image-upload-input"
                            />
                            <div className="upload-placeholder">
                              <span>📘</span>
                              <span>Upload Post Image</span>
                            </div>
                          </label>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Language & Tone Section */}
                <div className="form-section">
                  <h4>Language & Tone</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Language</label>
                      <select 
                        className="form-input"
                        value={templateForm.language}
                        onChange={(e) => setTemplateForm(prev => ({ ...prev, language: e.target.value }))}
                      >
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Tone</label>
                      <select 
                        className="form-input"
                        value={templateForm.tone}
                        onChange={(e) => setTemplateForm(prev => ({ ...prev, tone: e.target.value }))}
                      >
                        <option value="professional">Professional</option>
                        <option value="friendly">Friendly</option>
                        <option value="casual">Casual</option>
                        <option value="formal">Formal</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-btn secondary"
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
              <button 
                className="modal-btn primary"
                onClick={selectedTemplate ? handleEditTemplate : handleCreateTemplate}
                disabled={!templateForm.name}
              >
                {selectedTemplate ? 'Update Template' : 'Save Template'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Template Modal */}
      {showImportModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Import Communication Template</h3>
              <button 
                className="modal-close"
                onClick={() => setShowImportModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Upload Template File</label>
                <input 
                  type="file"
                  className="form-input"
                  accept=".json,.csv"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        try {
                          const importedTemplate = JSON.parse(event.target.result);
                          handleImportTemplate(importedTemplate);
                        } catch (error) {
                          console.error('Error parsing template file:', error);
                        }
                      };
                      reader.readAsText(file);
                    }
                  }}
                />
                <div className="help-text">
                  Upload a JSON file containing template data. The file should include name, description, type, content, and other template properties.
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-btn secondary"
                onClick={() => setShowImportModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedTemplate && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Delete Template</h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedTemplate(null);
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete "{selectedTemplate.name}"? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-btn secondary"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedTemplate(null);
                }}
              >
                Cancel
              </button>
              <button 
                className="modal-btn primary"
                onClick={handleDeleteTemplate}
                style={{ backgroundColor: '#dc2626' }}
              >
                Delete Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Template Preview Modal */}
      {showPreviewModal && selectedTemplate && (
        <div className="modal-overlay">
          <div className="modal-content modal-large">
            <div className="modal-header">
              <h3 style={{ color: 'white' }}>Template Preview - {selectedTemplate.name}</h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowPreviewModal(false);
                  setSelectedTemplate(null);
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="preview-container">
                {selectedTemplate.type === 'email' && (
                  <div className="email-preview">
                    <div className="image-only-preview">
                      {selectedTemplate.images?.emailHeaderImage && (
                        <img 
                          src={selectedTemplate.images.emailHeaderImage} 
                          alt="Ad Preview" 
                          className="clickable-image full-preview-image"
                          onClick={() => openImageLightbox(selectedTemplate.images.emailHeaderImage, 'Ad Image')}
                        />
                      )}
                    </div>
                  </div>
                                )}
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-btn secondary"
                onClick={() => {
                  setShowPreviewModal(false);
                  setSelectedTemplate(null);
                }}
              >
                Close
              </button>
              <button 
                className="modal-btn primary"
                onClick={() => {
                  setShowPreviewModal(false);
                  openEditModal(selectedTemplate);
                }}
              >
                Edit Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RevenueOptimizerComms;
