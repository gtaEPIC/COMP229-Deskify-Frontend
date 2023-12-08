import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import DeleteTicket from "./DeleteTicket";
import {isAuthenticated} from "../pages/login-helper";
import FailAlertMessage from "./FailAlertMessage";

let apiURL = process.env.REACT_APP_APIURL || 'http://localhost:3000'


function Tickets() {
    const [tickets, setTickets] = React.useState([]);
    const [update, setUpdate] = React.useState(false);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch(`${apiURL}/ticket`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setTickets(data.list);
                } else {
                    console.error('Failed to fetch tickets:', await response.text());
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchTickets().then(r => console.log(r));
    }, [update]);

  return (
    <div>
     <center><h2 className={"text-primary"}>Tickets</h2></center>
        {isAuthenticated() && (
            <Link to="/tickets/new" className="btn btn-primary">
                Create new tickets
            </Link>
        )}
        {!isAuthenticated() && (
          <>
            <Link to="/login" className="btn btn-primary">
            Login to create tickets
            </Link>
          </>
        )}
      <br></br>
    <br></br>
     <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">Record</th>
      <th scope="col">Title</th>
      <th scope="col">Priority</th>
      <th scope="col">Status</th>
      <th scope="col">Created</th>
      <th scope="col">Last Update</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {tickets.map(ticket => (
      <tr>
      <th scope="row">{ticket.record}</th>
      <td>{ticket.title}</td>
      <td>{ticket.priority}</td>
      <td>{ticket.status}</td>
      <td>{new Date(ticket.dateCreated).toLocaleString()}</td>
      <td>{new Date(ticket.updated).toLocaleString()}</td>
      <td><Link to={`/tickets/${ticket.record}`} className="btn btn-primary">
        View
      </Link>
          {isAuthenticated() && (<DeleteTicket id={ticket.record} cb={() => setUpdate(!update)} />)}
      </td>
    </tr>
  ))}
  {
    () => {
        if (tickets.length === 0) {
            return (
                <tr>
                    <td colSpan="7">No tickets found</td>
                </tr>
            )
        }
    }
  }
  </tbody>
</table>
    </div>
  );
}

export default Tickets;
