import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const handleLogout = () => {
    setMenuOpen(false);
    // No auth system yet; treat logout as returning to landing page.
    navigate('/');
  };

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <div className="brand-logo-wrap">
          <span className="brand-text">Dragonpass</span>
          <span className="brand-dot"></span>
        </div>
      </div>
      <div className="admin-header-right">
        <div className="profile-menu" ref={menuRef}>
          <button
            type="button"
            className="profile-circle profile-button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-label="Open user menu"
          >
            <span className="profile-initial">N</span>
          </button>
          {menuOpen && (
            <div className="profile-dropdown" role="menu" aria-label="User menu">
              <button type="button" className="profile-dropdown-item logout" role="menuitem" onClick={handleLogout}>
                <span className="dropdown-icon">⎋</span>
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header; 