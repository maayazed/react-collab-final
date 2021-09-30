import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";

const loginPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showForm, setShowForm] = useState("");

  // Styling
  const pageStyle = {
    minHeight: "40vh",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
  };

  const topStyle = {
    padding: "3vh",
    alignItems: "center",
    textAlign: "center",
  };

  const closeStyle = {
    width: "40px",
  };

  const space = {
    marginTop: "1.5vh",
  };

  return (
    <Container fluid style={pageStyle}>
      {/* display looks like a door, once authorized user can enter */}
      {/* Finish state buttons to hide and show forms on click */}
      <div style={topStyle}>
        <Row style={{ backgroundColor: "#483C32" }}>
          <Col>
            <Button
              variant="outline-light"
              onClick={() => setShowForm("login")}
              style={space}
            >
              Login{" "}
            </Button>
          </Col>
          <Col xs={3} style={topStyle}>
            <strong style={{ color: "white" }}>OR</strong>
          </Col>
          <Col>
            <Button
              variant="outline-light"
              onClick={() => setShowForm("signUp")}
              style={space}
            >
              Sign Up
            </Button>
          </Col>
        </Row>
        <Row style={{ justifyContent: "right" }}>
          {showForm ? (
            <Button
              onClick={() => setShowForm("")}
              style={closeStyle}
              variant="outline-dark"
              size="sm"
            >
              X
            </Button>
          ) : null}
        </Row>
      </div>
      <Row>
        <Container>
          {showForm === "signUp" && <SignupForm />}
          {showForm === "login" && <LoginForm />}
        </Container>
      </Row>
    </Container>
  );
};

export default loginPage;
