import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useAuth} from "~/context/useAuth"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {useNavigate} from "react-router";


export default function Navigation() {
    const {isLoggedIn} = useAuth()
    const [q, setQ] = useState("");
    const navigate = useNavigate();

    function handleSubmit(event: { preventDefault: () => void }) {
        event.preventDefault()
        if (q == "") return;
        navigate("/search?q="+q)
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
                        <Button type="submit">Search</Button>
                    </Form>
                    {isLoggedIn() ? profileLinks() : <Nav.Link key="login" href="/login">Log in</Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

function profileLinks() {
    return (
        <NavDropdown title="Account" id="user-dropdown">
            <Navbar.Text>Arron Dick</Navbar.Text>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <NavDropdown.Divider/>
            <NavDropdown.Item href="/logout">
                Log out
            </NavDropdown.Item>
        </NavDropdown>
    )
}