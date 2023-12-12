// Header.js

import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import logo from './images/logo.png';
import { getUsername, isAuthenticated, logout } from './pages/login-helper';
import './header.css';

function Header() {
  // Redundant...
  // const [showUserProfile, setShowUserProfile] = useState(false);
  // const handleUserProfileClick = () => {
  //   setShowUserProfile(!showUserProfile);
  // };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#08181C', padding: 0, height: '64px' }}>
      <NavLink to="#" className="navbar-brand" style={{ marginLeft: '0px' }}>
        <img src={logo} alt="logo" width="64" height="64" />
      </NavLink>
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto me-5">
            <button>
              <li className="nav-item">
                <NavLink to="/" className="nav-link text-secondary">
                  Home
                </NavLink>
              </li>
            </button>
            <button>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle text-secondary" id="navbarDropdown" data-bs-toggle="dropdown"
                      aria-expanded="false" to="#">
                  Tickets
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><NavLink to="/tickets" className="dropdown-item">List of tickets</NavLink></li>
                  {isAuthenticated() && (
                      <li><NavLink to="/tickets/new" className="dropdown-item">New Ticket</NavLink></li>)}
                </ul>
              </li>
            </button>
            {isAuthenticated() ? (
                <>
                  <li className="nav-item dropdown me-2">
                    <Link className="nav-link dropdown-toggle text-secondary" id="navbarDropdown"
                          data-bs-toggle="dropdown"
                          aria-expanded="false" to="#">
                    {getUsername()}
                    </Link>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><NavLink to="/profile" className="dropdown-item">Edit Profile</NavLink></li>
                      <li><Link to="/" className="dropdown-item" onClick={logout}>Logout</Link></li>
                    </ul>
                  </li>
                </>
            ) : (
                <>
                  <button>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link text-secondary">
                        Login
                      </NavLink>
                    </li>
                  </button>
                  <button>
                    <li className="nav-item">
                      <NavLink to="/signup" className="nav-link text-secondary">
                        Sign-up
                      </NavLink>
                    </li>
                  </button>
                </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;