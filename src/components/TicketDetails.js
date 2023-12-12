import React from 'react';
import './TicketDetails.css'; // Make sure to create a corresponding CSS file

function TicketDetails({ priority, username, resolution }) {
  return (
    <div className="ticket-details">
      <div className="field">
        <label>Priority:</label>
        <input type="text" value={priority} readOnly className="greyed-out" />
      </div>

      <div className="field">
        <label>Username:</label>
        <input type="text" value={username} readOnly className="greyed-out" />
      </div>

      <div className="field">
        <label>Resolution:</label>
        <textarea value={resolution} readOnly />
      </div>
    </div>
  );
}

export default TicketDetails;
