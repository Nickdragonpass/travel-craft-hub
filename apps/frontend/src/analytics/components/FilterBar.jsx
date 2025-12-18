import React, { useState, useEffect } from 'react';
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

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Initialize dates from filters if they exist
  useEffect(() => {
    if (filters?.startDate && filters?.endDate) {
      setStartDate(filters.startDate);
      setEndDate(filters.endDate);
    } else if (filters?.timePeriod === 'Custom Range' && !filters?.startDate) {
      // Set default range to last 30 days if custom range is selected but no dates set
      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);
      
      setStartDate(thirtyDaysAgo.toISOString().split('T')[0]);
      setEndDate(today.toISOString().split('T')[0]);
    }
  }, [filters]);

  const handleFilterChange = (key, value) => {
    if (onFilterChange) {
      const newFilters = { ...filters, [key]: value };
      
      // If switching away from Custom Range, clear date fields
      if (key === 'timePeriod' && value !== 'Custom Range') {
        delete newFilters.startDate;
        delete newFilters.endDate;
        setStartDate('');
        setEndDate('');
      }
      
      // If switching to Custom Range, set default dates if not already set
      if (key === 'timePeriod' && value === 'Custom Range' && !filters?.startDate) {
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        
        const defaultStart = thirtyDaysAgo.toISOString().split('T')[0];
        const defaultEnd = today.toISOString().split('T')[0];
        
        setStartDate(defaultStart);
        setEndDate(defaultEnd);
        newFilters.startDate = defaultStart;
        newFilters.endDate = defaultEnd;
      }
      
      onFilterChange(newFilters);
    }
  };

  const handleDateChange = (type, value) => {
    if (type === 'start') {
      setStartDate(value);
      if (onFilterChange) {
        onFilterChange({ ...filters, startDate: value });
      }
    } else {
      setEndDate(value);
      if (onFilterChange) {
        onFilterChange({ ...filters, endDate: value });
      }
    }
  };

  const isCustomRange = filters?.timePeriod === 'Custom Range';

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
        
        {isCustomRange && (
          <div className="filter-dates-container">
            <div className="filter-group filter-group-dates">
              <label htmlFor="start-date">Start Date</label>
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => handleDateChange('start', e.target.value)}
                disabled={loading}
                className="filter-date-input"
                max={endDate || undefined}
              />
            </div>
            <div className="filter-group filter-group-dates">
              <label htmlFor="end-date">End Date</label>
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => handleDateChange('end', e.target.value)}
                disabled={loading}
                className="filter-date-input"
                min={startDate || undefined}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterBar;

