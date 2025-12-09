/**
 * Metric Time Period Configuration
 * 
 * Some metrics have fixed time periods (e.g., entitlements are annual)
 * and should always display YTD or Annual data regardless of the selected filter.
 */

// Metrics that should always show Year-to-Date (YTD) data
export const YTD_ONLY_METRICS = [
  'Entitlement Value'
];

// Metrics that should always show Annual data
export const ANNUAL_ONLY_METRICS = [
  // Add any metrics that require full annual view
];

/**
 * Check if a metric should use a fixed time period
 * @param {string} metricName - Name of the metric
 * @returns {string|null} - 'YTD', 'Annual', or null if it respects the filter
 */
export const getMetricTimePeriodType = (metricName) => {
  if (YTD_ONLY_METRICS.includes(metricName)) {
    return 'YTD';
  }
  if (ANNUAL_ONLY_METRICS.includes(metricName)) {
    return 'Annual';
  }
  return null; // Metric respects the selected filter
};

/**
 * Get the effective time period for a metric
 * @param {string} metricName - Name of the metric
 * @param {string} selectedPeriod - The user-selected time period
 * @returns {string} - The effective time period to use for this metric
 */
export const getEffectiveTimePeriod = (metricName, selectedPeriod) => {
  const fixedPeriod = getMetricTimePeriodType(metricName);
  
  if (fixedPeriod === 'YTD') {
    return 'Year to Date (YTD)';
  }
  if (fixedPeriod === 'Annual') {
    return 'All Time';
  }
  
  return selectedPeriod;
};

/**
 * Check if a metric needs a time period indicator badge
 * @param {string} metricName - Name of the metric
 * @param {string} selectedPeriod - The user-selected time period
 * @returns {boolean} - Whether to show an indicator
 */
export const shouldShowTimePeriodIndicator = (metricName, selectedPeriod) => {
  const fixedPeriod = getMetricTimePeriodType(metricName);
  if (!fixedPeriod) return false;
  
  const effectivePeriod = getEffectiveTimePeriod(metricName, selectedPeriod);
  return effectivePeriod !== selectedPeriod;
};

/**
 * Get the display label for a metric's time period
 * @param {string} metricName - Name of the metric
 * @param {string} selectedPeriod - The user-selected time period
 * @returns {string} - Display label (e.g., "Year to Date", "Annual")
 */
export const getTimePeriodLabel = (metricName, selectedPeriod) => {
  const fixedPeriod = getMetricTimePeriodType(metricName);
  
  if (fixedPeriod === 'YTD') {
    return 'Year to Date';
  }
  if (fixedPeriod === 'Annual') {
    return 'Annual';
  }
  
  return null;
};

