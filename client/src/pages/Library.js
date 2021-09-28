import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Button, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { useQuery, useMutation } from '@apollo/client';
import { CREATE_BOOK } from '../utils/mutations';
import '../index.css';
import Auth from '../utils/auth';
import { searchGoogleBooks } from '../utils/API';
import BookBackground from '../bluegraybook.png'

import { addBookIds, getAddedBookIds } from '../utils/localStorage';
import { QUERY_LIBRARIES } from '../utils/queries';


const bgimage = {
  backgroundImage: `url(${BookBackground})`
};

const booksbg = {};
  //randomcolor = ["#FFADAD", "#FFD6A5", "FDFFB6", "CAFFBF", "9BF6FF", "A0C4FF", "BDB2FF"], 
  // background-color: randomcolor.map type function
//};

const Library = () => {
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
          <h2>East Library <br />at 2017 Buford Ave.</h2>
          <p>See below for available books</p>
        </Container>
      <Container>
      <Link to='/addbook'>
      <button type="button" className="btn btn-danger">Add a book to this library</button>
      </Link>
        <div className='col-11 d-flex flex-direction-column-reverse spacebefore'>
          {/* need to list books that exist in this library */}
          {/* {searchedBooks.map((book) => {
            return ( */}
              <Alert variant="success" className='bookcover' style={booksbg}>
                <div className="d-flex row align-items-center justify-content-space-evenly bookspacing">
                <div className='col-4'>
                {/* <Alert.Heading key={book.bookId} className='booktitle'>{book.title}</Alert.Heading> */}
                  <Alert.Heading key="123" className='booktitle'>The Black Friend</Alert.Heading>
                  {/* add function to limit title to xx characters */}
                  </div>
              <div className='col-3 small'>By: Frederick Joseph</div> 
              {/* By: {book.authors} */}
              <div className='col-5'>
                <Button 
                  key='bookDetails' variant='secondary' size='sm'
                  onClick={() => handleAddBook()}>
                  {/* {addedBookIds?.some((addedBookId) => addedBookId === book.bookId)
                    ? 'Book removed!'
                    : 'Take book'} */}
                    See details
                </Button>
                <Button 
                  key='addBook' className="space" variant='dark' size='sm'
                  onClick={() => handleAddBook()}>
                  {/* {addedBookIds?.some((addedBookId) => addedBookId === book.bookId)
                    ? 'Book removed!'
                    : 'Take book'} */}
                    Take book
                </Button></div></div>
              </Alert>
            {/* )},
          )}   */}
        </div>
      </Container>
    </Jumbotron>
    </div></div>
  );
}

export default Library;
