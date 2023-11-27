import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './Header';
import Login from "./pages/Login";
import Main from "./components/Main";
import Tickets from "./components/Tickets";
import AddTicket from "./components/AddTicket";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route
                    path="/*"
                    element={
                        <>
                            <Header />
                            <br />
                            <Routes>
                                <Route index element={<Main />} />
                                <Route path="/tickets/new" element={<AddTicket />} />
                                <Route path="/tickets/" element={<Tickets />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="*" element={<App />} />
                            </Routes>
                        </>
                    }
                />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
