import React, { useState } from "react";
import { Jumbotron, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import background from "../img/Roof.png";

function Header() {
  const headerStyle = {
    minHeight: "20vh",
    backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.1)), url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 50vh",
    backgroundPosition: "center top",
  };

  return (
    <Jumbotron fluid style={headerStyle} className="jumbotron">
      <Container className="d-flex justify-content-md-center">
        <Row className="d-flex justify-content-md-center">
          <Link to="/" style={{ textDecoration: "none" }}>
            <p className="fontLink">Little Lending Library</p>
          </Link>
        </Row>
      </Container>
    </Jumbotron>
  );
}

export default Header;
