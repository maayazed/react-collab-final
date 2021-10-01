import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

import Auth from "../utils/auth";

const styles = {
  overlayLinks: {
      color: "brown",
      textDecoration: "none",
  }
}


const AppNavbar = () => {

  return (
    <>
      <Navbar bg="light" variant="light" expand="lg">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto">
              <Nav.Link style = {styles.overlayLinks} as={Link} to="/">
                Search For Books
              </Nav.Link>
              {/* <Nav.Link as={Link} to="/login">
                Login/ Signup
              </Nav.Link> */}
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  {/* <Nav.Link as={Link} to="/saved">
                    See Your Books
                  </Nav.Link> */}
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link style = {styles.overlayLinks} as={Link} to="/login">
                  Login/Sign Up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
