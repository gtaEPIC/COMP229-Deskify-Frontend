// frontend/src/components/AddTicket.js
import React, { useState } from 'react';

const AddTicket = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to add a new ticket
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        console.log('New ticket added successfully!');
        // Optionally, you can redirect or update the UI after a successful request
      } else {
        // Handle error cases
        console.error('Failed to add new ticket:', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Add New Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <br />
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        <br />
        <button type="submit">Add Ticket</button>
      </form>
    </div>
  );
};

export default AddTicket;
