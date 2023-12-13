import './View.css';
import React, {useEffect} from 'react'
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import TicketModel from "./TicketModel"
import {getIsAdmin, getUsername, isAuthenticated} from "../pages/login-helper";
import {Link as ScrollLink} from 'react-scroll';
import ResolveTicket, {UnresolveTicket} from "./Resolution";
import AddComment from "./AddComment";
let apiURL = process.env.REACT_APP_APIURL || 'http://localhost:3000'

export default function View() {
    const { id } = useParams();
    const [ticket, setTicket] = React.useState(new TicketModel());
    const [update, setUpdate] = React.useState(false);

    // State for navigation
    const { state } = useLocation();
    const { from } = state || { from: { pathname: `/tickets/` } };
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await fetch(`${apiURL}/ticket/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    let ticket = data.ticket;
                    setTicket(new TicketModel(ticket.record, ticket.title, ticket.description, ticket.status, ticket.priority, ticket.dateCreated, ticket.updated, ticket.user.username, ticket.iteration, ticket.resolution));
                } else {
                    console.error('Failed to fetch tickets:', await response.text());
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchTicket().then(r => console.log(r));
    }, [id, update]);

    const cancelTicket = async () => {
        // eslint-disable-next-line no-restricted-globals
        if (!confirm('Are you sure you want to cancel this ticket?')) return;
        try {
            const response = await fetch(`${apiURL}/ticket/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('jwt')
                }
            });
            if (response.ok) {
                console.log('Ticket cancelled successfully!');
                alert('Ticket cancelled successfully!');
                navigate(from, { replace: true });
            }
        }catch (e) {
            console.error('Error:', e);
        }
    }


  return (
    <div>
        <br></br>
        <br></br>
        <center> 
            <div className="ticketInfo">
		        <div>
			        <p class="title">Title: {ticket.title}</p>
                    <ul className=''>
                    <li>Description: {ticket.description}</li>
                    <li>Created: {ticket.dateCreated.toLocaleString()}</li>
                    <li>Updated: {ticket.updated.toLocaleString()}</li>
                    <li>Status: {ticket.status}</li>
                    <li>Priority: {ticket.priority}</li>
                    <li>User: {ticket.user}</li>
                    <li>Resolution: {ticket.resolution ?
                    <ScrollLink to={ticket.resolution._id} smooth={true} duration={250}
                        className={"badge bg-success"}>Resolved</ScrollLink>
                        :
                    <button className="button">Unresolved</button>
                    }</li>
                    </ul>
                    <div className= 'editTicket'>
                        <br></br>
                        {isAuthenticated() && (getUsername() === ticket.user || getIsAdmin()) && (ticket.status === "New" || ticket.status === "In Progress" || getIsAdmin()) && (<Link to={`/tickets/${id}/edit`} className="btn btn-primary">
                            Edit
                        </Link>)}
                        {isAuthenticated() && (getUsername() !== ticket.user && !getIsAdmin()) && (ticket.status === "New" || ticket.status === "In Progress") && (<Link to={"#"} className="btn btn-secondary disabled">
                            You must own this ticket to edit it
                        </Link>)}
                        {!isAuthenticated() && (
                            <Link to="/login" className="btn btn-primary">
                            Login to edit tickets
                        </Link>
                        )}
                        {isAuthenticated() && (getUsername() === ticket.user || getIsAdmin()) && (ticket.status === "New" || ticket.status === "In Progress") && (<button className="btn btn-danger ms-2" onClick={cancelTicket}>Cancel Ticket</button>)}
                    </div>
		        </div>
	        </div>

            
            <div className='logs'>
            <h3> Logs: </h3>
            {ticket.iteration.map(log => (
                <div
                    className={"card text-white " + (ticket.resolution && ticket.resolution._id === log._id ? "bg-success" : "bg-dark")}
                    id={log._id}>
                    <div className={"card-body"}>
                        <div className={"card-title"}><h3>{log.comment}</h3></div>
                        <div className={"card-text"}>
                            <div className={"row"}>
                                <div className={"col"}>Created: {new Date(log.dateCreated).toLocaleString()}</div>
                                <div className={"col"}>User: {log.user.username}</div>
                                <div className={"col"}>New Status: {log.newStatus}</div>
                            </div>
                            <div className={"row"}>
                                <div className={"col"}>
                                    {isAuthenticated() && (getUsername() === ticket.user.username || getIsAdmin()) && (ticket.status === "New" || ticket.status === "In Progress" || ticket.status === "Resolved") && (<>
                                        <ResolveTicket ticket={ticket} iteration={log} cb={() => {
                                            // Force a re-render
                                            setUpdate(!update)
                                        }}/>
                                        <UnresolveTicket ticket={ticket} iteration={log} cb={() => {
                                            // Force a re-render
                                            setUpdate(!update)
                                        }} />
                                    </>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            {isAuthenticated() && (ticket.status === "New" || ticket.status === "In Progress" || getIsAdmin()) && (
                <div className='comment'>
                    <AddComment ticket={ticket.record} cb={() => {
                        // Force a re-render
                        setUpdate(!update)
                    }}/>
                </div>
            )}
        </center>
    </div>
  )
}
