// frontend/src/components/DeleteTicket.js
import React from 'react';

const DeleteTicket = ({ id }) => {
  const handleDelete = async () => {
    try {
      // Send a DELETE request to remove the ticket
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tickets/${id}`, {
        method: 'DELETE',
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        console.log('Ticket deleted successfully!');
        // Optionally, you can redirect or update the UI after a successful request
      } else {
        // Handle error cases
        console.error('Failed to delete ticket:', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Delete Ticket</h2>
      <p>Are you sure you want to delete this ticket?</p>
      <button onClick={handleDelete}>Delete Ticket</button>
    </div>
  );
};

export default DeleteTicket;
