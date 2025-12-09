// Dashboard Export Service
// Handles exporting custom dashboard configurations and data

import { exportToCSV } from './exportService';

/**
 * Export dashboard configuration as JSON
 * @param {Object} dashboard - Dashboard view object
 * @param {string} filename - Output filename
 */
export const exportDashboardAsJSON = (dashboard, filename = 'dashboard') => {
  if (!dashboard) {
    console.error('No dashboard to export');
    return;
  }

  const exportData = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    dashboard: {
      id: dashboard.id,
      name: dashboard.name,
      createdAt: dashboard.createdAt,
      updatedAt: dashboard.updatedAt,
      widgets: dashboard.widgets || []
    }
  };

  const jsonContent = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export dashboard summary as CSV
 * @param {Object} dashboard - Dashboard view object
 * @param {string} filename - Output filename
 */
export const exportDashboardSummaryAsCSV = (dashboard, filename = 'dashboard-summary') => {
  if (!dashboard || !dashboard.widgets || dashboard.widgets.length === 0) {
    console.error('No dashboard widgets to export');
    return;
  }

  const summaryData = dashboard.widgets.map((widget, index) => ({
    'Widget #': index + 1,
    'Widget Name': widget.name,
    'Widget Type': widget.type === 'kpi' ? 'KPI' : widget.type === 'chart' ? 'Chart' : 'Table',
    'Category': widget.category,
    'Icon': widget.icon,
    'Description': widget.description || ''
  }));

  const columns = [
    { key: 'Widget #', header: 'Widget #' },
    { key: 'Widget Name', header: 'Widget Name' },
    { key: 'Widget Type', header: 'Widget Type' },
    { key: 'Category', header: 'Category' },
    { key: 'Icon', header: 'Icon' },
    { key: 'Description', header: 'Description' }
  ];

  const metadata = {
    dashboardName: dashboard.name,
    exportDate: new Date().toISOString(),
    totalWidgets: dashboard.widgets.length,
    widgetTypes: {
      kpi: dashboard.widgets.filter(w => w.type === 'kpi').length,
      chart: dashboard.widgets.filter(w => w.type === 'chart').length,
      table: dashboard.widgets.filter(w => w.type === 'table').length
    }
  };

  // Create CSV header with metadata
  let csvContent = '';
  csvContent += '# Dashboard Export Summary\n';
  csvContent += `# Dashboard Name: ${metadata.dashboardName}\n`;
  csvContent += `# Export Date: ${metadata.exportDate}\n`;
  csvContent += `# Total Widgets: ${metadata.totalWidgets}\n`;
  csvContent += `# KPI Widgets: ${metadata.widgetTypes.kpi}\n`;
  csvContent += `# Chart Widgets: ${metadata.widgetTypes.chart}\n`;
  csvContent += `# Table Widgets: ${metadata.widgetTypes.table}\n`;
  csvContent += '\n';

  // Add column headers
  const headers = columns.map(col => col.header);
  csvContent += headers.join(',') + '\n';

  // Add data rows
  summaryData.forEach(row => {
    const values = columns.map(col => {
      const value = row[col.key];
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
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
  URL.revokeObjectURL(url);
};

/**
 * Export dashboard as a formatted text document
 * @param {Object} dashboard - Dashboard view object
 * @param {string} filename - Output filename
 */
export const exportDashboardAsText = (dashboard, filename = 'dashboard') => {
  if (!dashboard) {
    console.error('No dashboard to export');
    return;
  }

  let textContent = '';
  textContent += '='.repeat(60) + '\n';
  textContent += `DASHBOARD EXPORT: ${dashboard.name.toUpperCase()}\n`;
  textContent += '='.repeat(60) + '\n\n';
  textContent += `Export Date: ${new Date().toLocaleString()}\n`;
  textContent += `Dashboard Name: ${dashboard.name}\n`;
  if (dashboard.createdAt) {
    textContent += `Created: ${new Date(dashboard.createdAt).toLocaleString()}\n`;
  }
  if (dashboard.updatedAt) {
    textContent += `Last Updated: ${new Date(dashboard.updatedAt).toLocaleString()}\n`;
  }
  textContent += '\n';
  textContent += '-'.repeat(60) + '\n';
  textContent += 'WIDGETS\n';
  textContent += '-'.repeat(60) + '\n\n';

  if (!dashboard.widgets || dashboard.widgets.length === 0) {
    textContent += 'No widgets in this dashboard.\n';
  } else {
    // Group by category
    const widgetsByCategory = {};
    dashboard.widgets.forEach((widget, index) => {
      const category = widget.category || 'Other';
      if (!widgetsByCategory[category]) {
        widgetsByCategory[category] = [];
      }
      widgetsByCategory[category].push({ ...widget, index: index + 1 });
    });

    Object.entries(widgetsByCategory).forEach(([category, widgets]) => {
      textContent += `\n${category}\n`;
      textContent += '-'.repeat(60) + '\n';
      widgets.forEach(widget => {
        textContent += `\n${widget.index}. ${widget.name} [${widget.type.toUpperCase()}]\n`;
        textContent += `   Icon: ${widget.icon}\n`;
        if (widget.description) {
          textContent += `   Description: ${widget.description}\n`;
        }
      });
      textContent += '\n';
    });

    // Summary
    textContent += '\n' + '='.repeat(60) + '\n';
    textContent += 'SUMMARY\n';
    textContent += '='.repeat(60) + '\n';
    textContent += `Total Widgets: ${dashboard.widgets.length}\n`;
    const widgetTypes = {
      kpi: dashboard.widgets.filter(w => w.type === 'kpi').length,
      chart: dashboard.widgets.filter(w => w.type === 'chart').length,
      table: dashboard.widgets.filter(w => w.type === 'table').length
    };
    textContent += `KPI Widgets: ${widgetTypes.kpi}\n`;
    textContent += `Chart Widgets: ${widgetTypes.chart}\n`;
    textContent += `Table Widgets: ${widgetTypes.table}\n`;
  }

  // Create blob and download
  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.txt`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

