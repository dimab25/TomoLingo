import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router";

function NavBar() {
  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to={"/"}>
          JapanApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/media"}>
              Media
            </Nav.Link>
            <Nav.Link as={Link} to={"/register"}>
              Register
            </Nav.Link>
            {/* <NavDropdown title="Solar System" id="navbarScrollingDropdown">
            <NavDropdown.Item as={Link} to={"/about"}>
                About
              </NavDropdown.Item>
           
              <NavDropdown.Item as={Link} to={"/dwarf"}>
                Dwarf Planets
                </NavDropdown.Item>
            </NavDropdown> */}

            {/* <NavDropdown title="Images" id="navbarScrollingDropdown">
            <NavDropdown.Item  as={Link} to={"/day"}>
                Image of the Day
                </NavDropdown.Item>
              <NavDropdown.Item  as={Link} to={"/media"}>
                Search
                </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
