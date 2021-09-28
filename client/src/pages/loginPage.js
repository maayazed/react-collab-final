import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';

import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

const loginPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showForm, setShowForm] = useState('');

  return (
    <>
      {/* display looks like a door, once authorized user can enter */}
      {/* Finish state buttons to hide and show forms on click */}
      <h1>Login or Signup </h1>
      <Button onClick={() => setShowForm('login')} >Login </Button>
      <Button onClick={() => setShowForm('signUp')} >Sign Up</Button>
      {showForm ?
        <Button onClick={() => setShowForm('')} >Close</Button>
        : null}
      <Container>
        {showForm === 'login' &&
          < SignupForm />}
        {showForm === 'signUp' &&
          <LoginForm />}
      </Container>
    </>
  );
};

export default loginPage;