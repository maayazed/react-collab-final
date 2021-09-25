import React from 'react';
// import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

const loginPage = () => {
  // const [showForm, setShowForm] = useState(false);

  return (
    <>
      {/* display looks like a door, once authorized user can enter */}
      <Container>
        <h1> Login or Signup </h1>
        <Button>Login</Button>
        <Button>Signup</Button>
        <SignupForm />
        <LoginForm />
      </Container>
    </>
  );
};

export default loginPage;