import React, { useState } from 'react';
import './App.css';

function SettingsPage() {
  // Tab management
  const [activeTab, setActiveTab] = useState('products');
  // Product Management State
  const [products, setProducts] = useState({
    mobileApp: { enabled: true, name: 'Mobile App (WL)' },
    website: { enabled: true, name: 'Website (WL)' },
    api: { enabled: false, name: 'API' },
    digitalConcierge: { enabled: true, name: 'Digital Concierge Chat' }
  });

  // Middleware Components State
  const [middlewareComponents, setMiddlewareComponents] = useState({
    marketing: { enabled: true, name: 'Marketing Package' },
    revenueOptimizer: { enabled: true, name: 'Revenue Optimizer Package' },
    communications: { enabled: true, name: 'Communications Package' },
    analytics: { enabled: true, name: 'Analytics Package' },
    corporateTravel: { enabled: true, name: 'Corporate Travel Package' },
    dutyOfCare: { enabled: true, name: 'Duty of Care Package' }
  });

  // Category Management State
  const [globalCategories, setGlobalCategories] = useState({
    flights: true,
    hotels: true,
    tickets: true,
    esims: true,
    airportLounge: true,
    airportTransfer: true,
    airportDining: true,
    airportFastTrack: true,
    healthWellness: true
  });

  // Modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingChange, setPendingChange] = useState(null);

  // Permissions & client info state
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Sophie Liang', email: 'sophie@partner.com', role: 'Admin', canInvite: true },
    { id: 2, name: 'Marcus Grey', email: 'marcus@partner.com', role: 'Manager', canInvite: true },
    { id: 3, name: 'Emily Hart', email: 'emily@partner.com', role: 'Viewer', canInvite: false }
  ]);
  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'Viewer' });
  const [pendingAccountAction, setPendingAccountAction] = useState(null);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [clientInfo, setClientInfo] = useState({
    organizationName: 'DragonPass Partner',
    clientId: 'DP-4581-GB',
    contactEmail: 'ops@partner.com',
    phoneNumber: '+44 20 7946 0100',
    primaryRegion: 'EMEA',
    accountManager: 'Hannah Patel',
    accountTier: 'Enterprise',
    renewalDate: '2026-03-31',
    notes: 'Enterprise travel programme with premium lounge focus.'
  });

  // Usage Stats (mock data)
  const usageStats = {
    conciergeBookings: 1247,
    mobileAppBookings: 5632,
    websiteBookings: 8913,
    apiBookings: 2456,
    totalRevenue: '£2.4M',
    topCategory: 'Hotels (42%)'
  };

  const categoryLabels = {
    flights: 'Flights',
    hotels: 'Hotels',
    tickets: 'Tickets',
    esims: 'eSIMs',
    airportLounge: 'Airport Lounge',
    airportTransfer: 'Airport Transfer',
    airportDining: 'Airport Dining',
    airportFastTrack: 'Airport Fast Track',
    healthWellness: 'Health & Wellness'
  };

  const handleProductToggle = (productKey) => {
    setPendingChange({
      type: 'product',
      key: productKey,
      value: !products[productKey].enabled,
      name: products[productKey].name
    });
    setShowReviewModal(true);
  };

  const handleMiddlewareToggle = (componentKey) => {
    if (middlewareComponents[componentKey].enabled) {
      // If turning off, show confirmation
      setPendingChange({
        type: 'middleware',
        key: componentKey,
        value: false,
        name: middlewareComponents[componentKey].name
      });
      setShowConfirmModal(true);
    } else {
      // If turning on, apply directly
      setMiddlewareComponents(prev => ({
        ...prev,
        [componentKey]: { ...prev[componentKey], enabled: true }
      }));
    }
  };

  const handleCategoryToggle = (categoryKey) => {
    setGlobalCategories(prev => ({ ...prev, [categoryKey]: !prev[categoryKey] }));
    setPendingChange({
      type: 'category',
      key: categoryKey,
      value: !globalCategories[categoryKey],
      name: categoryLabels[categoryKey],
      scope: 'global'
    });
    setShowReviewModal(true);
  };

  const confirmChange = () => {
    if (pendingChange.type === 'product') {
      setProducts(prev => ({
        ...prev,
        [pendingChange.key]: { ...prev[pendingChange.key], enabled: pendingChange.value }
      }));
    } else if (pendingChange.type === 'middleware') {
      setMiddlewareComponents(prev => ({
        ...prev,
        [pendingChange.key]: { ...prev[pendingChange.key], enabled: pendingChange.value }
      }));
    }
    setShowReviewModal(false);
    setShowConfirmModal(false);
    setPendingChange(null);
  };

  const updateMemberRole = (memberId, role) => {
    const canInvite = role !== 'Viewer';
    setTeamMembers(prev =>
      prev.map(member => (member.id === memberId ? { ...member, role, canInvite } : member))
    );
  };

  const openAccountAction = (member) => {
    setPendingAccountAction({ member, action: 'delete' });
    setShowAccountModal(true);
  };

  const cancelAccountAction = () => {
    setShowAccountModal(false);
    setPendingAccountAction(null);
  };

  const confirmAccountAction = () => {
    if (!pendingAccountAction) return;
    const { member } = pendingAccountAction;
    setTeamMembers(prev => prev.filter(m => m.id !== member.id));

    cancelAccountAction();
  };

  const handleInviteInputChange = (field, value) => {
    setNewMember(prev => ({ ...prev, [field]: value }));
  };

  const handleInviteSubmit = (event) => {
    event.preventDefault();
    if (!newMember.name.trim() || !newMember.email.trim()) {
      return;
    }
    const canInvite = newMember.role !== 'Viewer';
    setTeamMembers(prev => [
      ...prev,
      {
        id: Date.now(),
        name: newMember.name.trim(),
        email: newMember.email.trim(),
        role: newMember.role,
        canInvite
      }
    ]);
    setNewMember({ name: '', email: '', role: 'Viewer' });
  };

  const handleClientInfoChange = (field, value) => {
    setClientInfo(prev => ({ ...prev, [field]: value }));
  };
  const cancelChange = () => {
    setShowReviewModal(false);
    setShowConfirmModal(false);
    setPendingChange(null);
  };



  const tabs = [
    { id: 'products', label: 'Products (Not MVP)', icon: '🚀' },
    { id: 'middleware', label: 'Components (Not MVP)', icon: '🔧' },
    { id: 'categories', label: 'Categories (Not MVP)', icon: '📂' },
    // { id: 'localization', label: 'Localization', icon: '🌍' }, // Temporarily hidden
    { id: 'permissions', label: 'Team', icon: '🛡️' },
    { id: 'general', label: 'General', icon: '⚙️' }
  ];

  const productDetails = {
    mobileApp: { 
      icon: '📱', 
      name: 'Mobile App (WL)', 
      description: 'White-label mobile application for iOS and Android platforms',
      features: ['Native iOS & Android apps', 'Push notifications', 'Offline functionality', 'Biometric authentication']
    },
    website: { 
      icon: '🌐', 
      name: 'Website (WL)', 
      description: 'White-label responsive web platform',
      features: ['Responsive design', 'SEO optimized', 'Progressive Web App', 'Multi-language support']
    },
    api: { 
      icon: '🔗', 
      name: 'API', 
      description: 'RESTful API for third-party integrations',
      features: ['REST & GraphQL endpoints', 'Rate limiting', 'Authentication', 'Real-time webhooks']
    },
    digitalConcierge: { 
      icon: '💬', 
      name: 'Digital Concierge Chat', 
      description: 'AI-powered customer service and booking assistance',
      features: ['24/7 AI chat support', 'Booking assistance', 'Multi-language', 'Human handoff']
    }
  };

  const middlewareDetails = {
    marketing: { 
      icon: '📢', 
      name: 'Marketing Package', 
      description: 'Campaign management, email marketing, and promotional tools',
      features: ['Email campaigns', 'Push notifications', 'A/B testing', 'Customer segmentation']
    },
    revenueOptimizer: { 
      icon: '💰', 
      name: 'Revenue Optimizer Package', 
      description: 'Dynamic pricing, upselling, and revenue enhancement tools',
      features: ['Dynamic pricing', 'Upsell recommendations', 'Revenue analytics', 'Profit optimization']
    },
    communications: { 
      icon: '✉️', 
      name: 'Communications Package', 
      description: 'Multi-channel communication and notification system',
      features: ['SMS notifications', 'Email templates', 'WhatsApp integration', 'Communication logs']
    },
    analytics: { 
      icon: '📈', 
      name: 'Analytics Package', 
      description: 'Advanced reporting, insights, and business intelligence',
      features: ['Real-time dashboards', 'Custom reports', 'Data export', 'Predictive analytics']
    },
    corporateTravel: { 
      icon: '🏢', 
      name: 'Corporate Travel Package', 
      description: 'Business travel management and expense tracking',
      features: ['Expense tracking', 'Corporate policies', 'Approval workflows', 'Travel reporting']
    },
    dutyOfCare: { 
      icon: '🛡️', 
      name: 'Duty of Care Package', 
      description: 'Traveler safety, tracking, and emergency assistance',
      features: ['Real-time tracking', 'Emergency alerts', 'Safety notifications', 'Crisis management']
    }
  };

  const categoryDetails = {
    flights: { icon: '✈️', name: 'Flights', description: 'Flight bookings and upgrades' },
    hotels: { icon: '🏨', name: 'Hotels', description: 'Hotel reservations and room upgrades' },
    tickets: { icon: '🎫', name: 'Tickets', description: 'Event and entertainment tickets' },
    esims: { icon: '📶', name: 'eSIMs', description: 'International mobile connectivity' },
    airportLounge: { icon: '🛋️', name: 'Airport Lounge', description: 'Premium airport lounge access' },
    airportTransfer: { icon: '🚗', name: 'Airport Transfer', description: 'Ground transportation services' },
    airportDining: { icon: '🍽️', name: 'Airport Dining', description: 'Airport restaurant reservations' },
    airportFastTrack: { icon: '⚡', name: 'Airport Fast Track', description: 'Priority security and immigration' },
    healthWellness: { icon: '💆', name: 'Health & Wellness', description: 'Spa and wellness services' }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'products':
        return (
          <div className="tab-content">
            <div className="tab-header">
              <h2>🚀 Product Management</h2>
              <p>Control which products are live in your system. Changes require account manager approval.</p>
            </div>
            <div className="enhanced-product-grid">
              {Object.entries(products).map(([key, product]) => {
                const details = productDetails[key];
                return (
                  <div key={key} className="enhanced-product-card">
                    <div className="product-card-header">
                      <div className="product-icon">{details.icon}</div>
                      <div className="product-title-area">
                        <h3>{details.name}</h3>
                        <span className={`status-badge ${product.enabled ? 'enabled' : 'disabled'}`}>
                          {product.enabled ? 'Live' : 'Inactive'}
                        </span>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={product.enabled}
                          onChange={() => handleProductToggle(key)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                    <p className="product-description">{details.description}</p>
                    <div className="product-features">
                      <h4>Key Features:</h4>
                      <ul>
                        {details.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'middleware':
        return (
          <div className="tab-content">
            <div className="tab-header">
              <h2>🔧 Middleware Components</h2>
              <p>Manage optional system components. All components are enabled by default but can be disabled if not needed.</p>
            </div>
            <div className="enhanced-middleware-grid">
              {Object.entries(middlewareComponents).map(([key, component]) => {
                const details = middlewareDetails[key];
                return (
                  <div key={key} className="enhanced-middleware-card">
                    <div className="middleware-card-header">
                      <div className="middleware-icon">{details.icon}</div>
                      <div className="middleware-title-area">
                        <h3>{details.name}</h3>
                        <span className={`status-badge ${component.enabled ? 'enabled' : 'disabled'}`}>
                          {component.enabled ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={component.enabled}
                          onChange={() => handleMiddlewareToggle(key)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                    <p className="middleware-description">{details.description}</p>
                    <div className="middleware-features">
                      <h4>Includes:</h4>
                      <ul>
                        {details.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'categories':
        return (
          <div className="tab-content">
            <div className="tab-header">
              <h2>📂 Category Management</h2>
              <p>Configure which travel and lifestyle categories to offer across your products.</p>
            </div>
            <div className="enhanced-middleware-grid">
              {Object.entries(globalCategories).map(([key, enabled]) => {
                const details = categoryDetails[key];
                return (
                  <label key={key} className="enhanced-category-item">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={() => handleCategoryToggle(key)}
                    />
                    <div className="category-content">
                      <div className="category-icon">{details.icon}</div>
                      <div className="category-info">
                        <span className="category-name">{details.name}</span>
                        <span className="category-desc">{details.description}</span>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        );

      // case 'localization':
      //   return (
      //     <div className="tab-content">
      //       <div className="tab-header">
      //         <h2>🌍 Localization</h2>
      //         <p>Set the default language and currency used throughout your client experience.</p>
      //       </div>
      //       <div className="enhanced-settings-grid">
      //         <div className="settings-card">
      //           <div className="settings-card-header">
      //             <div className="settings-icon">🌐</div>
      //             <h3>Localization Defaults</h3>
      //           </div>
      //           <div className="settings-card-content">
      //             <div className="setting-item">
      //               <label className="setting-label">Default Language</label>
      //               <select className="form-select">
      //                 <option value="en">English</option>
      //                 <option value="es">Spanish</option>
      //                 <option value="fr">French</option>
      //                 <option value="de">German</option>
      //               </select>
      //             </div>
      //             <div className="setting-item">
      //               <label className="setting-label">Default Currency</label>
      //               <select className="form-select">
      //                 <option value="GBP">British Pound (£)</option>
      //                 <option value="USD">US Dollar ($)</option>
      //                 <option value="EUR">Euro (€)</option>
      //               </select>
      //             </div>
      //             <p className="setting-description">Changing these defaults will update your booking journeys and all client-facing collateral.</p>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   );

      case 'permissions': {
        const totalMembers = teamMembers.length;
        const adminCount = teamMembers.filter(member => member.role === 'Admin').length;
        const inviteEnabled = teamMembers.filter(member => member.role !== 'Viewer').length;
        return (
          <div className="tab-content">
            <div className="tab-header">
              <h2>🛡️ Team & Permissions</h2>
              <p>Control who can access the platform, manage roles, and invite new team users.</p>
            </div>
            <div className="enhanced-middleware-grid">
              <div className="settings-card" style={{ gridColumn: '1 / -1' }}>
                <div className="settings-card-header">
                  <div className="settings-icon">👥</div>
                  <h3>Manage Permissions</h3>
                </div>
                <div className="settings-card-content">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
                    <div style={{ flex: '1 1 140px', padding: '12px 16px', borderRadius: '12px', background: 'var(--brand-white)', border: '1px solid var(--brand-card-border)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--brand-text-secondary)' }}>Team users</span>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{totalMembers}</div>
                    </div>
                    <div style={{ flex: '1 1 140px', padding: '12px 16px', borderRadius: '12px', background: 'var(--brand-white)', border: '1px solid var(--brand-card-border)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--brand-text-secondary)' }}>Admins</span>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{adminCount}</div>
                    </div>
                    <div style={{ flex: '1 1 140px', padding: '12px 16px', borderRadius: '12px', background: 'var(--brand-white)', border: '1px solid var(--brand-card-border)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--brand-text-secondary)' }}>Invite rights</span>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{inviteEnabled}</div>
                    </div>
                  </div>
                  <div className="permissions-list">
                    {teamMembers.map(member => {
                      const initials = member.name
                        .split(' ')
                        .map(part => part[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase();
                      return (
                        <div key={member.id} className="permission-member">
                          <div className="member-info-block">
                            <div className="member-avatar">{initials}</div>
                            <div className="member-info">
                              <strong>{member.name}</strong>
                              <span className="member-email">{member.email}</span>
                              <div className="member-badges">
                                <span className="member-badge role">{member.role}</span>
                                <span className={`member-badge invite ${member.canInvite ? 'active' : ''}`}>
                                  {member.canInvite ? 'Can invite' : 'View only'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="member-controls">
                            <div className="control-group">
                              <span className="control-label">Role</span>
                              <select
                                value={member.role}
                                onChange={(event) => updateMemberRole(member.id, event.target.value)}
                                className="form-select member-role-select"
                              >
                                <option value="Admin">Admin</option>
                                <option value="Manager">Manager</option>
                                <option value="Viewer">Viewer</option>
                              </select>
                            </div>
                            <div className="account-actions">
                              <button
                                type="button"
                                className="btn-danger btn-compact"
                                onClick={() => openAccountAction(member)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <form className="invite-form" onSubmit={handleInviteSubmit} style={{ marginTop: '24px', borderTop: '1px dashed var(--brand-card-border)', paddingTop: '20px' }}>
                    <h4>Invite a team user</h4>
                    <div className="form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                      <input
                        type="text"
                        placeholder="Full name"
                        value={newMember.name}
                        onChange={(event) => handleInviteInputChange('name', event.target.value)}
                      />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={newMember.email}
                        onChange={(event) => handleInviteInputChange('email', event.target.value)}
                      />
                      <select
                        value={newMember.role}
                        onChange={(event) => handleInviteInputChange('role', event.target.value)}
                        className="form-select compact"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Viewer">Viewer</option>
                      </select>
                      <button className="btn-primary" type="submit" style={{ width: '100%' }}>Send Invite</button>
                    </div>
                    <p className="setting-description">Invited users receive a branded onboarding email with temporary credentials.</p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'general':
        return (
          <div className="tab-content">
            <div className="tab-header">
              <h2>⚙️ General Settings</h2>
              <p>Customize your branding and client account profile.</p>
            </div>
            <div className="enhanced-middleware-grid">
              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-icon">🧾</div>
                  <h3>Client Information</h3>
                </div>
                <div className="settings-card-content">
                  <div className="setting-item modern-field">
                    <label className="setting-label">Organization Name</label>
                    <input
                      type="text"
                      value={clientInfo.organizationName}
                      onChange={(event) => handleClientInfoChange('organizationName', event.target.value)}
                    />
                  </div>
                  <div className="setting-item modern-field">
                    <label className="setting-label">Primary Contact Email</label>
                    <input
                      type="email"
                      value={clientInfo.contactEmail}
                      onChange={(event) => handleClientInfoChange('contactEmail', event.target.value)}
                    />
                  </div>
                  <div className="setting-item modern-field">
                    <label className="setting-label">Telephone</label>
                    <input
                      type="text"
                      value={clientInfo.phoneNumber}
                      onChange={(event) => handleClientInfoChange('phoneNumber', event.target.value)}
                    />
                  </div>
                  <div className="setting-item modern-field">
                    <label className="setting-label">Account Manager</label>
                    <input
                      type="text"
                      value={clientInfo.accountManager}
                      disabled
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => console.log('Client profile saved', clientInfo)}
                    >
                      Save Client Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Settings</h1>
        <p className="dashboard-subtitle">Manage your system configuration and preferences</p>
      </div>

      {/* Tab Navigation */}
      <div className="settings-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Change Request Review</h3>
            <p>
              You have requested to {pendingChange?.value ? 'enable' : 'disable'} <strong>{pendingChange?.name}</strong>
              {pendingChange?.scope && pendingChange?.scope !== 'global' ? ` for ${products[pendingChange.scope]?.name}` : ''}.
            </p>
            <p className="review-notice">
              <strong>Your account manager will reach out to you directly to manage this change implementation.</strong>
            </p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={cancelChange}>Cancel</button>
              <button className="btn-primary" onClick={confirmChange}>Confirm Request</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Middleware */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure?</h3>
            <p>
              You are about to disable <strong>{pendingChange?.name}</strong>. 
              This will remove this functionality from your system.
            </p>
            <p className="confirm-notice">
              Your account manager will be notified of this change.
            </p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={cancelChange}>Cancel</button>
              <button className="btn-danger" onClick={confirmChange}>Disable Component</button>
            </div>
          </div>
        </div>
      )}

      {/* Account Action Modal (Team) */}
      {showAccountModal && pendingAccountAction && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Delete account?</h3>
            <p>
              <strong>{pendingAccountAction.member.name}</strong> ({pendingAccountAction.member.email})
            </p>
            <p className="confirm-notice">This will permanently remove this account from your team list.</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={cancelAccountAction}>Cancel</button>
              <button className="btn-danger" onClick={confirmAccountAction}>Delete account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPage; 