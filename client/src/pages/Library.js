import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import '../index.css';

const Library = () => {

  return (
    <div className="py-5 text-center container">
      <div className="row py-lg-5">
        <Jumbotron fluid className='bg-light'>
          <Container>
            {/* <h1>{library.location}</h1> */}
            {/* <h2>East Library <br />at 2017 Buford Ave.</h2> */}
            <p>See below for available books</p>
          </Container>
          <Container>
            {/* {Auth.loggedIn() && (
              <Link to={`/addBook/${libraryId}`}>
                <Button type="button" className="btn btn-danger">Add a book to this library</Button>
              </Link>
            )} */}
            <div className='col-12 d-flex flex-direction-column-reverse spacebefore'>
              {/* <BookList books={library.currentBooks} /> */}
            </div>
          </Container>
        </Jumbotron>
      </div></div>
  );
}

export default Library;
