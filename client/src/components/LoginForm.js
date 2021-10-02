// see SignupForm.js for comments
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import Auth from "../utils/auth";
import { useMutation } from "@apollo/react-hooks";
// client side mutation for login existing user
import { LOG_IN } from "../utils/mutations";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login, { error }] = useMutation(LOG_IN);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      if (error) {
        throw new Error("Login Failed!");
      }

      console.log(data);
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };

  // Styling
  const formStyle = {
    marginBottom: "2vh",
    marginLeft: "2vh",
    marginRight: "2vh",
    padding: "1.5vh",
    border: "solid #483C32 1px",
  };

  const spaceStyle = {
    padding: "1vh",
  };

  return (
    <>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleFormSubmit}
        style={formStyle}
      >
        <Alert
          // dismissible
          // onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
          style={{ textAlign: "center" }}
        >
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => setShowAlert(false)}
              variant="outline-danger"
            >
              X
            </Button>
          </div>
          <Alert.Heading>
            Something went wrong with your login credentials!
          </Alert.Heading>
        </Alert>

        <div style={{ textAlign: "center", padding: "1vh" }}>
          <Form.Label>Welcome Back!</Form.Label>
        </div>

        <Form.Group style={spaceStyle}>
          <Form.Label htmlFor="email">Email:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group style={spaceStyle}>
          <Form.Label htmlFor="password">Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <div style={{ textAlign: "center", padding: "1vh" }}>
          <Button
            disabled={!(userFormData.email && userFormData.password)}
            type="submit"
            variant="outline-dark"
          >
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
