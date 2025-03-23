import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function Footer() {
    return (
        <Navbar fixed="bottom">
            <Nav className="me-auto">
                <Navbar.Text>Author: </Navbar.Text>
                <Nav.Link href="mailto:doglitbug@gmail.com">doglitbug@gmail.com</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
            </Nav>
        </Navbar>
    );
  }
