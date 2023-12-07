import {Link, NavLink, useLocation} from "react-router-dom";
import logo from "./images/logo.png";
import {getUsername, isAuthenticated, logout} from "./pages/login-helper";

function Header() {
    // eslint-disable-next-line no-unused-vars
    const loc = useLocation();
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "rgb(72, 150, 160)", padding: 0, height: '64px' }}>
                    <NavLink to="#" className="navbar-brand" style={{ marginLeft: '0px' }}>
                        <img src={logo} alt="logo" width="64" height="64" />
                    </NavLink>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><NavLink to="/" className="nav-link" style={{ color: "white"}}>Home</NavLink></li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" to="#" style={{ color: "white"}}>
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
                                        <li><Link to="/" onClick={logout} className="dropdown-item">Logout</Link></li>
                                    </ul>
                                </li>
                            )}
                            {!isAuthenticated() && (
                                <li className="nav-item"><NavLink to="/login" className="nav-link" style={{ color: "white"}}>Login</NavLink></li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}




export default Header;