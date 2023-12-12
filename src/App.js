import React from 'react';
import logo from "./logo.svg";
import TicketDetails from './components/TicketDetails';

function App() {
  const ticketsData = [
    { id: 1, title: 'Ticket 1', description: 'Description 1' },
    { id: 2, title: 'Ticket 2', description: 'Description 2' },
  ];

  const ticketInfo = {
    priority: 'High',
    username: 'user123',
    resolution: 'Issue resolved with update'
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is a placeholder page.
          If you hit this page then something went wrong.
        </p>
        <small>Shouldn't be too shocking though</small>
      </header>

      {/* Include the TicketDetails component */}
      <TicketDetails 
        priority={ticketInfo.priority} 
        username={ticketInfo.username} 
        resolution={ticketInfo.resolution} 
      />

      {/* Optionally, you can render ticket data here */}
      {/* ... */}
    </div>
  );
}

export default App;
