import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useAuth} from "~/context/useAuth"

export default function Navigation() {
    const {isLoggedIn} = useAuth()

    type ISection = {
        name: string,
        location: string,
    }
    let sections: ISection[] = [
        {name: "Garages", location: "/garage"},
        {name: "Items", location: "/item"},
    ];


    return (
        <Navbar sticky="top">
            <Navbar.Brand href="/">Online Garage Sale</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link key={"garages"} href="/garage">Garages</Nav.Link>
                <Nav.Link key={"items"} href="/item">Items</Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
                {isLoggedIn() ? profileLinks() : <Nav.Link key="login" href="/login">Log in</Nav.Link>}
            </Nav>
        </Navbar>
    );
}

function profileLinks() {
    return (
        <NavDropdown title="Signed in as Arron Dick" id="user-dropdown">
            <Nav.Link href="/profile">Profile</Nav.Link>
            <NavDropdown.Divider/>
            <NavDropdown.Item href="/logout">
                Log out
            </NavDropdown.Item>
        </NavDropdown>
    )
}