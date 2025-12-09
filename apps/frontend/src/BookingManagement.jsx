import React, { useState } from 'react';
import Bookings from './Bookings';
import BookingActionCenter from './BookingActionCenter';
import './App.css';

function BookingManagement() {
  const [activeTab, setActiveTab] = useState('bookings');

  return (
    <div className="booking-management-page">
      <h1 className="page-title">Order Management</h1>
      <p className="page-subtitle">View and manage all customer orders</p>
      
      <div className="booking-tabs">
        <button 
          className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          📋 Orders
        </button>
        <button 
          className={`tab-btn ${activeTab === 'action-center' ? 'active' : ''}`}
          onClick={() => setActiveTab('action-center')}
        >
          ⚡ Action Center (Not in MVP)
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'bookings' && <Bookings />}
        {activeTab === 'action-center' && <BookingActionCenter />}
      </div>
    </div>
  );
}

export default BookingManagement; 