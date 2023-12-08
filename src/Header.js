import {Link, NavLink, useLocation} from "react-router-dom";
import logo from "./images/logo.png";
import {getUsername, isAuthenticated, logout} from "./pages/login-helper";
import'./header.css';

function Header() {
    // eslint-disable-next-line no-unused-vars
    const loc = useLocation();
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#08181C", padding: 0, height: '64px' }}>
                    <NavLink to="#" className="navbar-brand" style={{ marginLeft: '0px' }}>
                        <img src={logo} alt="logo" width="64" height="64" />
                    </NavLink>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <button><li className="nav-item"><NavLink to="/" className="nav-link" style={{ color: "#b3c1b4"}}>Home</NavLink></li></button>
                            <button><li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" to="#" style={{ color: "#b3c1b4"}}>
                                    Tickets
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><NavLink to="/tickets" className="dropdown-item">List of tickets</NavLink></li>
                                    {isAuthenticated() && (<li><NavLink to="/tickets/new" className="dropdown-item">New Ticket</NavLink></li>)}
                                </ul>
                            </li></button>
                            {isAuthenticated() && (
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" to="#">
                                        User: {getUsername()}
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link to="/" onClick={logout} className="dropdown-item">Logout</Link></li>
                                    </ul>
                                </li>
                            )}
                            {!isAuthenticated() && (
                                <button><li className="nav-item"><NavLink to="/login" className="nav-link" style={{ color: "#b3c1b4"}}>Login</NavLink></li></button>
                            )}
                            {!isAuthenticated() && (
                                <button><li className="nav-item"><NavLink to="" className="nav-link" style={{ color: "#b3c1b4"}}>Sign-up</NavLink></li></button>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}




export default Header;