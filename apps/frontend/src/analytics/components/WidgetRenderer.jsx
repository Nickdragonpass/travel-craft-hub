import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import KPICard from './KPICard';
import MetricChart from './MetricChart';
import analyticsService from '../services/analyticsService';
import './WidgetRenderer.css';

const COLORS = ['#1a2233', '#e94f3d', '#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

// Helper functions for formatting (defined at module level)
const formatNumber = (num) => {
  if (!num && num !== 0) return 'N/A';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString();
};

const formatCurrency = (num) => {
  if (!num && num !== 0) return 'N/A';
  if (num >= 1000000) return `£${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `£${(num / 1000).toFixed(1)}K`;
  return `£${num.toLocaleString()}`;
};

function WidgetRenderer({ widget, filters }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Get effective filters for this widget (custom or global)
  const effectiveFilters = {
    ...filters,
    timePeriod: widget.config?.customTimePeriod && widget.config.customTimePeriod !== 'Use Global Filter'
      ? widget.config.customTimePeriod
      : filters?.timePeriod || 'Last 30 Days'
  };

  useEffect(() => {
    loadWidgetData();
  }, [widget.id, effectiveFilters.timePeriod]);

  const loadWidgetData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Determine which service method to call based on widget category
      let metrics;
      
      if (widget.category === 'Program Overview') {
        metrics = await analyticsService.getProgramMetrics(effectiveFilters);
      } else if (widget.category === 'Member Engagement') {
        metrics = await analyticsService.getEngagementMetrics(effectiveFilters);
      } else if (widget.category === 'Program Performance') {
        metrics = await analyticsService.getPerformanceMetrics(effectiveFilters);
      } else if (widget.category === 'Financial Impact') {
        metrics = await analyticsService.getFinancialMetrics(effectiveFilters);
      } else {
        metrics = await analyticsService.getProgramMetrics(effectiveFilters);
      }
      
      setData(metrics);
    } catch (err) {
      console.error('Error loading widget data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="widget-renderer-loading">
        <div className="widget-loading-spinner"></div>
        <p>Loading data...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="widget-renderer-error">
        <p>⚠️ {error || 'Unable to load data'}</p>
      </div>
    );
  }

  // Render KPI Widget
  if (widget.type === 'kpi') {
    return renderKPIWidget(widget, data, effectiveFilters);
  }

  // Render Chart Widget
  if (widget.type === 'chart') {
    return renderChartWidget(widget, data);
  }

  // Render Table Widget
  if (widget.type === 'table') {
    return renderTableWidget(widget, data);
  }

  return (
    <div className="widget-renderer-error">
      <p>Unknown widget type: {widget.type}</p>
    </div>
  );
}

function renderKPIWidget(widget, data, filters) {
  const kpiData = getKPIData(widget.id, data);
  
  if (!kpiData) {
    return (
      <div className="widget-renderer-error">
        <p>⚠️ Data not available for this metric</p>
      </div>
    );
  }

  return (
    <KPICard
      label={widget.config?.title || widget.name}
      value={kpiData.value}
      subtitle={kpiData.subtitle}
      trend={kpiData.trend}
      trendType={kpiData.trendType}
      icon={widget.icon}
      loading={false}
      timePeriod={filters.timePeriod}
      description={widget.description}
    />
  );
}

function renderChartWidget(widget, data) {
  const chartData = getChartData(widget.id, data);
  
  if (!chartData) {
    return (
      <div className="widget-renderer-error">
        <p>⚠️ Chart data not available</p>
      </div>
    );
  }

  return (
    <div className="widget-chart-container">
      {chartData.component}
    </div>
  );
}

function renderTableWidget(widget, data) {
  const tableData = getTableData(widget.id, data);
  
  if (!tableData) {
    return (
      <div className="widget-renderer-error">
        <p>⚠️ Table data not available</p>
      </div>
    );
  }

  return (
    <div className="widget-table-container">
      <div className="table-wrapper">
        <table className="analytics-table">
          <thead>
            <tr>
              {tableData.columns.map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, idx) => (
              <tr key={idx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getKPIData(widgetId, data) {
  const kpiMap = {
    'kpi-eligible-members': {
      value: formatNumber(data.eligibleMembers),
      subtitle: 'Total program members',
      trend: data.eligibleMembersTrend,
      trendType: 'positive'
    },
    'kpi-active-members': {
      value: formatNumber(data.activeMembers),
      subtitle: 'With orders in last 12 months',
      trend: data.activeMembersTrend,
      trendType: 'positive'
    },
    'kpi-engagement-rate': {
      value: `${data.engagementRate}%`,
      subtitle: 'Active vs Eligible',
      trend: data.engagementRateTrend,
      trendType: 'positive'
    },
    'kpi-gmv': {
      value: formatCurrency(data.gmv),
      subtitle: 'Gross Merchandise Value',
      trend: data.gmvTrend,
      trendType: 'positive'
    },
    'kpi-total-orders': {
      value: formatNumber(data.totalOrders),
      subtitle: 'All bookings & redemptions',
      trend: data.totalOrdersTrend,
      trendType: 'positive'
    },
    'kpi-cost-per-member': {
      value: formatCurrency(data.costPerMember),
      subtitle: 'Average cost efficiency',
      trend: data.costPerMemberTrend,
      trendType: 'negative'
    },
    'kpi-entitlement-utilization': {
      value: `${data.entitlementUtilization}%`,
      subtitle: 'Benefits used vs allocated',
      trend: data.entitlementUtilizationTrend,
      trendType: 'positive'
    },
    'kpi-customer-satisfaction': {
      value: `${data.customerSatisfaction}/5`,
      subtitle: 'CSAT score',
      trend: data.customerSatisfactionTrend,
      trendType: 'positive'
    },
    'kpi-mau': {
      value: formatNumber(data.mau),
      subtitle: 'Monthly Active Members',
      trend: data.mauTrend,
      trendType: 'positive'
    },
    'kpi-dau': {
      value: formatNumber(data.dau),
      subtitle: 'Daily Active Members',
      trend: data.dauTrend,
      trendType: 'positive'
    },
    'kpi-mac': {
      value: formatNumber(data.mac),
      subtitle: 'Monthly Active with Orders',
      trend: data.macTrend,
      trendType: 'positive'
    },
    'kpi-repeat-users': {
      value: formatNumber(data.repeatUsers),
      subtitle: 'Members with multiple orders',
      trend: data.repeatUsersTrend,
      trendType: 'positive'
    },
    'kpi-booking-confirmation': {
      value: `${data.bookingConfirmationRate}%`,
      subtitle: 'Successfully confirmed bookings',
      trend: data.bookingConfirmationTrend,
      trendType: 'positive'
    },
    'kpi-automation-rate': {
      value: `${data.automationRate}%`,
      subtitle: 'Digital vs human-assisted',
      trend: data.automationRateTrend,
      trendType: 'positive'
    },
    'kpi-csat': {
      value: `${data.csat}/5`,
      subtitle: 'Customer Satisfaction Score',
      trend: data.csatTrend,
      trendType: 'positive'
    },
    'kpi-nps': {
      value: data.nps,
      subtitle: 'Net Promoter Score',
      trend: data.npsTrend,
      trendType: 'positive'
    },
    'kpi-fcr': {
      value: `${data.fcr}%`,
      subtitle: 'First Contact Resolution',
      trend: data.fcrTrend,
      trendType: 'positive'
    },
    'kpi-response-time': {
      value: `${data.responseTime}min`,
      subtitle: 'Average response time',
      trend: data.responseTimeTrend,
      trendType: data.responseTimeTrend > 0 ? 'negative' : 'positive'
    },
    'kpi-transaction-revenue': {
      value: formatCurrency(data.transactionRevenue),
      subtitle: 'Member-paid bookings',
      trend: data.transactionRevenueTrend,
      trendType: 'positive'
    },
    'kpi-program-roi': {
      value: `${data.programROI?.toFixed(1) || 'N/A'}x`,
      subtitle: 'Return on investment',
      trend: data.programROITrend,
      trendType: 'positive'
    },
    'kpi-roi-percentage': {
      value: `${data.roiPercentage || 'N/A'}%`,
      subtitle: 'Return percentage',
      trend: data.roiPercentageTrend,
      trendType: 'positive'
    }
  };

  return kpiMap[widgetId];
}

function getChartData(widgetId, data) {
  const chartMap = {
    'chart-member-growth': {
      component: (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data.memberGrowth || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
            <YAxis stroke="#6b7280" fontSize={11} />
            <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
            <Legend />
            <Line type="monotone" dataKey="eligible" stroke="#1a2233" strokeWidth={2} name="Eligible" />
            <Line type="monotone" dataKey="active" stroke="#e94f3d" strokeWidth={2} name="Active" />
            <Line type="monotone" dataKey="new" stroke="#10b981" strokeWidth={2} name="New" />
          </LineChart>
        </ResponsiveContainer>
      )
    },
    'chart-order-breakdown': {
      component: (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={(data.orderBreakdown || []).slice(-6)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
            <YAxis stroke="#6b7280" fontSize={11} />
            <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
            <Legend />
            <Bar dataKey="entitlement" fill="#10b981" name="Entitlement Orders" />
            <Bar dataKey="purchased" fill="#e94f3d" name="Purchased Orders" />
          </BarChart>
        </ResponsiveContainer>
      )
    },
    'chart-channel-distribution': {
      component: (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data.channelDistribution || []}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {(data.channelDistribution || []).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )
    },
    'chart-orders-by-category': {
      component: (
        <ResponsiveContainer width="100%" height={250}>
          <ComposedChart data={data.ordersByCategory || []} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="category"
              stroke="#6b7280"
              fontSize={10}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              yAxisId="left"
              orientation="left"
              stroke="#1a2233"
              fontSize={11}
              tickFormatter={formatNumber}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#e94f3d"
              fontSize={11}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              formatter={(value, name) => {
                if (name === 'GMV') return formatCurrency(value);
                return formatNumber(value);
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="orderCount" fill="#1a2233" name="Order Count" />
            <Bar yAxisId="right" dataKey="gmv" fill="#e94f3d" name="GMV" />
          </ComposedChart>
        </ResponsiveContainer>
      )
    },
    'chart-engagement-funnel': {
      component: (
        <div className="funnel-container">
          {(() => {
            const funnel = data.funnel || {};
            const funnelData = [
              { stage: 'Eligible Members', count: funnel.eligible || 0, percentage: 100 },
              { stage: 'Active Members', count: funnel.active || 0, percentage: funnel.eligible ? (funnel.active / funnel.eligible) * 100 : 0 },
              { stage: 'With Orders', count: funnel.withOrders || 0, percentage: funnel.eligible ? (funnel.withOrders / funnel.eligible) * 100 : 0 },
              { stage: 'Repeat Users', count: funnel.repeat || 0, percentage: funnel.eligible ? (funnel.repeat / funnel.eligible) * 100 : 0 }
            ];
            
            return funnelData.map((item, index) => (
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
            ));
          })()}
        </div>
      )
    },
    'chart-daily-active-trends': {
      component: (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data.dailyActiveTrend || []}>
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
              fontSize={11}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Legend />
            <Line type="monotone" dataKey="dau" stroke="#e94f3d" strokeWidth={2} name="DAU" />
            <Line type="monotone" dataKey="wau" stroke="#4f46e5" strokeWidth={2} name="WAU" />
            <Line type="monotone" dataKey="mau" stroke="#1a2233" strokeWidth={2} name="MAU" />
          </LineChart>
        </ResponsiveContainer>
      )
    },
    'chart-entitlement-utilization': {
      component: (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.entitlementUtilization || []} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" stroke="#6b7280" fontSize={11} domain={[0, 100]} />
            <YAxis dataKey="type" type="category" stroke="#6b7280" fontSize={11} width={120} />
            <Tooltip
              contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              formatter={(value) => `${value}%`}
            />
            <Bar dataKey="utilization" fill="#1a2233" name="Utilization %">
              {(data.entitlementUtilization || []).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )
    },
    'chart-revenue-trends': {
      component: (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data.revenueBreakdown || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
            <YAxis stroke="#6b7280" fontSize={11} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              formatter={(value) => formatCurrency(value)}
            />
            <Legend />
            <Line type="monotone" dataKey="transaction" stroke="#e94f3d" strokeWidth={2} name="Transaction Revenue" />
          </LineChart>
        </ResponsiveContainer>
      )
    },
    'chart-budget-vs-actual': {
      component: (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.budgetVsActual || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
            <YAxis stroke="#6b7280" fontSize={11} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              formatter={(value) => formatCurrency(value)}
            />
            <Legend />
            <Bar dataKey="forecast" fill="#6b7280" name="Forecast" />
            <Bar dataKey="actual" fill="#10b981" name="Actual" />
          </BarChart>
        </ResponsiveContainer>
      )
    },
    'chart-cost-breakdown': {
      component: (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data.costBreakdown || []}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ category, value }) => `${category}: ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {(data.costBreakdown || []).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )
    },
    'chart-quality-trends': {
      component: (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data.qualityTrends || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
            <YAxis stroke="#6b7280" fontSize={11} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Legend />
            <Line type="monotone" dataKey="csat" stroke="#e94f3d" strokeWidth={2} name="CSAT" />
            <Line type="monotone" dataKey="nps" stroke="#4f46e5" strokeWidth={2} name="NPS" />
            <Line type="monotone" dataKey="fcr" stroke="#10b981" strokeWidth={2} name="FCR %" />
          </LineChart>
        </ResponsiveContainer>
      )
    },
    'chart-sla-performance': {
      component: (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.slaPerformance || []} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" stroke="#6b7280" fontSize={11} domain={[0, 100]} />
            <YAxis dataKey="channel" type="category" stroke="#6b7280" fontSize={11} width={100} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              formatter={(value) => `${value}%`}
            />
            <Bar dataKey="sla" fill="#1a2233" name="SLA %">
              {(data.slaPerformance || []).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )
    }
  };

  return chartMap[widgetId] || null;
}

function getTableData(widgetId, data) {
  const tableMap = {
    'table-monthly-activity': {
      columns: ['Month', 'New Members', 'Active Members', 'Total Members', 'Total Orders', 'Value', 'Utilization %'],
      rows: (data.monthlyActivity || []).slice(-6).reverse().map(row => [
        row.month,
        row.newMembers,
        formatNumber(row.activeMembers),
        formatNumber(row.totalMembers || row.activeMembers),
        formatNumber(row.transactions),
        formatCurrency(row.value),
        `${row.utilization?.toFixed(1) || 0}%`
      ])
    },
    'table-member-segmentation': {
      columns: ['Segment', 'Members', 'Avg. Orders', 'Value', 'Trend'],
      rows: (data.memberSegments || []).map(segment => [
        segment.segment,
        formatNumber(segment.members),
        segment.avgOrders.toFixed(1),
        formatCurrency(segment.value),
        `${segment.trend > 0 ? '+' : ''}${segment.trend}%`
      ])
    },
    'table-channel-performance': {
      columns: ['Channel', 'Volume', 'SLA %', 'Response Time', 'FCR', 'CSAT'],
      rows: (data.slaPerformance || []).map(channel => [
        channel.channel,
        formatNumber(channel.volume),
        `${channel.sla}%`,
        `${channel.responseTime}min`,
        `${channel.fcr}%`,
        channel.csat
      ])
    },
    'table-monthly-financial': {
      columns: ['Month', 'Transaction Revenue', 'GMV', 'Cost', 'ROI', 'vs Budget'],
      rows: (data.monthlyFinancial || []).slice(-6).reverse().map(row => [
        row.month,
        formatCurrency(row.transactionRevenue),
        formatCurrency(row.gmv),
        formatCurrency(row.cost),
        `${row.roi?.toFixed(1) || 'N/A'}x`,
        `${row.vsBudget > 0 ? '+' : ''}${row.vsBudget?.toFixed(1) || 0}%`
      ])
    }
  };

  return tableMap[widgetId] || null;
}

export default WidgetRenderer;
