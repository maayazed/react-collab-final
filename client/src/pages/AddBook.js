import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { useMutation } from '@apollo/client';
import { CREATE_BOOK } from '../utils/mutations';
import '../index.css';
import Auth from '../utils/auth';
import { searchGoogleBooks } from '../utils/API';
import BookBackground from '../bluegraybook.png'

import { addBookIds, getAddedBookIds } from '../utils/localStorage';

const bgimage = {
  backgroundImage: `url(${BookBackground})`
};

const booksbg = {};
  //randomcolor = ["#FFADAD", "#FFD6A5", "FDFFB6", "CAFFBF", "9BF6FF", "A0C4FF", "BDB2FF"], 
  // background-color: randomcolor.map type function
//};

const AddBook = () => {
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  const [addBook, { error }] = useMutation(CREATE_BOOK);
  // create state to hold saved bookId values
  const [addedBookIds, setAddedBookIds] = useState(getAddedBookIds());

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  useEffect(() => {
    return () => addBookIds(addedBookIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        // image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving added book to our database
  const handleAddBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToAdd = searchedBooks.find((book) => book.bookId === bookId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await addBook({variables: { ...bookToAdd }});

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }

      // if book successfully saves to user's account, save book id to state
      setAddedBookIds([...addedBookIds, bookToAdd.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="py-5 container">
    <div className="row py-lg-5">
      <Jumbotron fluid className='bg-light'>
        <Container>
          <h2 className="text-center">Add a book to the library</h2>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row className="d-flex flex-wrap">
              <Col xs={12} md={6}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='med'
                  placeholder='Enter book title'
                />
              </Col>
              <Col xs={12} md={5}>
                <Button type='submit' variant='danger' size='med'>
                  Search
                </Button>
                <Link to='/library'>
      <button type="button" className="btn btn-secondary space">Return to library</button>
      </Link>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      <Container>
        <h3 className="text-center">
          {searchedBooks.length
            ? `Results:`
            : 'Search for a book to begin'}
        </h3>
        <div className='col-10'>
          {searchedBooks.map((book) => {
            return (
              <Alert variant="success" className='bookcover' style={booksbg}>
                <div className="d-flex row align-items-center justify-content-space-evenly">
                  <div className='col-5'><Alert.Heading key={book.bookId} className='booktitle'>{book.title}</Alert.Heading></div>
                  <div className='col-4 small'>By: {book.authors}</div>
                  <div className='col-md-3'>
                    <Button key='addBook' variant='dark' size='sm'
                    onClick={() => handleAddBook(book.bookId)}>
                    {addedBookIds?.some((addedBookId) => addedBookId === book.bookId)
                    ? 'Book added!'
                    : 'Add this book'}
                    </Button>
                  </div>
                </div>
              </Alert>
            )},
          )}  
        </div>
      </Container>
    </Jumbotron>
    </div></div>
  );
}

export default AddBook;
