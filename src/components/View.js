import React, {useEffect} from 'react'
import {Link, useParams} from 'react-router-dom';
let apiURL = process.env.REACT_APP_APIURL || 'http://localhost:3000'

export default function View() {
    const { id } = useParams();
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [priority, setPriority] = React.useState(0);
    const [record, setRecord] = React.useState("");
    const [dateCreated, setDateCreated] = React.useState(new Date());
    const [updated, setUpdated] = React.useState(new Date());
    const [user, setUser] = React.useState("");
    const [iteration, setIteration] = React.useState([]);


    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await fetch(`${apiURL}/ticket/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    let ticket = data.ticket;
                    setTitle(ticket.title);
                    setDescription(ticket.description);
                    setStatus(ticket.status);
                    setPriority(ticket.priority);
                    setRecord(ticket.record);
                    setDateCreated(new Date(ticket.dateCreated));
                    setUpdated(new Date(ticket.updated));
                    setUser(ticket.user.username);
                    setIteration(ticket.iteration);
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
        <center><h1>Ticket {record}</h1></center>
        <br></br>
        <Link to={`/tickets/${id}/edit`} className="btn btn-primary">
        Edit
        </Link>

        <br></br>
        <br></br>
        <center> <h1>Title: {title}</h1>
        <p>Description:<br /> {description}</p>
        <p>Created: {dateCreated.toLocaleString()}</p>
        <p>Updated: {updated.toLocaleString()}</p>
        <p>Status: {status}</p>
        <p>Priority: {priority}</p>
        <p>User: {user}</p>
        <p>Resolution: </p>
        <h3> Logs: </h3>
            {iteration.map(log => (
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
