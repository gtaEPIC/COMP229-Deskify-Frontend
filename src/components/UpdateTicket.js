// frontend/src/components/UpdateTicket.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateTicket = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Fetch ticket details by ID from the backend (GET request)
    const fetchTicketDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tickets/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setDescription(data.description);
        } else {
          console.error('Failed to fetch ticket details:', await response.text());
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTicketDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update ticket details on the backend
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tickets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        console.log('Ticket updated successfully!');
        // Optionally, you can redirect or update the UI after a successful request
      } else {
        // Handle error cases
        console.error('Failed to update ticket:', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Update Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <br />
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        <br />
        <button type="submit">Update Ticket</button>
      </form>
    </div>
  );
};

export default UpdateTicket;
