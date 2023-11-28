import React, {useEffect} from 'react'
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import TicketModel from "./TicketModel"
let apiURL = process.env.REACT_APP_APIURL || 'http://localhost:3000'

export default function View() {
    const { id } = useParams();
    const [ticket, setTicket] = React.useState(new TicketModel());

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await fetch(`${apiURL}/ticket/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    let ticket = data.ticket;
                    setTicket(new TicketModel(ticket.record, ticket.title, ticket.description, ticket.status, ticket.priority, ticket.dateCreated, ticket.updated, ticket.user.username, ticket.iteration));
                } else {
                    console.error('Failed to fetch tickets:', await response.text());
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchTicket().then(r => console.log(r));
    }, [id]);


  return (
    <div>
        <div style={{backgroundColor:'rgb(183, 56, 120)',minHeight: '100vh',padding: '20px', paddingTop: '20px',}} >
        <center><h1>Ticket {ticket.record}</h1></center>
        <br></br>
        <Link to={`/tickets/${id}/edit`} className="btn btn-primary">
        Edit
        </Link>

        <br></br>
        <br></br>
        <center> <h1>Title: {ticket.title}</h1>
        <p>Description:<br /> {ticket.description}</p>
        <p>Created: {ticket.dateCreated.toLocaleString()}</p>
        <p>Updated: {ticket.updated.toLocaleString()}</p>
        <p>Status: {ticket.status}</p>
        <p>Priority: {ticket.priority}</p>
        <p>User: {ticket.user}</p>
        <p>Resolution: </p>
        <h3> Logs: </h3>
            {ticket.iteration.map(log => (
                <div className="card bg-dark text-white">
                    <p>Log: {log.comment}</p>
                    <p>Updated: {new Date(log.dateCreated).toLocaleString()}</p>
                    <p>User: {log.user}</p>
                    <p>New Status: {log.newStatus}</p>
                </div>
            ))}

      </center>


       </div>
      
    </div>
  )
}
