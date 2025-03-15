
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const loggedIn: boolean = true;

type ISection = {
  name: string,
  location: string,
}
let sections: ISection[] = [
  { name: "Garages", location: "/garage" },
  { name: "Garages: 1", location: "/garage/1" },
  { name: "Items", location: "/item" },
  { name: "Users", location: "/user" },
];

if (loggedIn) {
  sections.push({ name: "Profile", location: "/profile" });
  sections.push({ name: "Logout", location: "/logout" });
} else {
  sections.push({ name: "Login", location: "/login" });
}

sections.push({ name: "About", location: "/about" });

//sections = sections.filter(e => e.name !== "Logout");

export default function Navigation() {
  return (
    <Navbar>
      <Navbar.Brand href="/">Online Garage Sale</Navbar.Brand>
      <Nav className="me-auto">
        {sections.map((section, index) => {
          return (<Nav.Link key={index} href={section.location}>{section.name}</Nav.Link>);
        })}
      </Nav>
    </Navbar>
  );
}