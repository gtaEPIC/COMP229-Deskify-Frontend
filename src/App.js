// src/App.js
import React from 'react';
import logo from "./logo.svg";


function App() {
  const ticketsData = [
   
    { id: 1, title: 'Ticket 1', description: 'Description 1' },
    { id: 2, title: 'Ticket 2', description: 'Description 2' },
   
  ];

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
      </div>
  );
}

export default App;
