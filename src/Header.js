import {Link, NavLink} from "react-router-dom";
import logo from "./images/logo.png";

function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink to="#" className="navbar-brand">
                        <img src={logo} alt="logo" width="64" height="64" className="d-inline-block align-text-top" />
                    </NavLink>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item"><NavLink to="/" className="nav-link">Home</NavLink></li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" to="#">
                                    Tickets
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><NavLink to="/tickets" className="dropdown-item">List of tickets</NavLink></li>
                                    <li><NavLink to="/tickets/new" className="dropdown-item">New Ticket</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item"><NavLink to="/login" className="nav-link">Login</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;