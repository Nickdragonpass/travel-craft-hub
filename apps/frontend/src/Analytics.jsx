import React, { useState } from 'react';
import FilterBar from './analytics/components/FilterBar';
import ProgramOverview from './analytics/ProgramOverview';
import CustomerEngagement from './analytics/CustomerEngagement';
import ProgramPerformance from './analytics/ProgramPerformance';
import FinancialImpact from './analytics/FinancialImpact';
import CustomDashboard from './analytics/CustomDashboard';
import './App.css';
import './analytics/Analytics.css';

function Analytics() {
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState({
    timePeriod: 'Last 30 Days'
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div className="analytics-header-content">
          <h1 className="page-title">Analytics & Insights</h1>
          <p className="page-subtitle">
            Comprehensive view of program performance, user engagement, and financial metrics
          </p>
        </div>
        <div className="analytics-header-actions">
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />
        </div>
      </div>

      <div className="analytics-tabs">
        <button
          className={`analytics-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <span className="tab-icon">📊</span>
          <span className="tab-text">Overview</span>
        </button>
        <button
          className={`analytics-tab-btn ${activeTab === 'engagement' ? 'active' : ''}`}
          onClick={() => setActiveTab('engagement')}
        >
          <span className="tab-icon">👥</span>
          <span className="tab-text">User Engagement</span>
        </button>
        <button
          className={`analytics-tab-btn ${activeTab === 'performance' ? 'active' : ''}`}
          onClick={() => setActiveTab('performance')}
        >
          <span className="tab-icon">⚡</span>
          <span className="tab-text">Program Performance</span>
        </button>
        <button
          className={`analytics-tab-btn ${activeTab === 'financial' ? 'active' : ''}`}
          onClick={() => setActiveTab('financial')}
        >
          <span className="tab-icon">💰</span>
          <span className="tab-text">Financial</span>
        </button>
        <button
          className={`analytics-tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
          onClick={() => setActiveTab('custom')}
        >
          <span className="tab-icon">🎨</span>
          <span className="tab-text">Custom Dashboard</span>
        </button>
      </div>

      <div className="analytics-tab-content">
        {activeTab === 'overview' && <ProgramOverview filters={filters} />}
        {activeTab === 'engagement' && <CustomerEngagement filters={filters} />}
        {activeTab === 'performance' && <ProgramPerformance filters={filters} />}
        {activeTab === 'financial' && <FinancialImpact filters={filters} />}
        {activeTab === 'custom' && <CustomDashboard filters={filters} />}
      </div>
    </div>
  );
}

export default Analytics;
