import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

import Auth from "../utils/auth";

// integrated inLine react CSS
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
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link styles={styles.overlayLinks} onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link styles={styles.overlayLinks} as={Link} to="/login">
                  Login | Sign Up
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
