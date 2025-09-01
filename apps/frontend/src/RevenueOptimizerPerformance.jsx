import React, { useState } from 'react';
import RevenueOptimizerFunctionDetails from './RevenueOptimizerFunctionDetails';

function RevenueOptimizerPerformance({ revenueFunctions }) {
  console.log('RevenueOptimizerPerformance received revenueFunctions:', revenueFunctions);
  
  const [selectedTimeframe, setSelectedTimeframe] = useState('30');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedFunctionId, setSelectedFunctionId] = useState(null);

  // Mock data for UI/UX testing
  const mockFunctions = [
    {
      id: 'func-1',
      name: 'Flight to Hotel Cross-Sell',
      description: 'Automatically suggest hotel bookings when customers book flights',
      category: 'Cross-Sell',
      bookingTypes: ['Flight'],
      status: 'Active',
      performance: {
        impressions: 12470,
        clicks: 3120,
        conversions: 890,
        revenue: '£267,000',
        conversionRate: '7.1%'
      },
      comms: [
        { id: 'comm-1', name: 'Post-Booking Email Campaign', status: 'Active', performance: { opens: '23%', clicks: '8.2%', impressions: 8900, deliveries: '98%' } },
        { id: 'comm-2', name: 'In-App Hotel Suggestions', status: 'Active', performance: { impressions: 3570, clicks: '12.4%', conversions: 445 } },
        { id: 'comm-3', name: 'SMS Hotel Reminder', status: 'Active', performance: { deliveries: '96%', clicks: '15.1%', opens: '18%' } }
      ]
    },
    {
      id: 'func-2',
      name: 'Pre-Departure Seat Upgrade',
      description: '3 days before flight departure, offer seat bookability with discount',
      category: 'Upsell',
      bookingTypes: ['Flight'],
      status: 'Active',
      performance: {
        impressions: 18900,
        clicks: 5670,
        conversions: 945,
        revenue: '£141,750',
        conversionRate: '5.0%'
      },
      comms: [
        { id: 'comm-4', name: 'South America Email (Spanish)', status: 'Active', performance: { opens: '31%', clicks: '12.4%', impressions: 6300, deliveries: '97%' } },
        { id: 'comm-5', name: 'South America Email (Portuguese)', status: 'Active', performance: { opens: '29%', clicks: '11.8%', impressions: 4200, deliveries: '96%' } },
        { id: 'comm-6', name: 'Digital Concierge (A/B Test A)', status: 'Active', performance: { impressions: 4200, clicks: '18.2%', opens: '45%' } },
        { id: 'comm-7', name: 'Digital Concierge (A/B Test B)', status: 'Active', performance: { impressions: 4200, clicks: '16.8%', opens: '42%' } }
      ]
    },
    {
      id: 'func-3',
      name: 'Airport Services Bundle',
      description: 'Offer fast track, lounge access, and transfers as a package',
      category: 'Bundle',
      bookingTypes: ['Flight'],
      status: 'Active',
      performance: {
        impressions: 8920,
        clicks: 2670,
        conversions: 580,
        revenue: '£69,600',
        conversionRate: '6.5%'
      },
      comms: [
        { id: 'comm-8', name: 'Pre-Departure SMS Bundle', status: 'Active', performance: { deliveries: '98%', clicks: '15.1%', opens: '22%' } },
        { id: 'comm-9', name: 'Website Bundle Banner', status: 'Active', performance: { impressions: 4450, clicks: '3.2%', conversions: 142 } }
      ]
    }
  ];

  // Use mock data instead of passed revenueFunctions for now
  const functionsToDisplay = mockFunctions;

  // Filter functions based on selections
  const filteredFunctions = functionsToDisplay.filter(func => {
    const categoryMatch = selectedCategory === 'all' || func.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || func.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  console.log('Filtered functions:', filteredFunctions);

  // Calculate overall metrics
  const activeFunctions = functionsToDisplay.filter(f => f.status === 'Active');
  const totalRevenue = activeFunctions.reduce((sum, f) => {
    const revenueStr = f.performance.revenue || '£0';
    return sum + parseFloat(revenueStr.replace('£', '').replace(',', ''));
  }, 0);
  const totalImpressions = activeFunctions.reduce((sum, f) => sum + (f.performance.impressions || 0), 0);
  const totalConversions = activeFunctions.reduce((sum, f) => sum + (f.performance.conversions || 0), 0);
  const overallConversionRate = totalImpressions > 0 ? ((totalConversions / totalImpressions) * 100).toFixed(1) : 0;

  // Calculate communication performance
  const allComms = activeFunctions.flatMap(func => 
    (func.comms || []).map(comm => ({
      ...comm,
      functionName: func.name,
      functionCategory: func.category
    }))
  );
  const activeComms = allComms.filter(comm => comm.status === 'Active');
  const avgCommsPerformance = activeComms.length > 0 ? 
    activeComms.reduce((sum, comm) => {
      const clickRate = comm.performance?.clicks ? parseFloat(comm.performance.clicks.replace('%', '')) : 0;
      const openRate = comm.performance?.opens ? parseFloat(comm.performance.opens.replace('%', '')) : 0;
      return sum + (clickRate + openRate) / 2;
    }, 0) / activeComms.length : 0;

  // Calculate overall performance score for a function
  const calculatePerformanceScore = (func) => {
    const revenueScore = func.performance?.revenue ? parseFloat(func.performance.revenue.replace('£', '').replace(',', '')) / 1000 : 0;
    const conversionScore = func.performance?.conversionRate ? parseFloat(func.performance.conversionRate.replace('%', '')) * 10 : 0;
    const commsScore = (func.comms || []).filter(c => c.status === 'Active').length * 20;
    
    const totalScore = Math.min(100, (revenueScore + conversionScore + commsScore) / 3);
    return Math.round(totalScore);
  };

  // Mock objectives data based on function type
  const getFunctionObjectives = (func) => {
    const objectivesMap = {
      'Cross-Sell': [
        { id: 'revenue_uplift', name: 'Revenue uplift', target: '15%', current: '12%', status: 'on-track' },
        { id: 'basket_size', name: 'Basket size increase', target: '£2,500', current: '£2,100', status: 'needs-attention' },
        { id: 'ancillary_attach', name: 'Ancillary attach rate', target: '8%', current: '7.1%', status: 'on-track' }
      ],
      'Upsell': [
        { id: 'upgrade_conversion', name: 'Upgrade conversion', target: '25%', current: '22%', status: 'on-track' },
        { id: 'basket_size', name: 'Basket size increase', target: '£450', current: '£420', status: 'needs-attention' },
        { id: 'offer_redemption', name: 'Offer redemption rate', target: '12%', current: '11.2%', status: 'on-track' }
      ],
      'Bundle': [
        { id: 'revenue_uplift', name: 'Revenue uplift', target: '18%', current: '16%', status: 'on-track' },
        { id: 'customer_delight', name: 'Customer delight', target: '4.5/5', current: '4.3/5', status: 'needs-attention' },
        { id: 'basket_size', name: 'Basket size increase', target: '10%', current: '9.1%', status: 'on-track' }
      ]
    };
    
    return objectivesMap[func.category] || objectivesMap['Cross-Sell'];
  };

  // Mock function-level metrics
  const getFunctionMetrics = (func) => {
    return [
      { name: 'Revenue Generated', value: func.performance?.revenue || '£0', trend: '+12.5%', type: 'positive' },
      { name: 'Conversion Rate', value: func.performance?.conversionRate || '0%', trend: '+1.2%', type: 'positive' },
      { name: 'Customer Acquisition', value: (func.performance?.conversions || 0).toLocaleString(), trend: '+8.3%', type: 'positive' },
      { name: 'ROI', value: '3.2x', trend: '+0.4x', type: 'positive' }
    ];
  };

  // Mock communication metrics
  const getCommsMetrics = (comm) => {
    const metrics = [];
    
    if (comm.performance?.opens) {
      metrics.push({ name: 'Open Rate', value: comm.performance.opens, trend: '+2.1%', type: 'positive' });
    }
    if (comm.performance?.clicks) {
      metrics.push({ name: 'Click Rate', value: comm.performance.clicks, trend: '+1.8%', type: 'positive' });
    }
    if (comm.performance?.impressions) {
      metrics.push({ name: 'Impressions', value: comm.performance.impressions.toLocaleString(), trend: '+15.2%', type: 'positive' });
    }
    if (comm.performance?.deliveries) {
      metrics.push({ name: 'Deliveries', value: comm.performance.deliveries, trend: '+0.5%', type: 'positive' });
    }
    
    return metrics.slice(0, 4);
  };

  const handleViewDetails = (functionId) => {
    console.log('View Details clicked for function:', functionId);
    setSelectedFunctionId(functionId);
  };

  const handleBackToPerformance = () => {
    setSelectedFunctionId(null);
  };

  // Show detailed view if a function is selected
  if (selectedFunctionId) {
    return (
      <RevenueOptimizerFunctionDetails 
        functionId={selectedFunctionId} 
        onBack={handleBackToPerformance} 
      />
    );
  }

  return (
    <div className="review-section">
      <div className="review-header">
        <h3>Live Performance Tracking</h3>
        <p className="review-subtitle">Real-time monitoring of active up-sell and cross-sell campaigns</p>
        <div className="review-filters">
          <select 
            className="review-select" 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="180">Last 6 Months</option>
          </select>
          <select 
            className="review-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Cross-Sell">Cross-Sell</option>
            <option value="Upsell">Upsell</option>
            <option value="Bundle">Bundle</option>
          </select>
          <select 
            className="review-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Active">Active Only</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      <div className="review-overview">
        <div className="overview-metrics">
          <div className="metric-card large">
            <div className="metric-icon">👥</div>
            <div className="metric-content">
              <h3>Total Impressions</h3>
              <div className="metric-value">{totalImpressions.toLocaleString()}</div>
              <div className="metric-change positive">+15.2% vs last period</div>
              <div className="metric-detail">From {activeFunctions.length} active functions</div>
            </div>
          </div>
          <div className="metric-card large">
            <div className="metric-icon">🖱️</div>
            <div className="metric-content">
              <h3>Overall Click Through Rate</h3>
              <div className="metric-value">{((activeFunctions.reduce((sum, f) => sum + (f.performance.clicks || 0), 0) / totalImpressions) * 100).toFixed(1)}%</div>
              <div className="metric-change positive">+2.3% vs last period</div>
              <div className="metric-detail">{activeFunctions.reduce((sum, f) => sum + (f.performance.clicks || 0), 0).toLocaleString()} total clicks</div>
            </div>
          </div>
          <div className="metric-card large">
            <div className="metric-icon">📈</div>
            <div className="metric-content">
              <h3>Overall Conversion Rate</h3>
              <div className="metric-value">{overallConversionRate}%</div>
              <div className="metric-change positive">+1.2% vs last period</div>
              <div className="metric-detail">{totalConversions} conversions total</div>
            </div>
          </div>
          <div className="metric-card large">
            <div className="metric-icon">💰</div>
            <div className="metric-content">
              <h3>Total Revenue Generated</h3>
              <div className="metric-value">£{totalRevenue.toLocaleString()}</div>
              <div className="metric-change positive">+12.5% vs last period</div>
              <div className="metric-detail">Across all functions</div>
            </div>
          </div>
        </div>

        <div className="functions-performance">
          <h4>Function Performance</h4>
          <div className="functions-grid">
            {filteredFunctions.length === 0 ? (
              <div className="no-functions-message">
                <p>No functions found matching your criteria. Please adjust your filters.</p>
              </div>
            ) : (
              filteredFunctions.map(func => {
                const performanceScore = calculatePerformanceScore(func);
                const objectives = getFunctionObjectives(func);
                const functionMetrics = getFunctionMetrics(func);
                const activeComms = (func.comms || []).filter(c => c.status === 'Active');

                return (
                  <div key={func.id} className="function-tile">
                    <div className="function-header">
                      <div className="function-info">
                        <div className="function-title-section">
                          <h5>{func.name}</h5>
                                                      <div className="function-status">
                              <span className="function-category">{func.category}</span>
                            </div>
                        </div>
                        <p className="function-description">{func.description}</p>
                      </div>
                      <div className="performance-score">
                        <div className={`score-circle ${performanceScore < 70 ? 'low-score' : ''}`}>
                          <span className="score-value">{performanceScore}</span>
                          <span className="score-label">Score</span>
                        </div>
                      </div>
                    </div>

                    <div className="function-overview">
                      <div className="overview-metrics">
                        <div className="overview-metric">
                          <span className="metric-label">Impressions</span>
                          <span className="metric-value">{func.performance?.impressions?.toLocaleString() || '0'}</span>
                        </div>
                        <div className="overview-metric">
                          <span className="metric-label">Click Through Rate</span>
                          <span className="metric-value">{func.performance?.clickThroughRate || ((func.performance?.clicks / func.performance?.impressions * 100) || 0).toFixed(1) + '%'}</span>
                        </div>
                        <div className="overview-metric">
                          <span className="metric-label">Conversion Rate</span>
                          <span className="metric-value">{func.performance?.conversionRate || '0%'}</span>
                        </div>
                        <div className="overview-metric">
                          <span className="metric-label">Revenue</span>
                          <span className="metric-value">{func.performance?.revenue || '£0'}</span>
                        </div>
                      </div>
                      
                      <div className="function-actions">
                        <button 
                          className={`view-details-btn ${performanceScore < 70 ? 'improve-btn' : ''}`}
                          onClick={() => handleViewDetails(func.id)}
                          style={{ display: 'block', visibility: 'visible' }}
                        >
                          {performanceScore < 70 ? 'Improve Performance' : 'View Details'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueOptimizerPerformance; 