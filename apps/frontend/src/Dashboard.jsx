import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KPICard from './analytics/components/KPICard';
import KPITrendModal from './analytics/components/KPITrendModal';
import analyticsService from './analytics/services/analyticsService';
import './App.css';

function Dashboard() {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('YTD');
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [trendData, setTrendData] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const timeframes = [
    'Max',
    'YTD',
    'Last 90 Days',
    'Last 30 Days',
    'Last 7 Days',
    'Yesterday'
  ];

  // Mock metrics data - Key Metrics Snapshot (8 metrics)
  const dashboardMetrics = [
    {
      id: 'revenue_mix',
      metricId: 'revenueMix',
      label: 'Revenue Mix',
      value: '68% / 32%',
      subtitle: 'Subscription vs User-Paid',
      trendType: 'neutral',
      icon: '💹',
      formatType: 'percentage'
    },
    {
      id: 'total_users',
      metricId: 'totalUsers',
      label: 'Total Users',
      value: '120,450',
      subtitle: 'All registered users',
      trendType: 'positive',
      icon: '👥',
      formatType: 'number'
    },
    {
      id: 'mau',
      metricId: 'mau',
      label: 'Monthly Active Users (MAU)',
      value: '48,920',
      subtitle: 'Active in last 30 days',
      trendType: 'positive',
      icon: '📊',
      formatType: 'number'
    },
    {
      id: 'member_penetration',
      metricId: 'userPenetration',
      label: 'User Penetration',
      value: '42%',
      subtitle: 'Users who engaged (requests or orders)',
      trendType: 'positive',
      icon: '🎯',
      formatType: 'percentage'
    },
    {
      id: 'total_requests',
      metricId: 'totalRequests',
      label: 'Total Requests',
      value: '1.86M',
      subtitle: 'Assisted user requests',
      trendType: 'positive',
      icon: '🤖',
      formatType: 'number'
    },
    {
      id: 'conversion_rate',
      metricId: 'conversionRate',
      label: 'Conversion Rate',
      value: '4.8%',
      subtitle: 'Users that resulted in an order',
      trendType: 'positive',
      icon: '⚡',
      formatType: 'percentage'
    },
    {
      id: 'response_time',
      metricId: 'responseTime',
      label: 'Response Time',
      value: '1.2 min',
      subtitle: 'Avg user support response',
      trendType: 'positive',
      icon: '📞',
      formatType: 'number'
    },
    {
      id: 'csat',
      metricId: 'csat',
      label: 'CSAT',
      value: '4.7 / 5',
      subtitle: 'User satisfaction (last 30 days)',
      trendType: 'positive',
      icon: '⭐',
      formatType: 'number'
    }
  ];

  const goToAnalytics = () => {
    navigate('/admin/analytics');
  };

  const goToBookingManagement = () => {
    navigate('/admin/booking-management');
  };

  const getMetricConfig = (metricId) => {
    return dashboardMetrics.find((m) => m.metricId === metricId) || {};
  };

  const handleKPIClick = async (metricId) => {
    setModalLoading(true);
    setSelectedMetric(metricId);
    try {
      const historicalData = await analyticsService.getMetricTrendData(metricId, 'dashboard', { timePeriod: selectedTimeframe });
      const metricConfig = getMetricConfig(metricId);
      setTrendData({
        ...metricConfig,
        trendData: historicalData
      });
    } catch (error) {
      console.error('Error loading trend data:', error);
      setTrendData(getMetricConfig(metricId));
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedMetric(null);
    setTrendData(null);
  };

  // Mock orders data
  const recentOrders = [
    {
      id: 1,
      timestamp: '2 min ago',
      productType: 'Flight',
      productName: 'LHR → JFK • Business Class',
      productCount: '1 flight',
      orderType: 'Purchase',
      orderTypeDetail: null,
      price: '£2,340',
      revenue: '£234.00',
      dates: '15 Dec 2024 - 22 Dec 2024',
      confirmationNumber: 'ORD-2024-001234',
      customerName: 'John Smith'
    },
    {
      id: 2,
      timestamp: '5 min ago',
      productType: 'eSIM',
      productName: '2GB Europe eSIM',
      productCount: '1 eSIM',
      orderType: 'Purchase',
      orderTypeDetail: null,
      price: '£12.99',
      revenue: '£1.30',
      dates: 'Valid: 10 Dec 2024 - 10 Jan 2025',
      confirmationNumber: 'ORD-2024-001233',
      customerName: 'Sarah Johnson'
    },
    {
      id: 3,
      timestamp: '8 min ago',
      productType: 'Flight',
      productName: 'JFK → LHR • First Class',
      productCount: '2 flights',
      orderType: 'Redeemed',
      orderTypeDetail: 'Entitlement',
      price: '£0.00',
      revenue: '£0.00',
      dates: '20 Dec 2024 - 27 Dec 2024',
      confirmationNumber: 'ORD-2024-001232',
      customerName: 'Michael Brown'
    },
    {
      id: 4,
      timestamp: '12 min ago',
      productType: 'Lounge Access',
      productName: 'Heathrow Terminal 5 Lounge',
      productCount: '1 access',
      orderType: 'Redeemed',
      orderTypeDetail: 'Voucher',
      price: '£0.00',
      revenue: '£0.00',
      dates: '18 Dec 2024',
      confirmationNumber: 'ORD-2024-001231',
      customerName: 'Emma Wilson'
    },
    {
      id: 5,
      timestamp: '15 min ago',
      productType: 'eSIM',
      productName: '5GB Global eSIM',
      productCount: '2 eSIMs',
      orderType: 'Purchase',
      orderTypeDetail: null,
      price: '£29.98',
      revenue: '£3.00',
      dates: 'Valid: 12 Dec 2024 - 12 Feb 2025',
      confirmationNumber: 'ORD-2024-001230',
      customerName: 'David Lee'
    }
  ];

  const getProductIcon = (productType) => {
    const icons = {
      'Flight': '✈️',
      'eSIM': '📱',
      'Lounge Access': '🍷',
      'Hotel': '🏨',
      'Transfer': '🚗',
      'Event': '🎫'
    };
    return icons[productType] || '📦';
  };

  return (
    <div className="dashboard-grid">
      {/* Key Metrics Snapshot */}
      <section className="dashboard-section metrics-section">
        <div className="metrics-header">
          <h2 className="section-title">Key Metrics Snapshot</h2>
          <div className="metrics-actions">
            <select 
              className="timeframe-select"
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
            >
              {timeframes.map((timeframe) => (
                <option key={timeframe} value={timeframe}>
                  {timeframe}
                </option>
              ))}
            </select>
            <button className="view-all-btn" onClick={goToAnalytics}>View Analytics</button>
          </div>
        </div>
        <div className="metrics-grid">
          {dashboardMetrics.map((metric) => (
            <KPICard
              key={metric.id}
              label={metric.label}
              value={metric.value}
              subtitle={metric.subtitle}
              trendType={metric.trendType}
              icon={metric.icon}
              loading={false}
              onClick={handleKPIClick}
              metricId={metric.metricId}
              formatType={metric.formatType}
            />
          ))}
        </div>
      </section>

      {/* KPI Trend Modal */}
      <KPITrendModal
        isOpen={selectedMetric !== null}
        onClose={closeModal}
        metric={trendData}
      />

      {/* Operational Feed */}
      <section className="dashboard-section feed-section">
        <div className="metrics-header">
          <h2 className="section-title">Operational Feed</h2>
          <div className="metrics-actions">
            <button className="view-all-btn" onClick={goToBookingManagement}>View All Orders</button>
          </div>
        </div>
        <div className="activity-feed">
          {recentOrders.map((order) => (
            <div key={order.id} className="feed-item order-item">
              <div className="feed-icon booking">{getProductIcon(order.productType)}</div>
              <div className="feed-content">
                <div className="feed-title">Order Confirmation</div>
                <div className="order-details">
                  <div className="order-detail-row">
                    <span className="order-label">Product:</span>
                    <span className="order-value">{order.productType} • {order.productName}</span>
                  </div>
                  <div className="order-detail-row">
                    <span className="order-label">Date(s):</span>
                    <span className="order-value">{order.dates}</span>
                  </div>
                  <div className="order-detail-row">
                    <span className="order-label">Quantity:</span>
                    <span className="order-value">{order.productCount}</span>
                  </div>
                  <div className="order-detail-row">
                    <span className="order-label">Type:</span>
                    <span className={`order-value order-type-${order.orderType.toLowerCase()}`}>
                      {order.orderType}
                      {order.orderTypeDetail && ` (${order.orderTypeDetail})`}
                    </span>
                  </div>
                  <div className="order-detail-row">
                    <span className="order-label">Price:</span>
                    <span className="order-value">{order.price}</span>
                  </div>
                  <div className="order-detail-row">
                    <span className="order-label">Confirmation:</span>
                    <span className="order-value">{order.confirmationNumber}</span>
                  </div>
                  <div className="order-detail-row">
                    <span className="order-label">Customer:</span>
                    <span className="order-value">{order.customerName}</span>
                  </div>
                </div>
                <div className="feed-time">{order.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard; 