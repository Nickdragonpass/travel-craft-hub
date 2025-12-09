// Export Service
// Handles exporting analytics data to various formats

/**
 * Export data to CSV format
 * @param {Array} data - Data array to export
 * @param {Array} columns - Column definitions
 * @param {string} filename - Output filename
 * @param {Object} metadata - Additional metadata (filters, date range, etc.)
 */
export const exportToCSV = (data, columns, filename = 'analytics-export', metadata = {}) => {
  if (!data || data.length === 0) {
    console.error('No data to export');
    return;
  }

  // Create CSV header
  let csvContent = '';
  
  // Add metadata as comments at the top
  if (Object.keys(metadata).length > 0) {
    csvContent += '# Analytics Export\n';
    csvContent += `# Export Date: ${new Date().toISOString()}\n`;
    if (metadata.timePeriod) csvContent += `# Time Period: ${metadata.timePeriod}\n`;
    if (metadata.filters) {
      Object.entries(metadata.filters).forEach(([key, value]) => {
        csvContent += `# ${key}: ${value}\n`;
      });
    }
    csvContent += '\n';
  }

  // Add column headers
  const headers = columns.map(col => col.header || col.key);
  csvContent += headers.join(',') + '\n';

  // Add data rows
  data.forEach(row => {
    const values = columns.map(col => {
      const value = row[col.key];
      // Handle values with commas or quotes
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value ?? '';
    });
    csvContent += values.join(',') + '\n';
  });

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export current view metadata
 * @param {Object} filters - Current filters
 * @param {string} tabName - Current tab name
 */
export const exportViewMetadata = (filters, tabName) => {
  return {
    exportDate: new Date().toISOString(),
    timePeriod: filters.timePeriod || 'Yesterday',
    filters: {
      productChannel: filters.productChannel || 'All',
      client: filters.client || 'All',
      region: filters.region || 'All'
    },
    view: tabName
  };
};

