import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import BookingManagement from './BookingManagement';
import RevenueOptimizer from './RevenueOptimizer';
import Integrations from './Integrations';
import Header from './Header';
import Sidebar from './Sidebar';
import './App.css';

function Landing() {
  return (
    <>
      {/* Admin Portal button only on homepage */}
      <div className="admin-nav-bar">
        <div className="admin-nav-content">
          <div></div>
          <Link to="/admin/dashboard" className="admin-portal-btn">Admin Portal</Link>
        </div>
      </div>
      {/* Hero Section */}
      <section className="dp-hero">
        <div className="dp-hero-content">
          <h1>Your pass to more<br />travel & lifestyle experiences</h1>
          <p className="dp-hero-sub">Explore our services</p>
          <a href="#benefits" className="dp-cta">Explore Benefits</a>
        </div>
      </section>
      {/* Benefits Grid */}
      <section className="dp-benefits">
        <div className="section-content">
          <h2>Dragonpass is your all-in-one pass to amazing travel and lifestyle benefits</h2>
          <div className="dp-benefits-grid">
            <div className="dp-benefit-card">
              <h3>2,500+ Experiences</h3>
              <p>Elevate your journey with access to airport lounges, dining, fitness, and more.</p>
            </div>
            <div className="dp-benefit-card">
              <h3>More Choice, More Access</h3>
              <p>Unlock premium global benefits and rewarding experiences across travel and lifestyle.</p>
            </div>
            <div className="dp-benefit-card">
              <h3>For Travellers & Businesses</h3>
              <p>Enhance your offering or enjoy perks as a member, business, or supplier.</p>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="dp-app-download">
        <div className="section-content">
          <div className="dp-app-content">
            <div className="dp-qr-placeholder">[QR Code]</div>
            <div>
              <h3>Download the app</h3>
              <p>Scan the QR code with your phone camera to download the app.</p>
              <div className="dp-app-links">
                <a href="#" className="dp-app-link">App Store</a>
                <a href="#" className="dp-app-link">Google Play</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Businesses / Partners */}
      <section className="dp-business-partners">
        <div className="section-content dp-business-partners-inner">
          <div className="dp-business-card">
            <h3>Grow your business with our flexible solutions</h3>
            <p>Your pass to providing the best in customer rewards. Offer travel and lifestyle experiences to your customers and reward loyalty.</p>
            <a href="#" className="dp-cta-secondary">Discover More</a>
          </div>
          <div className="dp-business-card">
            <h3>Your pass to reaching millions of new customers</h3>
            <p>Boost your business by tapping into millions of members across our global community as a Dragonpass supplier.</p>
            <a href="#" className="dp-cta-secondary">Partner with Us</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dp-footer">
        <div className="section-content">
          <div className="dp-footer-links">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Explore Benefits</a>
            <a href="#">Contact</a>
          </div>
          <div className="dp-footer-social">
            <span>[LinkedIn]</span>
            <span>[Instagram]</span>
            <span>[Facebook]</span>
            <span>[TikTok]</span>
          </div>
          <div className="dp-footer-copy">© 2024 Your Company. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}

function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="admin-portal-layout">
      <Header />
      <div className="admin-main-area">
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        <main className={`admin-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/booking-management" element={<BookingManagement />} />
          <Route path="/admin/revenue-optimizer" element={<RevenueOptimizer />} />
          <Route path="/admin/integrations" element={<Integrations />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
