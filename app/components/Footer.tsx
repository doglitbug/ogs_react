import {Navbar, Nav} from "react-bootstrap";

export default function Footer() {
    return (
        <Navbar fixed="bottom">
            <Nav className="me-auto">
                <Navbar.Text>Author: </Navbar.Text>
                <Nav.Link href="mailto:doglitbug@gmail.com">doglitbug@gmail.com</Nav.Link>
                <Nav.Link href="https://github.com/search?q=owner%3Adoglitbug+ogs&type=repositories">Github: Source</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
            </Nav>
        </Navbar>
    );
  }
