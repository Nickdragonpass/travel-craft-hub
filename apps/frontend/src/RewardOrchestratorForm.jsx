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
    targetContinents: Array.isArray(initialData?.targetContinents) ? initialData.targetContinents : [],
    targetCountries: Array.isArray(initialData?.targetCountries) ? initialData.targetCountries : [],
    targetRegionsCities: Array.isArray(initialData?.targetRegionsCities) ? initialData.targetRegionsCities : [],
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
    , allocationEntitlements: Number.isFinite(initialData?.allocationEntitlements) ? initialData.allocationEntitlements : ''
    , allocationBudget: Number.isFinite(initialData?.allocationBudget) ? initialData.allocationBudget : ''
    , pointsPerBenefitType: initialData?.pointsPerBenefitType || {
      'Lounge Access': 1,
      'Fast Track': 1,
      'Priority Service': 0.6,
      'Upgrade': 3.5,
      'Baggage': 0.8,
      'Discount': 0.3,
      'Wellness': 1.7,
      'Transport': 0.7,
      'Food & Beverage': 0.25,
      'Connectivity': 0.5,
      'Leisure': 0.5,
      'Service': 1,
      'Cash Back': 0.7,
      'Points': 0.5
    }
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
      targetContinents: Array.isArray(initialData?.targetContinents) ? initialData.targetContinents : [],
      targetCountries: Array.isArray(initialData?.targetCountries) ? initialData.targetCountries : [],
      targetRegionsCities: Array.isArray(initialData?.targetRegionsCities) ? initialData.targetRegionsCities : [],
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
      , allocationEntitlements: Number.isFinite(initialData?.allocationEntitlements) ? initialData.allocationEntitlements : ''
      , allocationBudget: Number.isFinite(initialData?.allocationBudget) ? initialData.allocationBudget : ''
      , pointsPerBenefitType: initialData?.pointsPerBenefitType || {
        'Lounge Access': 1,
        'Fast Track': 1,
        'Priority Service': 0.6,
        'Upgrade': 3.5,
        'Baggage': 0.8,
        'Discount': 0.3,
        'Wellness': 1.7,
        'Transport': 0.7,
        'Food & Beverage': 0.25,
        'Connectivity': 0.5,
        'Leisure': 0.5,
        'Service': 1,
        'Cash Back': 0.7,
        'Points': 0.5
      }
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

  // Load preset benefits catalog with pricing
  const benefitsCatalog = [
    { id: 'market-1', title: 'Lounge Pass', type: 'Lounge Access', supplier: 'DragonPass', description: 'Complimentary lounge pass for the traveler', value: '1 pass', redemptionMethod: 'Automatic', costToBank: 30 },
    { id: 'market-2', title: 'Airport Fast Track', type: 'Fast Track', supplier: 'Partner A', description: 'Priority security lane access at select airports', value: '1 pass', redemptionMethod: 'Automatic', costToBank: 25 },
    { id: 'market-3', title: 'Priority Boarding', type: 'Priority Service', supplier: 'Airline A', description: 'Access to priority boarding lane', value: '1 boarding', redemptionMethod: 'Automatic', costToBank: 15 },
    { id: 'market-4', title: 'Seat Upgrade', type: 'Upgrade', supplier: 'Airline B', description: 'Complimentary seat upgrade where available', value: '1 upgrade', redemptionMethod: 'Manual Approval', costToBank: 120 },
    { id: 'market-5', title: 'Hotel Room Upgrade', type: 'Upgrade', supplier: 'Hotel Chain A', description: 'Room upgrade at check-in subject to availability', value: '1 upgrade', redemptionMethod: 'Manual Approval', costToBank: 85 },
    { id: 'market-6', title: 'Free Checked Bag', type: 'Baggage', supplier: 'Airline C', description: 'One complimentary checked bag', value: '1 bag', redemptionMethod: 'Automatic', costToBank: 35 },
    { id: 'market-7', title: 'Extra Carry-on', type: 'Baggage', supplier: 'Airline C', description: 'One additional cabin bag allowance', value: '1 item', redemptionMethod: 'Automatic', costToBank: 20 },
    { id: 'market-8', title: 'Travel Insurance Discount', type: 'Discount', supplier: 'InsureCo', description: '10% off comprehensive travel insurance', value: '10% off', redemptionMethod: 'Customer Request', costToBank: 8 },
    { id: 'market-9', title: 'Spa Access Voucher', type: 'Wellness', supplier: 'Hotel Chain B', description: 'Spa access day pass', value: '1 pass', redemptionMethod: 'Manual Approval', costToBank: 65 },
    { id: 'market-10', title: 'Airport Transfer Credit', type: 'Transport', supplier: 'RideCo', description: 'Credit towards airport transfer', value: '$20', redemptionMethod: 'Automatic', costToBank: 20 },
    { id: 'market-11', title: 'Ride-hailing Credit', type: 'Transport', supplier: 'RideCo', description: 'Credit on partner ride-hailing', value: '$15', redemptionMethod: 'Automatic', costToBank: 15 },
    { id: 'market-12', title: 'Coffee Voucher', type: 'Food & Beverage', supplier: 'Cafe Partner', description: 'Complimentary coffee at airport cafe', value: '1 drink', redemptionMethod: 'Automatic', costToBank: 6 },
    { id: 'market-13', title: 'Wi‑Fi Voucher', type: 'Connectivity', supplier: 'Airport Wi‑Fi', description: 'Premium Wi‑Fi access in airport', value: '1 session', redemptionMethod: 'Automatic', costToBank: 12 },
    { id: 'market-14', title: 'Duty‑free Discount', type: 'Discount', supplier: 'Duty‑free', description: '10% off duty‑free purchases', value: '10% off', redemptionMethod: 'Automatic', costToBank: 5 },
    { id: 'market-15', title: 'Lounge Guest Pass +1', type: 'Lounge Access', supplier: 'DragonPass', description: 'Guest pass for lounge access', value: '+1 guest', redemptionMethod: 'Automatic', costToBank: 25 },
    { id: 'market-16', title: 'Meal Voucher', type: 'Food & Beverage', supplier: 'Food Partner', description: 'Airport meal voucher', value: '$10', redemptionMethod: 'Automatic', costToBank: 10 },
    { id: 'market-17', title: 'eSIM Data Pack', type: 'Connectivity', supplier: 'eSIM Partner', description: 'International data pack', value: '5GB', redemptionMethod: 'Automatic', costToBank: 18 },
    { id: 'market-18', title: 'Taxi Voucher', type: 'Transport', supplier: 'Taxi Partner', description: 'Voucher for taxi from airport', value: '$25', redemptionMethod: 'Automatic', costToBank: 25 },
    { id: 'market-19', title: 'Late Checkout', type: 'Hotel', supplier: 'Hotel Chain B', description: 'Late checkout benefit where available', value: '2 hours', redemptionMethod: 'Manual Approval', costToBank: 15 },
    { id: 'market-20', title: 'Early Check‑in', type: 'Hotel', supplier: 'Hotel Chain B', description: 'Early check‑in where available', value: '2 hours', redemptionMethod: 'Manual Approval', costToBank: 15 },
    { id: 'market-21', title: 'Golf Green Fee Discount', type: 'Leisure', supplier: 'Golf Partner', description: 'Discount on golf green fees', value: '15% off', redemptionMethod: 'Customer Request', costToBank: 12 },
    { id: 'market-22', title: 'Concierge Access', type: 'Service', supplier: 'ConciergeCo', description: 'Priority concierge assistance', value: 'Priority', redemptionMethod: 'Automatic', costToBank: 30 },
    { id: 'market-23', title: 'Cashback on Travel', type: 'Cash Back', supplier: 'Bank', description: 'Cashback on eligible travel purchases', value: '2%', redemptionMethod: 'Automatic', costToBank: 22 },
    { id: 'market-24', title: 'Bonus Points', type: 'Points', supplier: 'Bank', description: 'Bonus loyalty points on booking', value: '1,000 pts', redemptionMethod: 'Automatic', costToBank: 18 }
  ];

  // Cost analysis and bundling suggestions
  const calculateTotalCost = () => {
    return formData.benefits.reduce((total, benefit) => {
      // Use costToBank if available, otherwise estimate based on type
      let unitCost = benefit.costToBank;
      if (!unitCost) {
        unitCost = estimateBenefitCost(benefit);
      }
      const quantity = Number.isFinite(benefit.quantity) ? benefit.quantity : 1;
      return total + unitCost * quantity;
    }, 0);
  };

  // Points model helpers
  const POINT_VALUE_GBP = 30; // 1 point ~= £30
  const getPointsPerCustomer = () => {
    const budget = parseFloat(formData.allocationBudget || 0);
    const entitlements = parseFloat(formData.allocationEntitlements || 0);
    if (budget > 0 && entitlements > 0) {
      const budgetPerCustomer = budget / entitlements;
      return budgetPerCustomer / POINT_VALUE_GBP;
    }
    return 0;
  };

  const getBasketPointsPerCustomer = () => {
    if (!Array.isArray(formData.benefits) || formData.benefits.length === 0) return 0;
    return formData.benefits.reduce((sum, b) => {
      const pts = formData.pointsPerBenefitType?.[b.type] ?? 1;
      const qty = Number.isFinite(b.quantity) ? b.quantity : 1;
      return sum + ((Number.isFinite(pts) ? pts : 1) * qty);
    }, 0);
  };

  const getEstimatedCoverage = () => {
    const entitlements = parseFloat(formData.allocationEntitlements || 0);
    const budget = parseFloat(formData.allocationBudget || 0);
    const basketPts = getBasketPointsPerCustomer();
    if (basketPts <= 0) return { people: 0, reason: 'no_basket' };
    if (budget > 0) {
      const totalPoints = budget / POINT_VALUE_GBP;
      const maxPeopleByBudget = Math.floor(totalPoints / basketPts);
      if (entitlements > 0) {
        return { people: Math.min(maxPeopleByBudget, entitlements), reason: 'budget_and_entitlements' };
      }
      return { people: maxPeopleByBudget, reason: 'budget_only' };
    }
    if (entitlements > 0) {
      // Points per customer determined only by basket; coverage limited by entitlements
      return { people: entitlements, reason: 'entitlements_only' };
    }
    return { people: 0, reason: 'insufficient_inputs' };
  };

  const estimateBenefitCost = (benefit) => {
    // Derive cost from points policy first (1 pt = £30)
    const pts = formData?.pointsPerBenefitType?.[benefit.type];
    if (Number.isFinite(pts)) {
      return Math.round(pts * POINT_VALUE_GBP);
    }
    // Fallback estimates aligned to £30/pt
    const typeCosts = {
      'Lounge Access': 30,
      'Fast Track': 30,
      'Priority Service': 18,
      'Upgrade': 105,
      'Baggage': 24,
      'Discount': 9,
      'Wellness': 51,
      'Transport': 21,
      'Food & Beverage': 8,
      'Connectivity': 15,
      'Leisure': 15,
      'Service': 30,
      'Cash Back': 21,
      'Points': 15
    };
    return typeCosts[benefit.type] || 20;
  };

  const getBundlingSuggestions = () => {
    const totalCost = calculateTotalCost();
    const benefitCount = formData.benefits.length;
    
    let suggestions = [];
    
    if (totalCost > 200) {
      suggestions.push({
        type: 'warning',
        message: 'Bundle cost is high. Consider removing premium benefits or negotiating supplier rates.',
        action: 'Review and optimize'
      });
    } else if (totalCost > 150) {
      suggestions.push({
        type: 'info',
        message: 'Bundle is in premium range. Good value for high-tier customers.',
        action: 'Consider tiered pricing'
      });
    } else if (totalCost > 100) {
      suggestions.push({
        type: 'success',
        message: 'Bundle cost is well-balanced. Good mix of value and affordability.',
        action: 'Ready for launch'
      });
    } else if (totalCost > 50) {
      suggestions.push({
        type: 'info',
        message: 'Bundle is cost-effective. Consider adding one premium benefit for differentiation.',
        action: 'Add premium benefit'
      });
    } else {
      suggestions.push({
        type: 'warning',
        message: 'Bundle cost is very low. May not provide enough perceived value.',
        action: 'Add more benefits'
      });
    }

    // Specific suggestions based on benefit mix
    if (benefitCount < 3) {
      suggestions.push({
        type: 'info',
        message: 'Bundle has few benefits. Consider adding 2-3 more for better customer appeal.',
        action: 'Expand benefit selection'
      });
    } else if (benefitCount > 8) {
      suggestions.push({
        type: 'warning',
        message: 'Bundle has many benefits. Consider grouping into tiers for easier management.',
        action: 'Create benefit tiers'
      });
    }

    // Check for benefit type diversity
    const benefitTypes = [...new Set(formData.benefits.map(b => b.type))];
    if (benefitTypes.length < 3) {
      suggestions.push({
        type: 'info',
        message: 'Limited benefit variety. Mix different categories for broader appeal.',
        action: 'Diversify benefit types'
      });
    }

    return suggestions;
  };

  // Removed getCostPerCustomer since this is B2B2C - only show cost to clients

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
        costToBank: currentBenefit.costToBank || estimateBenefitCost({ type: currentBenefit.type }),
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
      visibleInUI: true,
      costToBank: estimateBenefitCost({ type: preset.type }),
      quantity: 1
    };
    setFormData(prev => ({ ...prev, benefits: [...prev.benefits, benefitToAdd] }));
  };

  const updateBenefit = (benefitId, updates) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.map(b => b.id === benefitId ? { ...b, ...updates } : b)
    }));
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
            updateBenefit={updateBenefit}
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

  // Cost analysis component - footer version, ultra-compact design
  const CostAnalysis = () => {
    const totalCost = calculateTotalCost();
    const benefitCount = formData.benefits.length;
    const suggestions = getBundlingSuggestions();
    const pointsPerCustomer = getPointsPerCustomer();
    const basketPoints = getBasketPointsPerCustomer();
    const coverage = getEstimatedCoverage();
    const budget = parseFloat(formData.allocationBudget || 0);
    const entitlements = parseFloat(formData.allocationEntitlements || 0);
    const budgetPerCustomer = budget > 0 && entitlements > 0 ? budget / entitlements : 0;
    const totalActual = entitlements > 0 ? Math.round(totalCost * entitlements) : 0;
    
    return (
      <div className="cost-analysis compact">
        <div className="cost-summary">
          <div className="cost-metrics-inline">
            <div className="cost-metric-inline">
              <span className="metric-label-inline">Cost/Customer (Planned/Actual):</span>
              <span className="metric-value-inline">
                {budgetPerCustomer ? `£${Math.round(budgetPerCustomer)}` : '—'}/£{Math.round(totalCost)}
              </span>
            </div>
            
            <div className="cost-metric-inline">
              <span className="metric-label-inline">Benefits:</span>
              <span className="metric-value-inline">{benefitCount}</span>
            </div>
            <div className="cost-metric-inline">
              <span className="metric-label-inline">Points/Customer:</span>
              <span className="metric-value-inline">{pointsPerCustomer ? pointsPerCustomer.toFixed(2) : '—'}</span>
            </div>
            <div className="cost-metric-inline">
              <span className="metric-label-inline">Basket Points:</span>
              <span className="metric-value-inline">{basketPoints ? basketPoints.toFixed(2) : '—'}</span>
            </div>
            
            <div className="cost-metric-inline">
              <div className="info-tooltip">
                <span className="tooltip-icon">ℹ️</span>
                <div className="tooltip-content">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className={`tooltip-suggestion ${suggestion.type}`}>
                      <div className="tooltip-icon-small">
                        {suggestion.type === 'warning' && '⚠️'}
                        {suggestion.type === 'info' && 'ℹ️'}
                        {suggestion.type === 'success' && '✅'}
                      </div>
                      <span>{suggestion.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
        <div className="footer-center">
          {currentStep === 3 && <CostAnalysis />}
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