// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { isAuthenticated } from './pages/login-helper';
import logo from "./logo.svg";

const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: rest.location }} />
  );
};

function App() {
  return (
      <div className="App">
          <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                  This is a placeholder page.
                  If you hit this page then something went wrong.
              </p>
              <small>Shouldn't be too shocking though</small>
          </header>
      </div>
  );
}

export default App;
