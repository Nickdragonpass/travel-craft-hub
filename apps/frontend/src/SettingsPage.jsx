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

  const cancelChange = () => {
    setShowReviewModal(false);
    setShowConfirmModal(false);
    setPendingChange(null);
  };



  const tabs = [
    { id: 'products', label: 'Products', icon: '🚀', description: 'Manage your live products' },
    { id: 'middleware', label: 'Components', icon: '🔧', description: 'System middleware packages' },
    { id: 'categories', label: 'Categories', icon: '📂', description: 'Travel & lifestyle offerings' },
    { id: 'general', label: 'General', icon: '⚙️', description: 'Branding & customization' }
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
            
            <div className="categories-section">
              <h3>Available Categories</h3>
              <div className="enhanced-categories-grid">
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
          </div>
        );


      case 'general':
        return (
          <div className="tab-content">
            <div className="tab-header">
              <h2>⚙️ General Settings</h2>
              <p>Customize your branding, appearance, and system preferences.</p>
            </div>
            <div className="enhanced-settings-grid">
              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-icon">🎨</div>
                  <h3>Brand Identity</h3>
                </div>
                <div className="settings-card-content">
                  <div className="setting-item">
                    <label htmlFor="logo-upload" className="setting-label">Company Logo</label>
                    <p className="setting-description">Upload your company logo (recommended: PNG, 200x60px)</p>
                    <div className="enhanced-file-upload-area">
                      <input type="file" id="logo-upload" accept="image/*" />
                      <div className="upload-placeholder">
                        <div className="upload-icon">🖼️</div>
                        <p><strong>Click to upload</strong> or drag and drop</p>
                        <span>PNG, JPG up to 5MB</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <label className="setting-label">Color Palette</label>
                    <p className="setting-description">Customize your brand colors to match your identity</p>
                    <div className="enhanced-color-palette">
                      <div className="color-section">
                        <h4>Primary Colors</h4>
                        <div className="color-options">
                          <div className="color-option active">
                            <div className="color-preview" style={{background: 'var(--brand-primary)'}}></div>
                            <span>Navy Blue</span>
                            <button className="color-edit-btn">✏️</button>
                          </div>
                          <div className="color-option active">
                            <div className="color-preview" style={{background: 'var(--brand-accent)'}}></div>
                            <span>Accent Red</span>
                            <button className="color-edit-btn">✏️</button>
                          </div>
                        </div>
                      </div>
                      <button className="customize-colors-btn enhanced">
                        <span>🎨</span>
                        Advanced Color Customization
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-icon">🌐</div>
                  <h3>Localization</h3>
                </div>
                <div className="settings-card-content">
                  <div className="setting-item">
                    <label className="setting-label">Default Language</label>
                    <select className="form-select">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  
                  <div className="setting-item">
                    <label className="setting-label">Default Currency</label>
                    <select className="form-select">
                      <option value="GBP">British Pound (£)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                    </select>
                  </div>
                  
                  <div className="setting-item">
                    <label className="setting-label">Time Zone</label>
                    <select className="form-select">
                      <option value="GMT">GMT (London)</option>
                      <option value="EST">EST (New York)</option>
                      <option value="PST">PST (Los Angeles)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-icon">🔒</div>
                  <h3>Security & Privacy</h3>
                </div>
                <div className="settings-card-content">
                  <div className="setting-item">
                    <label className="checkbox-container">
                      <input type="checkbox" defaultChecked />
                      <span className="checkmark"></span>
                      <span className="checkbox-label">Two-factor authentication</span>
                    </label>
                    <p className="setting-description">Require 2FA for admin access</p>
                  </div>
                  
                  <div className="setting-item">
                    <label className="checkbox-container">
                      <input type="checkbox" defaultChecked />
                      <span className="checkmark"></span>
                      <span className="checkbox-label">Data encryption</span>
                    </label>
                    <p className="setting-description">Encrypt sensitive customer data</p>
                  </div>
                  
                  <div className="setting-item">
                    <label className="checkbox-container">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                      <span className="checkbox-label">Marketing emails</span>
                    </label>
                    <p className="setting-description">Send product updates and news</p>
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
            <div className="tab-text">
              <span className="tab-label">{tab.label}</span>
              <span className="tab-description">{tab.description}</span>
            </div>
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
    </div>
  );
}

export default SettingsPage; 