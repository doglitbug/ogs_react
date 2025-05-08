import {useAuth} from "~/context/useAuth"
import type {user} from "~/models/all";
import {NavbarSearch} from "~/components/NavbarSearch";
import {Link} from "react-router";

export default function Navigation() {
    const {isLoggedIn, getUserDetails} = useAuth()

    return (
        <nav className="navbar navbar-expand-md">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <span className="d-md-inline-block d-none">Online Garage Sale</span>
                    <span className="d-inline-block d-md-none">OGS</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link to="/garage" className="nav-link">Garages</Link>
                        <Link to="/about" className="nav-link">About</Link>
                    </ul>
                    <div className="justify-content-center">
                        <ul className="navbar-nav">
                            <NavbarSearch/>
                            {isLoggedIn() ? profileLinks(getUserDetails()) :
                                <>
                                    <Link to="/register" className="nav-link">Register</Link>
                                    <Link to="/login" className="nav-link">Log in</Link>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function profileLinks(getUserDetails: user | null) {
    return (
        <>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                   aria-expanded="false">
                    Logged in
                </a>
                <ul className="dropdown-menu">
                    <li>
                        <div className="dropdown-header">{getUserDetails?.name}</div>
                    </li>
                    <li><Link className="dropdown-item" to="/profile">Show Profile</Link></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><Link className="dropdown-item" to="/logout">Log out</Link></li>
                </ul>
            </li>
        </>
    )
}