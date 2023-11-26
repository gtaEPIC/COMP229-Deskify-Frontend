import React, { useState } from 'react';

const TicketForm = ({ addTicket }) => {
  // State to manage form input values
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic can be added here

    // Call the addTicket function passed from the parent component
    addTicket({ title, description });

    // Clear the form
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

      <button type="submit">Add Ticket</button>
    </form>
  );
};

export default TicketForm;
