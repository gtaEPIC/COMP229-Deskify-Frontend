// src/App.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
  const ticketsData = [
   
    { id: 1, title: 'Ticket 1', description: 'Description 1' },
    { id: 2, title: 'Ticket 2', description: 'Description 2' },
   
  ];

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute
            element={
              <Main>
                <Route path="/tickets" element={<Tickets tickets={ticketsData} />} />
                <Route path="/tickets/new" element={<AddTicket />} />
                <Route path="/tickets/:id/update" element={<UpdateTicket />} />
                <Route path="/tickets/:id/delete" element={<DeleteTicket />} />
                <Route path="/view-ticket" element={<View />} />
                <Route path="/new-tickets" element={<NewTickets />} />
                <Route path="/edit-ticket" element={<Edit />} />
                <Route path="/ticket-list" element={<TicketList tickets={ticketsData} />} />
              </Main>
            }
          />
        }
      />
    </Routes>
  );
}

export default App;
