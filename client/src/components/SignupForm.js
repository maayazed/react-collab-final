import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import Auth from "../utils/auth";
import { useMutation } from "@apollo/react-hooks";
// client side mutation for add a user
import { CREATE_USER } from "../utils/mutations";

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ userLibrary: "", email: "", password: "" });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(CREATE_USER);

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
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      if (error) {
        throw new Error("Login failed!");
      }

      console.log(data);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      userLibrary: "",
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
      {/* This is needed for the validation functionality above */}
      <Form
        noValidate
        validated={validated}
        onSubmit={handleFormSubmit}
        style={formStyle}
      >
        {/* show alert if server response is bad */}
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
          <Alert.Heading>Something went wrong with your signup!</Alert.Heading>
        </Alert>

        <div style={{ textAlign: "center", padding: "1vh" }}>
          <Form.Label>Welcome to Little Lending Library!</Form.Label>
        </div>

        <Form.Group style={spaceStyle}>
          <Form.Label htmlFor="userLibrary">Little library label</Form.Label>
          <Form.Control
            type="userLibrary"
            placeholder="Your little library name"
            name="email"
            onChange={handleInputChange}
            value={userFormData.userLibrary}
            required
          />
          <Form.Control.Feedback type="invalid">
            Library name is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group style={spaceStyle}>
          <Form.Label htmlFor="email">Email:</Form.Label>
          <Form.Control
            type="email"
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
            disabled={!(userFormData.userLibrary && userFormData.email && userFormData.password)}
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

export default SignupForm;
