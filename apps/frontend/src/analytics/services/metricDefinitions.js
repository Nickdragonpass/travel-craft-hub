// Metric Definitions
// Comprehensive definitions for all analytics metrics to display in tooltips

export const metricDefinitions = {
  // Program Overview Metrics
  'Eligible Members': 'Total number of customers eligible to participate in the program.',
  
  'Active Members': 'Number of members who purchased/redeemed at least 1 order within the last 12 months. Count of unique members with at least 1 order purchased/redeemed within the last 12 months.',
  
  'Engagement Rate': 'Percentage of eligible members actively engaging with the program. Calculated as (Active Members / Eligible Members) × 100%.',
  
  'GMV': 'Gross Merchandise Value - Total value of all transactions including member-paid bookings and entitlement redemptions.',
  
  'Program Health': 'Composite score (out of 10) combining engagement, satisfaction, utilization, and growth trends.',
  
  'Cost per Member': 'Average operational cost per active member. Lower values indicate better cost efficiency.',
  
  'Entitlement Utilization': 'Percentage of allocated benefits used by members within the selected time period.',
  
  'Customer Satisfaction': 'Customer Satisfaction Score (CSAT) based on member feedback. Measured on a 1-5 scale.',
  
  // Member Engagement Metrics
  'MAU': 'Monthly Active Users - Unique members who engaged with the program in the past 30 days.',
  
  'DAU': 'Daily Active Users - Unique members who engaged with the program in the past 24 hours.',
  
  'MAC': 'Monthly Active with Orders - Members who completed at least one booking in the past 30 days.',
  
  'Engagement Depth': 'Average number of interactions per active member within the selected period.',
  
  'Repeat Users': 'Members who have completed multiple transactions or bookings.',
  
  'Retention Rate': 'Percentage of members who remain active over a specific time period.',
  
  // Program Performance Metrics
  'Booking Confirmation': 'Percentage of booking attempts that are successfully confirmed.',
  
  'Automation Rate': 'Percentage of bookings processed automatically without human intervention.',
  
  'CSAT': 'Customer Satisfaction Score - Measures member satisfaction on a 1-5 scale.',
  
  'NPS': 'Net Promoter Score - Measures member loyalty and likelihood to recommend. Scores range from -100 to +100.',
  
  'FCR': 'First Contact Resolution - Percentage of inquiries resolved on the first interaction.',
  
  'Response Time': 'Average time to respond to member inquiries or support requests.',
  
  // Financial Impact Metrics
  'Subscription Revenue': 'Revenue generated from membership fees and subscription payments.',
  
  'Transaction Revenue': 'Revenue from member-paid bookings and transactions, excluding entitlements.',
  
  'Revenue Mix': 'Distribution of revenue sources between subscription fees and transaction commissions.',
  
  'Program ROI': 'Return on Investment multiplier. Shows value generated per unit of cost invested (e.g., 3.2x = £3.20 returned per £1.00 invested).',
  
  'Budget vs Actual': 'Comparison between forecasted and actual revenue. Positive variance indicates exceeding expectations.',
  
  'Cost Breakdown': 'Breakdown of program costs across operational categories.',
  
  'Entitlement Value': 'Monetary value of benefits allocated versus value actually utilized.',
  
  'ROI %': 'Return on Investment percentage. Calculated as ((Revenue - Costs) / Costs) × 100%.',
  
  'WAU': 'Weekly Active Users - Unique members who engaged with the program in the past 7 days.',
  
  // Order Metrics
  'Total Orders': 'Total count of all orders including entitlement redemptions and member-paid purchases.',
  
  'Entitlement Orders': 'Orders where members used allocated benefits (lounge passes, transfers, etc.) without payment.',
  
  'Purchased Orders': 'Orders where members paid for services via cash, card, or points beyond entitlements.',
  
  // Monthly Activity Summary Table Columns
  'Month': 'Calendar month for which metrics are reported.',
  
  'New Members': 'Number of members who joined the program during the selected month.',
  
  'Total Members': 'Total number of eligible members in the program at the end of the selected month.',
  
  'Entitlement': 'Orders where members used allocated benefits during the month (no payment required).',
  
  'Purchased': 'Orders where members paid for services during the month.',
  
  'Value': 'Total monetary value (GMV) of all transactions processed during the month.',
  
  'Utilization': 'Percentage of allocated benefits used by members during the month.',
  
  'Conversion Rate': 'Percentage of total members who placed at least one order. Calculated as (Total Orders / Total Members) × 100%.'
};

// Get definition for a metric
export const getMetricDefinition = (metricName) => {
  return metricDefinitions[metricName] || 'Metric definition not available.';
};

// Get all definitions as an object
export const getAllDefinitions = () => {
  return metricDefinitions;
};

