import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import {isAuthenticated} from "../pages/login-helper";
import List from "./List";
let apiURL = process.env.REACT_APP_APIURL || 'http://localhost:3000'

function Tickets() {
    const [tickets, setTickets] = React.useState([]);
    const [hideClosedTickets, setHideClosedTickets] = React.useState(true);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch(`${apiURL}/ticket`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    if (hideClosedTickets) {
                        data.list = data.list.filter(t => t.status !== 'Closed' && t.status !== 'Resolved' && t.status !== 'Cancelled');
                    }
                    setTickets(data.list);
                    setLoading(false);
                } else {
                    console.error('Failed to fetch tickets:', await response.text());
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchTickets().then(r => console.log(r));
    }, [hideClosedTickets]);

  return (
    <div>
     <center><h2 className={"text-primary"}>Tickets</h2></center>
        {isAuthenticated() && (
            <Link to="/tickets/new" className="btn btn-primary">
                Create new tickets
            </Link>
        )}
        {!isAuthenticated() && (
            <Link to="/login" className="btn btn-primary">
                Login to create tickets
            </Link>
        )}
        <button className="btn btn-secondary ms-2" onClick={() => {
            setTickets([])
            setLoading(true)
            setHideClosedTickets(!hideClosedTickets)
        }}>
            {hideClosedTickets ? 'Show Closed Tickets' : 'Hide Closed Tickets'}
        </button>
        <br></br>
        <br></br>
        <List tickets={tickets} loading={loading} />
    </div>
  );
}

export default Tickets;
