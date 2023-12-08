// frontend/src/components/AddTicket.js
import "./AddTicket.css"
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
      <div style={{backgroundColor:'#08181C'}} >
        <center>
          <div>
            <form className='createTicketForm' onSubmit={handleSubmit}>
              <p className='ticketTitle'>Create a new ticket</p>
              <div className='createTicket-input-container'>
              <input type="text" name={"Title"}value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} required></input>
              <span></span>
              </div>
              <div className='createTicket-input-container'>
              <textarea name={"Description"} placeholder="Description..." onChange={(e) => setDescription(e.target.value)} ></textarea>
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </center>
      </div>
    </div>
  );
};

export default AddTicket;
