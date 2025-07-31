import React from 'react';
import './App.css';

function Header() {
  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <div className="brand-logo-wrap">
          <span className="brand-text">Dragonpass</span>
          <span className="brand-dot"></span>
        </div>
      </div>
      <div className="admin-header-right">
        <div className="profile-circle">
          <span className="profile-initial">N</span>
        </div>
      </div>
    </header>
  );
}

export default Header; 