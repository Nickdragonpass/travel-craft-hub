import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import KPICard from './components/KPICard';
import MetricChart from './components/MetricChart';
import KPITrendModal from './components/KPITrendModal';
import analyticsService from './services/analyticsService';
import { getMetricDefinition } from './services/metricDefinitions';
import './FinancialImpact.css';

const COLORS = ['#1a2233', '#e94f3d', '#4f46e5', '#10b981', '#f59e0b'];

function FinancialImpact({ filters }) {
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
      const metrics = await analyticsService.getFinancialMetrics(filters);
      setData(metrics);
    } catch (error) {
      console.error('Error loading financial metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="financial-impact">
        <div className="loading-state">Loading financial metrics...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="financial-impact">
        <div className="error-state">Error loading data. Please try again.</div>
      </div>
    );
  }

  const formatCurrency = (num) => analyticsService.formatCurrency(num);

  const handleKPIClick = async (metricId) => {
    if (!data) return;
    
    setModalLoading(true);
    setSelectedMetric(metricId);
    
    try {
      const historicalData = await analyticsService.getMetricTrendData(metricId, 'financial', filters);
      
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
      transactionRevenue: {
        label: 'Transaction Revenue',
        value: formatCurrency(data.transactionRevenue),
        subtitle: getMetricDefinition('Transaction Revenue'),
        icon: '💰',
        trendType: 'positive',
        formatType: 'currency'
      },
      gmv: {
        label: 'GMV',
        value: formatCurrency(data.gmv),
        subtitle: getMetricDefinition('GMV'),
        icon: '📦',
        trendType: 'positive',
        formatType: 'currency'
      },
      revenueMix: {
        label: 'Revenue Mix',
        value: `${data.revenueMix.subscription}% / ${data.revenueMix.transaction}%`,
        subtitle: getMetricDefinition('Revenue Mix'),
        icon: '💹',
        trendType: 'neutral',
        formatType: 'percentage'
      },
      conversionRate: {
        label: 'Conversion Rate',
        value: `${data.conversionRate}%`,
        subtitle: getMetricDefinition('Conversion Rate'),
        icon: '⚡',
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

  return (
    <div className="financial-impact">
      {/* Financial KPIs */}
      <div className="metrics-grid">
        <KPICard
          label="Transaction Revenue"
          value={formatCurrency(data.transactionRevenue)}
          subtitle="User-paid bookings"
          trendType="positive"
          icon="💰"
          loading={loading}
          onClick={handleKPIClick}
          metricId="transactionRevenue"
          formatType="currency"
        />
        <KPICard
          label="GMV"
          value={formatCurrency(data.gmv)}
          subtitle="Gross Merchandise Value"
          trendType="positive"
          icon="📦"
          loading={loading}
          onClick={handleKPIClick}
          metricId="gmv"
          formatType="currency"
        />
        <KPICard
          label="Revenue Mix"
          value={`${data.revenueMix.subscription}% / ${data.revenueMix.transaction}%`}
          subtitle="Subscription vs User-Paid"
          trendType="positive"
          icon="💹"
          loading={loading}
          onClick={handleKPIClick}
          metricId="revenueMix"
          formatType="percentage"
        />
        <KPICard
          label="Conversion Rate"
          value={`${data.conversionRate}%`}
          subtitle="Users that resulted in an order"
          trendType="positive"
          icon="⚡"
          loading={loading}
          onClick={handleKPIClick}
          metricId="conversionRate"
          formatType="percentage"
        />
      </div>

      {/* Revenue Breakdown */}
      <MetricChart title="Transaction Revenue Trends" subtitle="User-paid bookings over time">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data.revenueBreakdown}>
            <defs>
              <linearGradient id="colorTransaction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e94f3d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#e94f3d" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
              formatter={(value) => formatCurrency(value)}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="transaction" 
              stackId="1"
              stroke="#e94f3d" 
              fillOpacity={1}
              fill="url(#colorTransaction)"
              name="Transaction Revenue"
            />
          </AreaChart>
        </ResponsiveContainer>
      </MetricChart>

      {/* Two Column Layout */}
      <div className="charts-two-column">
        <MetricChart title="Budget vs Actual" subtitle="Forecast comparison">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.budgetVsActual}>
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
                formatter={(value) => formatCurrency(value)}
              />
              <Legend />
              <Bar dataKey="forecast" fill="#6b7280" name="Forecast" />
              <Bar dataKey="actual" fill="#10b981" name="Actual" />
            </BarChart>
          </ResponsiveContainer>
        </MetricChart>
      </div>

      {/* Monthly Financial Summary Table */}
      <div className="analytics-table-container">
        <div className="table-header">
          <h3>Monthly Financial Summary</h3>
        </div>
        <div className="table-wrapper">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Transaction Revenue</th>
                <th>GMV</th>
                <th>Cost</th>
                <th>vs Budget</th>
              </tr>
            </thead>
            <tbody>
              {data.monthlyFinancial.slice(-6).reverse().map((row, index) => (
                <tr key={index}>
                  <td>{row.month}</td>
                  <td>{formatCurrency(row.transactionRevenue)}</td>
                  <td>{formatCurrency(row.gmv)}</td>
                  <td>{formatCurrency(row.cost)}</td>
                  <td>
                    <span className={`trend-${row.vsBudget > 0 ? 'positive' : 'neutral'}`}>
                      {row.vsBudget > 0 ? '+' : ''}{row.vsBudget.toFixed(1)}% {row.vsBudget > 0 ? '↗' : '→'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Entitlement Value Analysis */}
      <div className="charts-two-column">
        <MetricChart title="Entitlement Value Utilization" subtitle={`£${(data.entitlementValue.used / 1000).toFixed(0)}K of £${(data.entitlementValue.allocated / 1000).toFixed(0)}K allocated`}>
          <div className="gauge-container">
            <div className="gauge">
              <div 
                className="gauge-fill" 
                style={{ 
                  width: `${data.entitlementValue.utilization}%`,
                  background: `linear-gradient(90deg, ${data.entitlementValue.utilization > 70 ? '#10b981' : data.entitlementValue.utilization > 50 ? '#f59e0b' : '#ef4444'})`
                }}
              >
                <span className="gauge-value">{data.entitlementValue.utilization.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </MetricChart>

        <MetricChart title="Value by Benefit Type" subtitle="Allocated vs Used value">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.entitlementValueByType}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="type" 
                stroke="#6b7280"
                fontSize={11}
                angle={-45}
                textAnchor="end"
                height={80}
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
                formatter={(value) => formatCurrency(value)}
              />
              <Legend />
              <Bar dataKey="allocated" fill="#6b7280" name="Allocated" />
              <Bar dataKey="used" fill="#10b981" name="Used" />
            </BarChart>
          </ResponsiveContainer>
        </MetricChart>
      </div>

      {/* KPI Trend Modal */}
      <KPITrendModal
        isOpen={selectedMetric !== null}
        onClose={closeModal}
        metric={trendData}
      />
    </div>
  );
}

export default FinancialImpact;

