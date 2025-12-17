# PRD: Financial Tab (Previously: Financial Impact)

## Overview
## MVP Scope
This PRD applies to **Analytics → Financial** (MVP).

## Overview
The Financial tab provides financial metrics and revenue analysis. It focuses on user-paid transaction revenue, GMV, revenue mix, conversion, budget performance, and entitlement value utilization.

## Objectives
- Track revenue streams (transaction revenue, GMV, revenue mix)
- Monitor program costs and budget performance
- Track conversion
- Analyze budget performance vs actuals
- Understand entitlement value utilization

## Key Performance Indicators (KPIs)

### Financial KPI Cards
1. **Transaction Revenue**
   - Definition: Revenue from user-paid bookings and transactions, excluding entitlements
   - Display: Currency formatted value with trend indicator
   - Trend Type: Positive (higher is better)

2. **GMV (Gross Merchandise Value)**
   - Definition: Total value of all transactions including user-paid bookings and entitlement redemptions
   - Display: Currency formatted value with trend indicator
   - Trend Type: Positive (higher is better)

3. **Revenue Mix**
   - Definition: Distribution of revenue sources between subscription fees and transaction revenue
   - Display: Percentage split (e.g., “68% / 32%”) with neutral trend

4. **Conversion Rate**
   - Definition: Percentage of total users that resulted in an order. Calculated as (Total Orders / Total Users) × 100%.
   - Display: Percentage with trend indicator
   - Trend Type: Positive (higher is better)

## Charts and Visualizations

### Transaction Revenue Trends
- **Type**: Area Chart
- **Data**: Transaction revenue over time
- **Time Range**: 12 months
- **Series**: Transaction Revenue (red area fill)
- **Purpose**: Visualize revenue growth trends
- **Features**: Gradient fill for visual appeal

### Two-Column Layout Charts

#### Budget vs Actual
- **Type**: Grouped Bar Chart
- **Data**: Forecast vs actual revenue comparison
- **Time Range**: Last 3 months
- **Series**:
  - Forecast (gray bars)
  - Actual (green bars)
- **Purpose**: Compare budgeted vs actual performance
- **Features**: Visual variance indication

#### Cost Breakdown
- Not included in MVP (removed from the Financial UI).

### Two-Column Entitlement Analysis

#### Entitlement Value Utilization
- **Type**: Gauge/Progress Indicator
- **Data**: Utilized value vs allocated value
- **Display**:
  - Progress bar showing utilization percentage
  - Color-coded (green >70%, yellow >50%, red ≤50%)
  - Utilization percentage displayed on bar
  - Allocated vs used value in subtitle
- **Purpose**: Visual representation of entitlement usage

#### Value by Benefit Type
- **Type**: Grouped Bar Chart
- **Data**: Allocated vs used value by benefit category
- **Series**:
  - Allocated (gray bars)
  - Used (green bars)
- **Purpose**: Identify which benefits provide value

## Tables

### Monthly Financial Summary Table
- **Purpose**: Month-over-month financial overview
- **Columns**:
  1. **Month** - Calendar month
  2. **Transaction Revenue** - User-paid revenue
  3. **GMV** - Gross Merchandise Value
  4. **Cost** - Operational costs
  5. **vs Budget** - Variance from budget with trend indicator
- **Display**: Last 6 months in reverse chronological order
- **Features**:
  - All currency values formatted
  - Budget variance with +/- indicators
  - Color-coded trends

## Data Filtering

### Time Period Filter
- All metrics respect the global time period filter
- Revenue trends chart shows 12 months of historical data
- Budget vs Actual shows last 3 months
- Monthly Financial Summary shows last 6 months within filtered period
- Entitlement analysis uses current period data

## Metric Definitions

### Tooltips Available
- **Transaction Revenue**: Revenue from user-paid bookings and transactions, excluding entitlements
- **GMV**: Gross Merchandise Value - Total value of all transactions including user-paid bookings and entitlement redemptions
- **Revenue Mix**: Distribution of revenue sources between subscription fees and transaction revenue
- **Conversion Rate**: Percentage of total users that resulted in an order. Calculated as (Total Orders / Total Users) × 100%.
- **Budget vs Actual**: Comparison between forecasted and actual revenue. Positive variance indicates exceeding expectations
- **Entitlement Value**: Monetary value of benefits allocated versus value actually utilized

## ROI Metrics
- Not included in MVP Financial UI.

## Budget Variance Display
- Positive variance: Green indicator with ↑ arrow
- Negative variance: Neutral indicator with → arrow
- Format: ±X.X% with trend indicator

## Loading and Error States

### Loading State
- Display loading indicator while fetching data
- Show "Loading financial metrics..." message
- Maintain layout structure during load

### Error State
- Display error message if data fails to load
- Allow retry without page refresh
- Show "Error loading data. Please try again." message

## Data Structure

| Data Field | Definition | Calculation | Data Source |
|------------|------------|-------------|-------------|
| transactionRevenue | Revenue from user-paid bookings and transactions, excluding entitlements | Sum of all revenue from user-paid bookings and transaction fees | |
| transactionRevenueTrend | Percentage change in transaction revenue compared to previous period | ((Current Period - Previous Period) / Previous Period) × 100% | |
| gmv | Gross Merchandise Value - Total value of all transactions | Sum of all transaction values including user-paid bookings and entitlement redemptions | |
| gmvTrend | Percentage change in GMV compared to previous period | ((Current Period - Previous Period) / Previous Period) × 100% | |
| conversionRate | Percentage of total users that resulted in an order | (Total Orders / Total Users) × 100% | |
| subscriptionRevenue | Revenue generated from subscription fees and subscription payments | Sum of all subscription revenue | |
| subscriptionRevenueTrend | Percentage change in subscription revenue compared to previous period | ((Current Period - Previous Period) / Previous Period) × 100% | |
| revenueMix | Distribution of revenue sources | Object containing subscription and transaction percentages | |
| revenueMix.subscription | Percentage of revenue from subscription fees | (Subscription Revenue / Total Revenue) × 100% | |
| revenueMix.transaction | Percentage of revenue from transactions | (Transaction Revenue / Total Revenue) × 100% | |
| revenueBreakdown | Array of monthly revenue breakdown data objects | Collection of monthly revenue by source | |
| revenueBreakdown[].month | Calendar month identifier | Month extraction from transaction dates | |
| revenueBreakdown[].subscription | Subscription revenue for the month | Sum of subscription revenue in the month | |
| revenueBreakdown[].transaction | Transaction revenue for the month | Sum of transaction revenue in the month | |
| budgetVsActual | Array of budget vs actual comparison data objects | Collection of forecast vs actual revenue comparisons | |
| budgetVsActual[].month | Calendar month identifier | Month for budget comparison | |
| budgetVsActual[].forecast | Forecasted revenue for the month | Budgeted/forecasted revenue amount | |
| budgetVsActual[].actual | Actual revenue for the month | Actual revenue amount realized | |
| budgetVsActual[].variance | Variance percentage from budget | ((Actual - Forecast) / Forecast) × 100% | |
| costBreakdown | Not displayed in MVP Financial UI | - | |
| monthlyFinancial | Array of monthly financial summary data objects | Collection of monthly financial metrics | |
| monthlyFinancial[].month | Calendar month identifier | Month for financial summary | |
| monthlyFinancial[].subscriptionRevenue | Subscription revenue for the month | Sum of subscription revenue in the month | |
| monthlyFinancial[].transactionRevenue | Transaction revenue for the month | Sum of transaction revenue in the month | |
| monthlyFinancial[].gmv | Gross Merchandise Value for the month | Sum of all transaction values in the month | |
| monthlyFinancial[].cost | Operational costs for the month | Sum of all operational costs in the month | |
| monthlyFinancial[].vsBudget | Variance from budget for the month | ((Actual Revenue - Budgeted Revenue) / Budgeted Revenue) × 100% | |
| entitlementValue | Entitlement value analysis object | Object containing entitlement value metrics | |
| entitlementValue.allocated | Total monetary value of benefits allocated | Sum of monetary value of all allocated benefits | |
| entitlementValue.used | Total monetary value of benefits used | Sum of monetary value of all used/redeemed benefits | |
| entitlementValue.utilization | Entitlement value utilization percentage | (Used Value / Allocated Value) × 100% | |
| entitlementValueByType | Array of entitlement value data by benefit type | Collection of entitlement value metrics by benefit category | |
| entitlementValueByType[].type | Benefit type name (e.g., Lounge Access, Transfers, Fast Track) | Benefit category classification | |
| entitlementValueByType[].allocated | Monetary value allocated for this benefit type | Sum of allocated value for this benefit type | |
| entitlementValueByType[].used | Monetary value used for this benefit type | Sum of used value for this benefit type | |
| entitlementValueByType[].value | Utilization value or identifier | Benefit-specific value metric | |

