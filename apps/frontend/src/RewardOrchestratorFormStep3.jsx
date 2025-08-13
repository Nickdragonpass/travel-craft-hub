import React, { useState, useMemo } from 'react';

function RewardOrchestratorFormStep3({ formData, handleInputChange, handleBenefitInputChange, addBenefit, removeBenefit, currentBenefit, setCurrentBenefit, showBenefitForm, setShowBenefitForm, benefitTypes, redemptionMethods, benefitsCatalog = [], addBenefitFromMarketplace }) {
  const [activeTab, setActiveTab] = useState('create'); // 'create' | 'marketplace'

  // Marketplace filters
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('');

  // Product types and supplier map
  const productTypes = [
    'flights', 'hotels', 'tickets', 'eSIM', 'transfers', 'fast track', 'lounge', 'dining'
  ];
  const productTypeToSuppliers = {
    flights: ['All', 'British Airways', 'American Airlines', 'Emirates', 'Qatar Airways', 'United', 'Lufthansa'],
    hotels: ['All', 'Hilton', 'Marriott', 'IHG', 'Hyatt', 'Accor'],
    tickets: ['All', 'Ticketmaster', 'Eventbrite', 'AXS'],
    eSIM: ['All', 'Airalo', 'eSIM Partner'],
    transfers: ['All', 'Uber', 'Lyft', 'RideCo', 'Taxi Partner'],
    'fast track': ['All', 'Partner A', 'Partner B'],
    lounge: ['All', 'DragonPass', 'LoungeKey'],
    dining: ['All', 'Cafe Partner', 'Food Partner']
  };

  const availableSuppliers = useMemo(() => {
    const list = productTypeToSuppliers[currentBenefit.productType] || [];
    return list;
  }, [currentBenefit.productType]);

  // Delivery logic catalog by product type
  const deliveryCatalog = {
    flights: [
      'E-ticket update with benefit applied',
      'E-voucher code for future booking (email/app delivery)',
      'PNR remark for supplier (benefit applied in booking record)',
      'Loyalty miles/points credit (auto-applied to account)',
      'Concierge call to arrange change/upgrade',
      'Mobile app push notification with booking link (deep link pre-loaded with benefit)'
    ],
    hotels: [
      'Booking modification with benefit applied',
      'E-voucher for hotel services',
      'QR code/barcode for on-site redemption',
      'Loyalty points credit',
      'Concierge booking confirmation'
    ],
    tickets: [
      'Digital ticket delivery (QR code, barcode, PDF)',
      'Voucher code for partner booking site',
      'Wallet pass push (Apple Wallet / Google Wallet)',
      'Concierge booking on behalf of customer'
    ],
    eSIM: [
      'QR code / activation code via app/email',
      'Automatic activation (OTA provisioning)',
      'Concierge assistance for setup'
    ],
    transfers: [
      'Booking confirmation with benefit applied',
      'Voucher code for partner transfer service',
      'Concierge booking confirmation'
    ],
    'fast track': [
      'QR code / barcode for entry',
      'Wallet pass push',
      'PNR remark (if airline-integrated fast track)',
      'Concierge booking confirmation'
    ],
    lounge: [
      'QR code / barcode for entry',
      'Loyalty points deduction + access confirmation',
      'Wallet pass push',
      'Concierge booking confirmation'
    ],
    dining: [
      'Voucher code for restaurant',
      'QR code for on-site redemption',
      'Wallet pass push',
      'Concierge table reservation confirmation'
    ]
  };

  const defaultDeliveryByProduct = {
    flights: 'E-ticket update with benefit applied',
    hotels: 'Booking modification with benefit applied',
    tickets: 'Digital ticket delivery (QR code, barcode, PDF)',
    eSIM: 'QR code / activation code via app/email',
    transfers: 'Booking confirmation with benefit applied',
    'fast track': 'QR code / barcode for entry',
    lounge: 'QR code / barcode for entry',
    dining: 'Voucher code for restaurant'
  };

  const availableDeliveryMethods = useMemo(() => {
    return deliveryCatalog[currentBenefit.productType] || [];
  }, [currentBenefit.productType]);

  // Ensure default when product type changes and nothing selected
  const ensureDefaultDelivery = (productType) => {
    const defaults = defaultDeliveryByProduct[productType];
    if (!defaults) return;
    const selected = Array.isArray(currentBenefit.deliveryMethods) ? currentBenefit.deliveryMethods : [];
    if (selected.length === 0) {
      handleBenefitInputChange('deliveryMethods', [defaults]);
    } else {
      const filtered = selected.filter(m => (deliveryCatalog[productType] || []).includes(m));
      if (filtered.length === 0) handleBenefitInputChange('deliveryMethods', [defaults]);
      else handleBenefitInputChange('deliveryMethods', filtered);
    }
  };

  // Supplier multiselect dropdown
  const [supplierOpen, setSupplierOpen] = useState(false);
  const [supplierSearch, setSupplierSearch] = useState('');

  const supplierOptions = useMemo(() => {
    const pool = availableSuppliers || [];
    const q = supplierSearch.trim().toLowerCase();
    return q ? pool.filter(s => s.toLowerCase().includes(q)) : pool;
  }, [availableSuppliers, supplierSearch]);

  const selectedSuppliers = Array.isArray(currentBenefit.suppliers) ? currentBenefit.suppliers : [];

  const toggleSupplier = (s) => {
    const current = Array.isArray(currentBenefit.suppliers) ? currentBenefit.suppliers : [];
    if (s === 'All') {
      const newValue = current.includes('All') ? [] : ['All'];
      handleBenefitInputChange('suppliers', newValue);
      return;
    }
    const withoutAll = current.filter(x => x !== 'All');
    const exists = withoutAll.includes(s);
    const updated = exists ? withoutAll.filter(x => x !== s) : [...withoutAll, s];
    handleBenefitInputChange('suppliers', updated);
  };

  const clearSuppliers = () => handleBenefitInputChange('suppliers', []);

  const supplierSummary = () => {
    if (!currentBenefit.productType) return 'Select suppliers';
    if (selectedSuppliers.includes('All')) return 'All suppliers';
    if (selectedSuppliers.length === 0) return 'Select suppliers';
    if (selectedSuppliers.length <= 2) return selectedSuppliers.join(', ');
    return `${selectedSuppliers.length} selected`;
  };

  // Delivery multiselect dropdown state
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [deliverySearch, setDeliverySearch] = useState('');

  const deliveryOptions = useMemo(() => {
    const pool = availableDeliveryMethods || [];
    const q = deliverySearch.trim().toLowerCase();
    return q ? pool.filter(s => s.toLowerCase().includes(q)) : pool;
  }, [availableDeliveryMethods, deliverySearch]);

  const selectedDelivery = Array.isArray(currentBenefit.deliveryMethods) ? currentBenefit.deliveryMethods : [];

  const toggleDelivery = (m) => {
    const current = Array.isArray(currentBenefit.deliveryMethods) ? currentBenefit.deliveryMethods : [];
    const exists = current.includes(m);
    // Single-select behavior: keep at most one method
    const updated = exists ? [] : [m];
    handleBenefitInputChange('deliveryMethods', updated);
  };

  const clearDelivery = () => handleBenefitInputChange('deliveryMethods', []);

  const deliverySummary = () => {
    if (!currentBenefit.productType) return 'Select a delivery method';
    if (selectedDelivery.length === 0) return 'Select a delivery method';
    return selectedDelivery[0];
  };

  const types = useMemo(() => Array.from(new Set(benefitsCatalog.map(b => b.type).filter(Boolean))).sort(), [benefitsCatalog]);
  const suppliers = useMemo(() => Array.from(new Set(benefitsCatalog.map(b => b.supplier).filter(Boolean))).sort(), [benefitsCatalog]);

  const filteredCatalog = useMemo(() => {
    const q = search.trim().toLowerCase();
    return benefitsCatalog.filter(b => {
      const matchesQuery = !q || [b.title, b.description, b.type, b.supplier].filter(Boolean).some(v => v.toLowerCase().includes(q));
      const matchesType = !typeFilter || b.type === typeFilter;
      const matchesSupplier = !supplierFilter || b.supplier === supplierFilter;
      return matchesQuery && matchesType && matchesSupplier;
    });
  }, [benefitsCatalog, search, typeFilter, supplierFilter]);

  const isInPackage = (preset) => {
    return formData.benefits.some(b => (b.title || '').toLowerCase() === (preset.title || '').toLowerCase());
  };

  const [selectedOpen, setSelectedOpen] = useState(false);

  return (
    <div className="form-step">
      <div className="step-header">
        <h3>Benefits & Rewards</h3>
        <p>Configure the rewards and benefits for your program</p>
      </div>

      <div className="benefits-section">
        {/* Selected Benefits - Collapsible Summary */}
        {formData.benefits.length > 0 && (
          <div className="selected-benefits">
            <div className="selected-header">
              <div className="selected-title">
                <span className="label">Selected Benefits</span>
                <span className="badge">{formData.benefits.length}</span>
              </div>
              <button type="button" className="btn secondary small" onClick={() => setSelectedOpen(!selectedOpen)}>
                {selectedOpen ? 'Hide' : 'Manage'}
              </button>
            </div>

            {!selectedOpen ? (
              <div className="selected-chips">
                {formData.benefits.slice(0, 6).map(b => (
                  <span key={b.id} className="selected-chip">{b.title}</span>
                ))}
                {formData.benefits.length > 6 && (
                  <span className="selected-more">+{formData.benefits.length - 6} more</span>
                )}
              </div>
            ) : (
              <div className="benefits-list compact">
                {formData.benefits.map((benefit) => (
                  <div key={benefit.id} className="benefit-item">
                    <div className="benefit-info">
                      <h5>{benefit.title}</h5>
                      <p>{benefit.type} • {benefit.supplier}</p>
                    </div>
                    <button
                      type="button"
                      className="remove-benefit-btn"
                      onClick={() => removeBenefit(benefit.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tabs */}
        <div className="benefits-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            Create New
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'marketplace' ? 'active' : ''}`}
            onClick={() => setActiveTab('marketplace')}
          >
            Marketplace
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'create' ? (
          <div className="benefit-form">
            <div className="benefit-form-header">
              <h4>Create New Benefit</h4>
            </div>

            <div className="form-grid">
              <div className="form-row">
                <div className="form-group">
                  <label className="required">Benefit Title</label>
                  <input
                    type="text"
                    value={currentBenefit.title}
                    onChange={(e) => handleBenefitInputChange('title', e.target.value)}
                    placeholder="Enter benefit title"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="required">Benefit Type</label>
                  <select
                    value={currentBenefit.type}
                    onChange={(e) => handleBenefitInputChange('type', e.target.value)}
                    className="form-input enhanced"
                  >
                    <option value="">Select type</option>
                    {benefitTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="required">Product Type</label>
                  <select
                    value={currentBenefit.productType || ''}
                    onChange={(e) => { const pt = e.target.value; handleBenefitInputChange('productType', pt); clearSuppliers(); setSupplierOpen(false); setSupplierSearch(''); setDeliveryOpen(false); setDeliverySearch(''); handleBenefitInputChange('deliveryMethods', []); ensureDefaultDelivery(pt); }}
                    className="form-input enhanced"
                  >
                    <option value="">Select product</option>
                    {productTypes.map(pt => (
                      <option key={pt} value={pt}>{pt.charAt(0).toUpperCase() + pt.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Suppliers (optional)</label>
                  <div className={`modern-multiselect ${supplierOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="multiselect-trigger"
                      disabled={!currentBenefit.productType}
                      onClick={() => setSupplierOpen(!supplierOpen)}
                    >
                      <span className="multiselect-placeholder">{supplierSummary()}</span>
                      <span className="chevron">▾</span>
                    </button>

                    {supplierOpen && (
                      <div className="multiselect-panel">
                        <div className="multiselect-search">
                          <input
                            type="text"
                            value={supplierSearch}
                            onChange={(e) => setSupplierSearch(e.target.value)}
                            placeholder="Search suppliers..."
                          />
                        </div>
                        <div className="multiselect-options">
                          {(supplierOptions || []).map((s) => (
                            <label key={s} className="multiselect-option">
                              <input
                                type="checkbox"
                                checked={selectedSuppliers.includes(s)}
                                onChange={() => toggleSupplier(s)}
                              />
                              <span>{s}</span>
                            </label>
                          ))}
                          {supplierOptions.length === 0 && (
                            <div className="multiselect-empty">No suppliers found</div>
                          )}
                        </div>
                        <div className="multiselect-actions">
                          <button type="button" className="btn secondary" onClick={clearSuppliers}>Clear</button>
                          <button type="button" className="btn primary" onClick={() => setSupplierOpen(false)}>Done</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Redemption Method</label>
                  <select
                    value={currentBenefit.redemptionMethod}
                    onChange={(e) => handleBenefitInputChange('redemptionMethod', e.target.value)}
                    className="form-input enhanced"
                  >
                    <option value="">Select method</option>
                    {redemptionMethods.map(method => (
                      <option key={method} value={method}>
                        {method.charAt(0).toUpperCase() + method.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Delivery Logic</label>
                  <div className={`modern-multiselect ${deliveryOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="multiselect-trigger"
                      disabled={!currentBenefit.productType}
                      onClick={() => setDeliveryOpen(!deliveryOpen)}
                    >
                      <span className="multiselect-placeholder">{deliverySummary()}</span>
                      <span className="chevron">▾</span>
                    </button>

                    {deliveryOpen && (
                      <div className="multiselect-panel">
                        <div className="multiselect-search">
                          <input
                            type="text"
                            value={deliverySearch}
                            onChange={(e) => setDeliverySearch(e.target.value)}
                            placeholder="Search delivery methods..."
                          />
                        </div>
                        <div className="multiselect-options">
                          {(deliveryOptions || []).map((m) => (
                            <label key={m} className="multiselect-option">
                              <input
                                type="radio"
                                name="delivery-method"
                                checked={selectedDelivery.includes(m)}
                                onChange={() => toggleDelivery(m)}
                              />
                              <span>{m}</span>
                            </label>
                          ))}
                          {deliveryOptions.length === 0 && (
                            <div className="multiselect-empty">No methods found</div>
                          )}
                        </div>
                        <div className="multiselect-actions">
                          <button type="button" className="btn secondary" onClick={clearDelivery}>Clear</button>
                          <button type="button" className="btn primary" onClick={() => setDeliveryOpen(false)}>Done</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
            </div>

            <div className="benefit-form-actions">
              <button
                type="button"
                className="btn secondary"
                onClick={() => { setCurrentBenefit({ title: '', type: '', supplier: '', redemptionMethod: '', deliveryLogic: '', redemptionWindowStart: '', redemptionWindowEnd: '', customerUsageLimit: '', inventory: '', costToBank: '', personaEligibilityOverride: '', visibleInUI: false, productType: '', suppliers: [], deliveryMethods: [] }); setSupplierOpen(false); setSupplierSearch(''); setDeliveryOpen(false); setDeliverySearch(''); }}
              >
                Clear
              </button>
              <button
                type="button"
                className="btn primary"
                onClick={() => addBenefit(true)}
              >
                Add and continue
              </button>
              <button
                type="button"
                className="btn primary"
                onClick={() => { addBenefit(false); setActiveTab('marketplace'); }}
              >
                Add and close
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="marketplace-toolbar">
              <div className="toolbar-left">
                <div className="marketplace-search">
                  <input
                    className="search-input"
                    placeholder="Search benefits..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="toolbar-right">
                <select className="modern-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                  <option value="">All types</option>
                  {types.map(t => (<option key={t} value={t}>{t}</option>))}
                </select>
                <select className="modern-select" value={supplierFilter} onChange={(e) => setSupplierFilter(e.target.value)}>
                  <option value="">All suppliers</option>
                  {suppliers.map(s => (<option key={s} value={s}>{s}</option>))}
                </select>
                {(search || typeFilter || supplierFilter) && (
                  <button type="button" className="btn secondary" onClick={() => { setSearch(''); setTypeFilter(''); setSupplierFilter(''); }}>
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            <div className="marketplace-grid">
              {filteredCatalog.map(item => {
                const added = isInPackage(item);
                return (
                  <div key={item.id} className={`marketplace-card ${added ? 'added' : ''}`}>
                    <div className="card-header">
                      <div className="card-title">{item.title}</div>
                      <div className="card-type-chip">{item.type}</div>
                    </div>
                    <div className="card-sub">
                      <span className="card-supplier">{item.supplier}</span>
                      {item.value && <span className="card-value">Value: {item.value}</span>}
                    </div>
                    <p className="marketplace-desc">{item.description}</p>
                    <div className="card-footer">
                      <button
                        type="button"
                        className="btn primary"
                        disabled={added}
                        onClick={() => addBenefitFromMarketplace(item)}
                      >
                        {added ? 'Added' : 'Add to package'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RewardOrchestratorFormStep3; 