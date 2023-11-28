// frontend/src/components/DeleteTicket.js
import React from 'react';
import {useNavigate} from "react-router-dom";
import {isAuthenticated} from "../pages/login-helper";
let apiURL = process.env.REACT_APP_APIURL || 'http://localhost:3000'

const DeleteTicket = ({ id, cb }) => {

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      if (!isAuthenticated()) return alert('Please login to delete tickets');
      // eslint-disable-next-line no-restricted-globals
      if (!confirm('Are you sure you want to delete this ticket?')) {
        return;
      }
      // Send a DELETE request to remove the ticket
      const response = await fetch(`${apiURL}/ticket/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        console.log('Ticket deleted successfully!');
        navigate({pathname: "/tickets"}, { replace: true });
        if (cb) {
          cb();
        }
      } else {
        // Handle error cases
        console.error('Failed to delete ticket:', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <button onClick={handleDelete} className="btn btn-danger">Cancel</button>
    </>
  );
};

export default DeleteTicket;
