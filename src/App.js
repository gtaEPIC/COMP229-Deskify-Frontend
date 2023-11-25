import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Main from './components/Main';
import Tickets from './components/Tickets';
import NewTickets from './components/NewTickets';
import View from './components/View';
import Edit from './components/Edit';



function App() {
  return (
    <Router>
      <div>
       
        <Routes>
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/" element={<Main />} />
          <Route path="/create-ticket" element={<NewTickets />} />
          <Route path="/view-ticket" element={<View/>} />
          <Route path="/edit-ticket" element={<Edit/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
