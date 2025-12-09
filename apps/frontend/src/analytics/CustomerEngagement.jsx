import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import KPICard from './components/KPICard';
import MetricChart from './components/MetricChart';
import analyticsService from './services/analyticsService';
import './CustomerEngagement.css';

const COLORS = ['#1a2233', '#e94f3d', '#4f46e5', '#10b981', '#f59e0b'];

function CustomerEngagement({ filters }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

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

  // Calculate funnel percentages
  const funnelData = [
    { stage: 'Eligible Members', count: data.funnel.eligible, percentage: 100 },
    { stage: 'Active Members', count: data.funnel.active, percentage: (data.funnel.active / data.funnel.eligible) * 100 },
    { stage: 'With Orders', count: data.funnel.withOrders, percentage: (data.funnel.withOrders / data.funnel.eligible) * 100 },
    { stage: 'Repeat Users', count: data.funnel.repeat, percentage: (data.funnel.repeat / data.funnel.eligible) * 100 }
  ];

  return (
    <div className="customer-engagement">
      {/* Engagement Metrics KPI Cards */}
      <div className="metrics-grid">
        <KPICard
          label="MAU"
          value={formatNumber(data.mau)}
          subtitle="Monthly Active Members"
          trend={data.mauTrend}
          trendType="positive"
          icon="📊"
          loading={loading}
        />
        <KPICard
          label="DAU"
          value={formatNumber(data.dau)}
          subtitle="Daily Active Members"
          trend={data.dauTrend}
          trendType="positive"
          icon="📅"
          loading={loading}
        />
        <KPICard
          label="MAC"
          value={formatNumber(data.mac)}
          subtitle="Monthly Active with Orders"
          trend={data.macTrend}
          trendType="positive"
          icon="🛒"
          loading={loading}
        />
        <KPICard
          label="Repeat Users"
          value={formatNumber(data.repeatUsers)}
          subtitle="Members with multiple orders"
          trend={data.repeatUsersTrend}
          trendType="positive"
          icon="🔄"
          loading={loading}
        />
        <KPICard
          label="Entitlement Utilization"
          value={`${data.entitlementUtilization && data.entitlementUtilization.length > 0 ? data.entitlementUtilization[0].utilization : 67}%`}
          subtitle="Benefits used vs allocated"
          trend={4.2}
          trendType="positive"
          icon="🎫"
          loading={loading}
        />
      </div>

      {/* Engagement Funnel */}
      <MetricChart title="Member Engagement Funnel" subtitle="Conversion from eligible to repeat users">
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
          <h3>Member Segmentation</h3>
        </div>
        <div className="table-wrapper">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Segment</th>
                <th>Members</th>
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
    </div>
  );
}

export default CustomerEngagement;

