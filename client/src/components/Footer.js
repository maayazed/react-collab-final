import React from "react";
import { Row, Container } from "react-bootstrap";

import footer from "../img/post.png";

function Footer() {
  const yourstyle = {
    minHeight: "20vh",
    backgroundImage: `url(${footer})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 50vh",
    backgroundPosition: "center top",
    textAlign: "center",
  };

  return (
    <footer style={yourstyle}>
      <Container>
        <Row className="d-flex justify-content-center">
          <p className="copyright">Copyright 2021 &reg;</p>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
