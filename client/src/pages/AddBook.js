import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Row } from 'react-bootstrap';
import { Card, CardTitle } from 'reactstrap';
import { useParams, Link } from "react-router-dom";

import { useMutation, useQuery } from '@apollo/client';
import { CREATE_BOOK } from '../utils/mutations';
import { QUERY_USERS } from '../utils/queries';
import '../index.css';
import Auth from '../utils/auth';
import { searchGoogleBooks } from '../utils/API';

import { addBookIds, getAddedBookIds } from '../utils/localStorage';

const booksBg = ["#E8A68E", "#FFCDAB", "#CBD9BF", "#ACCC7A5", "#A0C4FF", "#BDB2FF"];

const AddBook = () => {
  // set up route back
  const userId = useParams();

  const { data } = useQuery(QUERY_USERS, {
    variables: { userId: userId },
  });

  // eslint-disable-next-line no-unused-vars
  const user = data?.user || {};

  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  // create state to hold mutation for adding book
  const [addBook] = useMutation(CREATE_BOOK);
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
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };
  //gets random color for book's background
  const getBgColor = () => {
    const i = Math.floor(Math.random() * booksBg.length);
    return booksBg[i];
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
      await addBook({
        variables: { bookData: { ...bookToAdd } }
      });

      // if book successfully saves to user's account, save book id to state
      setAddedBookIds([...addedBookIds, bookToAdd.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="py-5 text-center container">
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
                  <Link to={`/library/${Object.values(userId)}`}>
                    <Button type="button" className="btn btn-secondary space">Return to library</Button>
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
            <div className='col'>
              {searchedBooks.map((book) => {
                return (
                  <Card key={book.bookId} className='bookcover' style={{ backgroundColor: getBgColor() }}>
                    <Row className="d-flex row align-items-center justify-content-space-evenly spacebefore">
                      <Col className='col-4'><CardTitle key={book.bookId} className='booktitle'>{book.title}</CardTitle></Col>
                      <Col className='col-3 small'>By: {book.authors}</Col>
                      <Col className='col-5'>
                        <Button variant='dark' size='sm'
                          disabled={addedBookIds?.some((addedBookId) => addedBookId === book.bookId)}
                          onClick={() => handleAddBook(book.bookId)}>
                          {addedBookIds?.some((addedBookId) => addedBookId === book.bookId)
                            ? 'Book added!'
                            : 'Add this book'}
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                )
              },
              )}
            </div>
          </Container>
        </Jumbotron>
      </div></div>
  );
}

export default AddBook;
