import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import KPICard from './components/KPICard';
import MetricChart from './components/MetricChart';
import ExportButton from './components/ExportButton';
import TableHeaderTooltip from './components/TableHeaderTooltip';
import analyticsService from './services/analyticsService';
import './ProgramOverview.css';

const COLORS = ['#1a2233', '#e94f3d', '#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

function ProgramOverview({ filters }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    setLoading(true);
    try {
      const metrics = await analyticsService.getProgramMetrics(filters);
      setData(metrics);
    } catch (error) {
      console.error('Error loading program metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="program-overview">
        <div className="loading-state">Loading program metrics...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="program-overview">
        <div className="error-state">Error loading data. Please try again.</div>
      </div>
    );
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const formatCurrency = (num) => {
    if (num >= 1000000) return `£${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `£${(num / 1000).toFixed(1)}K`;
    return `£${num.toLocaleString()}`;
  };

  return (
    <div className="program-overview">
      {/* Executive Summary KPI Cards */}
      <div className="metrics-grid">
        <KPICard
          label="Eligible Members"
          value={formatNumber(data.eligibleMembers)}
          subtitle="Total program members"
          trend={data.eligibleMembersTrend}
          trendType="positive"
          icon="👥"
          loading={loading}
        />
        <KPICard
          label="Active Members"
          value={formatNumber(data.activeMembers)}
          subtitle="With orders in last 12 months"
          trend={data.activeMembersTrend}
          trendType="positive"
          icon="📊"
          loading={loading}
        />
        <KPICard
          label="Engagement Rate"
          value={`${data.engagementRate}%`}
          subtitle="Active vs Eligible"
          trend={data.engagementRateTrend}
          trendType="positive"
          icon="📈"
          loading={loading}
        />
        <KPICard
          label="GMV"
          value={formatCurrency(data.gmv)}
          subtitle="Gross Merchandise Value"
          trend={data.gmvTrend}
          trendType="positive"
          icon="💰"
          loading={loading}
        />
      </div>

      <div className="metrics-grid">
        <KPICard
          label="Total Orders"
          value={formatNumber(data.totalOrders)}
          subtitle="All bookings & redemptions"
          trend={data.totalOrdersTrend}
          trendType="positive"
          icon="📦"
          loading={loading}
        />
        <KPICard
          label="Cost per Member"
          value={formatCurrency(data.costPerMember)}
          subtitle="Average cost efficiency"
          trend={data.costPerMemberTrend}
          trendType="negative"
          icon="💵"
          loading={loading}
        />
        <KPICard
          label="Entitlement Utilization"
          value={`${data.entitlementUtilization}%`}
          subtitle="Benefits used vs allocated"
          trend={data.entitlementUtilizationTrend}
          trendType="positive"
          icon="🎫"
          loading={loading}
        />
        <KPICard
          label="Customer Satisfaction"
          value={`${data.customerSatisfaction}/5`}
          subtitle="CSAT score"
          trend={data.customerSatisfactionTrend}
          trendType="positive"
          icon="⭐"
          loading={loading}
        />
      </div>

      {/* Monthly Activity Summary Table */}
      <div className="analytics-table-container">
        <div className="table-header">
          <h3>Monthly Activity Summary</h3>
          <ExportButton
            data={data.monthlyActivity}
            columns={[
              { key: 'month', header: 'Month' },
              { key: 'newMembers', header: 'New Members' },
              { key: 'activeMembers', header: 'Active Members' },
              { key: 'totalMembers', header: 'Total Members' },
              { key: 'transactions', header: 'Total Orders' },
              { key: 'entitlementOrders', header: 'Entitlement' },
              { key: 'purchasedOrders', header: 'Purchased' },
              { key: 'value', header: 'Value' },
              { key: 'utilization', header: 'Utilization %' }
            ]}
            filename="program-overview-monthly-activity"
            filters={filters}
            viewName="Program Overview"
          />
        </div>
        <div className="table-wrapper">
          <table className="analytics-table">
            <thead>
              <tr>
                <TableHeaderTooltip label="Month" />
                <TableHeaderTooltip label="New Members" />
                <TableHeaderTooltip label="Active Members" />
                <TableHeaderTooltip label="Total Members" />
                <TableHeaderTooltip label="Total Orders" />
                <TableHeaderTooltip label="Entitlement" />
                <TableHeaderTooltip label="Purchased" />
                <TableHeaderTooltip label="Value" />
                <TableHeaderTooltip label="Utilization" />
                <TableHeaderTooltip label="Conversion Rate" />
              </tr>
            </thead>
            <tbody>
              {data.monthlyActivity.slice(-6).reverse().map((row, index) => {
                const totalMembers = row.totalMembers || row.activeMembers;
                const conversionRate = totalMembers > 0 ? (row.transactions / totalMembers) * 100 : 0;
                return (
                  <tr key={index}>
                    <td>{row.month}</td>
                    <td>{row.newMembers}</td>
                    <td>{formatNumber(row.activeMembers)}</td>
                    <td>{formatNumber(totalMembers)}</td>
                    <td>{formatNumber(row.transactions)}</td>
                    <td>{formatNumber(row.entitlementOrders || 0)}</td>
                    <td>{formatNumber(row.purchasedOrders || 0)}</td>
                    <td>{formatCurrency(row.value)}</td>
                    <td>{row.utilization.toFixed(1)}%</td>
                    <td>{conversionRate.toFixed(1)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Breakdown Chart */}
      {data.orderBreakdown && (
        <MetricChart title="Order Breakdown" subtitle="Entitlement redemptions vs purchased orders">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.orderBreakdown.slice(-6)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                fontSize={12}
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
              <Bar dataKey="entitlement" fill="#10b981" name="Entitlement Orders" />
              <Bar dataKey="purchased" fill="#e94f3d" name="Purchased Orders" />
            </BarChart>
          </ResponsiveContainer>
        </MetricChart>
      )}

      {/* Program Reach Section */}
      <MetricChart title="Program Reach & Adoption" subtitle="Member growth trends over time">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.memberGrowth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              fontSize={12}
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
              dataKey="eligible" 
              stroke="#1a2233" 
              strokeWidth={2}
              name="Eligible"
            />
            <Line 
              type="monotone" 
              dataKey="active" 
              stroke="#e94f3d" 
              strokeWidth={2}
              name="Active"
            />
            <Line 
              type="monotone" 
              dataKey="new" 
              stroke="#10b981" 
              strokeWidth={2}
              name="New"
            />
          </LineChart>
        </ResponsiveContainer>
      </MetricChart>

      {/* New vs Active */}
      <MetricChart title="Member Activity Breakdown" subtitle="Monthly comparison">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.memberGrowth.slice(-6)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              fontSize={12}
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
            <Bar dataKey="new" fill="#10b981" name="New Members" />
            <Bar dataKey="active" fill="#e94f3d" name="Active Members" />
          </BarChart>
        </ResponsiveContainer>
      </MetricChart>

      {/* Two Column Layout */}
      <div className="charts-two-column">
        <MetricChart title="Channel Distribution" subtitle="How members access the program">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.channelDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.channelDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </MetricChart>

        <MetricChart title="Orders by Category" subtitle="Order count and GMV by benefit category">
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={data.ordersByCategory} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="category"
                stroke="#6b7280" 
                fontSize={11}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis 
                yAxisId="left"
                orientation="left"
                stroke="#1a2233"
                fontSize={12}
                tickFormatter={(value) => formatNumber(value)}
                label={{ value: 'Order Count', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#1a2233' } }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="#e94f3d"
                fontSize={12}
                tickFormatter={(value) => formatCurrency(value)}
                label={{ value: 'GMV', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: '#e94f3d' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => {
                  if (name === 'GMV') {
                    return formatCurrency(value);
                  }
                  if (name === 'Order Count') {
                    return formatNumber(value);
                  }
                  return value;
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="orderCount" fill="#1a2233" name="Order Count" />
              <Bar yAxisId="right" dataKey="gmv" fill="#e94f3d" name="GMV" />
            </ComposedChart>
          </ResponsiveContainer>
        </MetricChart>
      </div>
    </div>
  );
}

export default ProgramOverview;

