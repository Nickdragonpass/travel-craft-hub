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
}

// Export singleton instance
export const analyticsService = new AnalyticsService();
export default analyticsService;

