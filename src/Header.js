import {Link, NavLink, useLocation} from "react-router-dom";
import logo from "./images/logo.png";
import {getUsername, isAuthenticated, logout} from "./pages/login-helper";

function Header() {
    // eslint-disable-next-line no-unused-vars
    const loc = useLocation();
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
                                    {isAuthenticated() && (<li><NavLink to="/tickets/new" className="dropdown-item">New Ticket</NavLink></li>)}
                                </ul>
                            </li>
                            {isAuthenticated() && (
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" to="#">
                                        User: {getUsername()}
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link to="/" onClick={logout} className="dropdown-item" >Logout</Link></li>
                                    </ul>
                                </li>
                            )}
                            {!isAuthenticated() && (
                                <li className="nav-item"><NavLink to="/login"
                                                                  className="nav-link">Login</NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;