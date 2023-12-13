// Header.js

import React from 'react';
import {NavLink, Link, useLocation} from 'react-router-dom';
import logo from './images/logo.png';
import { getUsername, isAuthenticated, logout } from './pages/login-helper';
import './header.css';

function Header() {
  // Redundant...
  // const [showUserProfile, setShowUserProfile] = useState(false);
  // const handleUserProfileClick = () => {
  //   setShowUserProfile(!showUserProfile);
  // };

  // This is required as it causes issues otherwise
  const loc = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'linear-gradient(to top, rgb(29, 40, 25), rgb(80, 141, 153))', padding: 0, height: '64px', marginBottom:"20px" }}>
      <NavLink to="#" className="navbar-brand" style={{ marginLeft: '0px' }}>
        <img src={logo} alt="logo" height="64" />
      </NavLink>
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto me-5">
            <button style={{background:"transparent"}}>
              <li className="nav-item">
                <NavLink to="/" className="nav-link" style={{color:"whites"}}>
                  Home
                </NavLink>
              </li>
            </button>
            <button style={{background:"transparent"}}>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown"
                      aria-expanded="false" to="#" style={{color:"white"}}>
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
                  <button style={{background:"transparent"}}>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link" style={{color:"white"}}>
                        Login
                      </NavLink>
                    </li>
                  </button>
                  <button style={{background:"transparent"}}>
                    <li className="nav-item">
                      <NavLink to="/signup" className="nav-link" style={{color:"white"}}>
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