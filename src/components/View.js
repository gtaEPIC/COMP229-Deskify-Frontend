import React from 'react'
import { Link } from 'react-router-dom';


export default function View() {
  return (
    <div>
       <div style={{backgroundColor:'rgb(183, 56, 120)',minHeight: '100vh',padding: '20px', paddingTop: '20px',}} >
       <center><h1> Ticket 1</h1></center>
       <br></br>
       <Link to="/edit-ticket" className="btn btn-primary">
       Edit
      </Link>
      
       <br></br>
       <br></br>
      <center> <h1> Title: Some Title</h1>
      <p>Description: Some Description</p>
      <p>Created: </p>
      <p>Updated: </p>
      <p>Status: </p>
      <p>Priority: </p>
      <p>User: </p>
      <p>Resolution: </p>

      <br></br>
       <br></br>
       <h1> Logs: </h1>


      </center>


       </div>
      
    </div>
  )
}
