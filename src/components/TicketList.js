// frontend/src/components/TicketList.js
import React from 'react';

const TicketList = ({ tickets }) => {
  return (
    <ul>
      {tickets.map(ticket => (
        <li key={ticket._id}>
          <h3>{ticket.title}</h3>
          <p>{ticket.description}</p>
          <p>Status: {ticket.status}</p>
        </li>
      ))}
    </ul>
  );
};

export default TicketList;
