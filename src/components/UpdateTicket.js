// frontend/src/components/UpdateTicket.js
import './View.css';
import "./AddTicket.css"
import React, {  useEffect } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import TicketModel from "./TicketModel";
import {getIsAdmin, isAuthenticated} from "../pages/login-helper";
let apiURL = process.env.REACT_APP_APIURL || 'http://localhost:3000'


const UpdateTicket = () => {
  const { id } = useParams();
  const [ticket, setTicket] = React.useState(new TicketModel());
  const { state } = useLocation();
  const { from } = state || { from: { pathname: `/tickets/${id}` } };
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch ticket details by ID from the backend (GET request)
    const fetchTicketDetails = async () => {
      try {
        const response = await fetch(`${apiURL}/ticket/${id}`);
        if (response.ok) {
          const data = await response.json();
            console.log(data);
          let dataTicket = data.ticket;
          let t = new TicketModel(dataTicket.record, dataTicket.title, dataTicket.description, dataTicket.status, dataTicket.priority, dataTicket.dateCreated, dataTicket.updated, dataTicket.user.username, dataTicket.iteration, dataTicket.resolution)
          t.comment = "";
          setTicket(t);
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
      const response = await fetch(`${apiURL}/ticket/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
        },
        body: JSON.stringify({
            title: ticket.title,
            description: ticket.description,
            status: ticket.status,
            priority: ticket.priority,
            resolution: ticket.resolution,
            comment: ticket.comment,
        }),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        console.log('Ticket updated successfully!');
        navigate(from, { replace: true });
      } else {
        // Handle error cases
        console.error('Failed to update ticket:', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setTicket(prevTicket => {
      return {
        ...prevTicket,
        [name]: value
      };
    });
  }

  return (
  <div style={{ backgroundColor: '#08181C' }} >
    <center>
      <div className='updateTicket'>
        <h2>Update Ticket</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label> Title: </label>
            <br />
            <center>
              <input type='text' className="createTicketForm align-content-center" name="title" value={ticket.title}
                     onChange={handleChange}/>
            </center>

          </div>
          <div className="input-container">
            <label> Description: </label>
            <br/>
            <textarea rows="1" cols="80" name="description" className="createTicketForm bg-white" onChange={handleChange} value={ticket.description}>
                </textarea>
          </div>
          <div className="input-container">
            <label className='updateLabel'> Status: {getIsAdmin() ? "" : "(admin use only)"} </label>
            <br />
            <select name="status" id="Status" className="createTicketForm bg-white" onChange={handleChange} value={ticket.status} disabled={!getIsAdmin()}>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
              <option disabled={true} value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="input-container">
            <label className='updateLabel'> Priority: {getIsAdmin() ? "" : "(admin use only)"} </label>
            <br />
            <center>
              <input type={"number"} name={"priority"} className="createTicketForm bg-white" onChange={handleChange}
                     value={ticket.priority} disabled={!getIsAdmin()}/>
            </center>
          </div>
          <span className='updateLabel'> Resolution: </span>
          <label className='updateLabel'> {ticket.resolution ? ticket.resolution.comment : "None Yet"} </label>
          <center>
            <button type="submit" className="btn-success btn w-100">Submit</button>
          </center>
        </form>
      </div>
    </center>
  </div>
  );
};

export default UpdateTicket;
