// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Main from './components/Main';
import Tickets from './components/Tickets';
import AddTicket from './components/AddTicket';
import UpdateTicket from './components/UpdateTicket';
import DeleteTicket from './components/DeleteTicket';
import View from './components/View';
import NewTickets from './components/NewTickets';
import Edit from './components/Edit';
import TicketList from './components/TicketList';
import { isAuthenticated } from './pages/login-helper';

const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: rest.location }} />
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute
              element={<Main />}
            />
          }
        />
        <Route
          path="/tickets"
          element={
            <PrivateRoute
              element={<Tickets />}
            />
          }
        />
        <Route
          path="/tickets/new"
          element={
            <PrivateRoute
              element={<AddTicket />}
            />
          }
        />
        <Route
          path="/tickets/:id/update"
          element={
            <PrivateRoute
              element={<UpdateTicket />}
            />
          }
        />
        <Route
          path="/tickets/:id/delete"
          element={
            <PrivateRoute
              element={<DeleteTicket />}
            />
          }
        />
        <Route
          path="/view-ticket"
          element={
            <PrivateRoute
              element={<View />}
            />
          }
        />
        <Route
          path="/new-tickets"
          element={
            <PrivateRoute
              element={<NewTickets />}
            />
          }
        />
        <Route
          path="/edit-ticket"
          element={
            <PrivateRoute
              element={<Edit />}
            />
          }
        />
        <Route
          path="/ticket-list"
          element={
            <PrivateRoute
              element={<TicketList tickets={[] /* pass your data here */} />}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
