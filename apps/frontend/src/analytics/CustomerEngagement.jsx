import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import KPICard from './components/KPICard';
import MetricChart from './components/MetricChart';
import KPITrendModal from './components/KPITrendModal';
import analyticsService from './services/analyticsService';
import { getMetricDefinition } from './services/metricDefinitions';
import './CustomerEngagement.css';

const COLORS = ['#1a2233', '#e94f3d', '#4f46e5', '#10b981', '#f59e0b'];

function CustomerEngagement({ filters }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [trendData, setTrendData] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    setLoading(true);
    try {
      const metrics = await analyticsService.getEngagementMetrics(filters);
      setData(metrics);
    } catch (error) {
      console.error('Error loading engagement metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="customer-engagement">
        <div className="loading-state">Loading engagement metrics...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="customer-engagement">
        <div className="error-state">Error loading data. Please try again.</div>
      </div>
    );
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const handleKPIClick = async (metricId) => {
    if (!data) return;
    
    setModalLoading(true);
    setSelectedMetric(metricId);
    
    try {
      const historicalData = await analyticsService.getMetricTrendData(metricId, 'engagement', filters);
      
      // Find the metric details
      const metricConfig = getMetricConfig(metricId);
      setTrendData({
        ...metricConfig,
        trendData: historicalData
      });
    } catch (error) {
      console.error('Error loading trend data:', error);
    } finally {
      setModalLoading(false);
    }
  };

  const getMetricConfig = (metricId) => {
    if (!data) return {};
    
    const configs = {
      'mau': {
        label: 'MAU',
        value: formatNumber(data.mau),
        subtitle: getMetricDefinition('MAU'),
        icon: '📊',
        trendType: 'positive',
        formatType: 'number'
      },
      'dau': {
        label: 'DAU',
        value: formatNumber(data.dau),
        subtitle: getMetricDefinition('DAU'),
        icon: '📅',
        trendType: 'positive',
        formatType: 'number'
      },
      'mac': {
        label: 'MAC',
        value: formatNumber(data.mac),
        subtitle: getMetricDefinition('MAC'),
        icon: '🛒',
        trendType: 'positive',
        formatType: 'number'
      },
      'totalRequests': {
        label: 'Total Requests',
        value: formatNumber(data.totalRequests),
        subtitle: getMetricDefinition('Total Requests'),
        icon: '🤖',
        trendType: 'positive',
        formatType: 'number'
      },
      'requestRate': {
        label: 'Request Rate',
        value: `${(((data.usersWithRequests || 0) / (data.funnel?.eligible || 1)) * 100).toFixed(1)}%`,
        subtitle: getMetricDefinition('Request Rate'),
        icon: '📩',
        trendType: 'positive',
        formatType: 'percentage'
      },
      'repeatUsers': {
        label: 'Repeat Users',
        value: formatNumber(data.repeatUsers),
        subtitle: getMetricDefinition('Repeat Users'),
        icon: '🔄',
        trendType: 'positive',
        formatType: 'number'
      },
      'entitlementUtilization': {
        label: 'Entitlement Utilization',
        value: `${data.entitlementUtilization && data.entitlementUtilization.length > 0 ? data.entitlementUtilization[0].utilization : 67}%`,
        subtitle: getMetricDefinition('Entitlement Utilization'),
        icon: '🎫',
        trendType: 'positive',
        formatType: 'percentage'
      }
    };
    return configs[metricId] || {};
  };

  const closeModal = () => {
    setSelectedMetric(null);
    setTrendData(null);
  };

  // Calculate funnel percentages
  const totalUsers = data?.funnel?.eligible || 0;
  const usersWithRequests = data?.usersWithRequests || 0;
  const requestRate = totalUsers > 0 ? (usersWithRequests / totalUsers) * 100 : 0;

  const pct = (count) => {
    if (!totalUsers) return 0;
    const raw = (count / totalUsers) * 100;
    return Math.max(0, Math.min(100, raw));
  };

  const funnelData = [
    { stage: 'Eligible Users', count: totalUsers, percentage: 100 },
    { stage: 'Users with Requests', count: usersWithRequests, percentage: pct(usersWithRequests) },
    { stage: 'Users with Orders', count: data?.funnel?.withOrders || 0, percentage: pct(data?.funnel?.withOrders || 0) },
    { stage: 'Users with Repeat Orders', count: data?.funnel?.repeat || 0, percentage: pct(data?.funnel?.repeat || 0) }
  ];

  return (
    <div className="customer-engagement">
      {/* Engagement Metrics KPI Cards */}
      <div className="metrics-grid">
        <KPICard
          label="MAU"
          value={formatNumber(data.mau)}
          subtitle="Monthly Active Users"
          trendType="positive"
          icon="📊"
          loading={loading}
          onClick={handleKPIClick}
          metricId="mau"
          formatType="number"
        />
        <KPICard
          label="DAU"
          value={formatNumber(data.dau)}
          subtitle="Daily Active Users"
          trendType="positive"
          icon="📅"
          loading={loading}
          onClick={handleKPIClick}
          metricId="dau"
          formatType="number"
        />
        <KPICard
          label="MAC"
          value={formatNumber(data.mac)}
          subtitle="Monthly Active with Orders"
          trendType="positive"
          icon="🛒"
          loading={loading}
          onClick={handleKPIClick}
          metricId="mac"
          formatType="number"
        />
        <KPICard
          label="Total Requests"
          value={formatNumber(data.totalRequests)}
          subtitle="Assisted user requests"
          trendType="positive"
          icon="🤖"
          loading={loading}
          onClick={handleKPIClick}
          metricId="totalRequests"
          formatType="number"
        />
        <KPICard
          label="Request Rate"
          value={`${requestRate.toFixed(1)}%`}
          subtitle="Users who made a request"
          trendType="positive"
          icon="📩"
          loading={loading}
          onClick={handleKPIClick}
          metricId="requestRate"
          formatType="percentage"
        />
        <KPICard
          label="Repeat Users"
          value={formatNumber(data.repeatUsers)}
          subtitle="Users with multiple orders"
          trendType="positive"
          icon="🔄"
          loading={loading}
          onClick={handleKPIClick}
          metricId="repeatUsers"
          formatType="number"
        />
        <KPICard
          label="Entitlement Utilization"
          value={`${data.entitlementUtilization && data.entitlementUtilization.length > 0 ? data.entitlementUtilization[0].utilization : 67}%`}
          subtitle="Benefits used vs allocated"
          trendType="positive"
          icon="🎫"
          loading={loading}
          onClick={handleKPIClick}
          metricId="entitlementUtilization"
          formatType="percentage"
        />
      </div>

      {/* Engagement Funnel */}
      <MetricChart title="User Engagement Funnel" subtitle="Conversion from eligible to repeat users">
        <div className="funnel-container">
          {funnelData.map((item, index) => (
            <div key={index} className="funnel-stage">
              <div 
                className="funnel-bar" 
                style={{ width: `${item.percentage}%` }}
              >
                <div className="funnel-label">{item.stage}</div>
                <div className="funnel-count">{formatNumber(item.count)}</div>
                <div className="funnel-percentage">{item.percentage.toFixed(1)}%</div>
              </div>
            </div>
          ))}
        </div>
      </MetricChart>

      {/* Daily Active Trends */}
      <MetricChart title="Daily Active Trends" subtitle="DAU, WAU, MAU over time">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.dailyActiveTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                fontSize={10}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="dau" 
                stroke="#e94f3d" 
                strokeWidth={2}
                name="DAU"
              />
              <Line 
                type="monotone" 
                dataKey="wau" 
                stroke="#4f46e5" 
                strokeWidth={2}
                name="WAU"
              />
              <Line 
                type="monotone" 
                dataKey="mau" 
                stroke="#1a2233" 
                strokeWidth={2}
                name="MAU"
              />
            </LineChart>
          </ResponsiveContainer>
        </MetricChart>

      {/* Member Segments Table */}
      <div className="analytics-table-container">
        <div className="table-header">
          <h3>User Segmentation</h3>
        </div>
        <div className="table-wrapper">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Segment</th>
                <th>Users</th>
                <th>Avg. Orders</th>
                <th>Value</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {data.memberSegments.map((segment, index) => (
                <tr key={index}>
                  <td><strong>{segment.segment}</strong></td>
                  <td>{formatNumber(segment.members)}</td>
                  <td>{segment.avgOrders.toFixed(1)}</td>
                  <td>{analyticsService.formatCurrency(segment.value)}</td>
                  <td>
                    <span className={`trend-${segment.trend > 0 ? 'positive' : 'neutral'}`}>
                      {segment.trend > 0 ? '↗' : '→'} {segment.trend > 0 ? '+' : ''}{segment.trend}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Entitlement Utilization */}
      {data.entitlementUtilization && (
        <MetricChart title="Entitlement Utilization by Benefit Type" subtitle="Usage breakdown">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.entitlementUtilization} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" fontSize={12} domain={[0, 100]} />
              <YAxis dataKey="type" type="category" stroke="#6b7280" fontSize={12} width={120} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
                formatter={(value) => `${value}%`}
              />
              <Bar dataKey="utilization" fill="#1a2233" name="Utilization %">
                {data.entitlementUtilization.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </MetricChart>
      )}

      {/* KPI Trend Modal */}
      <KPITrendModal
        isOpen={selectedMetric !== null}
        onClose={closeModal}
        metric={trendData}
      />
    </div>
  );
}

export default CustomerEngagement;

