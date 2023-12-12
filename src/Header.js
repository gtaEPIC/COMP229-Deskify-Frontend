// Header.js

import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from './images/logo.png';
import { getUsername, isAuthenticated, logout, getIsAdmin } from './pages/login-helper';
import './header.css';

function Header() {
  const [showUserProfile, setShowUserProfile] = useState(false);

  const handleUserProfileClick = () => {
    setShowUserProfile(!showUserProfile);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#08181C', padding: 0, height: '64px' }}>
      <NavLink to="#" className="navbar-brand" style={{ marginLeft: '0px' }}>
        <img src={logo} alt="logo" width="64" height="64" />
      </NavLink>
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link text-secondary">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <Link to="/tickets" className="nav-link text-secondary">
                Tickets
              </Link>
            </li>
            {getIsAdmin() && (
              <li className="nav-item">
                <NavLink to="/Profile" className="nav-link text-secondary">
                  Profile
                </NavLink>
              </li>
            )}
            {isAuthenticated() ? (
              <>
                <li className="nav-item dropdown">
                  <Link to="#" className="nav-link dropdown-toggle text-secondary" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleUserProfileClick}>
                    {getUsername()}
                  </Link>
                  {showUserProfile && (
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link to="/" onClick={logout} className="dropdown-item">
                        Logout
                      </Link>
                    </div>
                  )}
                </li>
                <li className="nav-item">
                  <NavLink to="/profile" className="nav-link text-secondary">
                    <i className="fas fa-user" style={{ marginRight: '5px' }}></i>
                    Profile
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link text-secondary">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/signup" className="nav-link text-secondary">
                    Sign-up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;