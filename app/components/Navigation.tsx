import ReactNode from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

type ISection = {
  name: string,
  location: string,
}
let sections: ISection[] = [
  { name: "Garage", location: "/garage" },
  { name: "Garage", location: "/garage" },
  { name: "Logout", location: "/logout" },
];

//TODO Remove routes that are Admin/Logged in/Logged out
//eg if (!loggedIn)
//sections = sections.filter(e => e.name !== "Logout");


export default function Navigation() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Online Garage Sale</Navbar.Brand>
        <Nav className="me-auto">
          {sections.map((section)=>{
            return (<Nav.Link href={section.location}>{section.name}</Nav.Link>);
          })}
        </Nav>
      </Container>
    </Navbar>

  );
}