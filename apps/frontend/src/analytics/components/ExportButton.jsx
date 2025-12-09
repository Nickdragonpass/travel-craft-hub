import React, { useState } from 'react';
import { exportToCSV, exportViewMetadata } from '../services/exportService';
import './ExportButton.css';

function ExportButton({ data, columns, filename, filters, viewName, disabled = false }) {
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    setExporting(true);
    
    try {
      const metadata = exportViewMetadata(filters, viewName);
      exportToCSV(data, columns, filename || `analytics-${viewName.toLowerCase().replace(/\s+/g, '-')}`, metadata);
      
      // Show success message
      setTimeout(() => {
        setExporting(false);
        alert('Export completed successfully!');
      }, 500);
    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting data. Please try again.');
      setExporting(false);
    }
  };

  return (
    <button
      className="export-btn"
      onClick={handleExport}
      disabled={disabled || exporting || !data || data.length === 0}
    >
      {exporting ? 'Exporting...' : '📤 Export'}
    </button>
  );
}

export default ExportButton;

