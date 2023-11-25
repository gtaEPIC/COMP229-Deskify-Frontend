import React from 'react';

const TicketDetails = ({ ticket, onEdit, onDisable }) => {
  // Function to handle editing a ticket
  const handleEdit = () => {
    // Implement the logic to navigate to the edit view or open an edit form
    // For simplicity, just refetch the tickets for now
    onEdit();
  };

  // Function to handle disabling a ticket
  const handleDisable = () => {
    // Call the onDisable function passed from the parent component
    onDisable(ticket);
  };

  return (
    <div>
      <h2>Ticket Details</h2>
      {/* Display ticket details */}
      <p>Title: {ticket.title}</p>
      <p>Description: {ticket.description}</p>
      <p>Status: {ticket.status}</p>
      {/* Add more details as needed */}

      {/* Edit button */}
      <button onClick={handleEdit}>Edit</button>

      {/* Disable button */}
      <button onClick={handleDisable}>Disable</button>
    </div>
  );
};

export default TicketDetails;
