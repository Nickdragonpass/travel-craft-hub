# Time Period Handling for Analytics Metrics

## Problem Statement

Some metrics have inherent time period constraints that don't align with user-selected filters. For example:

- **Entitlement Utilization**: Entitlements are allocated on an annual basis (e.g., "5 lounge passes per year"), so showing utilization for "Yesterday" or "Last 7 Days" doesn't make logical sense.
- These metrics should always show **Year-to-Date (YTD)** or **Annual** data regardless of the selected time filter.

## Solution

We've implemented a **Metric Time Period Configuration** system that:

1. **Identifies metrics with fixed time periods** (e.g., always YTD)
2. **Shows visual indicators** when a metric uses a different time period than selected
3. **Clarifies in tooltips** that these metrics have fixed time periods
4. **Updates subtitles** to indicate the actual time period being displayed

## Configuration

### File: `metricTimePeriodConfig.js`

```javascript
// Metrics that always show Year-to-Date data
YTD_ONLY_METRICS = [
  'Entitlement Utilization',
  'Entitlement Value'
]

// Metrics that always show Annual data  
ANNUAL_ONLY_METRICS = [
  // Add annual-only metrics here
]
```

## How It Works

### 1. Metric Display
- When a metric has a fixed time period, it **always shows YTD/Annual data** regardless of filter
- A small badge appears in the subtitle showing the actual time period (e.g., "• Year to Date")
- The badge only shows when the selected filter differs from the metric's fixed period

### 2. Visual Indicators
- Subtitles now include "(YTD)" for clarity
- Tooltip definitions explain that entitlements are annual-based
- Badge appears when filter is set to something other than YTD

### 3. Data Fetching
- Backend should use `getEffectiveTimePeriod()` to determine what data to fetch
- For YTD metrics, always fetch year-to-date data regardless of filter value

## Example Behavior

**Scenario:** User selects "Last 7 Days" filter

| Metric | Filter Selection | Effective Time Period | Indicator Shown |
|--------|-----------------|---------------------|----------------|
| Active Members | Last 7 Days | Last 7 Days | None |
| GMV | Last 7 Days | Last 7 Days | None |
| **Entitlement Utilization** | Last 7 Days | **Year to Date (YTD)** | **"• Year to Date"** |

## Adding New Fixed-Period Metrics

1. Add metric name to `YTD_ONLY_METRICS` or `ANNUAL_ONLY_METRICS` in `metricTimePeriodConfig.js`
2. Update metric definition in `metricDefinitions.js` to explain the fixed period
3. Update subtitle to include time period indicator (e.g., "(YTD)")
4. Pass `timePeriod` prop to the KPICard component
5. Update backend data fetching to use `getEffectiveTimePeriod()`

## Future Enhancements

- Consider showing a comparison view (e.g., "67% YTD vs 45% same period last year")
- Add period selector directly on metrics that support multiple views
- Create a "Metric Settings" panel for advanced users to override defaults

