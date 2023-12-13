import React from 'react';
import {isAuthenticated} from "../pages/login-helper";
let apiURL = process.env.REACT_APP_APIURL || 'http://localhost:3000'

const ResolveTicket = ({ ticket, iteration, cb }) => {

  const handleResolve = async () => {
     try {
        if (!isAuthenticated()) return alert('Please login to resolve tickets');
        // eslint-disable-next-line no-restricted-globals
        if (!confirm('Are you sure you want to resolve this ticket?')) {
          return;
        }
        // Send a PUT request to update ticket details on the backend
        const response = await fetch(`${apiURL}/ticket/${ticket.record}/resolve/${iteration._id}`, {
          method: 'PUT',
          headers: {
             'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
          },
        });

        // Check if the request was successful (status code 2xx)
        if (response.ok) {
          console.log('Ticket updated successfully!');
          if (cb) {
             cb();
          }
        } else {
          // Handle error cases
          console.error('Failed to update ticket:', await response.text());
        }
     } catch (error) {
        console.error('Error:', error);
     }
  };

      return (
     <>
         {isAuthenticated() && !ticket.resolution && (<button onClick={handleResolve} className="btn btn-success float-end">Mark as Resolution</button>)}
     </>
      );
}

const UnresolveTicket = ({ ticket, iteration, cb }) => {

      const handleUnresolve = async () => {
      try {
          if (!isAuthenticated()) return alert('Please login to resolve tickets');
          // eslint-disable-next-line no-restricted-globals
          if (!confirm('Are you sure you want to unresolve this ticket?')) {
             return;
          }
          // Send a PUT request to update ticket details on the backend
          const response = await fetch(`${apiURL}/ticket/${ticket.record}/unresolve`, {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
             },
          });

          // Check if the request was successful (status code 2xx)
          if (response.ok) {
             console.log('Ticket updated successfully!');
             if (cb) {
                 cb();
             }
          } else {
             // Handle error cases
             console.error('Failed to update ticket:', await response.text());
          }
      } catch (error) {
          console.error('Error:', error);
      }
      };

        return (
      <>
            {isAuthenticated() && ticket.resolution && ticket.resolution._id === iteration._id && (<button onClick={handleUnresolve} className="btn btn-danger float-end">Unmark as Resolution</button>)}
      </>
        );
}

export default ResolveTicket;
export {UnresolveTicket};