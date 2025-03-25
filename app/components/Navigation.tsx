import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useAuth} from "~/context/useAuth"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {useNavigate} from "react-router";
import type {userProfile} from "~/models/all";


export default function Navigation() {
    const {isLoggedIn, getUserDetails} = useAuth()
    const [q, setQ] = useState("");
    const [location, setLocation] = useState(getUserDetails()?.location);
    const navigate = useNavigate();

    function handleSubmit(event: { preventDefault: () => void }) {
        event.preventDefault()
        if (q == "") return
        let url = `/search?q=${q}`
        if (location != "") {
            url += `&location=${location}`
        }
        navigate(url)
    }

    return (
        <Navbar expand="lg" sticky="top" id="navigation">
            <Navbar.Brand href="/">Online Garage Sale</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link key={"garages"} href="/garage">Garages</Nav.Link>
                    <Nav.Link key={"items"} href="/item">Items</Nav.Link>
                </Nav>
                <Nav className="justify-content-center">
                    <Form className="d-flex" onSubmit={handleSubmit}>
                        <Form.Control
                            type="search"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Form.Control
                            type="search"
                            value={location ? location : ""}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Location"
                            className="me-2"
                            aria-label="Location"
                        />
                        <Button type="submit">Search</Button>
                    </Form>
                    {isLoggedIn() ? profileLinks(getUserDetails()) :
                        <Nav.Link key="login" href="/login">Log in</Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

function profileLinks(getUserDetails: userProfile | null) {
    return (
        <NavDropdown title="Logged in" id="user-dropdown" align="end">
            <NavDropdown.Header>{getUserDetails?.name}</NavDropdown.Header>
            <NavDropdown.Item href="/profile">Edit Profile</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href="/logout">
                Log out
            </NavDropdown.Item>
        </NavDropdown>
    )
}