// Metric Definitions
// Comprehensive definitions for all analytics metrics to display in tooltips

export const metricDefinitions = {
  // Program Overview Metrics
  'Eligible Members': 'Total number of users eligible to participate in the program.',
  'Eligible Users': 'Total number of users eligible to participate in the program.',
  
  'Active Members': 'Users who purchased or redeemed at least 1 order in the last 12 months.',
  'Active Users': 'Users who purchased or redeemed at least 1 order in the last 12 months.',
  
  'Engagement Rate': 'Percentage of eligible users actively engaging. Calculated as (Active Users / Eligible Users) × 100%.',
  
  'GMV': 'Gross Merchandise Value - Total value of all transactions including bookings and redemptions.',
  
  'Program Health': 'Composite score (out of 10) combining engagement, satisfaction, utilization, and growth trends.',
  
  'Cost per Member': 'Average operational cost per active user. Lower values indicate better cost efficiency.',
  'Cost per User': 'Average operational cost per active user. Lower values indicate better cost efficiency.',
  
  'Entitlement Utilization': 'Percentage of allocated benefits used by users within the selected time period.',
  
  'Customer Satisfaction': 'Customer Satisfaction Score (CSAT) based on user feedback. Measured on a 1-5 scale.',
  
  // User Engagement Metrics
  'MAU': 'Monthly Active Users - Unique users who engaged with the program in the past 30 days.',
  
  'DAU': 'Daily Active Users - Unique users who engaged with the program in the past 24 hours.',
  
  'MAC': 'Monthly Active with Orders - Users who completed at least one booking in the past 30 days.',

  'Total Requests': 'Count of all assisted user requests in the selected time period. A request includes informational requests (recommendations, Q&A, trip planning) and order-related requests.',

  'User Penetration': 'Share of total users who engaged in the selected time period (made a request or placed an order).',
  
  'Engagement Depth': 'Average number of interactions per active user within the selected period.',
  
  'Repeat Users': 'Users who have completed multiple transactions or bookings.',
  
  'Retention Rate': 'Percentage of users who remain active over a specific time period.',
  
  // Program Performance Metrics
  'Booking Confirmation': 'Percentage of booking attempts that are successfully confirmed.',

  'Order Confirmation': 'Percentage of orders attempts that are successfully confirmed.',
  
  'Automation Rate': 'Percentage of bookings processed automatically without human intervention.',
  
  'CSAT': 'Customer Satisfaction Score - Measures user satisfaction on a 1-5 scale.',
  
  'NPS': 'Net Promoter Score - Measures user loyalty and likelihood to recommend. Range: -100 to +100.',
  
  'FCR': 'First Contact Resolution - Percentage of inquiries resolved on the first interaction.',
  
  'Response Time': 'Average time to respond to user inquiries or support requests.',
  
  // Financial Impact Metrics
  'Subscription Revenue': 'Revenue generated from subscription fees and subscription payments.',
  
  'Transaction Revenue': 'Revenue from user-paid bookings and transactions, excluding entitlements.',
  
  'Revenue Mix': 'Distribution of revenue sources between subscription fees and transaction commissions.',
  
  'Program ROI': 'Return on Investment multiplier. Value generated per unit of cost (e.g., 3.2x = £3.20 per £1.00 invested).',
  
  'Budget vs Actual': 'Comparison between forecasted and actual revenue. Positive variance indicates exceeding expectations.',
  
  'Cost Breakdown': 'Breakdown of program costs across operational categories.',
  
  'Entitlement Value': 'Monetary value of benefits allocated versus value actually utilized.',
  
  'ROI %': 'Return on Investment percentage. Calculated as ((Revenue - Costs) / Costs) × 100%.',
  
  'WAU': 'Weekly Active Users - Unique users who engaged with the program in the past 7 days.',
  
  // Order Metrics
  'Total Orders': 'Total count of all orders including entitlement redemptions and user-paid purchases.',
  
  'Entitlement Orders': 'Orders where users used allocated benefits (lounge passes, transfers, etc.) without payment.',
  
  'Purchased Orders': 'Orders where users paid for services via cash, card, or points beyond entitlements.',
  
  // Monthly Activity Summary Table Columns
  'Month': 'Calendar month for which metrics are reported.',
  
  'New Members': 'Number of users who joined the program during the selected month.',
  'New Users': 'Number of users who joined the program during the selected month.',
  
  'Total Members': 'Total number of eligible users in the program at the end of the selected month.',
  'Total Users': 'Total number of eligible users in the program at the end of the selected month.',
  
  'Entitlement': 'Orders where users used allocated benefits during the month (no payment required).',
  
  'Purchased': 'Orders where users paid for services during the month.',
  
  'Value': 'Total monetary value (GMV) of all transactions processed during the month.',
  
  'Utilization': 'Percentage of allocated benefits used by users during the month.',
  
  'Conversion Rate': 'Percentage of total users that resulted in an order. Calculated as (Total Orders / Total Users) × 100%.',

  'Request Rate': 'Percentage of total users that made at least one request. Calculated as (Users with Requests / Total Users) × 100%.'
};

// Get definition for a metric
export const getMetricDefinition = (metricName) => {
  return metricDefinitions[metricName] || 'Metric definition not available.';
};

// Get all definitions as an object
export const getAllDefinitions = () => {
  return metricDefinitions;
};

