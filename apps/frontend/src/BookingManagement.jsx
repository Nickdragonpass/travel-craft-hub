import React, { useState } from 'react';
import Bookings from './Bookings';
import BookingActionCenter from './BookingActionCenter';
import './App.css';

function BookingManagement() {
  const [activeTab, setActiveTab] = useState('bookings');

  return (
    <div className="booking-management-page">
      <h1 className="page-title">Booking Management</h1>
      <p className="page-subtitle">Manage all customer bookings and handle urgent booking actions</p>
      
      <div className="booking-tabs">
        <button 
          className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          📋 Bookings
        </button>
        <button 
          className={`tab-btn ${activeTab === 'action-center' ? 'active' : ''}`}
          onClick={() => setActiveTab('action-center')}
        >
          ⚡ Action Center
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