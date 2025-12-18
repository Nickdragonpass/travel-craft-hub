import React, { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Area,
  AreaChart,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import MetricChart from './components/MetricChart';
import analyticsService from './services/analyticsService';
import './Supply.css';

const BRAND_COLORS = {
  navy: '#1a2233',
  red: '#e94f3d',
  blue: '#4f46e5',
  slate: '#6b7280',
  amber: '#f59e0b',
  danger: '#ef4444'
};

const COLORS = ['#1a2233', '#e94f3d', '#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

function Supply({ filters }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [categoryKey, setCategoryKey] = useState('all');

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const loadData = async () => {
    setLoading(true);
    try {
      const metrics = await analyticsService.getSupplyMetrics(filters);
      setData(metrics);
    } catch (error) {
      console.error('Error loading supply metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="supply-analytics">
        <div className="loading-state">Loading supply metrics...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="supply-analytics">
        <div className="error-state">Error loading data. Please try again.</div>
      </div>
    );
  }

  const categoryOptions = data.categoryOptions || [
    { key: 'all', label: 'All' }
  ];

  const view = (data.datasets && data.datasets[categoryKey]) ? data.datasets[categoryKey] : data.datasets?.all;

  if (!view) {
    return (
      <div className="supply-analytics">
        <div className="error-state">Supply dataset not available.</div>
      </div>
    );
  }

  const formatCurrency = (num) => analyticsService.formatCurrency(num);

  return (
    <div className="supply-analytics">
      {/* Local controls */}
      <div className="supply-controls">
        <div className="supply-control">
          <div className="supply-control-label">Category</div>
          <select
            className="timeframe-select supply-select"
            value={categoryKey}
            onChange={(e) => setCategoryKey(e.target.value)}
          >
            {categoryOptions.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="supply-control-meta">
          Showing supplier + destination analytics for <strong>{categoryOptions.find((o) => o.key === categoryKey)?.label || 'All'}</strong>
        </div>
      </div>

      {/* Two-column charts */}
      <div className="charts-two-column">
        <MetricChart title="Top Destinations" subtitle="Ranked by spend (GMV)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={view.topDestinations} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" fontSize={12} />
              <YAxis dataKey="destination" type="category" stroke="#6b7280" fontSize={12} width={110} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
                formatter={(value) => formatCurrency(value)}
              />
              <Bar dataKey="spend" fill={BRAND_COLORS.red} name="Spend (GMV)" />
            </BarChart>
          </ResponsiveContainer>
        </MetricChart>

        <MetricChart title="Top Suppliers" subtitle="Ranked by spend (GMV)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={view.topSuppliers} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" fontSize={12} />
              <YAxis dataKey="supplier" type="category" stroke="#6b7280" fontSize={12} width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
                formatter={(value) => formatCurrency(value)}
              />
              <Bar dataKey="spend" fill={BRAND_COLORS.blue} name="Spend (GMV)" />
            </BarChart>
          </ResponsiveContainer>
        </MetricChart>
      </div>

      {/* Category Mix (only for "all" category) */}
      {categoryKey === 'all' && view.categoryMix && (
        <div className="charts-two-column">
          <MetricChart title="Category Mix by Orders" subtitle="Share of total orders">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={view.categoryMix}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, orderShare }) => `${name}: ${orderShare}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="orderShare"
                >
                  {view.categoryMix.map((entry, index) => (
                    <Cell key={`cell-orders-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name, props) => [
                    `${value}% (${props.payload.orders} orders)`,
                    'Order Share'
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </MetricChart>

          <MetricChart title="Category Mix by Spend" subtitle="Share of total spend (GMV)">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={view.categoryMix}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, spendShare }) => `${name}: ${spendShare}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="spendShare"
                >
                  {view.categoryMix.map((entry, index) => (
                    <Cell key={`cell-spend-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name, props) => [
                    `${value}% (${formatCurrency(props.payload.spend)})`,
                    'Spend Share'
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </MetricChart>
        </div>
      )}

      {/* Origin Cities (only for "all" category) */}
      {categoryKey === 'all' && view.originCities && view.originCities.length > 0 && (
        <MetricChart title="Origin Cities" subtitle="Where bookings originate (ranked by volume)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={view.originCities} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" fontSize={12} />
              <YAxis dataKey="origin" type="category" stroke="#6b7280" fontSize={12} width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => {
                  if (name === 'orders') return [value.toLocaleString(), 'Orders'];
                  if (name === 'spend') return [formatCurrency(value), 'Spend (GMV)'];
                  return [value, name];
                }}
              />
              <Legend />
              <Bar dataKey="orders" fill={BRAND_COLORS.navy} name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </MetricChart>
      )}

      {/* Supplier rankings */}
      <div className="analytics-table-container">
        <div className="table-header">
          <h3>Supplier Rankings</h3>
        </div>
        <div className="table-wrapper">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Orders</th>
                <th>Spend (GMV)</th>
                <th>Avg Order Value</th>
                <th>Spend Share</th>
              </tr>
            </thead>
            <tbody>
              {view.supplierRankings.map((row, idx) => (
                <tr key={`${row.supplier}-${idx}`}>
                  <td><strong>{row.supplier}</strong></td>
                  <td>{row.orders.toLocaleString()}</td>
                  <td>{formatCurrency(row.spend)}</td>
                  <td>{formatCurrency(row.avgOrderValue)}</td>
                  <td>{row.spendShare.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Supply;


