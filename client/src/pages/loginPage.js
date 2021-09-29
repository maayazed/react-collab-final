import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";

import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";

const loginPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showForm, setShowForm] = useState("");

  const pageStyle = {
    height: "40vh",
    justifyContent: "center",
  };

  return (
    <Container style={pageStyle}>
      {/* display looks like a door, once authorized user can enter */}
      {/* Finish state buttons to hide and show forms on click */}
      <Button variant="outline-warning" onClick={() => setShowForm("login")}>
        Login{" "}
      </Button>
      <strong>OR</strong>
      <Button variant="outline-info" onClick={() => setShowForm("signUp")}>
        Sign Up
      </Button>
      {showForm ? <Button onClick={() => setShowForm("")}>Close</Button> : null}
      <Container>
        {showForm === "signUp" && <SignupForm />}
        {showForm === "login" && <LoginForm />}
      </Container>
    </Container>
  );
};

export default loginPage;
