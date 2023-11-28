// frontend/src/components/UpdateTicket.js
import React, {  useEffect } from 'react';
import {Navigate, useLocation, useNavigate, useParams} from 'react-router-dom';
import TicketModel from "./TicketModel";
let apiURL = process.env.REACT_APP_APIURL || 'http://localhost:3000'

const UpdateTicket = () => {
  const { id } = useParams();
  const [ticket, setTicket] = React.useState(new TicketModel());
  const { state } = useLocation();
  const { from } = state || { from: { pathname: '/tickets' } };
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch ticket details by ID from the backend (GET request)
    const fetchTicketDetails = async () => {
      try {
        const response = await fetch(`${apiURL}/ticket/${id}`);
        if (response.ok) {
          const data = await response.json();
            console.log(data);
          let dataTicket = data.ticket;
          let t = new TicketModel(dataTicket.record, dataTicket.title, dataTicket.description, dataTicket.status, dataTicket.priority, dataTicket.dateCreated, dataTicket.updated, dataTicket.user.username, dataTicket.iteration)
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
          'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
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
  <div style={{ backgroundColor: 'rgb(183, 56, 120)' }} >
    <center>
      <div style={{ backgroundColor: 'rgb(237, 201, 219)', height: '700px', width: '600px' }}>
        <h2>Update Ticket</h2>
        <form onSubmit={handleSubmit}>
          <label> Title: </label>
          <br></br>
          <input type='text' name="title" value={ticket.title} onChange={handleChange} />
          <br></br>
          <label> Description  </label>
          <br></br>
          <textarea rows="10" cols="50" name="description" onChange={handleChange} value={ticket.description}>
          </textarea>
          <br></br>
          <label> Status: </label>
          <br></br>
          <select name="status" id="Status" onChange={handleChange} value={ticket.status}>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
            <option disabled={true} value="Cancelled">Cancelled</option>
          </select>
          <br></br>
          <label> Resolution: </label>
          <br></br>
          <input type='text' disabled={true} value={"To be implemented"} />
          <br></br>
          <label> Edit Comment: </label>
          <br></br>
          <input type='text' name={"comment"} onChange={handleChange} />
          <br></br>
          <br></br>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    </center>
  </div>
  );
};

export default UpdateTicket;
