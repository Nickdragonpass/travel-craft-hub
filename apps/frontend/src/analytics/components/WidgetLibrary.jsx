import React, { useState } from 'react';
import { widgetCatalog, getAllCategories } from '../services/widgetCatalog';
import './WidgetLibrary.css';

function WidgetLibrary({ onAddWidget, onDragStart }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = getAllCategories();
  
  // Filter widgets by category and search
  const filteredWidgets = widgetCatalog.filter(widget => {
    const matchesCategory = !selectedCategory || widget.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      widget.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group widgets by category
  const widgetsByCategory = filteredWidgets.reduce((acc, widget) => {
    if (!acc[widget.category]) {
      acc[widget.category] = [];
    }
    acc[widget.category].push(widget);
    return acc;
  }, {});

  const handleWidgetClick = (widget) => {
    if (onAddWidget) {
      onAddWidget(widget);
    }
  };

  return (
    <div className="widget-library">
      <div className="widget-library-header">
        <h3>Widget Library</h3>
        <p className="widget-library-subtitle">Add widgets to your dashboard</p>
      </div>

      <div className="widget-library-filters">
        <div className="widget-library-search">
          <input
            type="text"
            placeholder="Search widgets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="widget-search-input"
          />
        </div>
        
        <div className="widget-category-filters">
          <button
            className={`category-filter-btn ${!selectedCategory ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`category-filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="widget-library-content">
        {Object.keys(widgetsByCategory).length === 0 ? (
          <div className="widget-library-empty">
            <p>No widgets found matching your search.</p>
          </div>
        ) : (
          Object.entries(widgetsByCategory).map(([category, widgets]) => (
            <div key={category} className="widget-category-section">
              <h4 className="widget-category-title">{category}</h4>
              <div className="widget-grid">
                {widgets.map(widget => (
                  <div
                    key={widget.id}
                    className="widget-card"
                    onClick={() => handleWidgetClick(widget)}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('widget', JSON.stringify(widget));
                      e.dataTransfer.effectAllowed = 'copy';
                      if (onDragStart) {
                        onDragStart(e, widget);
                      }
                    }}
                  >
                    <div className="widget-card-icon">{widget.icon}</div>
                    <div className="widget-card-content">
                      <h5 className="widget-card-name">{widget.name}</h5>
                      <p className="widget-card-description">{widget.description}</p>
                    </div>
                    <div className="widget-card-type">
                      <span className={`widget-type-badge widget-type-${widget.type}`}>
                        {widget.type === 'kpi' ? 'KPI' : widget.type === 'chart' ? 'Chart' : 'Table'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WidgetLibrary;

