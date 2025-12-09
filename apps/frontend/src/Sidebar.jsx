import React from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';

function Sidebar({ isCollapsed, onToggle }) {
  return (
    <nav className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-content">
        <button className="sidebar-toggle" onClick={onToggle} type="button">
          <span className="toggle-icon">{isCollapsed ? '→' : '←'}</span>
        </button>
        <NavLink to="/admin/dashboard" end className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} data-title="Dashboard">
          <span className="link-icon">📊</span>
          <span className="link-text">Dashboard</span>
        </NavLink>
        {/*
        <NavLink to="/admin/book" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} data-title="Book">
          <span className="link-icon">✈️</span>
          <span className="link-text">Book</span>
        </NavLink>
        */}
        <NavLink to="/admin/booking-management" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} data-title="Order Management">
          <span className="link-icon">📋</span>
          <span className="link-text">Order Management</span>
        </NavLink>
        <NavLink to="/admin/revenue-optimizer" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} data-title="Revenue Optimizer">
          <span className="link-icon">💰</span>
          <span className="link-text">Revenue Optimizer</span>
        </NavLink>
        <NavLink to="/admin/rewards" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} data-title="Benefit Orchestrator">
          <span className="link-icon">🎁</span>
          <span className="link-text">Benefit Orchestrator</span>
        </NavLink>
        {/*
        <NavLink to="/admin/entitlement-management" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} data-title="Entitlement Package">
          <span className="link-icon">🔐</span>
          <span className="link-text">Entitlement Package</span>
        </NavLink>
        */}
        <NavLink to="/admin/persona-builder" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} data-title="Persona Builder">
          <span className="link-icon">🧩</span>
          <span className="link-text">Persona Builder</span>
        </NavLink>
        <NavLink to="/admin/analytics" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} data-title="Analytics">
          <span className="link-icon">📈</span>
          <span className="link-text">Analytics</span>
        </NavLink>
        {/*
        <NavLink to="/admin/integrations" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} data-title="Integrations">
          <span className="link-icon">🔗</span>
          <span className="link-text">Integrations</span>
        </NavLink>
        <NavLink to="/admin/corporate" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} data-title="Corporate Travel">
          <span className="link-icon">🏢</span>
          <span className="link-text">Corporate Travel</span>
        </NavLink>
        */}
        <NavLink to="/admin/settings" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} data-title="Settings">
          <span className="link-icon">⚙️</span>
          <span className="link-text">Settings</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Sidebar; 