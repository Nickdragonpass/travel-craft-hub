# PRD: Program Performance Tab

## Overview
The Program Performance tab focuses on operational quality metrics, service level agreements (SLA), and customer satisfaction indicators. This tab helps program managers monitor service delivery quality across all channels.

## Objectives
- Track order confirmation and automation rates
- Monitor customer satisfaction scores (CSAT, NPS)
- Measure service quality metrics (FCR, response time)
- Analyze channel performance and SLA compliance

## Key Performance Indicators (KPIs)

### Quality Scorecard KPI Cards
1. **Order Confirmation**
   - Tile subtitle: Successfully confirmed orders
   - Modal subtitle / definition: Percentage of orders attempts that are successfully confirmed.
   - Display: Percentage with trend indicator
   - Trend Type: Positive (higher is better)

2. **Automation Rate**
   - Definition: Percentage of bookings processed automatically without human intervention
   - Display: Percentage with trend indicator
   - Trend Type: Positive (higher is better)

3. **CSAT (Customer Satisfaction)**
   - Definition: Customer Satisfaction Score - Measures user satisfaction on a 1-5 scale
   - Display: Score out of 5 (e.g., "4.5/5") with trend indicator
   - Trend Type: Positive (higher is better)

4. **NPS (Net Promoter Score)**
   - Definition: Measures user loyalty and likelihood to recommend. Scores range from -100 to +100
   - Display: Numeric score with trend indicator
   - Trend Type: Positive (higher is better)

5. **FCR (First Contact Resolution)**
   - Definition: Percentage of inquiries resolved on the first interaction
   - Display: Percentage with trend indicator
   - Trend Type: Positive (higher is better)

6. **Response Time**
   - Definition: Average time to respond to user inquiries or support requests
   - Display: Time in minutes (e.g., "2.4min") with trend indicator
   - Trend Type: Negative (lower is better, opposite trend indicator)

## Charts and Visualizations

### Quality Metrics Over Time
- **Type**: Multi-line Chart
- **Data**: Quality metrics trends over time
- **Time Range**: 6 months
- **Series**:
  - CSAT (red line)
  - NPS (purple line)
  - FCR % (green line)
- **Purpose**: Track quality trends over time

### Two-Column Layout Charts

#### SLA Performance by Channel
- **Type**: Horizontal Bar Chart
- **Data**: SLA compliance percentage by channel
- **Channels (UI Channels)**: WhatsApp, Live Chat, Email, Phone
- **Display**:
  - Channels on Y-axis
  - SLA percentage on X-axis (0-100%)
  - Color-coded bars per channel
- **Purpose**: Compare SLA compliance across channels

#### Channel Comparison
- **Type**: Grouped Bar Chart
- **Data**: Volume vs Quality metrics by channel
- **Series**:
  - Volume (navy bars)
  - CSAT (red bars)
- **Purpose**: Compare volume and quality across channels

## Tables

### Channel Performance Summary Table
- **Purpose**: Comprehensive channel performance overview
- **Columns**:
  1. **Channel** - Communication channel name
  2. **Volume** - Number of interactions/requests
  3. **SLA %** - Service level agreement compliance percentage
  4. **Response Time** - Average response time in minutes
  5. **FCR** - First Contact Resolution percentage
  6. **CSAT** - Customer Satisfaction Score
  7. **Status** - Overall status indicator (Excellent, Good, Fair)

### Table Features
- Status indicators with visual icons (✅/⚠️)
- All metrics formatted appropriately
- Color-coded status cells
- Responsive design with horizontal scrolling if needed

### Status Definitions
- **Excellent**: All metrics exceed targets
- **Good**: Metrics meet or slightly exceed targets
- **Fair**: Metrics below targets but acceptable
- **Poor**: Metrics significantly below targets

## Data Filtering

### Time Period Filter
- All metrics respect the global time period filter
- Quality trends chart shows 6 months of historical data
- Channel performance table uses selected period
- Trend indicators compare current period to previous period

## Metric Definitions

### Tooltips Available
- **Order Confirmation**: Percentage of orders attempts that are successfully confirmed.
- **Automation Rate**: Percentage of bookings processed automatically without human intervention
- **CSAT**: Customer Satisfaction Score - Measures user satisfaction on a 1-5 scale
- **NPS**: Net Promoter Score - Measures user loyalty and likelihood to recommend. Scores range from -100 to +100
- **FCR**: First Contact Resolution - Percentage of inquiries resolved on the first interaction
- **Response Time**: Average time to respond to user inquiries or support requests

## Response Time Trend Logic
- Negative trend (decrease in time) = Positive indicator
- Positive trend (increase in time) = Negative indicator
- Trend indicator reflects this inverse relationship

## Loading and Error States

### Loading State
- Display loading indicator while fetching data
- Show "Loading performance metrics..." message
- Maintain layout structure during load

### Error State
- Display error message if data fails to load
- Allow retry without page refresh
- Show "Error loading data. Please try again." message

## Data Structure

| Data Field | Definition | Calculation | Data Source |
|------------|------------|-------------|-------------|
| bookingConfirmationRate | Percentage of order attempts that are successfully confirmed | (Confirmed Orders / Total Order Attempts) × 100% | |
| bookingConfirmationTrend | Change in booking confirmation rate compared to previous period | Current Period Rate - Previous Period Rate (percentage points) | |
| automationRate | Percentage of bookings processed automatically without human intervention | (Automated Bookings / Total Bookings) × 100% | |
| automationRateTrend | Change in automation rate compared to previous period | Current Period Rate - Previous Period Rate (percentage points) | |
| csat | Customer Satisfaction Score - Measures user satisfaction on a 1-5 scale | Average of all CSAT survey responses on a 1-5 scale | |
| csatTrend | Change in CSAT score compared to previous period | Current Period Score - Previous Period Score | |
| nps | Net Promoter Score - Measures user loyalty and likelihood to recommend | Calculated from NPS survey: % Promoters - % Detractors, scores range from -100 to +100 | |
| npsTrend | Change in NPS compared to previous period | Current Period Score - Previous Period Score | |
| fcr | First Contact Resolution - Percentage of inquiries resolved on the first interaction | (Resolved on First Contact / Total Inquiries) × 100% | |
| fcrTrend | Change in FCR compared to previous period | Current Period Rate - Previous Period Rate (percentage points) | |
| responseTime | Average time to respond to user inquiries or support requests | Average of all response times in minutes | |
| responseTimeTrend | Change in response time compared to previous period | Current Period Time - Previous Period Time (in minutes). Negative values indicate improvement | |
| qualityTrends | Array of quality metrics trend data objects | Collection of monthly quality metrics for trend visualization | |
| qualityTrends[].month | Calendar month identifier (YYYY-MM format or month name) | Month extraction from quality metric timestamps | |
| qualityTrends[].csat | CSAT score for the month | Average CSAT score for all surveys in the month | |
| qualityTrends[].nps | NPS score for the month | Calculated NPS score for surveys in the month | |
| qualityTrends[].fcr | FCR percentage for the month | (Resolved on First Contact in Month / Total Inquiries in Month) × 100% | |
| slaPerformance | Array of SLA performance data objects by channel | Collection of channel performance metrics | |
| slaPerformance[].channel | Communication channel name (WhatsApp, Live Chat, Email, Phone) | Channel identifier from interaction source | |
| slaPerformance[].volume | Number of interactions or requests for the channel | Count of all interactions/requests through this channel | |
| slaPerformance[].sla | Service level agreement compliance percentage | (Interactions Meeting SLA / Total Interactions) × 100% | |
| slaPerformance[].responseTime | Average response time in minutes for the channel | Average of all response times for interactions through this channel | |
| slaPerformance[].fcr | First Contact Resolution percentage for the channel | (Resolved on First Contact / Total Inquiries) × 100% for this channel | |
| slaPerformance[].csat | Customer Satisfaction Score for the channel | Average CSAT score for surveys from this channel | |
| slaPerformance[].status | Overall status indicator for the channel | Classification based on performance metrics: 'excellent', 'good', 'fair', 'poor' | |
| supplierPerformance | Array of supplier performance data objects | Collection of supplier performance metrics | |
| supplierPerformance[].supplier | Supplier name (e.g., British Airways, Hilton, Marriott) | Supplier identifier from booking data | |
| supplierPerformance[].bookings | Number of bookings with this supplier | Count of bookings processed through this supplier | |
| supplierPerformance[].successRate | Percentage of successful bookings with this supplier | (Successful Bookings / Total Booking Attempts) × 100% | |
| supplierPerformance[].avgTime | Average processing time in minutes | Average time from booking request to confirmation | |
| supplierPerformance[].satisfaction | Customer satisfaction score for this supplier | Average satisfaction rating from user feedback | |

