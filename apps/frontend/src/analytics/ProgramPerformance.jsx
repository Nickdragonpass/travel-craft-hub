import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import KPICard from './components/KPICard';
import MetricChart from './components/MetricChart';
import analyticsService from './services/analyticsService';
import './ProgramPerformance.css';

const COLORS = ['#1a2233', '#e94f3d', '#4f46e5', '#10b981'];

function ProgramPerformance({ filters }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    setLoading(true);
    try {
      const metrics = await analyticsService.getPerformanceMetrics(filters);
      setData(metrics);
    } catch (error) {
      console.error('Error loading performance metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="program-performance">
        <div className="loading-state">Loading performance metrics...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="program-performance">
        <div className="error-state">Error loading data. Please try again.</div>
      </div>
    );
  }

  const getStatusIndicator = (status) => {
    if (status === 'excellent') return '✅';
    if (status === 'good') return '✅';
    if (status === 'fair') return '⚠️';
    return '❌';
  };

  return (
    <div className="program-performance">
      {/* Quality Scorecards */}
      <div className="metrics-grid">
        <KPICard
          label="Booking Confirmation"
          value={`${data.bookingConfirmationRate}%`}
          subtitle="Successfully confirmed bookings"
          trend={data.bookingConfirmationTrend}
          trendType="positive"
          icon="✓"
          loading={loading}
        />
        <KPICard
          label="Automation Rate"
          value={`${data.automationRate}%`}
          subtitle="Digital vs human-assisted"
          trend={data.automationRateTrend}
          trendType="positive"
          icon="🤖"
          loading={loading}
        />
        <KPICard
          label="CSAT"
          value={`${data.csat}/5`}
          subtitle="Customer Satisfaction Score"
          trend={data.csatTrend}
          trendType="positive"
          icon="⭐"
          loading={loading}
        />
        <KPICard
          label="NPS"
          value={data.nps}
          subtitle="Net Promoter Score"
          trend={data.npsTrend}
          trendType="positive"
          icon="👍"
          loading={loading}
        />
        <KPICard
          label="FCR"
          value={`${data.fcr}%`}
          subtitle="First Contact Resolution"
          trend={data.fcrTrend}
          trendType="positive"
          icon="🎯"
          loading={loading}
        />
        <KPICard
          label="Response Time"
          value={`${data.responseTime}min`}
          subtitle="Average response time"
          trend={data.responseTimeTrend}
          trendType={data.responseTimeTrend > 0 ? 'negative' : 'positive'}
          icon="⏱️"
          loading={loading}
        />
      </div>

      {/* Quality Trends */}
      <MetricChart title="Quality Metrics Over Time" subtitle="CSAT, NPS, and FCR trends">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.qualityTrends}>
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
              dataKey="csat" 
              stroke="#e94f3d" 
              strokeWidth={2}
              name="CSAT"
            />
            <Line 
              type="monotone" 
              dataKey="nps" 
              stroke="#4f46e5" 
              strokeWidth={2}
              name="NPS"
            />
            <Line 
              type="monotone" 
              dataKey="fcr" 
              stroke="#10b981" 
              strokeWidth={2}
              name="FCR %"
            />
          </LineChart>
        </ResponsiveContainer>
      </MetricChart>

      {/* Two Column Layout */}
      <div className="charts-two-column">
        <MetricChart title="SLA Performance by Channel" subtitle="Service level compliance">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.slaPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" fontSize={12} domain={[0, 100]} />
              <YAxis dataKey="channel" type="category" stroke="#6b7280" fontSize={12} width={100} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
                formatter={(value) => `${value}%`}
              />
              <Bar dataKey="sla" fill="#1a2233" name="SLA %">
                {data.slaPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </MetricChart>

        <MetricChart title="Channel Comparison" subtitle="Volume vs Quality metrics">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.slaPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="channel" 
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
              <Bar dataKey="volume" fill="#1a2233" name="Volume" />
              <Bar dataKey="csat" fill="#e94f3d" name="CSAT" />
            </BarChart>
          </ResponsiveContainer>
        </MetricChart>
      </div>

      {/* Channel Performance Table */}
      <div className="analytics-table-container">
        <div className="table-header">
          <h3>Channel Performance Summary</h3>
        </div>
        <div className="table-wrapper">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Channel</th>
                <th>Volume</th>
                <th>SLA %</th>
                <th>Response Time</th>
                <th>FCR</th>
                <th>CSAT</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.slaPerformance.map((channel, index) => (
                <tr key={index}>
                  <td><strong>{channel.channel}</strong></td>
                  <td>{channel.volume.toLocaleString()}</td>
                  <td>{channel.sla}%</td>
                  <td>{channel.responseTime}min</td>
                  <td>{channel.fcr}%</td>
                  <td>{channel.csat}</td>
                  <td>
                    <span className="status-indicator">
                      {getStatusIndicator(channel.status)} {channel.status.charAt(0).toUpperCase() + channel.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProgramPerformance;

