import React from 'react';
import { Jumbotron, Container, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Auth from '../utils/auth';
import '../index.css';

import BookList from '../components/BookList';

import { QUERY_USERS } from '../utils/queries';

const Library = () => {
  const userId = useParams();

  const { data } = useQuery(QUERY_USERS, {
    variables: { userId: userId },
  });

  const user = data?.user || {};

  return (
    <div className="py-5 text-center container">
      <div className="row py-lg-5">
        <Jumbotron fluid className='bg-light'>
          <Container>
            <p>See below for available books</p>
          </Container>
          <Container>
            {Auth.loggedIn() && (
              <Link to={`/addBook/library/${Object.values(userId)}`}>
                <Button type="button" className="btn btn-danger">Add a book to this library</Button>
              </Link>
            )}
            <Link to='/'>
              <Button type="button" className="btn btn-secondary space">Return to home</Button>
            </Link>
            <div className='col-12 d-flex flex-direction-column-reverse spacebefore'>
              <BookList />
            </div>
          </Container>
        </Jumbotron>
      </div></div>
  );
}

export default Library;
