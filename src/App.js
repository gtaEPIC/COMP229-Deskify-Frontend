// src/App.js
import React, { useState } from 'react';
import TicketForm from './Tickets/TicketForm';
import TicketDetails from './Tickets/TicketDetails';
import TicketList from './Tickets/TicketList';

import logo from './logo.svg';
import './App.css';

function App() {
  // State to manage tickets
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Function to add a new ticket to the state
  const addTicket = (newTicket) => {
    setTickets([...tickets, newTicket]);
  };

  // Function to handle selecting a ticket for detailed view or editing
  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
  };

  // Function to handle editing a ticket
  const handleTicketEdit = () => {
    // Implement logic to handle ticket editing (e.g., navigate to an edit view)
    // For simplicity, just clear the selectedTicket for now
    setSelectedTicket(null);
  };

  // Function to handle disabling a ticket
  const handleTicketDisable = (ticket) => {
    // Update the status of the selected ticket to 'Cancelled'
    const updatedTicket = { ...ticket, status: 'Cancelled' };

    // Update the state with the modified ticket
    setTickets(tickets.map((t) => (t.title === ticket.title ? updatedTicket : t)));

    // Clear the selected ticket
    setSelectedTicket(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      {/* Ticket Form */}
      <TicketForm addTicket={addTicket} />

      {/* Selected Ticket Details or Edit Form */}
      {selectedTicket ? (
        <TicketDetails
          ticket={selectedTicket}
          onEdit={handleTicketEdit}
          onDisable={handleTicketDisable}
        />
      ) : (
        <>
          {/* Ticket List */}
          <TicketList tickets={tickets} onSelect={handleTicketSelect} />

          {/* Placeholder if no ticket is selected */}
          {tickets.length === 0 && <p>No tickets available.</p>}
        </>
      )}
    </div>
  );
}

export default App;
