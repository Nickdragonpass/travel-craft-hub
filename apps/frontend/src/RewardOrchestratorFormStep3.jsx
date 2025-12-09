import React, { useState, useMemo } from 'react';

function RewardOrchestratorFormStep3({ formData, handleInputChange, handleBenefitInputChange, addBenefit, removeBenefit, updateBenefit, currentBenefit, setCurrentBenefit, showBenefitForm, setShowBenefitForm, benefitTypes, redemptionMethods, benefitsCatalog = [], addBenefitFromMarketplace }) {
  const [activeTab, setActiveTab] = useState('marketplace'); // 'create' | 'marketplace'

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

  const getPointsForType = (type) => {
    const pts = formData?.pointsPerBenefitType?.[type];
    return Number.isFinite(pts) ? pts : 1;
  };

  // Lightweight guidance helpers
  const POINT_VALUE_GBP = 30;
  const pointsPerCustomer = (() => {
    const budget = parseFloat(formData.allocationBudget || 0);
    const ents = parseFloat(formData.allocationEntitlements || 0);
    if (budget > 0 && ents > 0) return (budget / ents) / POINT_VALUE_GBP;
    return 0;
  })();

  const basketPoints = useMemo(() => {
    if (!Array.isArray(formData.benefits)) return 0;
    return formData.benefits.reduce((sum, b) => {
      const qty = Number.isFinite(b.quantity) ? b.quantity : 1;
      return sum + getPointsForType(b.type) * qty;
    }, 0);
  }, [formData.benefits]);

  const guidance = useMemo(() => {
    const tips = [];
    if (!pointsPerCustomer) {
      tips.push('Set audience and budget to get tailored suggestions.');
      return tips;
    }
    if (basketPoints === 0) {
      tips.push('Add benefits to start building your package.');
      return tips;
    }
    const diff = pointsPerCustomer - basketPoints;
    if (diff > 0.25) tips.push('You have spare points — consider adding another benefit or increasing quantities.');
    if (diff < -0.25) tips.push('Basket exceeds points — remove a higher point item or reduce quantities.');
    // Mix suggestion
    const typesInBasket = new Set((formData.benefits || []).map(b => b.type));
    if (typesInBasket.size < 2) tips.push('Diversify benefit types to appeal to a broader audience.');
    return tips;
  }, [pointsPerCustomer, basketPoints, formData.benefits]);

  const [selectedOpen, setSelectedOpen] = useState(false);

  return (
    <div className="form-step">

      <div className="benefits-section">

        {/* Tabs hidden for now */}
        {false && (
          <div className="benefits-tabs">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'marketplace' ? 'active' : ''}`}
              onClick={() => setActiveTab('marketplace')}
            >
              Marketplace
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
              onClick={() => setActiveTab('create')}
            >
              Create New
            </button>
          </div>
        )}

        {/* Tab Content - temporarily show marketplace only */}
        {
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
                        <div className="card-type-chip">{item.type}</div>
                        <div className="card-value">{getPointsForType(item.type)} pt</div>
                      </div>
                    </div>
                    <div className="card-sub">
                    </div>
                    <p className="marketplace-desc">{item.description}</p>
                    <div className="card-footer">
                      {!added ? (
                        <button
                          type="button"
                          className="btn primary"
                          onClick={() => addBenefitFromMarketplace(item)}
                        >
                          Select
                        </button>
                      ) : (
                        <div className="quantity-controls">
                          <label style={{ marginRight: 8 }}>Qty/year</label>
                          <input
                            type="number"
                            min="1"
                            value={(formData.benefits.find(b => (b.title||'')===item.title)?.quantity) || 1}
                            onChange={(e) => {
                              const b = formData.benefits.find(b => (b.title||'')===item.title);
                              if (b && updateBenefit) {
                                let qty = parseInt(e.target.value || '1', 10);
                                if (!Number.isFinite(qty) || qty < 1) qty = 1;
                                updateBenefit(b.id, { quantity: qty });
                              }
                            }}
                            className="form-input small enhanced"
                            style={{ width: 90 }}
                          />
                          <button
                            type="button"
                            className="btn secondary"
                            onClick={() => {
                              const b = formData.benefits.find(b => (b.title||'')===item.title);
                              if (b) removeBenefit(b.id);
                            }}
                            style={{ marginLeft: 8 }}
                          >
                            Deselect
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        }
      </div>
    </div>
  );
}

export default RewardOrchestratorFormStep3; 