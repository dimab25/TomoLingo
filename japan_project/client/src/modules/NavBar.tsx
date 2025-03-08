import { useContext } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

function NavBar() {
  const {logout } = useContext(AuthContext);

  const handlelogout =()=>{
 logout()
  }
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
            <Nav.Link as={Link} to={"/profiles"}>
              Userprofiles
            </Nav.Link>
            <Nav.Link as={Link} to={"/media"}>
              Media
            </Nav.Link>
            <Nav.Link as={Link} to={"/register"}>
              Register
            </Nav.Link>
            <Nav.Link as={Link} to={"/myprofile"}>
             MyProfile
            </Nav.Link>
            <Nav.Link as={Link} to={"/login"}>
              Login
            </Nav.Link>
            <Nav.Link as={Link} to={"/chat"}>
             Chat
            </Nav.Link>
            <Nav.Link as={Link} to={"/chats"}>
             Chats
            </Nav.Link>
            <Button variant="primary" onClick={handlelogout}> Logout</Button>
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
