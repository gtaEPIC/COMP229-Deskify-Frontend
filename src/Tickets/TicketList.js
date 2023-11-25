import React from 'react';

const TicketList = ({ tickets, onSelect }) => {
  return (
    <div>
      <h2>Ticket List</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.title} onClick={() => onSelect(ticket)}>
            {ticket.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
