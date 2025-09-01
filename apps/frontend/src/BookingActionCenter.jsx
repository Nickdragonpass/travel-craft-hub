import React, { useState } from 'react';
import BookingActions from './BookingActions';
import './App.css';

function BookingActionCenter() {
  const [currentView, setCurrentView] = useState('overview');
  const [selectedBucket, setSelectedBucket] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({
    priority: 'all',
    assignedTo: 'all',
    bucket: 'all'
  });

  // Mock data for action items
  const [actionItems, setActionItems] = useState([
    {
      id: 'BK-FL-001',
      bucketId: 'urgent-disruptions',
      title: 'Flight Cancelled - BA203',
      description: 'British Airways flight cancelled due to weather',
      priority: 'high',
      status: 'backlog',
      assignedTo: null,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      customer: 'Sarah Johnson',
      bookingType: 'Flight',
      urgency: 'immediate'
    },
    {
      id: 'BK-AL-002',
      bucketId: 'service-recovery',
      title: 'Lounge Access Denied',
      description: 'Customer denied entry to Priority Pass lounge',
      priority: 'high',
      status: 'assigned',
      assignedTo: 'John Smith',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      customer: 'Emma Wilson',
      bookingType: 'Airport Lounge',
      urgency: 'immediate'
    },
    {
      id: 'BK-AM-003',
      bucketId: 'booking-amendments',
      title: 'Name Change Request',
      description: 'Customer needs name correction on booking',
      priority: 'medium',
      status: 'in-progress',
      assignedTo: 'Mike Chen',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      customer: 'David Brown',
      bookingType: 'Flight',
      urgency: 'today'
    },
    {
      id: 'BK-CR-004',
      bucketId: 'cancellations-refunds',
      title: 'Refund Request',
      description: 'Customer requesting refund for cancelled hotel',
      priority: 'medium',
      status: 'review',
      assignedTo: 'Lisa Park',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      customer: 'Maria Garcia',
      bookingType: 'Hotel',
      urgency: 'today'
    },
    {
      id: 'BK-VIP-005',
      bucketId: 'vip-concierge',
      title: 'VIP Booking - Premium Service',
      description: 'High-value customer needs special handling',
      priority: 'high',
      status: 'backlog',
      assignedTo: null,
      createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      customer: 'VIP Customer',
      bookingType: 'Flight',
      urgency: 'immediate'
    },
    {
      id: 'BK-UP-006',
      bucketId: 'upsell-crosssell',
      title: 'Upsell Opportunity - Hotel',
      description: 'Flight-only booking, suggest hotel upgrade',
      priority: 'low',
      status: 'backlog',
      assignedTo: null,
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      customer: 'Alex Turner',
      bookingType: 'Flight',
      urgency: 'this-week'
    }
  ]);

  // Available agents
  const agents = [
    { id: 'john', name: 'John Smith', avatar: 'JS', active: 3 },
    { id: 'mike', name: 'Mike Chen', avatar: 'MC', active: 2 },
    { id: 'lisa', name: 'Lisa Park', avatar: 'LP', active: 1 },
    { id: 'tom', name: 'Tom Wilson', avatar: 'TW', active: 0 }
  ];

  // Bucket definitions for labels
  const buckets = {
    'urgent-disruptions': { name: 'Urgent Disruptions', icon: '🚨', color: '#dc2626' },
    'booking-amendments': { name: 'Booking Amendments', icon: '✏️', color: '#f59e0b' },
    'cancellations-refunds': { name: 'Cancellations & Refunds', icon: '💰', color: '#10b981' },
    'missing-broken-data': { name: 'Missing or Broken Data', icon: '🔧', color: '#3b82f6' },
    'upsell-crosssell': { name: 'Upsell & Cross-Sell', icon: '📈', color: '#8b5cf6' },
    'vip-concierge': { name: 'VIP & Concierge', icon: '👑', color: '#f97316' },
    'service-recovery': { name: 'Service Recovery', icon: '🛠️', color: '#dc2626' }
  };

  // Kanban columns
  const columns = [
    { id: 'backlog', title: 'Backlog', color: '#6b7280' },
    { id: 'assigned', title: 'Assigned', color: '#3b82f6' },
    { id: 'in-progress', title: 'In Progress', color: '#f59e0b' },
    { id: 'review', title: 'Review', color: '#8b5cf6' },
    { id: 'complete', title: 'Complete', color: '#10b981' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return 'Unknown';
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'immediate': return '#dc2626';
      case 'today': return '#f59e0b';
      case 'this-week': return '#10b981';
      default: return '#6b7280';
    }
  };

  const handleDragStart = (e, itemId) => {
    e.dataTransfer.setData('text/plain', itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const itemId = e.dataTransfer.getData('text/plain');
    
    console.log(`Dropping item ${itemId} into ${targetStatus}`);
    
    setActionItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, status: targetStatus }
          : item
      )
    );
  };

  const handleAssignItem = (itemId, agentId) => {
    const agent = agents.find(a => a.id === agentId);
    const assignedName = agentId === 'unassigned' ? null : (agent ? agent.name : agentId);
    
    setActionItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, assignedTo: assignedName }
          : item
      )
    );
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      priority: 'all',
      assignedTo: 'all',
      bucket: 'all'
    });
  };

  // Filter items based on current filters
  const filteredItems = actionItems.filter(item => {
    if (filters.priority !== 'all' && item.priority !== filters.priority) return false;
    if (filters.assignedTo !== 'all' && item.assignedTo !== filters.assignedTo) return false;
    if (filters.bucket !== 'all' && item.bucketId !== filters.bucket) return false;
    return true;
  });

  const handleBucketAction = (bucketId) => {
    setSelectedBucket(bucketId);
    setCurrentView('actions');
  };

  const handleBackToOverview = () => {
    setCurrentView('overview');
    setSelectedBucket(null);
  };

  if (currentView === 'actions') {
    return (
      <div className="booking-action-center">
        <div className="action-center-header">
          <div className="header-content">
            <button className="back-btn" onClick={handleBackToOverview}>
              ← Back to Action Center
            </button>
            <h1>Urgent Disruptions</h1>
            <p>Manage 12 items requiring attention</p>
          </div>
        </div>
        <BookingActions />
      </div>
    );
  }

  return (
    <div className="booking-action-center">


      {/* Filters */}
      <div className="kanban-filters">
        <div className="filter-group">
          <label>Priority:</label>
          <select 
            value={filters.priority} 
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="modern-select"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Assigned To:</label>
          <select 
            value={filters.assignedTo} 
            onChange={(e) => handleFilterChange('assignedTo', e.target.value)}
            className="modern-select"
          >
            <option value="all">All Agents</option>
            <option value="unassigned">Unassigned</option>
            {agents.map(agent => (
              <option key={agent.id} value={agent.name}>{agent.name}</option>
            ))}
          </select>
        </div>
        
                    <div className="filter-group">
              <label>Category:</label>
              <select 
                value={filters.bucket} 
                onChange={(e) => handleFilterChange('bucket', e.target.value)}
                className="modern-select"
              >
                <option value="all">All Categories</option>
            {Object.entries(buckets).map(([id, bucket]) => (
              <option key={id} value={id}>{bucket.name}</option>
            ))}
          </select>
        </div>
        
        <button className="clear-filters-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      <div className="kanban-container">
        {/* Kanban Board */}
        <div className="kanban-board">
          <div className="kanban-header">
            <h2>Workflow Board</h2>
            <div className="agent-overview">
              {agents.map(agent => (
                <div key={agent.id} className="agent-badge">
                  <span className="agent-avatar">{agent.avatar}</span>
                  <span className="agent-name">{agent.name}</span>
                  <span className="agent-count">{agent.active}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="kanban-columns">
            {columns.map(column => (
              <div key={column.id} className="kanban-column">
                                 <div className="column-header" style={{ borderLeftColor: column.color }}>
                   <h3>{column.title}</h3>
                   <span className="column-count">
                     {filteredItems.filter(item => item.status === column.id).length}
                   </span>
                 </div>
                 <div 
                   className="column-content"
                   onDragOver={handleDragOver}
                   onDragLeave={handleDragLeave}
                   onDrop={(e) => handleDrop(e, column.id)}
                 >
                   {filteredItems
                     .filter(item => item.status === column.id)
                     .map(item => (
                      <div 
                        key={item.id} 
                        className="kanban-card"
                        draggable
                        onDragStart={(e) => handleDragStart(e, item.id)}
                        onClick={() => setSelectedItem(item)}
                      >
                        <div className="card-header">
                          <span className="card-id">{item.id}</span>
                          <div className="card-priority" style={{ backgroundColor: getPriorityColor(item.priority) }}>
                            {getPriorityLabel(item.priority)}
                          </div>
                        </div>
                        <div className="card-title">{item.title}</div>
                        <div className="card-description">{item.description}</div>
                                                 <div className="card-footer">
                           <div className="card-customer">{item.customer}</div>
                           <div className="card-time">{getTimeAgo(item.createdAt)}</div>
                         </div>
                         <div className="card-bucket">
                           <span className="bucket-label" style={{ backgroundColor: buckets[item.bucketId]?.color }}>
                             {buckets[item.bucketId]?.icon} {buckets[item.bucketId]?.name}
                           </span>
                         </div>
                        {item.assignedTo && (
                          <div className="card-assigned">
                            <span className="assigned-avatar">{agents.find(a => a.name === item.assignedTo)?.avatar || 'AG'}</span>
                            <span className="assigned-name">{item.assignedTo}</span>
                          </div>
                        )}
                        {!item.assignedTo && (
                          <div className="card-actions">
                                                         <select 
                               className="modern-select"
                               onChange={(e) => handleAssignItem(item.id, e.target.value)}
                               onClick={(e) => e.stopPropagation()}
                             >
                              <option value="">Assign to...</option>
                              {agents.map(agent => (
                                <option key={agent.id} value={agent.id}>{agent.name}</option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content item-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedItem.title}</h2>
              <button className="modal-close" onClick={() => setSelectedItem(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="item-details">
                <div className="detail-row">
                  <span className="detail-label">Booking ID:</span>
                  <span className="detail-value">{selectedItem.id}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Customer:</span>
                  <span className="detail-value">{selectedItem.customer}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Priority:</span>
                  <span className="detail-value">
                    <span className="priority-badge" style={{ backgroundColor: getPriorityColor(selectedItem.priority) }}>
                      {getPriorityLabel(selectedItem.priority)}
                    </span>
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value">{selectedItem.status}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Created:</span>
                  <span className="detail-value">{getTimeAgo(selectedItem.createdAt)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Description:</span>
                  <span className="detail-value">{selectedItem.description}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn secondary" onClick={() => setSelectedItem(null)}>
                Close
              </button>
              <button className="modal-btn primary">
                Take Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingActionCenter; 