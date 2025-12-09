import React, { useState } from 'react';
import { exportDashboardSummaryAsCSV } from '../services/dashboardExportService';
import './DashboardExportButton.css';

function DashboardExportButton({ dashboard, disabled = false }) {
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    if (!dashboard || !dashboard.widgets || dashboard.widgets.length === 0) {
      alert('No dashboard to export');
      return;
    }

    setExporting(true);
    try {
      const dashboardData = {
        name: dashboard.name || 'My Custom Dashboard',
        widgets: dashboard.widgets
      };
      
      exportDashboardSummaryAsCSV(dashboardData, `dashboard-summary-${dashboard.name.toLowerCase().replace(/\s+/g, '-')}`);
      setTimeout(() => {
        setExporting(false);
      }, 500);
    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting dashboard. Please try again.');
      setExporting(false);
    }
  };

  const hasWidgets = dashboard && dashboard.widgets && dashboard.widgets.length > 0;

  return (
    <button
      className="btn-primary"
      onClick={handleExport}
      disabled={disabled || exporting || !hasWidgets}
      title={!hasWidgets ? 'Add widgets before exporting' : 'Export dashboard as CSV'}
    >
      {exporting ? 'Exporting...' : '📤 Export'}
    </button>
  );
}

export default DashboardExportButton;

