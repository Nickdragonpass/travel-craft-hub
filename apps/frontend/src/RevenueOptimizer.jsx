import React, { useState, useEffect, Suspense } from 'react';
import revenueFunctionService from './firebase/revenueFunctionService.js';
import './App.css';
import RevenueOptimizerBuild from './RevenueOptimizerBuild';
import RevenueOptimizerComms from './RevenueOptimizerComms';
import RevenueOptimizerPerformance from './RevenueOptimizerPerformance';
import RevenueOptimizerCustomBuildNew from './RevenueOptimizerCustomBuildNew';

function RevenueOptimizer() {
  console.log('RevenueOptimizer component rendering...');
  
  // Simplified state - remove Firebase for now
  const [activeTab, setActiveTab] = useState('build');
  const [buildSubTab, setBuildSubTab] = useState('templates');
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [showFunctionBuilder, setShowFunctionBuilder] = useState(false);
  const [showCommsBuilder, setShowCommsBuilder] = useState(false);
  const [templateSearch, setTemplateSearch] = useState('');
  const [templateFilter, setTemplateFilter] = useState('all');
  const [templateProductFilter, setTemplateProductFilter] = useState('all');
  const [templatePopularityFilter, setTemplatePopularityFilter] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplateForEdit, setSelectedTemplateForEdit] = useState(null);
  const [showCustomBuildModal, setShowCustomBuildModal] = useState(false);
  const [templateForCustomBuild, setTemplateForCustomBuild] = useState(null);

  // Use fallback data only for now
  const [revenueFunctions, setRevenueFunctions] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load data from Firebase on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        console.log('Loading data from Firebase...');
        
        // Load revenue functions
        const functions = await revenueFunctionService.getAllRevenueFunctions();
        console.log('Loaded revenue functions:', functions);
        setRevenueFunctions(functions);
        
        // Load templates
        const allTemplates = await revenueFunctionService.getAllTemplates();
        console.log('Loaded templates:', allTemplates);
        setTemplates(allTemplates);
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading data from Firebase:', err);
        setError(err.message);
        setLoading(false);
        // Don't let Firebase errors crash the component
        console.log('Using fallback data due to Firebase error');
      }
    };

    loadData();
  }, []);

  // Fallback data structure for when Firebase is not available
  const fallbackRevenueFunctions = [
    {
      id: 'func-1',
      name: 'Flight to Hotel Cross-Sell',
      description: 'Automatically suggest hotel bookings when customers book flights',
      category: 'Cross-Sell',
      bookingTypes: ['Flight'],
      targetTypes: ['Hotel'],
      timing: '3 days after flight booking',
      status: 'Active',
      performance: {
        impressions: 12470,
        clicks: 3120,
        conversions: 890,
        revenue: '£267,000',
        conversionRate: '7.1%'
      },
      comms: [
        { id: 'comm-1', name: 'Post-Booking Email Campaign', status: 'Active', performance: { opens: '23%', clicks: '8.2%', impressions: 8900, deliveries: '98%' } },
        { id: 'comm-2', name: 'In-App Hotel Suggestions', status: 'Active', performance: { impressions: 3570, clicks: '12.4%', conversions: 445 } },
        { id: 'comm-3', name: 'SMS Hotel Reminder', status: 'Active', performance: { deliveries: '96%', clicks: '15.1%', opens: '18%' } }
      ]
    },
    {
      id: 'func-2',
      name: 'Airport Services Bundle',
      description: 'Offer fast track, lounge access, and transfers as a package',
      category: 'Bundle',
      bookingTypes: ['Flight'],
      targetTypes: ['Fast Track', 'Airport Lounge', 'Airport Transfer'],
      timing: '24 hours before departure',
      status: 'Active',
      performance: {
        impressions: 8920,
        clicks: 2670,
        conversions: 580,
        revenue: '£69,600',
        conversionRate: '6.5%'
      },
      comms: [
        { id: 'comm-4', name: 'Pre-Departure SMS Bundle', status: 'Active', performance: { deliveries: '98%', clicks: '15.1%', opens: '22%' } },
        { id: 'comm-5', name: 'Website Bundle Banner', status: 'Active', performance: { impressions: 4450, clicks: '3.2%', conversions: 142 } },
        { id: 'comm-6', name: 'Push Notification Bundle', status: 'Active', performance: { impressions: 2230, clicks: '8.7%', opens: '31%' } }
      ]
    },
    {
      id: 'func-3',
      name: 'Premium Upgrade Path',
      description: 'Suggest premium services to high-value customers',
      category: 'Upsell',
      bookingTypes: ['Flight', 'Hotel'],
      targetTypes: ['Airport Lounge', 'Fast Track', 'eSIM'],
      timing: 'Immediate after booking',
      status: 'Active',
      performance: {
        impressions: 5670,
        clicks: 1700,
        conversions: 340,
        revenue: '£51,000',
        conversionRate: '6.0%'
      },
      comms: [
        { id: 'comm-7', name: 'Premium Services Email', status: 'Active', performance: { opens: '28%', clicks: '9.8%', impressions: 3400, deliveries: '99%' } },
        { id: 'comm-8', name: 'In-App Premium Offers', status: 'Active', performance: { impressions: 2270, clicks: '11.2%', conversions: 254 } }
      ]
    },
    {
      id: 'func-4',
      name: 'Pre-Departure Seat Upgrade',
      description: '3 days before flight departure, offer seat bookability with discount',
      category: 'Upsell',
      bookingTypes: ['Flight'],
      targetTypes: ['Seat Upgrade'],
      timing: '3 days before departure',
      status: 'Active',
      performance: {
        impressions: 18900,
        clicks: 5670,
        conversions: 945,
        revenue: '£141,750',
        conversionRate: '5.0%'
      },
      comms: [
        { 
          id: 'comm-9', 
          name: 'South America Email Campaign (Spanish)', 
          status: 'Active', 
          performance: { 
            opens: '31%', 
            clicks: '12.4%', 
            impressions: 6300, 
            deliveries: '97%',
            conversions: 378,
            revenue: '£56,700'
          } 
        },
        { 
          id: 'comm-10', 
          name: 'South America Email Campaign (Portuguese)', 
          status: 'Active', 
          performance: { 
            opens: '29%', 
            clicks: '11.8%', 
            impressions: 4200, 
            deliveries: '96%',
            conversions: 252,
            revenue: '£37,800'
          } 
        },
        { 
          id: 'comm-11', 
          name: 'Digital Concierge Seat Offer (A/B Test A)', 
          status: 'Active', 
          performance: { 
            impressions: 4200, 
            clicks: '18.2%', 
            opens: '45%',
            conversions: 189,
            revenue: '£28,350'
          } 
        },
        { 
          id: 'comm-12', 
          name: 'Digital Concierge Seat Offer (A/B Test B)', 
          status: 'Active', 
          performance: { 
            impressions: 4200, 
            clicks: '16.8%', 
            opens: '42%',
            conversions: 126,
            revenue: '£18,900'
          } 
        }
      ]
    }
  ];

  // Fallback template library (when Firebase is not available)
  const fallbackTemplateLibrary = [
    {
      id: 'template-1',
      title: 'Post-Flight Hotel Cross-Sell',
      description: '3 days after flight booking, offer hotel options for the destination',
      type: 'Cross-Sell',
      status: 'Active',
      trigger: 'Flight Booking',
      timing: '3 days after booking',
      offerSelection: ['Hotel'],
      performance: {
        revenue: '£15,230',
        conversionRate: '8.2%',
        comms: 2
      }
    },
    {
      id: 'template-2',
      title: 'Pre-Departure Seat Upgrade',
      description: '3 days before flight departure, offer seat bookability with discount',
      type: 'Upsell',
      status: 'Active',
      trigger: 'Flight Departure',
      timing: '3 days before departure',
      offerSelection: ['Seat Upgrade'],
      performance: {
        revenue: '£8,450',
        conversionRate: '12.1%',
        comms: 1
      }
    },
    {
      id: 'template-3',
      title: 'Day-of Lounge Access',
      description: 'Day of flight, offer lounge access if NOT in premium cabins',
      type: 'Upsell',
      status: 'Not Active',
      trigger: 'Flight Day',
      timing: 'Day of departure',
      offerSelection: ['Airport Lounge'],
      conditions: 'Not in premium cabins'
    },
    {
      id: 'template-4',
      title: 'Pre-Departure eSIM Package',
      description: '24hrs before flight departure, send offer for eSIM package',
      type: 'Cross-Sell',
      status: 'Not Active',
      trigger: 'Flight Departure',
      timing: '24 hours before departure',
      offerSelection: ['eSIM']
    },
    {
      id: 'template-5',
      title: 'Pre-Departure Airport Transfer',
      description: '24hrs before flight departure, send offer for airport transfer',
      type: 'Cross-Sell',
      status: 'Not Active',
      trigger: 'Flight Departure',
      timing: '24 hours before departure',
      offerSelection: ['Airport Transfer']
    },
    {
      id: 'template-6',
      title: 'Post-Hotel Check-in Activities',
      description: 'Immediately after hotel check in time, offer ticket around the area of hotel',
      type: 'Cross-Sell',
      status: 'Not Active',
      trigger: 'Hotel Check-in',
      timing: 'Immediately after check-in',
      offerSelection: ['Event Ticket']
    },
    {
      id: 'template-7',
      title: 'VIP Hotel Spa Treatment',
      description: 'For VIP client, IF hotel is booked, offer spa treatment at hotel or nearby location',
      type: 'Upsell',
      status: 'Not Active',
      trigger: 'Hotel Booking',
      timing: 'After hotel booking',
      offerSelection: ['Spa Treatment'],
      conditions: 'VIP clients only'
    },
    {
      id: 'template-8',
      title: 'Weekend Hotel Event Bundle',
      description: 'IF hotel booking includes weekend stay, offer ticket event over the weekend, within the area',
      type: 'Cross-Sell',
      status: 'Not Active',
      trigger: 'Hotel Booking',
      timing: 'After hotel booking',
      offerSelection: ['Event Ticket'],
      conditions: 'Weekend stays only'
    }
  ];

  // Mock data for templates
  const functionTemplates = [
    {
      id: 'template-1',
      name: 'Flight to Hotel Cross-Sell',
      description: 'Automatically suggest hotel bookings when customers book flights',
      category: 'Cross-Sell',
      complexity: 'Beginner',
      successRate: '78%',
      avgRevenue: '£450'
    },
    {
      id: 'template-2',
      name: 'Airport Services Bundle',
      description: 'Offer fast track, lounge access, and transfers as a package',
      category: 'Bundle',
      complexity: 'Beginner',
      successRate: '65%',
      avgRevenue: '£120'
    },
    {
      id: 'template-3',
      name: 'Premium Upgrade Path',
      description: 'Suggest premium services to high-value customers',
      category: 'Upsell',
      complexity: 'Intermediate',
      successRate: '82%',
      avgRevenue: '£280'
    }
  ];

  const commsTemplates = [
    {
      id: 'comm-template-1',
      name: 'Email Sequence',
      description: '3-part email sequence for cross-sell opportunities',
      type: 'Email',
      avgOpenRate: '24%',
      avgClickRate: '8.5%'
    },
    {
      id: 'comm-template-2',
      name: 'SMS Bundle Offer',
      description: 'Time-sensitive SMS for airport services',
      type: 'SMS',
      avgDeliveryRate: '98%',
      avgClickRate: '15.2%'
    },
    {
      id: 'comm-template-3',
      name: 'In-App Notification',
      description: 'Contextual push notification during booking',
      type: 'Push',
      avgImpressionRate: '95%',
      avgClickRate: '12.8%'
    }
  ];

  // Transform Firebase data to expected format
  const transformRevenueFunctions = (firebaseFunctions) => {
    return firebaseFunctions.map(func => {
      try {
        console.log('Transforming function:', func);
        
        // Handle both custom build format and legacy format
        const isCustomBuildFormat = func.functionType && func.triggerConditions;
        
        if (isCustomBuildFormat) {
          // Custom build format - convert to expected format
          return {
            id: func.id || 'unknown',
            name: func.title || 'Untitled Function',
            description: func.description || '',
            category: func.functionType || 'General',
            bookingTypes: Array.isArray(func.triggerEvents) ? func.triggerEvents : [],
            targetTypes: Array.isArray(func.offerCategories) ? func.offerCategories : [],
            timing: func.timingOption === 'immediately' ? 'Immediate after booking' : 
                    func.timingOption === 'day_of_departure' ? 'Day of flight departure' :
                    `${func.timingValue || '3'} ${func.timingOption === 'delayed' ? 'hours' : 'days'} before trip`,
            status: func.status === 'completed' ? 'Active' : func.status === 'draft' ? 'Draft' : 'Active',
            performance: func.performance || {
              impressions: 0,
              clicks: 0,
              conversions: 0,
              revenue: '£0',
              conversionRate: '0%'
            },
            comms: Array.isArray(func.comms) ? func.comms : []
          };
        } else {
          // Legacy format - use as is
          return {
            id: func.id || 'unknown',
            name: func.title || func.name || 'Untitled Function',
            description: func.description || '',
            category: func.functionType || func.category || 'General',
            bookingTypes: Array.isArray(func.offerCategories) ? func.offerCategories : 
                         Array.isArray(func.bookingTypes) ? func.bookingTypes : [],
            targetTypes: Array.isArray(func.offerSelection) ? func.offerSelection : 
                        Array.isArray(func.targetTypes) ? func.targetTypes : [],
            timing: func.timingOption === 'immediately' ? 'Immediate after booking' : 
                    `${func.timingValue || '3'} ${func.timingOption === 'delayed' ? 'hours after booking' : 'before departure'}`,
            status: func.status === 'completed' ? 'Active' : func.status === 'draft' ? 'Draft' : 'Active',
            performance: func.performance || {
              impressions: 0,
              clicks: 0,
              conversions: 0,
              revenue: '£0',
              conversionRate: '0%'
            },
            comms: Array.isArray(func.comms) ? func.comms : []
          };
        }
      } catch (error) {
        console.error('Error transforming function:', func, error);
        // Return a safe fallback object
        return {
          id: func?.id || 'error',
          name: func?.title || func?.name || 'Error Loading Function',
          description: func?.description || 'Error loading function data',
          category: 'Error',
          bookingTypes: [],
          targetTypes: [],
          timing: 'Unknown',
          status: 'Error',
          performance: {
            impressions: 0,
            clicks: 0,
            conversions: 0,
            revenue: '£0',
            conversionRate: '0%'
          },
          comms: []
        };
      }
    });
  };

  const transformTemplates = (firebaseTemplates) => {
    return firebaseTemplates.map(template => {
      try {
        return {
          id: template.id || 'unknown',
          title: template.title || 'Untitled Template',
          description: template.description || '',
          type: template.type || 'General',
          status: template.status || 'Not Active',
          trigger: template.trigger || '',
          timing: template.timing || '',
          offerSelection: Array.isArray(template.offerSelection) ? template.offerSelection : [],
          performance: template.performance || {},
          conditions: template.conditions || ''
        };
      } catch (error) {
        console.error('Error transforming template:', template, error);
        return {
          id: template?.id || 'error',
          title: template?.title || 'Error Loading Template',
          description: template?.description || 'Error loading template data',
          type: 'Error',
          status: 'Error',
          trigger: '',
          timing: '',
          offerSelection: [],
          performance: {},
          conditions: ''
        };
      }
    });
  };

  // Use Firebase data or fallback with better error handling
  let displayRevenueFunctions = fallbackRevenueFunctions;
  let displayTemplateLibrary = fallbackTemplateLibrary;
  
  try {
    if (revenueFunctions.length > 0) {
      displayRevenueFunctions = transformRevenueFunctions(revenueFunctions);
    }
    if (templates.length > 0) {
      displayTemplateLibrary = transformTemplates(templates);
    }
  } catch (error) {
    console.error('Error transforming data:', error);
    // Use fallback data if transformation fails
    displayRevenueFunctions = fallbackRevenueFunctions;
    displayTemplateLibrary = fallbackTemplateLibrary;
  }

  const getBookingTypeIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'flight': return '✈️';
      case 'hotel': return '🏨';
      case 'event ticket': return '🎫';
      case 'esim': return '📱';
      case 'fast track': return '⚡';
      case 'airport lounge': return '🛋️';
      case 'airport dining': return '🍽️';
      case 'airport transfer': return '🚗';
      case 'seat upgrade': return '💺';
      case 'spa treatment': return '💆';
      default: return '📋';
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'active': return 'success';
      case 'draft': return 'warning';
      case 'paused': return 'danger';
      case 'not active': return 'neutral';
      default: return 'neutral';
    }
  };

  const handleActivateTemplate = (template) => {
    setTemplateForCustomBuild(template);
    setShowCustomBuildModal(true);
  };

  // Convert template data to custom build format
  const convertTemplateToCustomBuild = (template) => {
    // Map template fields to custom build fields
    const customBuildData = {
      // Basic Info
      title: template.title,
      description: template.description,
      functionType: template.type,
      objectives: [], // Will be populated based on template type
      priority: 'Medium',
      tags: [],
      status: 'Draft',
      
      // Trigger Definition
      triggerEvents: [],
      triggerConditions: [],
      triggerFrequency: 'once_per_trip_session',
      eventSources: ['Mobile app', 'Website', 'API'],
      offerCategories: template.offerSelection.map(offer => {
        // Map template offer names to custom build category IDs
        const offerMapping = {
          'Hotel': 'hotel_upgrade',
          'Flight': 'flight',
          'Airport Lounge': 'airport_lounge',
          'Fast Track': 'airport_fast_track',
          'Airport Transfer': 'airport_transfer',
          'eSIM': 'esim',
          'Seat Upgrade': 'flight_seat',
          'Event Ticket': 'ticket',
          'Spa Treatment': 'health_wellness'
        };
        return offerMapping[offer] || 'flight';
      }),
      timingOption: 'days_after',
      timingValue: '3',
      cooldownPeriod: '',
      
      // Persona & Targeting
      personaGroups: [],
      exclusions: {
        personas: [],
        loyaltyTiers: [],
        geo: [],
        cardTypes: []
      },
      userLimits: {
        perUserPerDay: 1,
        perUserPerWeek: 3,
        maxTriggersPerProgram: 1000
      },
      
      // Offer/Action Definition
      offerSelection: [],
      offerFallback: {
        enabled: false,
        fallbackOffers: []
      },
      offerVisibilityRules: {
        maxPrice: null,
        minInventory: null
      },
      
      // Communication Setup
      channels: ['Concierge'],
      messageTemplate: {
        type: 'saved',
        templateId: null,
        content: '',
        language: 'English',
        tone: 'Formal',
        aiCopywriting: false
      },
      
      // AI Support
      aiOptimization: {
        autoOptimization: false,
        suggestSegments: false
      },
      
      // Control & Auditing
      testMode: false,
      auditTrail: {
        createdBy: 'Current User',
        createdAt: new Date().toISOString(),
        lastModifiedBy: 'Current User',
        lastModifiedAt: new Date().toISOString()
      }
    };

    // Set objectives based on template type
    if (template.type === 'Cross-Sell') {
      customBuildData.objectives = ['revenue_uplift', 'basket_size'];
    } else if (template.type === 'Upsell') {
      customBuildData.objectives = ['upgrade_conversion', 'revenue_uplift'];
    } else if (template.type === 'Bundle') {
      customBuildData.objectives = ['ancillary_attach', 'basket_size'];
    }

    // Set trigger events based on template trigger
    const triggerMapping = {
      'Flight Booking': ['flight_booked'],
      'Flight Departure': ['pre_trip_x_days'],
      'Flight Day': ['day_of_departure'],
      'Hotel Booking': ['hotel_booked'],
      'Hotel Check-in': ['day_of_checkin']
    };
    customBuildData.triggerEvents = triggerMapping[template.trigger] || ['flight_booked'];

    // Set timing based on template timing
    if (template.timing.includes('Immediately')) {
      customBuildData.timingOption = 'immediately';
    } else if (template.timing.includes('Day of')) {
      customBuildData.timingOption = 'day_of_departure';
    } else if (template.timing.includes('24 hours')) {
      customBuildData.timingOption = 'hours_before_departure';
      customBuildData.timingValue = '24';
    } else if (template.timing.includes('3 days')) {
      customBuildData.timingOption = 'days_before_trip_start';
      customBuildData.timingValue = '3';
    }

    return customBuildData;
  };

  const handleSaveCustomBuild = (customFunction) => {
    console.log('handleSaveCustomBuild called with:', customFunction);
    
    try {
      // Simplified demo version - just close modal and show success
      setShowCustomBuildModal(false);
      setTemplateForCustomBuild(null);
      setToastMessage(`"${customFunction.title || 'New Function'}" has been created successfully!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } catch (error) {
      console.error('Error in handleSaveCustomBuild:', error);
      // Still close the modal even if there's an error
      setShowCustomBuildModal(false);
      setTemplateForCustomBuild(null);
    }
  };

  const handlePrepareComms = (editedTemplate) => {
    setShowTemplateModal(false);
    setSelectedTemplateForEdit(null);
    setToastMessage(`"${editedTemplate.title}" has been added to the Comms tab. Please plan your communications before activating.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handlePauseTemplate = (template) => {
    setToastMessage(`"${template.title}" has been paused.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    // In a real implementation, this would update the template status in the database
  };

  const handleEditTemplate = (template) => {
    setTemplateForCustomBuild(template);
    setShowCustomBuildModal(true);
  };

  // Function to check if a template matches any existing revenue functions
  const getTemplateStatus = (template) => {
    try {
      // Check if template matches any existing function by comparing key attributes
      const matchingFunction = revenueFunctions.find(func => {
        try {
          // Compare by name similarity or key characteristics
          const funcName = func.name || func.title || 'Unknown';
          const templateTitle = template.title || 'Unknown';
          const nameMatch = funcName.toLowerCase().includes(templateTitle.toLowerCase()) ||
                           templateTitle.toLowerCase().includes(funcName.toLowerCase());
          
          // Compare by type/category
          const funcCategory = func.category || func.functionType || 'Unknown';
          const templateType = template.type || 'Unknown';
          const typeMatch = funcCategory === templateType;
          
          // Compare by target types (offers)
          const funcTargetTypes = Array.isArray(func.targetTypes) ? func.targetTypes : [];
          const templateOfferSelection = Array.isArray(template.offerSelection) ? template.offerSelection : [];
          const offerMatch = funcTargetTypes.some(target => 
            templateOfferSelection.some(offer => 
              target.toLowerCase().includes(offer.toLowerCase()) ||
              offer.toLowerCase().includes(target.toLowerCase())
            )
          );
          
          return nameMatch || (typeMatch && offerMatch);
        } catch (error) {
          console.error('Error comparing function with template:', error);
          return false;
        }
      });
      
      if (matchingFunction) {
        return {
          status: matchingFunction.status || 'Unknown',
          functionId: matchingFunction.id || 'unknown',
          functionName: matchingFunction.name || matchingFunction.title || 'Unknown'
        };
      }
      
      return { status: 'Not Implemented' };
    } catch (error) {
      console.error('Error in getTemplateStatus:', error);
      return { status: 'Error' };
    }
  };

  const filteredTemplates = (() => {
    try {
      if (!Array.isArray(displayTemplateLibrary)) {
        console.error('displayTemplateLibrary is not an array:', displayTemplateLibrary);
        return [];
      }
      
      return displayTemplateLibrary.filter(template => {
        try {
          const searchTerm = templateSearch.toLowerCase();
          const matchesSearch = 
            (template.title && template.title.toLowerCase().includes(searchTerm)) ||
            (template.description && template.description.toLowerCase().includes(searchTerm)) ||
            (template.trigger && template.trigger.toLowerCase().includes(searchTerm)) ||
            (template.timing && template.timing.toLowerCase().includes(searchTerm)) ||
            (template.offerSelection && template.offerSelection.some(offer => offer.toLowerCase().includes(searchTerm))) ||
            (template.conditions && typeof template.conditions === 'string' && template.conditions.toLowerCase().includes(searchTerm));
          
          const matchesTypeFilter = templateFilter === 'all' || (template.type && template.type.toLowerCase() === templateFilter.toLowerCase());
          
          const matchesProductFilter = templateProductFilter === 'all' || 
            (template.trigger && template.trigger.toLowerCase().includes(templateProductFilter.toLowerCase())) ||
            (template.offerSelection && template.offerSelection.some(offer => offer.toLowerCase().includes(templateProductFilter.toLowerCase())));
          
          const matchesPopularityFilter = templatePopularityFilter === 'all' || 
            (templatePopularityFilter === 'popular' && template.status === 'Active' && template.performance) ||
            (templatePopularityFilter === 'new' && template.status === 'Not Active');
          
          return matchesSearch && matchesTypeFilter && matchesProductFilter && matchesPopularityFilter;
        } catch (error) {
          console.error('Error filtering template:', template, error);
          return false;
        }
      });
    } catch (error) {
      console.error('Error in filteredTemplates:', error);
      return [];
    }
  })();

  // Add error boundary to prevent component from crashing
  try {
    console.log('Rendering RevenueOptimizer with data:', {
      revenueFunctions: revenueFunctions.length,
      templates: templates.length,
      displayRevenueFunctions: displayRevenueFunctions.length,
      displayTemplateLibrary: displayTemplateLibrary.length
    });
    
    return (
      <div className="revenue-optimizer-page">
      <div className="page-header">
        <h1 className="page-title">Revenue Optimizer</h1>
        <p className="page-subtitle">Build, communicate, and optimize your revenue functions</p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading data from Firebase...</p>
        </div>
      )}

      {/* Core Capabilities Tabs */}
      <div className="capabilities-tabs">
        <button 
          className={`capability-tab ${activeTab === 'build' ? 'active' : ''}`}
          onClick={() => setActiveTab('build')}
        >
          <span className="capability-icon">🔨</span>
          <span className="capability-text">Build</span>
          <span className="capability-desc">Create revenue functions</span>
                      <span className="tab-badge">{displayTemplateLibrary.length}</span>
        </button>
        <button 
          className={`capability-tab ${activeTab === 'comms' ? 'active' : ''}`}
          onClick={() => setActiveTab('comms')}
        >
          <span className="capability-icon">📢</span>
          <span className="capability-text">Comms</span>
          <span className="capability-desc">Manage communications</span>
          <span className="tab-badge">{(() => {
            try {
              return revenueFunctions.reduce((total, func) => {
                const comms = Array.isArray(func.comms) ? func.comms : [];
                return total + comms.length;
              }, 0);
            } catch (error) {
              console.error('Error calculating comms badge:', error);
              return 0;
            }
          })()}</span>
        </button>
        <button 
          className={`capability-tab ${activeTab === 'performance' ? 'active' : ''}`}
          onClick={() => setActiveTab('performance')}
        >
          <span className="capability-icon">📊</span>
          <span className="capability-text">Performance</span>
          <span className="capability-desc">Analyze performance</span>
          <span className="tab-badge">{(() => {
            try {
              return revenueFunctions.filter(func => {
                const status = func.status || 'Unknown';
                return status === 'Active';
              }).length;
            } catch (error) {
              console.error('Error calculating performance badge:', error);
              return 0;
            }
          })()}</span>
        </button>
      </div>

      <div className="capability-content">
        {/* BUILD Tab */}
        {activeTab === 'build' && (
          <React.Suspense fallback={<div>Loading Build tab...</div>}>
            <RevenueOptimizerBuild 
              buildSubTab={buildSubTab}
              setBuildSubTab={setBuildSubTab}
              templateSearch={templateSearch}
              setTemplateSearch={setTemplateSearch}
              templateFilter={templateFilter}
              setTemplateFilter={setTemplateFilter}
              templateProductFilter={templateProductFilter}
              setTemplateProductFilter={setTemplateProductFilter}
              templatePopularityFilter={templatePopularityFilter}
              setTemplatePopularityFilter={setTemplatePopularityFilter}
              filteredTemplates={filteredTemplates}
              getBookingTypeIcon={getBookingTypeIcon}
              getTemplateStatus={getTemplateStatus}
              handleActivateTemplate={handleActivateTemplate}
              setShowFunctionBuilder={setShowFunctionBuilder}
              showTemplateModal={showTemplateModal}
              setShowTemplateModal={setShowTemplateModal}
              selectedTemplateForEdit={selectedTemplateForEdit}
              handlePrepareComms={handlePrepareComms}
              handlePauseTemplate={handlePauseTemplate}
              handleEditTemplate={handleEditTemplate}
            />
          </React.Suspense>
        )}

        {/* COMMS Tab */}
        {activeTab === 'comms' && (
          <Suspense fallback={<div>Loading Comms tab...</div>}>
            <RevenueOptimizerComms 
              revenueFunctions={displayRevenueFunctions}
              getStatusColor={getStatusColor}
              setShowCommsBuilder={setShowCommsBuilder}
            />
          </Suspense>
        )}

        {/* PERFORMANCE Tab */}
        {activeTab === 'performance' && (
          <Suspense fallback={<div>Loading Performance tab...</div>}>
            <RevenueOptimizerPerformance 
              revenueFunctions={displayRevenueFunctions}
            />
          </Suspense>
        )}
      </div>



      {/* Function Builder Modal */}
      {showFunctionBuilder && (
        <div className="modal-overlay" onClick={() => setShowFunctionBuilder(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create Revenue Function</h3>
              <button className="modal-close" onClick={() => setShowFunctionBuilder(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="function-builder">
                <div className="builder-section">
                  <h4>Function Name</h4>
                  <input type="text" placeholder="Enter function name..." className="function-name-input" />
                </div>

                <div className="builder-section">
                  <h4>Category</h4>
                  <select className="category-select">
                    <option>Cross-Sell</option>
                    <option>Upsell</option>
                    <option>Bundle</option>
                  </select>
                </div>

                <div className="builder-section">
                  <h4>Trigger Booking Types</h4>
                  <div className="booking-types-selector">
                    <label className="checkbox-label">
                      <input type="checkbox" /> ✈️ Flight
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" /> 🏨 Hotel
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" /> 🎫 Event Ticket
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" /> 📱 eSIM
                    </label>
                  </div>
                </div>

                <div className="builder-section">
                  <h4>Target Offers</h4>
                  <div className="offers-selector">
                    <label className="checkbox-label">
                      <input type="checkbox" /> 🏨 Hotel
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" /> ⚡ Fast Track
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" /> 🛋️ Airport Lounge
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" /> 🍽️ Airport Dining
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" /> 🚗 Airport Transfer
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn secondary" onClick={() => setShowFunctionBuilder(false)}>Cancel</button>
              <button className="btn primary">Create Function</button>
            </div>
          </div>
        </div>
      )}

      {/* Comms Builder Modal */}
      {showCommsBuilder && (
        <div className="modal-overlay" onClick={() => setShowCommsBuilder(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create Communication</h3>
              <button className="modal-close" onClick={() => setShowCommsBuilder(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="comms-builder">
                <div className="builder-section">
                  <h4>Communication Name</h4>
                  <input type="text" placeholder="Enter communication name..." className="comms-name-input" />
                </div>

                <div className="builder-section">
                  <h4>Type</h4>
                  <select className="comms-type-select">
                    <option>Email</option>
                    <option>SMS</option>
                    <option>Push Notification</option>
                    <option>In-App Message</option>
                  </select>
                </div>

                <div className="builder-section">
                  <h4>Associated Function</h4>
                  <select className="function-select">
                    <option>Flight to Hotel Cross-Sell</option>
                    <option>Airport Services Bundle</option>
                    <option>Premium Upgrade Path</option>
                  </select>
                </div>

                <div className="builder-section">
                  <h4>Message Content</h4>
                  <textarea 
                    placeholder="Enter your message content..." 
                    className="message-content"
                    rows="4"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn secondary" onClick={() => setShowCommsBuilder(false)}>Cancel</button>
              <button className="btn primary">Create Communication</button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Build Modal */}
      {showCustomBuildModal && templateForCustomBuild && (
        <div className="modal-overlay" onClick={() => setShowCustomBuildModal(false)}>
          <div className="modal-content modal-fullscreen" onClick={(e) => e.stopPropagation()}>
            <RevenueOptimizerCustomBuildNew
              isOpen={showCustomBuildModal}
              onClose={() => {
                setShowCustomBuildModal(false);
                setTemplateForCustomBuild(null);
              }}
              onSave={handleSaveCustomBuild}
              editingFunction={convertTemplateToCustomBuild(templateForCustomBuild)}
              getBookingTypeIcon={getBookingTypeIcon}
            />
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification">
          <div className="toast-content">
            <span className="toast-icon">✅</span>
            <span className="toast-message">{toastMessage}</span>
            <button className="toast-close" onClick={() => setShowToast(false)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
  } catch (error) {
    console.error('Error rendering RevenueOptimizer:', error);
    return (
      <div className="revenue-optimizer-page">
        <div className="page-header">
          <h1 className="page-title">Revenue Optimizer</h1>
          <p className="page-subtitle">Build, communicate, and optimize your revenue functions</p>
        </div>
        <div className="error-state">
          <p>Error loading Revenue Optimizer: {error.message}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }
}

export default RevenueOptimizer; 