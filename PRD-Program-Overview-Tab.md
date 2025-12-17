Overview
The Overview tab provides insights and metrics into overall program health, user growth, engagement rates, and operational metrics. This is the default landing view for the Analytics section.

Objectives
- Provide high-level program health metrics at a glance
- Track user growth and engagement trends
- Monitor order volumes and entitlement utilization
- Understand channel distribution and benefit category performance
- Enable drill-down via KPI click to open a trend modal (chart view)

Key Performance Indicators (KPIs)

First Row of KPI Cards
1. Eligible Users
  - Definition: Total number of users eligible to participate in the program
  - Display: Formatted number with trend indicator
  - Trend: Percentage change from previous period

2. Active Users
  - Definition: Users who purchased/redeemed at least 1 order within the last 12 months
  - Display: Formatted number with trend indicator
  - Trend: Percentage change from previous period

3. Engagement Rate
  - Definition: Percentage of eligible users that are active (with orders in last 12 months)
  - Calculation: (Active Users / Eligible Users) × 100%
  - Display: Percentage with trend indicator

4. GMV (Gross Merchandise Value)
  - Definition: Total value of all transactions including user-paid bookings and entitlement redemptions
  - Display: Currency formatted value with trend indicator

Second Row of KPI Cards
5. Total Orders
  - Definition: Total count of all orders including entitlement redemptions and user-paid purchases
  - Display: Formatted number with trend indicator

6. Entitlement Utilization
  - Definition: Percentage of allocated benefits used by users within the selected time period
  - Display: Percentage with trend indicator

7. Customer Satisfaction
  - Definition: Customer Satisfaction Score (CSAT) based on user feedback
  - Display: Score out of 5 (e.g., "4.5/5") with trend indicator

KPI Interactions (Update)
- All KPI cards are clickable and open a trend modal that shows the chart view for the selected metric.

Monthly Activity Summary Table

Table Position
- Displayed directly after the two rows of KPI cards

Columns
1. Month - Calendar month for which metrics are reported
2. New Users - Number of users who joined the program during the month
3. Active Users - Number of active users in the month
4. Total Users - Total number of eligible users at end of month
5. Total Orders - Total count of orders in the month
6. Entitlement - Orders where users used allocated benefits (no payment required)
7. Purchased - Orders where users paid for services
8. Value - Total monetary value (GMV) of all transactions
9. Utilization - Percentage of allocated benefits used
10. Conversion Rate - Percentage of total users who placed at least one order
  - Calculation: (Total Orders / Total Users) × 100%

Features
- Last 6 months displayed in reverse chronological order
- Export functionality available via export button
- Tooltip definitions on column headers
- Responsive table with horizontal scrolling if needed

Charts and Visualizations

Order Breakdown Chart
- Type: Bar Chart
- Data: Monthly breakdown of entitlement orders vs purchased orders
- Time Range: Last 6 months
- Axes: Months on X-axis, order count on Y-axis
- Series:
  - Entitlement Orders
  - Purchased Orders

Program Reach & Adoption
- Type: Multi-line Chart
- Data: User growth trends over time
- Time Range: 12 months
- Series:
  - Eligible Users
  - Active Users
  - New Users

User Activity Breakdown
- Type: Grouped Bar Chart
- Data: Monthly comparison of new vs active users
- Time Range: Last 6 months
- Series:
  - New Users
  - Active Users

Channel Distribution
- Type: Pie Chart
- Data: How users access the program by channel
- Segments: WhatsApp, Live Chat, Email, Phone
- Display: Percentage distribution with labels

Orders by Category
- Type: Composed Chart with Dual Y-Axes
- Data: Order count and GMV by benefit category
- Categories (MVP): Flights, Hotels, Airport Transfers, Local Offers
- Left Y-Axis: Order Count
- Right Y-Axis: GMV (currency)
- Series:
  - Order Count bars
  - GMV bars

Data Filtering

Time Period Filter
- All metrics respect the global time period filter
- Entitlement Utilization uses the selected time period (not fixed to YTD)
- Charts display data for the selected period
- Tables show last 6 months within the filtered period

Metric Definitions

Tooltips
- All KPI cards include info icons with hover tooltips
- Tooltips provide concise 1-2 sentence definitions
- Table column headers include tooltip definitions

Available Definitions
- Eligible Users: Total number of users eligible to participate in the program
- Active Users: Users who purchased or redeemed at least 1 order in the last 12 months
- Engagement Rate: Percentage of eligible users that are active. Calculated as (Active Users / Eligible Users) × 100%
- GMV: Gross Merchandise Value - Total value of all transactions including user-paid bookings and entitlement redemptions
- Entitlement Utilization: Percentage of allocated benefits used by users within the selected time period
- Customer Satisfaction: Customer Satisfaction Score (CSAT) based on user feedback. Measured on a 1-5 scale
- Total Orders: Total count of all orders including entitlement redemptions and user-paid purchases
- Entitlement Orders: Orders where users used allocated benefits (no payment required)
- Purchased Orders: Orders where users paid for services

Export Functionality

Monthly Activity Summary Export
- Export button available in table header
- Format: CSV
- Includes all table columns
- Includes metadata (time period, export date, view name)
- Filename format: program-overview-monthly-activity-YYYY-MM-DD.csv

Loading and Error States

Loading State
- Display loading indicator while fetching data
- Show "Loading program metrics..." message
- Maintain layout structure during load

Error State
- Display error message if data fails to load
- Allow retry without page refresh
- Show "Error loading data. Please try again." message

Data Structure

| Data Field | Definition | Calculation | Data Source |
|------------|------------|-------------|-------------|
| eligibleMembers | Total number of users eligible to participate in the program | Count of all users with program eligibility | |
| eligibleMembersTrend | Percentage change in eligible users compared to previous period | ((Current Period - Previous Period) / Previous Period) × 100% | |
| activeMembers | Users who purchased/redeemed at least 1 order within the last 12 months | Count of unique users with at least 1 order purchased/redeemed within the last 12 months | |
| activeMembersTrend | Percentage change in active users compared to previous period | ((Current Period - Previous Period) / Previous Period) × 100% | |
| engagementRate | Percentage of eligible users that are active (with orders in last 12 months) | (Active Users / Eligible Users) × 100% | |
| engagementRateTrend | Percentage point change in engagement rate compared to previous period | Current Period Rate - Previous Period Rate | |
| gmv | Gross Merchandise Value - Total value of all transactions | Sum of all transaction values including user-paid bookings and entitlement redemptions | |
| gmvTrend | Percentage change in GMV compared to previous period | ((Current Period - Previous Period) / Previous Period) × 100% | |
| totalOrders | Total count of all orders including entitlement redemptions and user-paid purchases | Count of all orders regardless of payment type | |
| totalOrdersTrend | Percentage change in total orders compared to previous period | ((Current Period - Previous Period) / Previous Period) × 100% | |
| entitlementUtilization | Percentage of allocated benefits used by users within the selected time period | (Benefits Used / Benefits Allocated) × 100% | |
| entitlementUtilizationTrend | Percentage point change in entitlement utilization compared to previous period | Current Period Utilization - Previous Period Utilization | |
| customerSatisfaction | Customer Satisfaction Score (CSAT) based on user feedback | Average of all CSAT survey responses on a 1-5 scale | |
| customerSatisfactionTrend | Change in CSAT score compared to previous period | Current Period Score - Previous Period Score | |
| monthlyActivity | Array of monthly activity data objects | Collection of monthly metrics grouped by calendar month | |
| monthlyActivity[].month | Calendar month identifier (YYYY-MM format or month name) | Month extraction from transaction/user activity dates | |
| monthlyActivity[].newMembers | Number of users who joined the program during the month | Count of users with first engagement in the month | |
| monthlyActivity[].activeMembers | Number of active users in the month | Count of unique users active in the month | |
| monthlyActivity[].totalMembers | Total number of eligible users at end of month | Count of all eligible users as of month end | |
| monthlyActivity[].transactions | Total count of orders in the month | Count of all orders processed in the month | |
| monthlyActivity[].entitlementOrders | Orders where users used allocated benefits (no payment required) | Count of orders where payment method was entitlement/redemption | |
| monthlyActivity[].purchasedOrders | Orders where users paid for services | Count of orders where payment method was cash, card, or points | |
| monthlyActivity[].value | Total monetary value (GMV) of all transactions processed during the month | Sum of all transaction values in the month | |
| monthlyActivity[].utilization | Percentage of allocated benefits used by users during the month | (Benefits Used in Month / Benefits Allocated for Month) × 100% | |
| Conversion Rate | Percentage of total users who placed at least one order | (Total Orders / Total Users) × 100% | |
| memberGrowth | Array of monthly user growth data objects | Collection of monthly user counts for trend visualization | |
| memberGrowth[].month | Calendar month identifier | Month extraction from user activity dates | |
| memberGrowth[].eligible | Count of eligible users in the month | Total eligible users as of month end | |
| memberGrowth[].active | Count of active users in the month | Users who purchased/redeemed at least 1 order within the last 12 months | |
| memberGrowth[].new | Count of new users who joined in the month | Users with first engagement/registration in the month | |
| orderBreakdown | Array of monthly order breakdown data objects | Collection of monthly order counts by type | |
| orderBreakdown[].month | Calendar month identifier | Month extraction from order dates | |
| orderBreakdown[].entitlement | Count of entitlement orders in the month | Orders using allocated benefits | |
| orderBreakdown[].purchased | Count of purchased orders in the month | Orders with user payment | |
| channelDistribution | Array of channel distribution data objects | Collection of channel access percentages | |
| channelDistribution[].name | Channel name (WhatsApp, Live Chat, Email, Phone) | Channel identifier from interaction source | |
| channelDistribution[].value | Percentage of interactions via this channel | (Channel Interactions / Total Interactions) × 100% | |
| channelDistribution[].count | Total count of interactions via this channel | Count of interactions originating from this channel | |
| ordersByCategory | Array of order data by benefit category | Collection of order counts and GMV by category | |
| ordersByCategory[].category | Benefit category name (MVP: Flights, Hotels, Airport Transfers, Local Offers) | Category classification from order data | |
| ordersByCategory[].orderCount | Total count of orders for this category | Count of orders classified in this category | |
| ordersByCategory[].gmv | Gross Merchandise Value for this category | Sum of all transaction values for orders in this category | |


