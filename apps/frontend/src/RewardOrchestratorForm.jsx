import React, { useState, useEffect } from "react";
import "./App.css";
import RewardOrchestratorFormStep1 from "./RewardOrchestratorFormStep1";
import RewardOrchestratorFormStep2 from "./RewardOrchestratorFormStep2";
import RewardOrchestratorFormStep3 from "./RewardOrchestratorFormStep3";
import RewardOrchestratorFormStep4 from "./RewardOrchestratorFormStep4";

function RewardOrchestratorForm({ isOpen, onClose, initialData, onSave, saveButtonText }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    programName: initialData?.programName || "",
    status: initialData?.status || "Draft",
    description: initialData?.description || "",
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    targetPersonas: Array.isArray(initialData?.targetPersonas) ? initialData.targetPersonas : [],
    targetProducts: Array.isArray(initialData?.targetProducts) ? initialData.targetProducts : [],
    tags: Array.isArray(initialData?.tags) ? initialData.tags : [],
    // Restructured for Step 2: rules grouped by category
    eligibilityRules: initialData?.eligibilityRules || {
      customerProfileRules: [],
      bookingHistoryRules: [],
      currentTripContext: [],
      financialProductRules: [],
      activityEngagement: [],
      geographicLocation: [],
      externalDataRules: []
    },
    // Additional fields surfaced in Step 4
    conciergeGuidance: initialData?.conciergeGuidance || "",
    reportingTags: Array.isArray(initialData?.reportingTags) ? initialData.reportingTags : [],
    benefits: Array.isArray(initialData?.benefits) ? initialData.benefits : []
  });

  // Keep form pre-populated when opening for an existing program or import
  useEffect(() => {
    if (!isOpen) return;
    setCurrentStep(1);
    setFormData({
      programName: initialData?.programName || "",
      status: initialData?.status || "Draft",
      description: initialData?.description || "",
      startDate: initialData?.startDate || "",
      endDate: initialData?.endDate || "",
      targetPersonas: Array.isArray(initialData?.targetPersonas) ? initialData.targetPersonas : [],
      targetProducts: Array.isArray(initialData?.targetProducts) ? initialData.targetProducts : [],
      tags: Array.isArray(initialData?.tags) ? initialData.tags : [],
      eligibilityRules: initialData?.eligibilityRules || {
        customerProfileRules: [],
        bookingHistoryRules: [],
        currentTripContext: [],
        financialProductRules: [],
        activityEngagement: [],
        geographicLocation: [],
        externalDataRules: []
      },
      conciergeGuidance: initialData?.conciergeGuidance || "",
      reportingTags: Array.isArray(initialData?.reportingTags) ? initialData.reportingTags : [],
      benefits: Array.isArray(initialData?.benefits) ? initialData.benefits : []
    });
  }, [isOpen, initialData]);

  const [currentBenefit, setCurrentBenefit] = useState({
    name: "",
    description: "",
    type: "",
    value: "",
    redemptionMethod: "",
    maxRedemptions: "",
    supplier: "",
    deliveryLogic: "",
    redemptionWindowStart: "",
    redemptionWindowEnd: "",
    customerUsageLimit: "",
    inventory: "",
    costToBank: "",
    personaEligibilityOverride: "",
    visibleInUI: false,
    title: "",
    productType: "",
    suppliers: [],
    deliveryMethods: []
  });

  const [showBenefitForm, setShowBenefitForm] = useState(false);

  const stepTitles = ["Basic Program Info", "Targeting & Eligibility", "Benefits & Rewards", "Review & Launch"];
  const stepDescriptions = [
    "Set up the basic information for your reward program.",
    "Define who can participate and under what conditions.",
    "Configure the rewards and benefits for your program.",
    "Review all settings and launch your program."
  ];

  const totalSteps = stepTitles.length;

  const personaOptions = [
    "Business Travelers",
    "Leisure Travelers", 
    "Frequent Flyers",
    "Luxury Travelers",
    "Budget Travelers",
    "Family Travelers",
    "Solo Travelers",
    "Group Travelers"
  ];

  const productOptions = [
    "Flights",
    "Hotels", 
    "Car Rentals",
    "Vacation Packages",
    "Travel Insurance",
    "Airport Transfers",
    "Lounge Access",
    "Priority Services"
  ];

  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [tagInputValue, setTagInputValue] = useState("");

  // Define Step 2 rule catalog per category (full MVP list)
  const eligibilityRuleOptions = {
    // 1. Customer Profile Rules
    customerProfileRules: [
      { id: 'membershipTier', label: 'Membership tier', type: 'select', options: ['Silver', 'Gold', 'Platinum', 'Diamond'] },
      { id: 'loyaltyEnrollment', label: 'Loyalty program enrollment status', type: 'select', options: ['Enrolled', 'Not enrolled'] },
      { id: 'personaGroup', label: 'Persona group', type: 'select', options: ['Business Travelers', 'Leisure Travelers', 'Frequent Flyers', 'Luxury Travelers', 'Budget Travelers', 'Family Travelers', 'Solo Travelers', 'Group Travelers'] },
      { id: 'ageGroup', label: 'Age group', type: 'select', options: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'] },
      { id: 'country', label: 'Country of residence / nationality', type: 'text' },
      { id: 'language', label: 'Language preference', type: 'select', options: ['English', 'Spanish', 'French', 'German', 'Arabic', 'Chinese'] },
      { id: 'pastSpend', label: 'Past spend', type: 'number', period: true },
      { id: 'totalBookings', label: 'Total bookings made', type: 'number', period: true },
      { id: 'customerValueScore', label: 'Customer value score', type: 'number' }
    ],

    // 2. Booking History Rules
    bookingHistoryRules: [
      { id: 'historicalBookingTypes', label: 'Booking type(s) purchased before', type: 'select', options: ['flights', 'hotels', 'tickets', 'car rentals', 'packages'] },
      { id: 'bookingFrequency', label: 'Frequency of bookings', type: 'number', period: true },
      { id: 'avgSpendPerBooking', label: 'Average spend per booking', type: 'number' },
      { id: 'destinationsPreviouslyBooked', label: 'Destinations previously booked', type: 'text' },
      { id: 'tripPurposeHistory', label: 'Trip purpose (historical)', type: 'select', options: ['business', 'leisure'] },
      { id: 'preferredSuppliersHistory', label: 'Preferred suppliers previously booked', type: 'select', options: ['BA', 'Emirates', 'Hilton', 'Marriott', 'IHG'] },
      { id: 'daysSinceLastBooking', label: 'Days since last booking', type: 'number' }
    ],

    // 3. Current Trip Context
    currentTripContext: [
      { id: 'currentBookingType', label: 'Booking type in current trip', type: 'select', options: ['flight', 'hotel', 'car', 'package'] },
      { id: 'currentSupplier', label: 'Supplier in current booking', type: 'select', options: ['Emirates', 'BA', 'Qatar', 'Hilton', 'Marriott'] },
      { id: 'currentBookingValue', label: 'Booking value', type: 'number' },
      { id: 'currentDestination', label: 'Destination(s)', type: 'text' },
      { id: 'tripDuration', label: 'Trip duration (days)', type: 'number' },
      { id: 'dateProximity', label: 'Departure/check-in date proximity (days)', type: 'number' },
      { id: 'numTravellers', label: 'Number of travellers in booking', type: 'number' },
      { id: 'cabinOrRoomType', label: 'Cabin/class or room type', type: 'select', options: ['Economy', 'Premium Economy', 'Business', 'First', 'Standard Room', 'Suite'] }
    ],

    // 4. Financial Product Rules
    financialProductRules: [
      { id: 'cardTypeUsed', label: 'Credit/debit card type used', type: 'select', options: ['Visa Platinum', 'Visa Gold', 'Mastercard World Elite', 'Amex Platinum'] },
      { id: 'cardSpendThreshold', label: 'Card spend thresholds reached', type: 'number', period: true },
      { id: 'cardOfferCampaign', label: 'Card offer campaign enrolled', type: 'text' },
      { id: 'linkedAccounts', label: 'Linked accounts present', type: 'select', options: ['yes', 'no'] }
    ],

    // 5. Activity / Engagement Rules
    activityEngagement: [
      { id: 'mobileAppEngagement', label: 'Mobile app engagement (last login within X days)', type: 'number', period: true },
      { id: 'websiteEngagement', label: 'Website engagement', type: 'number', period: true },
      { id: 'campaignInteractions', label: 'Campaign interactions', type: 'select', options: ['clicked previous offers', 'redeemed before', 'opened emails'] },
      { id: 'conciergeInteractions', label: 'Concierge interactions', type: 'select', options: ['yes', 'no'] },
      { id: 'incompleteBookings', label: 'Incomplete bookings / abandoned carts', type: 'select', options: ['yes', 'no'] }
    ],

    // 6. Geographic / Location Rules
    geographicLocation: [
      { id: 'currentLiveLocation', label: 'Current live location', type: 'text' },
      { id: 'departureAirport', label: 'Departure airport', type: 'text' },
      { id: 'homeAirport', label: 'Home airport', type: 'text' },
      { id: 'regionOrCity', label: 'Region or city of residence', type: 'text' },
      { id: 'withinGeoFence', label: 'Within geo-fence of partner location', type: 'select', options: ['yes', 'no'] }
    ],

    // 7. External Data Rules
    externalDataRules: [
      { id: 'crmFlags', label: 'CRM flags', type: 'select', options: ['VIP', 'HNW', 'at-risk customer'] },
      { id: 'apiEligibilityFlag', label: 'API-fed eligibility flag', type: 'select', options: ['eligible=yes', 'eligible=no'] },
      { id: 'corporateContractStatus', label: 'Corporate contract status', type: 'select', options: ['yes', 'no'] }
    ]
  };

  const comparisonOperators = [
    { value: ">", label: "Greater than" },
    { value: "<", label: "Less than" },
    { value: "=", label: "Equals" },
    { value: "contains", label: "Contains" },
    { value: "in list", label: "In list" },
    { value: "not in list", label: "Not in list" },
    { value: "between", label: "Between" }
  ];

  // Time periods as objects for Step 2
  const timePeriods = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '6m', label: 'Last 6 months' },
    { value: '12m', label: 'Last 12 months' },
    { value: 'lifetime', label: 'Lifetime' }
  ];

  const benefitTypes = [
    "Points",
    "Cash Back",
    "Discount",
    "Free Service",
    "Upgrade",
    "Early Access",
    "Exclusive Offer",
    "Gift Card"
  ];

  const redemptionMethods = [
    "Automatic",
    "Manual Approval",
    "Customer Request",
    "Scheduled",
    "Trigger-based"
  ];

  // Load preset benefits catalog
  const benefitsCatalog = [
    { id: 'market-1', title: '2x Lounge Passes', type: 'Lounge Access', supplier: 'DragonPass', description: 'Two complimentary lounge passes for the traveler', value: '2 passes', redemptionMethod: 'Automatic' },
    { id: 'market-2', title: 'Airport Fast Track', type: 'Fast Track', supplier: 'Partner A', description: 'Priority security lane access at select airports', value: '1 pass', redemptionMethod: 'Automatic' },
    { id: 'market-3', title: 'Priority Boarding', type: 'Priority Service', supplier: 'Airline A', description: 'Access to priority boarding lane', value: '1 boarding', redemptionMethod: 'Automatic' },
    { id: 'market-4', title: 'Seat Upgrade', type: 'Upgrade', supplier: 'Airline B', description: 'Complimentary seat upgrade where available', value: '1 upgrade', redemptionMethod: 'Manual Approval' },
    { id: 'market-5', title: 'Hotel Room Upgrade', type: 'Upgrade', supplier: 'Hotel Chain A', description: 'Room upgrade at check-in subject to availability', value: '1 upgrade', redemptionMethod: 'Manual Approval' },
    { id: 'market-6', title: 'Free Checked Bag', type: 'Baggage', supplier: 'Airline C', description: 'One complimentary checked bag', value: '1 bag', redemptionMethod: 'Automatic' },
    { id: 'market-7', title: 'Extra Carry-on', type: 'Baggage', supplier: 'Airline C', description: 'One additional cabin bag allowance', value: '1 item', redemptionMethod: 'Automatic' },
    { id: 'market-8', title: 'Travel Insurance Discount', type: 'Discount', supplier: 'InsureCo', description: '10% off comprehensive travel insurance', value: '10% off', redemptionMethod: 'Customer Request' },
    { id: 'market-9', title: 'Spa Access Voucher', type: 'Wellness', supplier: 'Hotel Chain B', description: 'Spa access day pass', value: '1 pass', redemptionMethod: 'Manual Approval' },
    { id: 'market-10', title: 'Airport Transfer Credit', type: 'Transport', supplier: 'RideCo', description: 'Credit towards airport transfer', value: '$20', redemptionMethod: 'Automatic' },
    { id: 'market-11', title: 'Ride-hailing Credit', type: 'Transport', supplier: 'RideCo', description: 'Credit on partner ride-hailing', value: '$15', redemptionMethod: 'Automatic' },
    { id: 'market-12', title: 'Coffee Voucher', type: 'Food & Beverage', supplier: 'Cafe Partner', description: 'Complimentary coffee at airport cafe', value: '1 drink', redemptionMethod: 'Automatic' },
    { id: 'market-13', title: 'Wi‑Fi Voucher', type: 'Connectivity', supplier: 'Airport Wi‑Fi', description: 'Premium Wi‑Fi access in airport', value: '1 session', redemptionMethod: 'Automatic' },
    { id: 'market-14', title: 'Duty‑free Discount', type: 'Discount', supplier: 'Duty‑free', description: '10% off duty‑free purchases', value: '10% off', redemptionMethod: 'Automatic' },
    { id: 'market-15', title: 'Lounge Guest Pass +1', type: 'Lounge Access', supplier: 'DragonPass', description: 'Guest pass for lounge access', value: '+1 guest', redemptionMethod: 'Automatic' },
    { id: 'market-16', title: 'Meal Voucher', type: 'Food & Beverage', supplier: 'Food Partner', description: 'Airport meal voucher', value: '$10', redemptionMethod: 'Automatic' },
    { id: 'market-17', title: 'eSIM Data Pack', type: 'Connectivity', supplier: 'eSIM Partner', description: 'International data pack', value: '5GB', redemptionMethod: 'Automatic' },
    { id: 'market-18', title: 'Taxi Voucher', type: 'Transport', supplier: 'Taxi Partner', description: 'Voucher for taxi from airport', value: '$25', redemptionMethod: 'Automatic' },
    { id: 'market-19', title: 'Late Checkout', type: 'Hotel', supplier: 'Hotel Chain B', description: 'Late checkout benefit where available', value: '2 hours', redemptionMethod: 'Manual Approval' },
    { id: 'market-20', title: 'Early Check‑in', type: 'Hotel', supplier: 'Hotel Chain B', description: 'Early check‑in where available', value: '2 hours', redemptionMethod: 'Manual Approval' },
    { id: 'market-21', title: 'Golf Green Fee Discount', type: 'Leisure', supplier: 'Golf Partner', description: 'Discount on golf green fees', value: '15% off', redemptionMethod: 'Customer Request' },
    { id: 'market-22', title: 'Concierge Access', type: 'Service', supplier: 'ConciergeCo', description: 'Priority concierge assistance', value: 'Priority', redemptionMethod: 'Automatic' },
    { id: 'market-23', title: 'Cashback on Travel', type: 'Cash Back', supplier: 'Bank', description: 'Cashback on eligible travel purchases', value: '2%', redemptionMethod: 'Automatic' },
    { id: 'market-24', title: 'Bonus Points', type: 'Points', supplier: 'Bank', description: 'Bonus loyalty points on booking', value: '1,000 pts', redemptionMethod: 'Automatic' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Field-based setter used by Step 2
  const setFormField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBenefitInputChange = (field, value) => {
    setCurrentBenefit(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = (tag) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setTagInputValue("");
      setShowTagSuggestions(false);
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addEligibilityRule = (category, defaultRule) => {
    const newRule = {
      id: Date.now().toString(),
      type: defaultRule || eligibilityRuleOptions[category][0],
      operator: comparisonOperators[0].value,
      value: '',
      secondValue: '',
      period: ''
    };
    setFormData(prev => ({
      ...prev,
      eligibilityRules: {
        ...prev.eligibilityRules,
        [category]: [...prev.eligibilityRules[category], newRule]
      }
    }));
  };

  const updateEligibilityRule = (category, ruleId, field, value) => {
    setFormData(prev => ({
      ...prev,
      eligibilityRules: {
        ...prev.eligibilityRules,
        [category]: prev.eligibilityRules[category].map(r =>
          r.id === ruleId ? { ...r, [field]: value } : r
        )
      }
    }));
  };

  const removeEligibilityRule = (category, ruleId) => {
    setFormData(prev => ({
      ...prev,
      eligibilityRules: {
        ...prev.eligibilityRules,
        [category]: prev.eligibilityRules[category].filter(r => r.id !== ruleId)
      }
    }));
  };

  const getRuleTypeById = (category, id) => {
    return eligibilityRuleOptions[category]?.find(r => r.id === id) || null;
  };

  const addBenefit = (keepFormOpen = false) => {
    const normalizedName = currentBenefit.name || currentBenefit.title || "";
    const hasType = Boolean(currentBenefit.type);
    const hasProductType = Boolean(currentBenefit.productType);

    if (normalizedName && hasType && hasProductType) {
      const benefitToAdd = {
        id: Date.now(),
        name: currentBenefit.name || currentBenefit.title || normalizedName,
        title: currentBenefit.title || currentBenefit.name || normalizedName,
        description: currentBenefit.description || currentBenefit.deliveryLogic || "",
        type: currentBenefit.type,
        supplier: currentBenefit.supplier || "",
        suppliers: Array.isArray(currentBenefit.suppliers) ? currentBenefit.suppliers : [],
        productType: currentBenefit.productType,
        redemptionMethod: currentBenefit.redemptionMethod || "",
        maxRedemptions: currentBenefit.maxRedemptions || currentBenefit.customerUsageLimit || "",
        value: currentBenefit.value || "",
        deliveryLogic: (Array.isArray(currentBenefit.deliveryMethods) && currentBenefit.deliveryMethods[0]) || currentBenefit.deliveryLogic || "",
        deliveryMethods: Array.isArray(currentBenefit.deliveryMethods) ? currentBenefit.deliveryMethods : [],
        redemptionWindowStart: currentBenefit.redemptionWindowStart || "",
        redemptionWindowEnd: currentBenefit.redemptionWindowEnd || "",
        customerUsageLimit: currentBenefit.customerUsageLimit || "",
        inventory: currentBenefit.inventory || "",
        costToBank: currentBenefit.costToBank || "",
        personaEligibilityOverride: currentBenefit.personaEligibilityOverride || "",
        visibleInUI: Boolean(currentBenefit.visibleInUI)
      };

      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, benefitToAdd]
      }));

      setCurrentBenefit({
        name: "",
        description: "",
        type: "",
        value: "",
        redemptionMethod: "",
        maxRedemptions: "",
        supplier: "",
        deliveryLogic: "",
        redemptionWindowStart: "",
        redemptionWindowEnd: "",
        customerUsageLimit: "",
        inventory: "",
        costToBank: "",
        personaEligibilityOverride: "",
        visibleInUI: false,
        title: "",
        productType: "",
        suppliers: [],
        deliveryMethods: []
      });

      if (!keepFormOpen) {
        setShowBenefitForm(false);
      }
    }
  };

  const addBenefitFromMarketplace = (preset) => {
    const benefitToAdd = {
      id: Date.now(),
      title: preset.title,
      name: preset.title,
      description: preset.description || "",
      type: preset.type || "",
      supplier: preset.supplier || "",
      redemptionMethod: preset.redemptionMethod || "",
      value: preset.value || "",
      maxRedemptions: preset.maxRedemptions || "",
      visibleInUI: true
    };
    setFormData(prev => ({ ...prev, benefits: [...prev.benefits, benefitToAdd] }));
  };

  const removeBenefit = (benefitId) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter(benefit => benefit.id !== benefitId)
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    if (typeof onSave === 'function') {
      onSave(formData);
    }
    onClose();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <RewardOrchestratorFormStep1
            formData={formData}
            handleInputChange={handleInputChange}
            showTagSuggestions={showTagSuggestions}
            setShowTagSuggestions={setShowTagSuggestions}
            tagInputValue={tagInputValue}
            setTagInputValue={setTagInputValue}
          />
        );
      case 2:
        return (
          <RewardOrchestratorFormStep2
            formData={formData}
            handleInputChange={setFormField}
            addEligibilityRule={addEligibilityRule}
            updateEligibilityRule={updateEligibilityRule}
            removeEligibilityRule={removeEligibilityRule}
            getRuleTypeById={getRuleTypeById}
            eligibilityRuleOptions={eligibilityRuleOptions}
            comparisonOperators={comparisonOperators}
            timePeriods={timePeriods}
            targetPersonas={formData.targetPersonas}
            targetProducts={formData.targetProducts}
          />
        );
      case 3:
        return (
          <RewardOrchestratorFormStep3
            formData={formData}
            handleInputChange={handleInputChange}
            handleBenefitInputChange={handleBenefitInputChange}
            addBenefit={addBenefit}
            removeBenefit={removeBenefit}
            currentBenefit={currentBenefit}
            setCurrentBenefit={setCurrentBenefit}
            showBenefitForm={showBenefitForm}
            setShowBenefitForm={setShowBenefitForm}
            benefitTypes={benefitTypes}
            redemptionMethods={redemptionMethods}
            benefitsCatalog={benefitsCatalog}
            addBenefitFromMarketplace={addBenefitFromMarketplace}
          />
        );
      case 4:
        return (
          <RewardOrchestratorFormStep4
            formData={formData}
            personaOptions={personaOptions}
            productOptions={productOptions}
            eligibilityRuleOptions={eligibilityRuleOptions}
            comparisonOperators={comparisonOperators}
            timePeriods={timePeriods}
            getRuleTypeById={getRuleTypeById}
          />
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="reward-form-page">
      <div className="form-header">
        <div className="header-content">
          <h1>Create Reward Program</h1>
          <p>Set up a new reward program for your customers</p>
        </div>
        <div className="header-actions">
          <button className="btn secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
      
      <div className="form-progress">
        {stepTitles.map((title, index) => (
          <div
            key={index}
            className={`progress-step ${currentStep > index + 1 ? 'completed' : currentStep === index + 1 ? 'active' : ''}`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-info">
              <div className="step-title">{title}</div>
              <div className="step-description">{stepDescriptions[index]}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="form-content">
        {renderCurrentStep()}
      </div>
      
      <div className="form-footer">
        <div className="footer-left">
          {currentStep > 1 && (
            <button className="btn secondary" onClick={prevStep}>
              Previous
            </button>
          )}
        </div>
        <div className="footer-right">
          {currentStep < totalSteps ? (
            <button className="btn primary" onClick={nextStep}>
              Next
            </button>
          ) : (
            <button className="btn primary" onClick={handleSave}>
              {saveButtonText || 'Save Draft'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RewardOrchestratorForm; 