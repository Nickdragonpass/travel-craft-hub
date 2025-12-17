// Widget Catalog
// Defines all available widgets that can be added to custom dashboards

export const widgetTypes = {
  KPI: 'kpi',
  CHART: 'chart',
  TABLE: 'table'
};

export const widgetCategories = {
  OVERVIEW: 'Program Overview',
  ENGAGEMENT: 'User Engagement',
  PERFORMANCE: 'Program Performance',
  FINANCIAL: 'Financial Impact'
};

export const widgetCatalog = [
  // Program Overview Widgets
  {
    id: 'kpi-eligible-members',
    name: 'Eligible Users',
    category: widgetCategories.OVERVIEW,
    type: widgetTypes.KPI,
    icon: '👥',
    description: 'Total number of customers eligible to participate in the program.'
  },
  {
    id: 'kpi-active-members',
    name: 'Active Users',
    category: widgetCategories.OVERVIEW,
    type: widgetTypes.KPI,
    icon: '📊',
    description: 'Number of users who engaged with the program at least once.'
  },
  {
    id: 'kpi-engagement-rate',
    name: 'Engagement Rate',
    category: widgetCategories.OVERVIEW,
    type: widgetTypes.KPI,
    icon: '📈',
    description: 'Percentage of eligible users actively engaging with the program.'
  },
  {
    id: 'kpi-gmv',
    name: 'GMV',
    category: widgetCategories.OVERVIEW,
    type: widgetTypes.KPI,
    icon: '💰',
    description: 'Gross Merchandise Value - Total value of all transactions.'
  },
  {
    id: 'kpi-total-orders',
    name: 'Total Orders',
    category: widgetCategories.OVERVIEW,
    type: widgetTypes.KPI,
    icon: '📦',
    description: 'Total count of all orders including entitlements and purchases.'
  },
  {
    id: 'kpi-cost-per-member',
    name: 'Cost per User',
    category: widgetCategories.OVERVIEW,
    type: widgetTypes.KPI,
    icon: '💵',
    description: 'Average operational cost per active user.'
  },
  {
    id: 'kpi-entitlement-utilization',
    name: 'Entitlement Utilization',
    category: widgetCategories.OVERVIEW,
    type: widgetTypes.KPI,
    icon: '🎫',
    description: 'Percentage of allocated benefits used by users.'
  },
  {
    id: 'kpi-customer-satisfaction',
    name: 'Customer Satisfaction',
    category: widgetCategories.OVERVIEW,
    type: widgetTypes.KPI,
    icon: '⭐',
    description: 'Customer Satisfaction Score (CSAT) based on user feedback.'
  },
  {
    id: 'chart-member-growth',
    name: 'User Growth Trends',
    category: widgetCategories.OVERVIEW,
    type: widgetTypes.CHART,
    icon: '📈',
    description: 'User growth trends over time showing eligible, active, and new users.'
  },
  {
    id: 'chart-order-breakdown',
    name: 'Order Breakdown',
    category: widgetCategories.OVERVIEW,
    type: widgetTypes.CHART,
    icon: '📊',
    description: 'Entitlement redemptions vs purchased orders over time.'
  },
  {
    id: 'chart-channel-distribution',
    name: 'Channel Distribution',
    category: widgetCategories.OVERVIEW,
    type: widgetTypes.CHART,
    icon: '📱',
    description: 'How users access the program by channel.'
  },
  {
    id: 'chart-orders-by-category',
    name: 'Orders by Category',
    category: widgetCategories.OVERVIEW,
    type: widgetTypes.CHART,
    icon: '📋',
    description: 'Order count and GMV by benefit category.'
  },
  {
    id: 'table-monthly-activity',
    name: 'Monthly Activity Summary',
    category: widgetCategories.OVERVIEW,
    type: widgetTypes.TABLE,
    icon: '📊',
    description: 'Monthly summary of users, orders, and value metrics.'
  },
  
  // User Engagement Widgets
  {
    id: 'kpi-mau',
    name: 'MAU',
    category: widgetCategories.ENGAGEMENT,
    type: widgetTypes.KPI,
    icon: '📊',
    description: 'Monthly Active Users - Unique users who engaged in the past 30 days.'
  },
  {
    id: 'kpi-dau',
    name: 'DAU',
    category: widgetCategories.ENGAGEMENT,
    type: widgetTypes.KPI,
    icon: '📅',
    description: 'Daily Active Users - Unique users who engaged in the past 24 hours.'
  },
  {
    id: 'kpi-mac',
    name: 'MAC',
    category: widgetCategories.ENGAGEMENT,
    type: widgetTypes.KPI,
    icon: '🛒',
    description: 'Monthly Active with Orders - Users who completed at least one booking.'
  },
  {
    id: 'kpi-repeat-users',
    name: 'Repeat Users',
    category: widgetCategories.ENGAGEMENT,
    type: widgetTypes.KPI,
    icon: '🔄',
    description: 'Users who have completed multiple transactions or bookings.'
  },
  {
    id: 'chart-engagement-funnel',
    name: 'User Engagement Funnel',
    category: widgetCategories.ENGAGEMENT,
    type: widgetTypes.CHART,
    icon: '🔽',
    description: 'Conversion from eligible to repeat users.'
  },
  {
    id: 'chart-daily-active-trends',
    name: 'Daily Active Trends',
    category: widgetCategories.ENGAGEMENT,
    type: widgetTypes.CHART,
    icon: '📈',
    description: 'DAU, WAU, MAU over time.'
  },
  {
    id: 'chart-entitlement-utilization',
    name: 'Entitlement Utilization by Type',
    category: widgetCategories.ENGAGEMENT,
    type: widgetTypes.CHART,
    icon: '🎫',
    description: 'Usage breakdown by benefit type.'
  },
  {
    id: 'table-member-segmentation',
    name: 'User Segmentation',
    category: widgetCategories.ENGAGEMENT,
    type: widgetTypes.TABLE,
    icon: '👥',
    description: 'User segments with orders and value metrics.'
  },
  
  // Program Performance Widgets
  {
    id: 'kpi-booking-confirmation',
    name: 'Order Confirmation',
    category: widgetCategories.PERFORMANCE,
    type: widgetTypes.KPI,
    icon: '✓',
    description: 'Percentage of order attempts that are successfully confirmed.'
  },
  {
    id: 'kpi-automation-rate',
    name: 'Automation Rate',
    category: widgetCategories.PERFORMANCE,
    type: widgetTypes.KPI,
    icon: '🤖',
    description: 'Percentage of bookings processed automatically without human intervention.'
  },
  {
    id: 'kpi-csat',
    name: 'CSAT',
    category: widgetCategories.PERFORMANCE,
    type: widgetTypes.KPI,
    icon: '⭐',
    description: 'Customer Satisfaction Score - Measures user satisfaction on a 1-5 scale.'
  },
  {
    id: 'kpi-nps',
    name: 'NPS',
    category: widgetCategories.PERFORMANCE,
    type: widgetTypes.KPI,
    icon: '👍',
    description: 'Net Promoter Score - Measures user loyalty and likelihood to recommend.'
  },
  {
    id: 'kpi-fcr',
    name: 'FCR',
    category: widgetCategories.PERFORMANCE,
    type: widgetTypes.KPI,
    icon: '🎯',
    description: 'First Contact Resolution - Percentage of inquiries resolved on first interaction.'
  },
  {
    id: 'kpi-response-time',
    name: 'Response Time',
    category: widgetCategories.PERFORMANCE,
    type: widgetTypes.KPI,
    icon: '⏱️',
    description: 'Average time to respond to user inquiries or support requests.'
  },
  {
    id: 'chart-quality-trends',
    name: 'Quality Metrics Over Time',
    category: widgetCategories.PERFORMANCE,
    type: widgetTypes.CHART,
    icon: '📈',
    description: 'CSAT, NPS, and FCR trends over time.'
  },
  {
    id: 'chart-sla-performance',
    name: 'SLA Performance by Channel',
    category: widgetCategories.PERFORMANCE,
    type: widgetTypes.CHART,
    icon: '📊',
    description: 'Service level compliance by channel.'
  },
  {
    id: 'table-channel-performance',
    name: 'Channel Performance Summary',
    category: widgetCategories.PERFORMANCE,
    type: widgetTypes.TABLE,
    icon: '📋',
    description: 'Channel performance metrics including volume, SLA, response time, and CSAT.'
  },
  
  // Financial Impact Widgets
  {
    id: 'kpi-transaction-revenue',
    name: 'Transaction Revenue',
    category: widgetCategories.FINANCIAL,
    type: widgetTypes.KPI,
    icon: '💰',
    description: 'Revenue from user-paid bookings and transactions.'
  },
  {
    id: 'kpi-program-roi',
    name: 'Program ROI',
    category: widgetCategories.FINANCIAL,
    type: widgetTypes.KPI,
    icon: '📈',
    description: 'Return on Investment multiplier showing value generated per unit of cost.'
  },
  {
    id: 'kpi-roi-percentage',
    name: 'ROI %',
    category: widgetCategories.FINANCIAL,
    type: widgetTypes.KPI,
    icon: '🎯',
    description: 'Return on Investment percentage.'
  },
  {
    id: 'chart-revenue-trends',
    name: 'Transaction Revenue Trends',
    category: widgetCategories.FINANCIAL,
    type: widgetTypes.CHART,
    icon: '📈',
    description: 'User-paid bookings over time.'
  },
  {
    id: 'chart-budget-vs-actual',
    name: 'Budget vs Actual',
    category: widgetCategories.FINANCIAL,
    type: widgetTypes.CHART,
    icon: '📊',
    description: 'Comparison between forecasted and actual revenue.'
  },
  {
    id: 'chart-cost-breakdown',
    name: 'Cost Breakdown',
    category: widgetCategories.FINANCIAL,
    type: widgetTypes.CHART,
    icon: '🥧',
    description: 'Operational cost distribution across categories.'
  },
  {
    id: 'table-monthly-financial',
    name: 'Monthly Financial Summary',
    category: widgetCategories.FINANCIAL,
    type: widgetTypes.TABLE,
    icon: '📋',
    description: 'Monthly financial metrics including revenue, GMV, cost, and ROI.'
  }
];

export const getWidgetById = (widgetId) => {
  return widgetCatalog.find(widget => widget.id === widgetId);
};

export const getWidgetsByCategory = (category) => {
  return widgetCatalog.filter(widget => widget.category === category);
};

export const getWidgetsByType = (type) => {
  return widgetCatalog.filter(widget => widget.type === type);
};

export const getAllCategories = () => {
  return Object.values(widgetCategories);
};

