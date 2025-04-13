import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {useAuth} from "~/context/useAuth"
import type {userProfile} from "~/models/all";
import {NavbarSearch} from "~/components/NavbarSearch";

export default function Navigation() {
    const {isLoggedIn, getUserDetails} = useAuth()

    return (
        <Navbar expand="lg" sticky="top" id="navigation">
            <Navbar.Brand href="/">
                <span className="d-lg-inline-block d-none">Online Garage Sale</span>
                <span className="d-inline-block d-lg-none">OGS</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link key="garages" href="/garage">Garages</Nav.Link>
                </Nav>
                <Nav className="justify-content-center">
                    <NavbarSearch/>
                    {isLoggedIn() ? profileLinks(getUserDetails()) :
                        <>
                            <Nav.Link key="register" href="/register">Register</Nav.Link>
                            <Nav.Link key="login" href="/login">Log in</Nav.Link>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

function profileLinks(getUserDetails: userProfile | null) {
    return (
        <NavDropdown title="Logged in" id="user-dropdown" align="end">
            <NavDropdown.Header>{getUserDetails?.name}</NavDropdown.Header>
            <NavDropdown.Item href="/profile">Show Profile</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href="/logout">
                Log out
            </NavDropdown.Item>
        </NavDropdown>
    )
}