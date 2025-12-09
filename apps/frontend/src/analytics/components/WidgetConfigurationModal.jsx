import React, { useState, useEffect } from 'react';
import './WidgetConfigurationModal.css';

const TIME_PERIODS = [
  'Use Global Filter',
  'Yesterday',
  'Last 7 Days',
  'Last 30 Days',
  'Last 90 Days',
  'Year to Date (YTD)',
  'All Time'
];

function WidgetConfigurationModal({ widget, isOpen, onClose, onSave, globalFilters }) {
  const [config, setConfig] = useState({
    customTimePeriod: null,
    title: widget?.name || '',
    showTrend: true,
    ...(widget?.config || {})
  });

  useEffect(() => {
    if (isOpen && widget) {
      setConfig({
        customTimePeriod: widget.config?.customTimePeriod || null,
        title: widget.config?.title || widget.name || '',
        showTrend: widget.config?.showTrend !== undefined ? widget.config.showTrend : true,
        ...(widget.config || {})
      });
    }
  }, [isOpen, widget]);

  const handleSave = () => {
    if (onSave) {
      onSave({
        ...config,
        customTimePeriod: config.customTimePeriod === 'Use Global Filter' ? null : config.customTimePeriod
      });
    }
    onClose();
  };

  const handleCancel = () => {
    // Reset to original values
    setConfig({
      customTimePeriod: widget?.config?.customTimePeriod || null,
      title: widget?.config?.title || widget?.name || '',
      showTrend: widget?.config?.showTrend !== undefined ? widget.config.showTrend : true,
      ...(widget?.config || {})
    });
    onClose();
  };

  if (!isOpen || !widget) return null;

  const effectiveTimePeriod = config.customTimePeriod === 'Use Global Filter' || !config.customTimePeriod
    ? globalFilters?.timePeriod || 'Last 30 Days'
    : config.customTimePeriod;

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal-content widget-config-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title">
            <span className="widget-icon-large">{widget.icon}</span>
            <h3>Configure Widget</h3>
          </div>
          <button 
            className="modal-close-btn"
            onClick={handleCancel}
          >
            ×
          </button>
        </div>

        <div className="modal-body widget-config-body">
          <div className="widget-info-section">
            <div className="widget-info-item">
              <span className="info-label">Widget Type:</span>
              <span className="info-value">{widget.type === 'kpi' ? 'KPI' : widget.type === 'chart' ? 'Chart' : 'Table'}</span>
            </div>
            <div className="widget-info-item">
              <span className="info-label">Category:</span>
              <span className="info-value">{widget.category}</span>
            </div>
          </div>

          <div className="config-section">
            <label htmlFor="widget-title" className="config-label">
              Widget Title
              <span className="config-hint">Custom title for this widget</span>
            </label>
            <input
              id="widget-title"
              type="text"
              value={config.title}
              onChange={(e) => setConfig({ ...config, title: e.target.value })}
              className="config-input"
              placeholder={widget.name}
            />
          </div>

          <div className="config-section">
            <label htmlFor="time-period" className="config-label">
              Time Period
              <span className="config-hint">
                {config.customTimePeriod === 'Use Global Filter' || !config.customTimePeriod
                  ? `Currently using global filter: ${globalFilters?.timePeriod || 'Last 30 Days'}`
                  : `This widget will use: ${config.customTimePeriod}`}
              </span>
            </label>
            <select
              id="time-period"
              value={config.customTimePeriod || 'Use Global Filter'}
              onChange={(e) => setConfig({ ...config, customTimePeriod: e.target.value })}
              className="config-select"
            >
              {TIME_PERIODS.map(period => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </div>

          {widget.type === 'kpi' && (
            <div className="config-section">
              <label className="config-checkbox-label">
                <input
                  type="checkbox"
                  checked={config.showTrend}
                  onChange={(e) => setConfig({ ...config, showTrend: e.target.checked })}
                  className="config-checkbox"
                />
                <span>Show Trend Indicator</span>
                <span className="config-hint">Display trend arrow and percentage change</span>
              </label>
            </div>
          )}

          <div className="config-preview">
            <div className="preview-label">Preview:</div>
            <div className="preview-content">
              <div className="preview-widget-title">{config.title || widget.name}</div>
              <div className="preview-widget-meta">
                <span>Time Period: {effectiveTimePeriod}</span>
                {widget.type === 'kpi' && config.showTrend && (
                  <span>• Trend: Enabled</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button 
            className="btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button 
            className="btn-primary"
            onClick={handleSave}
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}

export default WidgetConfigurationModal;

