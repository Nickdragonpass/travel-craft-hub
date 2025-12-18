// Mock Analytics Data Service
// Provides comprehensive mock data matching all required metrics from requirements

// Helper function to generate date range
const generateDateRange = (months = 12) => {
  const dates = [];
  const now = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    dates.push(date.toISOString().split('T')[0].substring(0, 7)); // YYYY-MM format
  }
  return dates;
};

// Helper function to generate daily dates
const generateDailyDates = (days = 30) => {
  const dates = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

// Program Overview Metrics
export const getProgramMetrics = () => {
  const monthlyDates = generateDateRange(12);
  
  return {
    // Executive Summary KPIs
    eligibleMembers: 12450,
    eligibleMembersTrend: 8.2,
    
    activeMembers: 8920,
    activeMembersTrend: 15.3,
    
    engagementRate: 71.6,
    engagementRateTrend: 2.1,
    
    gmv: 2400000, // £2.4M
    gmvTrend: 18.5,
    
    // Order counts
    totalOrders: 5230,
    totalOrdersTrend: 15.2,
    entitlementOrders: 3120, // Orders using entitlements/redemptions
    entitlementOrdersTrend: 12.5,
    purchasedOrders: 2110, // Member-paid orders
    purchasedOrdersTrend: 19.8,
    
    programHealthScore: 8.2,
    programHealthTrend: 0.3,
    
    costPerMember: 45.20,
    costPerMemberTrend: -5.2,
    
    entitlementUtilization: 67.3,
    entitlementUtilizationTrend: 4.2,
    
    customerSatisfaction: 4.5,
    customerSatisfactionTrend: 0.2,
    
    // Member Growth Data
    memberGrowth: monthlyDates.map((month, index) => ({
      month,
      eligible: 12000 + (index * 37.5),
      new: 200 + (index * 3.75),
      active: 8500 + (index * 35)
    })),
    
    // Channel Distribution
    channelDistribution: [
      { name: 'WhatsApp', value: 35, count: 3120 },
      { name: 'Live Chat', value: 28, count: 2498 },
      { name: 'Email', value: 22, count: 1962 },
      { name: 'Phone', value: 15, count: 1338 }
    ],
    
    // Orders by Category
    ordersByCategory: [
      { category: 'Flights', orderCount: 1982, gmv: 1240000 },
      { category: 'Hotels', orderCount: 1456, gmv: 890000 },
      { category: 'Lounge Access', orderCount: 2840, gmv: 320000 },
      { category: 'eSIM', orderCount: 892, gmv: 85000 },
      { category: 'Transfers', orderCount: 756, gmv: 245000 },
      { category: 'Fast Track', orderCount: 623, gmv: 125000 }
    ],
    
    // Monthly Activity Summary
    monthlyActivity: monthlyDates.map((month, index) => {
      const totalMembers = 12000 + (index * 37.5);
      const transactions = 2340 - (index * 15);
      return {
        month,
        newMembers: 245 - (index * 2),
        activeMembers: 8920 - (index * 50),
        totalMembers: Math.round(totalMembers),
        transactions: transactions,
        entitlementOrders: 1420 - (index * 9),
        purchasedOrders: 920 - (index * 6),
        value: 620000 - (index * 3000),
        utilization: 67.3 - (index * 0.5)
      };
    }).reverse(),
    
    // Order Breakdown Chart Data
    orderBreakdown: monthlyDates.map((month, index) => ({
      month,
      entitlement: 1420 - (index * 9) + Math.random() * 50,
      purchased: 920 - (index * 6) + Math.random() * 30
    })).reverse()
  };
};

// Customer Engagement Metrics
export const getEngagementMetrics = () => {
  const dailyDates = generateDailyDates(30);
  
  return {
    // Engagement KPIs
    mau: 8920,
    mauTrend: 15.3,
    
    dau: 3245,
    dauTrend: 12.5,
    
    mac: 5230, // Monthly Active with Orders
    macTrend: 18.2,

    // AI interactions (e.g., Digital Concierge). Not all requests result in an order.
    totalRequests: 186450,
    totalRequestsTrend: 14.0,

    // Unique users who made at least one request in the selected period
    usersWithRequests: 6240,
    usersWithRequestsTrend: 9.1,
    
    engagementDepth: 3.2,
    engagementDepthTrend: 0.5,
    
    repeatUsers: 4120,
    repeatUsersTrend: 8.3,
    
    // Engagement Funnel
    funnel: {
      eligible: 12450,
      active: 8920,
      withOrders: 5230,
      repeat: 4120
    },
    
    // Retention Cohorts
    retentionCohorts: [
      { period: '1 day', rate: 95 },
      { period: '3 days', rate: 82 },
      { period: '7 days', rate: 68 },
      { period: '30 days', rate: 45 },
      { period: '60 days', rate: 38 },
      { period: '90 days', rate: 32 },
      { period: '365 days', rate: 18 }
    ],
    
    // Benefit Usage Patterns
    benefitUsage: [
      { category: 'Flights', new: 120, occasional: 340, regular: 280 },
      { category: 'Hotels', new: 85, occasional: 220, regular: 180 },
      { category: 'Lounge', new: 45, occasional: 120, regular: 140 },
      { category: 'eSIM', new: 35, occasional: 90, regular: 85 }
    ],
    
    // Member Segments
    memberSegments: [
      { segment: 'New', members: 3245, avgOrders: 1.2, value: 420000, trend: 12.5 },
      { segment: 'Active', members: 5230, avgOrders: 2.8, value: 1200000, trend: 8.2 },
      { segment: 'Repeat', members: 4120, avgOrders: 5.1, value: 1800000, trend: 15.3 }
    ],
    
    // Daily Active Trends
    dailyActiveTrend: dailyDates.map((date, index) => ({
      date,
      dau: 2800 + (index * 15) + Math.random() * 200,
      wau: 3200 + (index * 18) + Math.random() * 250,
      mau: 8500 + (index * 14) + Math.random() * 400
    })),
    
    // Entitlement Utilization by Type
    entitlementUtilization: [
      { type: 'Lounge Access', used: 7200, allocated: 10000, utilization: 72 },
      { type: 'Airport Transfers', used: 5800, allocated: 10000, utilization: 58 },
      { type: 'Fast Track', used: 8500, allocated: 10000, utilization: 85 },
      { type: 'Wellness', used: 4200, allocated: 10000, utilization: 42 },
      { type: 'Dining', used: 3800, allocated: 10000, utilization: 38 }
    ]
  };
};

// Program Performance Metrics
export const getPerformanceMetrics = () => {
  const monthlyDates = generateDateRange(6);
  
  return {
    // Quality Scorecards
    bookingConfirmationRate: 98.2,
    bookingConfirmationTrend: 0.5,
    
    automationRate: 87.5,
    automationRateTrend: 2.3,
    
    csat: 4.5,
    csatTrend: 0.2,
    
    nps: 42,
    npsTrend: 5,
    
    fcr: 85.3, // First Contact Resolution
    fcrTrend: 3.1,
    
    responseTime: 2.4, // minutes
    responseTimeTrend: -0.3,
    
    // Quality Trends
    qualityTrends: monthlyDates.map((month, index) => ({
      month,
      csat: 4.3 + (index * 0.033),
      nps: 37 + (index * 0.83),
      fcr: 82 + (index * 0.55)
    })),
    
    // SLA Performance by Channel
    slaPerformance: [
      { channel: 'WhatsApp', volume: 1200, sla: 92, responseTime: 2.1, fcr: 88, csat: 4.6, status: 'good' },
      { channel: 'Live Chat', volume: 890, sla: 98, responseTime: 1.8, fcr: 92, csat: 4.7, status: 'excellent' },
      { channel: 'Email', volume: 650, sla: 88, responseTime: 15, fcr: 82, csat: 4.4, status: 'fair' },
      { channel: 'Phone', volume: 340, sla: 85, responseTime: 8.2, fcr: 78, csat: 4.3, status: 'fair' }
    ],
    
    // Supplier Performance
    supplierPerformance: [
      { supplier: 'British Airways', bookings: 1240, successRate: 98.5, avgTime: 2.1, satisfaction: 4.6 },
      { supplier: 'Hilton', bookings: 890, successRate: 97.8, avgTime: 1.8, satisfaction: 4.7 },
      { supplier: 'Marriott', bookings: 750, successRate: 98.2, avgTime: 2.0, satisfaction: 4.5 },
      { supplier: 'No.1 Traveller', bookings: 420, successRate: 99.1, avgTime: 1.5, satisfaction: 4.8 }
    ]
  };
};

// Financial Impact Metrics
export const getFinancialMetrics = () => {
  const monthlyDates = generateDateRange(12);
  
  return {
    // Financial KPIs
    subscriptionRevenue: 1200000, // £1.2M
    subscriptionRevenueTrend: 18.2,
    
    transactionRevenue: 1500000, // £1.5M
    transactionRevenueTrend: 22.5,
    
    revenueMix: {
      subscription: 68,
      transaction: 32
    },
    
    gmv: 2400000, // £2.4M
    gmvTrend: 22.1,
    
    // Conversion rate aligned with dashboard view
    conversionRate: 4.8,
    conversionRateTrend: 0.6,
    
    // Revenue Breakdown Over Time
    revenueBreakdown: monthlyDates.map((month, index) => ({
      month,
      subscription: 100000 + (index * 1667),
      transaction: 125000 + (index * 2083)
    })),
    
    // Budget vs Actual
    budgetVsActual: monthlyDates.slice(-3).map((month, index) => ({
      month,
      forecast: 250000,
      actual: 270000 + (index * 5000),
      variance: 8 + (index * 2)
    })),
    
    // Cost Breakdown
    costBreakdown: [
      { category: 'Platform', value: 35, amount: 388500 },
      { category: 'Service Delivery', value: 28, amount: 310800 },
      { category: 'Support', value: 22, amount: 244200 },
      { category: 'Marketing', value: 15, amount: 166500 }
    ],
    
    // Monthly Financial Summary
    monthlyFinancial: monthlyDates.map((month, index) => ({
      month,
      subscriptionRevenue: 120000 - (index * 2000),
      transactionRevenue: 150000 - (index * 2500),
      gmv: 620000 - (index * 3000),
      cost: 45000 - (index * 200),
      roi: 3.2 - (index * 0.02),
      vsBudget: 8 + (index * 0.5)
    })).reverse(),
    
    // Entitlement Value Analysis
    entitlementValue: {
      allocated: 2700000,
      used: 1800000,
      utilization: 66.7
    },
    
    entitlementValueByType: [
      { type: 'Lounge Access', allocated: 800000, used: 576000, value: 720 },
      { type: 'Transfers', allocated: 600000, used: 348000, value: 580 },
      { type: 'Fast Track', allocated: 500000, used: 425000, value: 850 },
      { type: 'Wellness', allocated: 400000, used: 168000, value: 420 },
      { type: 'Dining', allocated: 400000, used: 152000, value: 380 }
    ]
  };
};

// Supply Metrics (Supplier & Destination Analytics)
export const getSupplyMetrics = () => {
  const months = generateDateRange(12); // YYYY-MM

  const categoryOptions = [
    { key: 'all', label: 'All' },
    { key: 'flights', label: 'Flights' },
    { key: 'hotels', label: 'Hotels' },
    { key: 'transfers', label: 'Airport Transfers' },
    { key: 'localOffers', label: 'Local Offers' }
  ];

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randInt = (min, max) => Math.floor(min + Math.random() * (max - min + 1));

  const DESTINATIONS = ['London', 'New York', 'Paris', 'Dubai', 'Singapore', 'Tokyo', 'Amsterdam', 'Rome', 'Barcelona', 'Bangkok'];
  const ORIGINS = ['LHR', 'JFK', 'CDG', 'DXB', 'SIN', 'AMS', 'FRA'];

  const SUPPLIERS = {
    flights: ['British Airways', 'Emirates', 'Lufthansa', 'Delta', 'United'],
    hotels: ['Hilton', 'Marriott', 'IHG', 'Accor', 'Hyatt'],
    transfers: ['Blacklane', 'Addison Lee', 'Sixt Ride', 'Welcome Pickups'],
    localOffers: ['GetYourGuide', 'Viator', 'Headout', 'Local Partner Network']
  };

  const PRICE_RANGES = {
    flights: [380, 3600],
    hotels: [140, 2200],
    transfers: [35, 320],
    localOffers: [18, 220]
  };

  const buildOrders = (categoryKey, count) => {
    const orders = [];
    for (let i = 0; i < count; i++) {
      const travelMonth = pick(months);
      const destination = pick(DESTINATIONS);
      const origin = categoryKey === 'flights' ? pick(ORIGINS) : '—';
      const supplier = pick(SUPPLIERS[categoryKey]);
      const [minP, maxP] = PRICE_RANGES[categoryKey];
      const gmv = randInt(minP, maxP);
      const bookingDate = `${travelMonth}-${String(randInt(1, 28)).padStart(2, '0')}`;

      orders.push({
        orderId: `ORD-2025-${categoryKey.slice(0, 3).toUpperCase()}-${String(1000 + i).padStart(4, '0')}`,
        category: categoryKey,
        supplier,
        origin,
        destination,
        travelMonth,
        bookingDate,
        gmv,
        status: Math.random() < 0.92 ? 'Completed' : (Math.random() < 0.6 ? 'Cancelled' : 'Confirmed')
      });
    }
    return orders;
  };

  const groupSum = (rows, keyField) => {
    const map = {};
    rows.forEach((r) => {
      const k = r[keyField];
      if (!map[k]) map[k] = { key: k, orders: 0, spend: 0 };
      map[k].orders += 1;
      map[k].spend += r.gmv;
    });
    return Object.values(map);
  };

  const buildDataset = (orders) => {
    const totalOrders = orders.length;
    const totalSpend = orders.reduce((sum, r) => sum + r.gmv, 0);
    const avgOrderValue = totalOrders > 0 ? Math.round(totalSpend / totalOrders) : 0;

    const suppliersAgg = groupSum(orders, 'supplier')
      .sort((a, b) => b.spend - a.spend);
    const destinationsAgg = groupSum(orders, 'destination')
      .sort((a, b) => b.spend - a.spend);

    const monthlyAgg = groupSum(orders, 'travelMonth')
      .map((r) => ({ month: r.key, orders: r.orders, spend: r.spend }))
      .sort((a, b) => (a.month > b.month ? 1 : -1));

    const topSupplier = suppliersAgg[0]?.key || '—';

    const supplierRankings = suppliersAgg.slice(0, 12).map((row) => ({
      supplier: row.key,
      orders: row.orders,
      spend: row.spend,
      avgOrderValue: row.orders > 0 ? Math.round(row.spend / row.orders) : 0,
      spendShare: totalSpend > 0 ? Math.round((row.spend / totalSpend) * 1000) / 10 : 0 // 1dp
    }));

    const topSuppliers = suppliersAgg.slice(0, 10).map((row) => ({
      supplier: row.key,
      spend: row.spend,
      orders: row.orders
    }));

    const topDestinations = destinationsAgg.slice(0, 10).map((row) => ({
      destination: row.key,
      spend: row.spend,
      orders: row.orders
    }));

    const ordersDrilldown = [...orders]
      .sort((a, b) => (a.bookingDate > b.bookingDate ? -1 : 1))
      .slice(0, 30);

    // Origin cities aggregation (only for "all" dataset)
    const originsAgg = groupSum(orders.filter((o) => o.origin && o.origin !== '—'), 'origin')
      .sort((a, b) => b.orders - a.orders);

    const originCities = originsAgg.slice(0, 10).map((row) => ({
      origin: row.key,
      orders: row.orders,
      spend: row.spend
    }));

    return {
      kpis: {
        totalOrders,
        totalSpend,
        avgOrderValue,
        topSupplier
      },
      monthlySpend: monthlyAgg,
      topSuppliers,
      topDestinations,
      supplierRankings,
      ordersDrilldown,
      originCities
    };
  };

  const flightsOrders = buildOrders('flights', 90);
  const hotelsOrders = buildOrders('hotels', 70);
  const transfersOrders = buildOrders('transfers', 60);
  const localOffersOrders = buildOrders('localOffers', 55);

  const allOrders = [...flightsOrders, ...hotelsOrders, ...transfersOrders, ...localOffersOrders];
  const allDataset = buildDataset(allOrders);

  // Category Mix (for "all" dataset only)
  const categoryMix = [
    {
      category: 'Flights',
      orders: flightsOrders.length,
      spend: flightsOrders.reduce((sum, o) => sum + o.gmv, 0),
      orderShare: allOrders.length > 0 ? Math.round((flightsOrders.length / allOrders.length) * 1000) / 10 : 0,
      spendShare: allDataset.kpis.totalSpend > 0 ? Math.round((flightsOrders.reduce((sum, o) => sum + o.gmv, 0) / allDataset.kpis.totalSpend) * 1000) / 10 : 0
    },
    {
      category: 'Hotels',
      orders: hotelsOrders.length,
      spend: hotelsOrders.reduce((sum, o) => sum + o.gmv, 0),
      orderShare: allOrders.length > 0 ? Math.round((hotelsOrders.length / allOrders.length) * 1000) / 10 : 0,
      spendShare: allDataset.kpis.totalSpend > 0 ? Math.round((hotelsOrders.reduce((sum, o) => sum + o.gmv, 0) / allDataset.kpis.totalSpend) * 1000) / 10 : 0
    },
    {
      category: 'Airport Transfers',
      orders: transfersOrders.length,
      spend: transfersOrders.reduce((sum, o) => sum + o.gmv, 0),
      orderShare: allOrders.length > 0 ? Math.round((transfersOrders.length / allOrders.length) * 1000) / 10 : 0,
      spendShare: allDataset.kpis.totalSpend > 0 ? Math.round((transfersOrders.reduce((sum, o) => sum + o.gmv, 0) / allDataset.kpis.totalSpend) * 1000) / 10 : 0
    },
    {
      category: 'Local Offers',
      orders: localOffersOrders.length,
      spend: localOffersOrders.reduce((sum, o) => sum + o.gmv, 0),
      orderShare: allOrders.length > 0 ? Math.round((localOffersOrders.length / allOrders.length) * 1000) / 10 : 0,
      spendShare: allDataset.kpis.totalSpend > 0 ? Math.round((localOffersOrders.reduce((sum, o) => sum + o.gmv, 0) / allDataset.kpis.totalSpend) * 1000) / 10 : 0
    }
  ];

  allDataset.categoryMix = categoryMix;

  const datasets = {
    flights: buildDataset(flightsOrders),
    hotels: buildDataset(hotelsOrders),
    transfers: buildDataset(transfersOrders),
    localOffers: buildDataset(localOffersOrders),
    all: allDataset
  };

  return { categoryOptions, datasets };
};

// Format currency helper
export const formatCurrency = (value, currency = '£') => {
  if (value >= 1000000) {
    return `${currency}${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${currency}${(value / 1000).toFixed(1)}K`;
  }
  return `${currency}${value.toFixed(2)}`;
};

// Format percentage helper
export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

