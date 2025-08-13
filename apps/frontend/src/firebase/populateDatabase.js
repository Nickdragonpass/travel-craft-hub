import revenueFunctionService from './revenueFunctionService.js';

/**
 * Populate Database Script
 * This script populates the Firebase database with initial data for testing
 * Includes all existing templates and revenue functions from the current mock data
 */
export const populateDatabase = async () => {
  console.log('Starting database population...');

  try {
    // Existing templates from RevenueOptimizer.jsx
    const templates = [
      {
        id: 'template-1',
        title: 'Post-Flight Hotel Cross-Sell',
        description: '3 days after flight booking, offer hotel options for the destination',
        type: 'Cross-Sell',
        status: 'active',
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
        status: 'active',
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
        status: 'not_active',
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
        status: 'not_active',
        trigger: 'Flight Departure',
        timing: '24 hours before departure',
        offerSelection: ['eSIM']
      },
      {
        id: 'template-5',
        title: 'Pre-Departure Airport Transfer',
        description: '24hrs before flight departure, send offer for airport transfer',
        type: 'Cross-Sell',
        status: 'not_active',
        trigger: 'Flight Departure',
        timing: '24 hours before departure',
        offerSelection: ['Airport Transfer']
      },
      {
        id: 'template-6',
        title: 'Post-Hotel Check-in Activities',
        description: 'Immediately after hotel check in time, offer ticket around the area of hotel',
        type: 'Cross-Sell',
        status: 'not_active',
        trigger: 'Hotel Check-in',
        timing: 'Immediately after check-in',
        offerSelection: ['Event Ticket']
      },
      {
        id: 'template-7',
        title: 'VIP Hotel Spa Treatment',
        description: 'For VIP client, IF hotel is booked, offer spa treatment at hotel or nearby location',
        type: 'Upsell',
        status: 'not_active',
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
        status: 'not_active',
        trigger: 'Hotel Booking',
        timing: 'After hotel booking',
        offerSelection: ['Event Ticket'],
        conditions: 'Weekend stays only'
      }
    ];

    // Function templates (simplified versions)
    const functionTemplates = [
      {
        id: 'func-template-1',
        title: 'Flight to Hotel Cross-Sell',
        description: 'Automatically suggest hotel bookings when customers book flights',
        type: 'Cross-Sell',
        complexity: 'Beginner',
        successRate: '78%',
        avgRevenue: '£450'
      },
      {
        id: 'func-template-2',
        title: 'Airport Services Bundle',
        description: 'Offer fast track, lounge access, and transfers as a package',
        type: 'Bundle',
        complexity: 'Beginner',
        successRate: '65%',
        avgRevenue: '£120'
      },
      {
        id: 'func-template-3',
        title: 'Premium Upgrade Path',
        description: 'Suggest premium services to high-value customers',
        type: 'Upsell',
        complexity: 'Intermediate',
        successRate: '82%',
        avgRevenue: '£280'
      }
    ];

    // Communication templates
    const commsTemplates = [
      {
        id: 'comm-template-1',
        title: 'Email Sequence',
        description: '3-part email sequence for cross-sell opportunities',
        type: 'Email',
        avgOpenRate: '24%',
        avgClickRate: '8.5%'
      },
      {
        id: 'comm-template-2',
        title: 'SMS Bundle Offer',
        description: 'Time-sensitive SMS for airport services',
        type: 'SMS',
        avgDeliveryRate: '98%',
        avgClickRate: '15.2%'
      },
      {
        id: 'comm-template-3',
        title: 'In-App Notification',
        description: 'Contextual push notification during booking',
        type: 'Push',
        avgImpressionRate: '95%',
        avgClickRate: '12.8%'
      }
    ];

    // Existing revenue functions from RevenueOptimizer.jsx
    const existingRevenueFunctions = [
      {
        title: 'Flight to Hotel Cross-Sell',
        description: 'Automatically suggest hotel bookings when customers book flights',
        functionType: 'Cross-Sell',
        objectives: ['revenue_uplift', 'basket_size', 'ancillary_attach'],
        priority: 'High',
        tags: ['flight', 'hotel', 'cross-sell'],
        status: 'completed',
        
        // Trigger Definition
        triggerEvents: ['flight_booking_completion'],
        triggerConditions: ['no_hotel_booking'],
        triggerFrequency: 'once_per_trip',
        eventSources: ['Booking event'],
        offerCategories: ['Hotel'],
        timingOption: 'delayed',
        timingValue: '72', // 3 days
        cooldownPeriod: '7',
        
        // Persona & Targeting
        personaGroups: ['leisure_traveler', 'business_traveler'],
        exclusions: {
          personas: ['day_tripper'],
          loyaltyTiers: [],
          geo: [],
          cardTypes: []
        },
        userLimits: {
          perUserPerDay: 1,
          perUserPerWeek: 2,
          maxTriggersPerProgram: 500
        },
        
        // Offer/Action Definition
        offerSelection: ['hotel_booking'],
        offerFallback: {
          enabled: false,
          fallbackOffers: []
        },
        offerVisibilityRules: {
          maxPrice: null,
          minInventory: 10
        },
        
        // Communication Setup
        channels: ['Email', 'In-App'],
        messageTemplate: {
          type: 'saved',
          templateId: 'hotel_cross_sell_template',
          content: 'Complete your trip with our hotel recommendations!',
          language: 'English',
          tone: 'Friendly',
          aiCopywriting: true
        },
        
        // AI Support
        aiOptimization: {
          autoOptimization: true,
          suggestSegments: true
        },
        
        // Control & Auditing
        testMode: false,
        auditTrail: {
          createdBy: 'System Admin',
          createdAt: new Date().toISOString(),
          lastModifiedBy: 'System Admin',
          lastModifiedAt: new Date().toISOString()
        },
        
        // Performance data
        performance: {
          impressions: 1247,
          clicks: 312,
          conversions: 89,
          revenue: '£40,050',
          conversionRate: '7.1%'
        },
        comms: [
          { id: 'comm-1', name: 'Email Campaign A', status: 'Active', performance: { opens: '23%', clicks: '8.2%' } },
          { id: 'comm-2', name: 'In-App Notification', status: 'Active', performance: { impressions: 892, clicks: '12.4%' } }
        ]
      },
      {
        title: 'Airport Services Bundle',
        description: 'Offer fast track, lounge access, and transfers as a package',
        functionType: 'Bundle',
        objectives: ['revenue_uplift', 'basket_size', 'ancillary_attach'],
        priority: 'Medium',
        tags: ['airport', 'bundle', 'services'],
        status: 'completed',
        
        // Trigger Definition
        triggerEvents: ['flight_booking_completion'],
        triggerConditions: ['domestic_flight', 'international_flight'],
        triggerFrequency: 'once_per_trip',
        eventSources: ['Booking event'],
        offerCategories: ['Fast Track', 'Airport Lounge', 'Airport Transfer'],
        timingOption: 'delayed',
        timingValue: '24', // 24 hours before departure
        cooldownPeriod: '7',
        
        // Persona & Targeting
        personaGroups: ['business_traveler', 'frequent_traveler'],
        exclusions: {
          personas: ['budget_traveler'],
          loyaltyTiers: [],
          geo: [],
          cardTypes: []
        },
        userLimits: {
          perUserPerDay: 1,
          perUserPerWeek: 2,
          maxTriggersPerProgram: 300
        },
        
        // Offer/Action Definition
        offerSelection: ['fast_track', 'lounge_access', 'airport_transfer'],
        offerFallback: {
          enabled: true,
          fallbackOffers: ['fast_track_only']
        },
        offerVisibilityRules: {
          maxPrice: 200,
          minInventory: 5
        },
        
        // Communication Setup
        channels: ['SMS', 'Website'],
        messageTemplate: {
          type: 'saved',
          templateId: 'airport_bundle_template',
          content: 'Enhance your airport experience with our premium services!',
          language: 'English',
          tone: 'Professional',
          aiCopywriting: false
        },
        
        // AI Support
        aiOptimization: {
          autoOptimization: true,
          suggestSegments: true
        },
        
        // Control & Auditing
        testMode: false,
        auditTrail: {
          createdBy: 'System Admin',
          createdAt: new Date().toISOString(),
          lastModifiedBy: 'System Admin',
          lastModifiedAt: new Date().toISOString()
        },
        
        // Performance data
        performance: {
          impressions: 892,
          clicks: 267,
          conversions: 58,
          revenue: '£6,960',
          conversionRate: '6.5%'
        },
        comms: [
          { id: 'comm-3', name: 'SMS Bundle Offer', status: 'Active', performance: { deliveries: '98%', clicks: '15.1%' } },
          { id: 'comm-4', name: 'Website Banner', status: 'Paused', performance: { impressions: 445, clicks: '3.2%' } }
        ]
      },
      {
        title: 'Premium Upgrade Path',
        description: 'Suggest premium services to high-value customers',
        functionType: 'Upsell',
        objectives: ['revenue_uplift', 'upgrade_conversion', 'basket_size'],
        priority: 'High',
        tags: ['premium', 'upgrade', 'vip'],
        status: 'draft',
        
        // Trigger Definition
        triggerEvents: ['booking_confirmation'],
        triggerConditions: ['high_value_customer', 'economy_booking'],
        triggerFrequency: 'once_per_booking',
        eventSources: ['Booking event'],
        offerCategories: ['Airport Lounge', 'Fast Track', 'eSIM'],
        timingOption: 'immediately',
        timingValue: '',
        cooldownPeriod: '30',
        
        // Persona & Targeting
        personaGroups: ['high_spender', 'frequent_traveler', 'vip'],
        exclusions: {
          personas: ['budget_traveler'],
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
        offerSelection: ['lounge_access', 'fast_track', 'esim_package'],
        offerFallback: {
          enabled: true,
          fallbackOffers: ['lounge_access_only']
        },
        offerVisibilityRules: {
          maxPrice: 500,
          minInventory: 5
        },
        
        // Communication Setup
        channels: ['Email', 'SMS'],
        messageTemplate: {
          type: 'saved',
          templateId: 'premium_upgrade_template',
          content: 'Upgrade your travel experience with our premium services!',
          language: 'English',
          tone: 'Professional',
          aiCopywriting: true
        },
        
        // AI Support
        aiOptimization: {
          autoOptimization: true,
          suggestSegments: true
        },
        
        // Control & Auditing
        testMode: true,
        auditTrail: {
          createdBy: 'System Admin',
          createdAt: new Date().toISOString(),
          lastModifiedBy: 'System Admin',
          lastModifiedAt: new Date().toISOString()
        },
        
        // Performance data (draft - no performance yet)
        performance: {
          impressions: 0,
          clicks: 0,
          conversions: 0,
          revenue: '£0',
          conversionRate: '0%'
        },
        comms: []
      }
    ];

    // Save all templates
    console.log('Saving templates...');
    for (const template of templates) {
      await revenueFunctionService.saveTemplate(template);
    }

    // Save function templates
    console.log('Saving function templates...');
    for (const template of functionTemplates) {
      await revenueFunctionService.saveTemplate(template);
    }

    // Save communication templates
    console.log('Saving communication templates...');
    for (const template of commsTemplates) {
      await revenueFunctionService.saveTemplate(template);
    }

    // Save existing revenue functions
    console.log('Saving existing revenue functions...');
    for (const func of existingRevenueFunctions) {
      await revenueFunctionService.saveRevenueFunction(func, func.status);
    }

    console.log('Database population completed successfully!');
    console.log(`- ${templates.length} main templates saved`);
    console.log(`- ${functionTemplates.length} function templates saved`);
    console.log(`- ${commsTemplates.length} communication templates saved`);
    console.log(`- ${existingRevenueFunctions.length} existing revenue functions saved`);

  } catch (error) {
    console.error('Error populating database:', error);
    throw error;
  }
};

/**
 * Clear Database Script (for testing)
 * WARNING: This will delete all data!
 */
export const clearDatabase = async () => {
  console.log('WARNING: This will delete all data from the database!');
  console.log('This function is for testing purposes only.');
  
  // Note: In a real application, you would implement this with proper authentication
  // and confirmation dialogs. This is just a placeholder for testing.
  
  try {
    // Get all functions and delete them
    const functions = await revenueFunctionService.getAllRevenueFunctions();
    for (const func of functions) {
      await revenueFunctionService.deleteRevenueFunction(func.id);
    }

    // Get all templates and delete them
    const templates = await revenueFunctionService.getAllTemplates();
    for (const template of templates) {
      // Note: You would need to add a deleteTemplate method to the service
      console.log('Template deletion not implemented yet');
    }

    console.log('Database cleared successfully!');
  } catch (error) {
    console.error('Error clearing database:', error);
    throw error;
  }
};

// Export for use in development
export default {
  populateDatabase,
  clearDatabase
}; 