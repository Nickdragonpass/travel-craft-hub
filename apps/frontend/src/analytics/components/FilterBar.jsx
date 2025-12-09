import React from 'react';
import './FilterBar.css';

function FilterBar({ filters, onFilterChange, loading = false }) {
  const timePeriods = [
    'Yesterday',
    'Last 7 Days',
    'Last 30 Days',
    'Last 90 Days',
    'Year to Date (YTD)',
    'All Time',
    'Custom Range'
  ];

  const handleFilterChange = (key, value) => {
    if (onFilterChange) {
      onFilterChange({ ...filters, [key]: value });
    }
  };

  return (
    <div className="filter-bar filter-bar-simplified">
      <div className="filter-bar-content">
        <div className="filter-group">
          <label htmlFor="time-period">Time Period</label>
          <select
            id="time-period"
            value={filters?.timePeriod || 'Last 30 Days'}
            onChange={(e) => handleFilterChange('timePeriod', e.target.value)}
            disabled={loading}
            className="filter-select"
          >
            {timePeriods.map(period => (
              <option key={period} value={period}>{period}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;

