import React, {useEffect} from 'react'
import {Link, useParams} from 'react-router-dom';
import TicketModel from "./TicketModel"
import {isAuthenticated} from "../pages/login-helper";
import {Link as ScrollLink} from 'react-scroll';
import ResolveTicket, {UnresolveTicket} from "./Resolution";
import AddComment from "./AddComment";
let apiURL = process.env.REACT_APP_APIURL || 'http://localhost:3000'

export default function View() {
    const { id } = useParams();
    const [ticket, setTicket] = React.useState(new TicketModel());
    const [update, setUpdate] = React.useState(false);

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


  return (
    <div>
        <div style={{backgroundColor:'rgb(183, 56, 120)',minHeight: '100vh',padding: '20px', paddingTop: '20px',}} >
        <center><h1>Ticket {ticket.record}</h1></center>
        <br></br>
            {isAuthenticated() && (<Link to={`/tickets/${id}/edit`} className="btn btn-primary">
                Edit
            </Link>)}
            {!isAuthenticated() && (
                <Link to="/login" className="btn btn-primary">
                    Login to edit tickets
                </Link>
            )}

        <br></br>
        <br></br>
        <center> <h1>Title: {ticket.title}</h1>
        <p>Description:<br /> {ticket.description}</p>
        <p>Created: {ticket.dateCreated.toLocaleString()}</p>
        <p>Updated: {ticket.updated.toLocaleString()}</p>
        <p>Status: {ticket.status}</p>
        <p>Priority: {ticket.priority}</p>
        <p>User: {ticket.user}</p>
        <p>Resolution: {ticket.resolution ?
            <ScrollLink to={ticket.resolution._id} smooth={true} duration={250}
               className={"badge bg-success"}>Resolved</ScrollLink>
            :
            <button className={"badge bg-dark"}>Unresolved</button>
        }</p>
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
                                    <ResolveTicket ticket={ticket} iteration={log} cb={() => {
                                        // Force a re-render
                                        setUpdate(!update)
                                    }}/>
                                    <UnresolveTicket ticket={ticket} iteration={log} cb={() => {
                                        // Force a re-render
                                        setUpdate(!update)
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {isAuthenticated() && (
                <AddComment ticket={ticket.record} cb={() => {
                    // Force a re-render
                    setUpdate(!update)
                }} />
            )}
        </center>


        </div>

    </div>
  )
}
