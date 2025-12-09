import React, { useState, useEffect } from 'react';
import WidgetLibrary from './components/WidgetLibrary';
import DashboardExportButton from './components/DashboardExportButton';
import WidgetConfigurationModal from './components/WidgetConfigurationModal';
import WidgetRenderer from './components/WidgetRenderer';
import dashboardViewService from './services/dashboardViewService';
import './CustomDashboard.css';

function CustomDashboard({ filters }) {
  const [savedViews, setSavedViews] = useState([]);
  const [currentViewName, setCurrentViewName] = useState('My Custom Dashboard');
  const [currentViewId, setCurrentViewId] = useState(null);
  const [widgets, setWidgets] = useState([]);
  const [showWidgetLibrary, setShowWidgetLibrary] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [tempViewName, setTempViewName] = useState(currentViewName);
  const [draggedWidgetId, setDraggedWidgetId] = useState(null);
  const [dragOverWidgetId, setDragOverWidgetId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showSaveAsModal, setShowSaveAsModal] = useState(false);
  const [saveAsName, setSaveAsName] = useState('');
  const [saveMessage, setSaveMessage] = useState(null);
  const [configuringWidgetId, setConfiguringWidgetId] = useState(null);

  // Load saved views on mount
  useEffect(() => {
    loadSavedViews();
  }, []);

  const loadSavedViews = () => {
    const views = dashboardViewService.getAllViews();
    setSavedViews(views);
  };

  const handleSave = () => {
    if (!currentViewName.trim()) {
      setSaveMessage({ type: 'error', text: 'Please enter a dashboard name' });
      setTimeout(() => setSaveMessage(null), 3000);
      return;
    }

    if (dashboardViewService.viewNameExists(currentViewName, currentViewId)) {
      setSaveMessage({ type: 'error', text: 'A dashboard with this name already exists' });
      setTimeout(() => setSaveMessage(null), 3000);
      return;
    }

    try {
      const viewData = {
        id: currentViewId,
        name: currentViewName.trim(),
        widgets: widgets,
        createdAt: currentViewId ? undefined : new Date().toISOString()
      };

      const savedView = dashboardViewService.saveView(viewData);
      setCurrentViewId(savedView.id);
      loadSavedViews();
      
      setSaveMessage({ type: 'success', text: 'Dashboard saved successfully!' });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      console.error('Error saving dashboard:', error);
      setSaveMessage({ type: 'error', text: 'Failed to save dashboard' });
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleSaveAs = () => {
    setSaveAsName(currentViewName);
    setShowSaveAsModal(true);
  };

  const handleSaveAsConfirm = () => {
    if (!saveAsName.trim()) {
      setSaveMessage({ type: 'error', text: 'Please enter a dashboard name' });
      setTimeout(() => setSaveMessage(null), 3000);
      return;
    }

    if (dashboardViewService.viewNameExists(saveAsName)) {
      setSaveMessage({ type: 'error', text: 'A dashboard with this name already exists' });
      setTimeout(() => setSaveMessage(null), 3000);
      return;
    }

    try {
      const viewData = {
        name: saveAsName.trim(),
        widgets: widgets,
        createdAt: new Date().toISOString()
      };

      const savedView = dashboardViewService.saveView(viewData);
      setCurrentViewName(savedView.name);
      setCurrentViewId(savedView.id);
      setTempViewName(savedView.name);
      setShowSaveAsModal(false);
      setSaveAsName('');
      loadSavedViews();
      
      setSaveMessage({ type: 'success', text: 'Dashboard saved as new view!' });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      console.error('Error saving dashboard:', error);
      setSaveMessage({ type: 'error', text: 'Failed to save dashboard' });
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleLoadView = (viewId) => {
    if (!viewId || viewId === '') return;

    const view = dashboardViewService.getView(viewId);
    if (view) {
      setCurrentViewName(view.name);
      setCurrentViewId(view.id);
      setTempViewName(view.name);
      setWidgets(view.widgets || []);
      setSaveMessage({ type: 'success', text: `Loaded "${view.name}"` });
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleNewDashboard = () => {
    setCurrentViewName('My Custom Dashboard');
    setCurrentViewId(null);
    setTempViewName('My Custom Dashboard');
    setWidgets([]);
  };

  const handleConfigureWidget = (widgetId) => {
    setConfiguringWidgetId(widgetId);
  };

  const handleSaveWidgetConfig = (widgetId, config) => {
    setWidgets(widgets.map(w => 
      w.id === widgetId 
        ? { ...w, config: config, name: config.title || w.name }
        : w
    ));
    setConfiguringWidgetId(null);
  };

  const getWidgetDisplayName = (widget) => {
    return widget.config?.title || widget.name;
  };

  const getWidgetTimePeriod = (widget) => {
    if (widget.config?.customTimePeriod && widget.config.customTimePeriod !== 'Use Global Filter') {
      return widget.config.customTimePeriod;
    }
    return filters?.timePeriod || 'Last 30 Days';
  };

  const handleAddWidget = (widget) => {
    const newWidget = {
      id: `${widget.id}-${Date.now()}`,
      ...widget,
      position: { x: 0, y: widgets.length },
      size: { width: 1, height: 1 }
    };
    setWidgets([...widgets, newWidget]);
  };

  const handleRemoveWidget = (widgetId) => {
    setWidgets(widgets.filter(w => w.id !== widgetId));
  };

  // Drag handlers for widgets from library
  const handleWidgetDragStart = (e, widget) => {
    e.dataTransfer.setData('widget', JSON.stringify(widget));
    e.dataTransfer.effectAllowed = 'copy';
    setIsDragging(true);
  };

  // Drag handlers for widgets on dashboard (reordering)
  const handleDashboardWidgetDragStart = (e, widgetId) => {
    e.dataTransfer.setData('widget-id', widgetId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedWidgetId(widgetId);
    setIsDragging(true);
    e.stopPropagation();
  };

  const handleDashboardWidgetDragEnd = (e) => {
    setDraggedWidgetId(null);
    setDragOverWidgetId(null);
    setIsDragging(false);
  };

  const handleDashboardDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isDragging) {
      e.dataTransfer.dropEffect = draggedWidgetId ? 'move' : 'copy';
    }
  };

  const handleDashboardDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverWidgetId(null);
  };

  const handleDashboardDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const widgetData = e.dataTransfer.getData('widget');
    
    // Handle dropping a widget from library onto empty space
    if (widgetData && !draggedWidgetId) {
      try {
        const widget = JSON.parse(widgetData);
        handleAddWidget(widget);
      } catch (error) {
        console.error('Error parsing widget data:', error);
      }
    }
    
    setDragOverWidgetId(null);
    setIsDragging(false);
    setDraggedWidgetId(null);
  };

  const handleWidgetDragOver = (e, widgetId) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Allow drop if dragging an existing widget to reorder, or dragging from library
    if (draggedWidgetId && draggedWidgetId !== widgetId) {
      setDragOverWidgetId(widgetId);
      e.dataTransfer.dropEffect = 'move';
    } else if (isDragging && !draggedWidgetId) {
      // Dragging from library - allow drop before this widget
      setDragOverWidgetId(widgetId);
      e.dataTransfer.dropEffect = 'copy';
    }
  };

  const handleWidgetDrop = (e, targetWidgetId) => {
    e.preventDefault();
    e.stopPropagation();
    
    const widgetId = e.dataTransfer.getData('widget-id');
    const widgetData = e.dataTransfer.getData('widget');
    
    // Handle reordering: moving one widget before another
    if (widgetId && draggedWidgetId && widgetId !== targetWidgetId) {
      const draggedWidget = widgets.find(w => w.id === widgetId);
      const targetWidget = widgets.find(w => w.id === targetWidgetId);
      
      if (draggedWidget && targetWidget) {
        const draggedIndex = widgets.indexOf(draggedWidget);
        const targetIndex = widgets.indexOf(targetWidget);
        
        const newWidgets = [...widgets];
        newWidgets.splice(draggedIndex, 1);
        newWidgets.splice(targetIndex, 0, draggedWidget);
        setWidgets(newWidgets);
      }
    }
    // Handle adding widget from library before an existing widget
    else if (widgetData && !draggedWidgetId) {
      try {
        const widget = JSON.parse(widgetData);
        const targetWidget = widgets.find(w => w.id === targetWidgetId);
        if (targetWidget) {
          const targetIndex = widgets.indexOf(targetWidget);
          const newWidget = {
            id: `${widget.id}-${Date.now()}`,
            ...widget,
            position: { x: 0, y: targetIndex },
            size: { width: 1, height: 1 }
          };
          const newWidgets = [...widgets];
          newWidgets.splice(targetIndex, 0, newWidget);
          setWidgets(newWidgets);
        }
      } catch (error) {
        console.error('Error parsing widget data:', error);
      }
    }
    
    setDragOverWidgetId(null);
    setIsDragging(false);
    setDraggedWidgetId(null);
  };

  const handleSaveName = () => {
    if (!tempViewName.trim()) {
      setTempViewName(currentViewName);
      setEditingName(false);
      return;
    }

    if (dashboardViewService.viewNameExists(tempViewName, currentViewId)) {
      setSaveMessage({ type: 'error', text: 'A dashboard with this name already exists' });
      setTimeout(() => setSaveMessage(null), 3000);
      setTempViewName(currentViewName);
      setEditingName(false);
      return;
    }

    setCurrentViewName(tempViewName.trim());
    
    // If we have a current view ID, update the saved view name
    if (currentViewId) {
      dashboardViewService.updateViewName(currentViewId, tempViewName.trim());
      loadSavedViews();
    }
    
    setEditingName(false);
  };

  const handleCancelEditName = () => {
    setTempViewName(currentViewName);
    setEditingName(false);
  };

  return (
    <div className="custom-dashboard">
      <div className="custom-dashboard-header">
        <div className="dashboard-name-section">
          {editingName ? (
            <div className="dashboard-name-edit">
              <input
                type="text"
                value={tempViewName}
                onChange={(e) => setTempViewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveName();
                  if (e.key === 'Escape') handleCancelEditName();
                }}
                className="dashboard-name-input"
                autoFocus
              />
              <button className="btn-secondary" onClick={handleSaveName}>✓</button>
              <button className="btn-secondary" onClick={handleCancelEditName}>✕</button>
            </div>
          ) : (
            <>
              <h2>{currentViewName}</h2>
              <button 
                className="btn-secondary edit-name-btn"
                onClick={() => setEditingName(true)}
              >
                ✏️ Edit
              </button>
            </>
          )}
        </div>
        <div className="dashboard-actions">
          <button 
            className="btn-secondary"
            onClick={handleSave}
            disabled={widgets.length === 0}
            title={widgets.length === 0 ? 'Add widgets before saving' : 'Save current dashboard'}
          >
            💾 Save
          </button>
          <button 
            className="btn-secondary"
            onClick={handleSaveAs}
            disabled={widgets.length === 0}
            title={widgets.length === 0 ? 'Add widgets before saving' : 'Save as new dashboard'}
          >
            💾 Save As...
          </button>
          <select 
            className="load-view-select"
            value={currentViewId || ''}
            onChange={(e) => handleLoadView(e.target.value)}
          >
            <option value="">Load Saved View...</option>
            {savedViews.length === 0 && (
              <option disabled>No saved views</option>
            )}
            {savedViews.map(view => (
              <option key={view.id} value={view.id}>
                {view.name}
              </option>
            ))}
          </select>
          {savedViews.length > 0 && (
            <button 
              className="btn-secondary"
              onClick={handleNewDashboard}
              title="Create new dashboard"
            >
              ➕ New
            </button>
          )}
          <DashboardExportButton 
            dashboard={{
              id: currentViewId,
              name: currentViewName,
              widgets: widgets,
              createdAt: savedViews.find(v => v.id === currentViewId)?.createdAt,
              updatedAt: savedViews.find(v => v.id === currentViewId)?.updatedAt
            }}
            disabled={widgets.length === 0}
          />
        </div>
      </div>

      <div className="custom-dashboard-main">
        {showWidgetLibrary && (
          <div className="widget-library-panel">
            <WidgetLibrary 
              onAddWidget={handleAddWidget}
              onDragStart={handleWidgetDragStart}
            />
          </div>
        )}
        
        <div 
          className={`dashboard-workspace ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDashboardDragOver}
          onDragLeave={handleDashboardDragLeave}
          onDrop={handleDashboardDrop}
        >
          {widgets.length === 0 ? (
            <div 
              className={`dashboard-empty-state ${isDragging ? 'drop-zone-active' : ''}`}
            >
              <div className="empty-state-content">
                <h3>Your Dashboard is Empty</h3>
                <p>Drag widgets from the library or click to add them to your dashboard.</p>
                {!showWidgetLibrary && (
                  <button 
                    className="btn-primary"
                    onClick={() => setShowWidgetLibrary(true)}
                  >
                    Show Widget Library
                  </button>
                )}
                {isDragging && (
                  <div className="drop-hint">
                    Drop widget here to add it
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="dashboard-grid">
              {widgets.map((widget) => (
                <div 
                  key={widget.id} 
                  className={`dashboard-widget ${draggedWidgetId === widget.id ? 'dragging' : ''} ${dragOverWidgetId === widget.id ? 'drag-over' : ''}`}
                  draggable
                  onDragStart={(e) => handleDashboardWidgetDragStart(e, widget.id)}
                  onDragEnd={handleDashboardWidgetDragEnd}
                  onDragOver={(e) => handleWidgetDragOver(e, widget.id)}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (dragOverWidgetId === widget.id) {
                      setDragOverWidgetId(null);
                    }
                  }}
                  onDrop={(e) => handleWidgetDrop(e, widget.id)}
                >
                  <div className="widget-header">
                    <div className="widget-title">
                      <span className="widget-drag-handle">⋮⋮</span>
                      <span className="widget-icon">{widget.icon}</span>
                      <span className="widget-name">{getWidgetDisplayName(widget)}</span>
                      {widget.config?.customTimePeriod && widget.config.customTimePeriod !== 'Use Global Filter' && (
                        <span className="widget-time-badge" title={`Using custom time period: ${widget.config.customTimePeriod}`}>
                          ⏱️
                        </span>
                      )}
                    </div>
                    <div className="widget-actions">
                      <button
                        className="widget-config-btn"
                        onClick={() => handleConfigureWidget(widget.id)}
                        title="Configure widget"
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        ⚙️
                      </button>
                      <button
                        className="widget-remove-btn"
                        onClick={() => handleRemoveWidget(widget.id)}
                        title="Remove widget"
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <div className="widget-content">
                    <WidgetRenderer widget={widget} filters={filters} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {saveMessage && (
        <div className={`save-message save-message-${saveMessage.type}`}>
          {saveMessage.text}
        </div>
      )}

      {showSaveAsModal && (
        <div className="modal-overlay" onClick={() => setShowSaveAsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Save Dashboard As</h3>
              <button 
                className="modal-close-btn"
                onClick={() => setShowSaveAsModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <label htmlFor="save-as-name">Dashboard Name</label>
              <input
                id="save-as-name"
                type="text"
                value={saveAsName}
                onChange={(e) => setSaveAsName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveAsConfirm();
                  if (e.key === 'Escape') setShowSaveAsModal(false);
                }}
                placeholder="Enter dashboard name..."
                className="save-as-input"
                autoFocus
              />
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowSaveAsModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={handleSaveAsConfirm}
                disabled={!saveAsName.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {configuringWidgetId && (
        <WidgetConfigurationModal
          widget={widgets.find(w => w.id === configuringWidgetId)}
          isOpen={!!configuringWidgetId}
          onClose={() => setConfiguringWidgetId(null)}
          onSave={(config) => handleSaveWidgetConfig(configuringWidgetId, config)}
          globalFilters={filters}
        />
      )}
    </div>
  );
}

export default CustomDashboard;

