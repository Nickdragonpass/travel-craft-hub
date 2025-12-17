// Analytics Service
// Provides data fetching interface for analytics metrics
// Currently uses mock data, will be extended to use Firebase

import {
  getProgramMetrics,
  getEngagementMetrics,
  getPerformanceMetrics,
  getFinancialMetrics,
  formatCurrency,
  formatPercentage
} from './mockAnalyticsData';

class AnalyticsService {
  /**
   * Get program overview metrics
   * @param {Object} filters - Filter options (time period, product, client, etc.)
   * @returns {Promise<Object>} Program metrics data
   */
  async getProgramMetrics(filters = {}) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const data = getProgramMetrics();
    
    // Apply filters if needed (for future Firebase integration)
    // Currently returns all data
    
    return data;
  }

  /**
   * Get customer engagement metrics
   * @param {Object} filters - Filter options
   * @returns {Promise<Object>} Engagement metrics data
   */
  async getEngagementMetrics(filters = {}) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const data = getEngagementMetrics();
    
    return data;
  }

  /**
   * Get program performance metrics
   * @param {Object} filters - Filter options
   * @returns {Promise<Object>} Performance metrics data
   */
  async getPerformanceMetrics(filters = {}) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const data = getPerformanceMetrics();
    
    return data;
  }

  /**
   * Get financial impact metrics
   * @param {Object} filters - Filter options
   * @returns {Promise<Object>} Financial metrics data
   */
  async getFinancialMetrics(filters = {}) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const data = getFinancialMetrics();
    
    return data;
  }

  /**
   * Format currency value
   * @param {number} value - Numeric value
   * @param {string} currency - Currency symbol
   * @returns {string} Formatted currency string
   */
  formatCurrency(value, currency = '£') {
    return formatCurrency(value, currency);
  }

  /**
   * Format percentage value
   * @param {number} value - Numeric value
   * @param {number} decimals - Decimal places
   * @returns {string} Formatted percentage string
   */
  formatPercentage(value, decimals = 1) {
    return formatPercentage(value, decimals);
  }

  /**
   * Get historical trend data for a specific metric
   * @param {string} metricId - Identifier for the metric
   * @param {string} metricType - Type of metric (program, engagement, performance, financial)
   * @param {Object} filters - Filter options
   * @returns {Promise<Array>} Historical trend data array
   */
  async getMetricTrendData(metricId, metricType, filters = {}) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Generate historical data based on metric type and ID
    const monthlyDates = this._generateDateRange(12);
    const trendData = [];
    
    // Base values for different metrics (these would come from actual data)
    const baseValues = {
      // Program Overview
      'eligibleMembers': { base: 12000, growth: 38, format: 'number' },
      'activeMembers': { base: 8500, growth: 35, format: 'number' },
      'engagementRate': { base: 70, growth: 0, format: 'percentage' },
      'gmv': { base: 2000000, growth: 33000, format: 'currency' },
      'totalOrders': { base: 4800, growth: 36, format: 'number' },
      'costPerMember': { base: 48, growth: 0, format: 'currency' },
      'entitlementUtilization': { base: 65, growth: 0, format: 'percentage' },
      'customerSatisfaction': { base: 4, growth: 0, format: 'number' },
      
      // Customer Engagement
      'mau': { base: 8500, growth: 35, format: 'number' },
      'dau': { base: 3000, growth: 8, format: 'number' },
      'mac': { base: 4800, growth: 36, format: 'number' },
      'repeatUsers': { base: 3800, growth: 27, format: 'number' },
      'totalRequests': { base: 175000, growth: 2200, format: 'number' },
      'requestRate': { base: 50, growth: 0.3, format: 'percentage' },
      
      // Program Performance
      'bookingConfirmationRate': { base: 95, growth: 0, format: 'percentage' },
      'automationRate': { base: 78, growth: 1, format: 'percentage' },
      'csat': { base: 4, growth: 0, format: 'number' },
      'nps': { base: 52, growth: 0, format: 'number' },
      'fcr': { base: 82, growth: 0, format: 'percentage' },
      'responseTime': { base: 12, growth: 0, format: 'number' },
      
      // Financial Impact
      'transactionRevenue': { base: 1250000, growth: 21000, format: 'currency' },
      'gmv': { base: 2000000, growth: 33000, format: 'currency' },
      'revenueMix': { base: 68, growth: 0, format: 'percentage' },
      'conversionRate': { base: 4.8, growth: 0.1, format: 'percentage' },

      // Dashboard
      'totalUsers': { base: 120000, growth: 1200, format: 'number' },
      'userPenetration': { base: 42, growth: 0.2, format: 'percentage' },
    };
    
    const config = baseValues[metricId] || { base: 1000, growth: 10, format: 'number' };
    
    monthlyDates.forEach((period, index) => {
      // Add some realistic variation with simple whole numbers
      const variation = Math.round((Math.random() - 0.5) * (config.growth * 2));
      const value = Math.round(config.base + (config.growth * index) + variation);
      
      trendData.push({
        period: period,
        value: Math.max(0, value) // Ensure non-negative, whole numbers only
      });
    });
    
    return trendData;
  }

  /**
   * Generate date range for trend data
   * @private
   */
  _generateDateRange(months = 12) {
    const dates = [];
    const now = new Date();
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      dates.push(date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
    }
    return dates;
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();
export default analyticsService;

