import React from 'react';
import { Link } from 'react-router-dom';

function Tickets() {
  return (
    <div>
     
     <center><h2>Tickets</h2></center> 
     <Link to="/tickets/new" className="btn btn-primary">
        Create new tickets
      </Link>
     
     
     
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
      <th scope="col">View</th>



    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Mark</td>
      <td>Otto</td>
      <td><Link to="/view-ticket" className="btn btn-info">
      View
      </Link>
     </td>
      

    </tr>
    
    
  </tbody>
</table>
    </div>
  );
}

export default Tickets;
