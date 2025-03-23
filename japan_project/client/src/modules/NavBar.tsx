import { useContext } from "react";
import { Button, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";
//REVIEW I would say that the folder's name "modules" to store a navigation bar component, is a bit misleading.
function NavBar() {
  const { user, logout } = useContext(AuthContext);

  const handlelogout = () => {
    logout();
  };
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
              Profiles
            </Nav.Link>
            <Nav.Link as={Link} to={"/media"}>
              Media
            </Nav.Link>

            <Nav.Link as={Link} to={"/chatroom"}>
              Chatroom
            </Nav.Link>

            <NavDropdown title="User" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={"/myprofile"}>
                My Profile
              </NavDropdown.Item>
              {!user && (
                <NavDropdown.Item as={Link} to={"/register"}>
                  Register
                </NavDropdown.Item>
              )}
              {!user && (
                <NavDropdown.Item as={Link} to={"/login"}>
                  Login
                </NavDropdown.Item>
              )}
              {user && (
                <NavDropdown.Item onClick={handlelogout}>
                  Sign out
                </NavDropdown.Item>
              )}

              <NavDropdown.Item as={Link} to={"/chats"}>
                Messages
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
