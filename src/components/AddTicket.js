// frontend/src/components/AddTicket.js
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {isAuthenticated} from "../pages/login-helper";
let apiURL = process.env.REACT_APP_APIURL || 'http://localhost:3000'

const AddTicket = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('title:', title);
    try {
      // Send a POST request to add a new ticket
      const response = await fetch(`${apiURL}/ticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        body: JSON.stringify({ title, description }),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        console.log('New ticket added successfully!');
        navigate({pathname: "/tickets"}, { replace: true });
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
      <div style={{backgroundColor:'rgb(183, 56, 120)'}} >
        <center>
          <div style={{backgroundColor:'rgb(237, 201, 219)', height: '700px', width: '600px'}}>
            <form onSubmit={handleSubmit}>
              <h1>Create a new ticket</h1>
              <label> Title: </label>
              <br></br>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <br></br>
              <label> Description  </label>
              <br></br>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
              <br></br>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </center>
      </div>
    </div>
  );
};

export default AddTicket;
