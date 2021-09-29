import React, { useState, useEffect } from 'react';
import { Card, CardTitle } from 'reactstrap';
import { Jumbotron, Container, Button, Col, Row } from 'react-bootstrap';
import '../index.css';
import Auth from '../utils/auth';

const booksbg = ["#E8A68E", "#FFCDAB", "#CBD9BF", "#ACCC7A5", "#A0C4FF", "#BDB2FF"];

const BookList = ({books}) => {
    if (!books) {
        return <h3>No Books Yet</h3>
    }

    //gets random color for book's background
  const getBgColor = () => {
    const i = Math.floor(Math.random() * booksbg.length);
    return booksbg[i];
  };

  // Gets all of the authors in the authors array and 
  const authorsList = (authors) =>  {
      let finalAuthorsList = '';
      authors.forEach(element => {
          finalAuthorsList = finalAuthorsList + ', ' + element;
      });
      return finalAuthorsList;
  }

return (
    <div>
    {books && books.map((book)=>(
            <Card variant="primary" className='bookcover' style={{ backgroundColor: getBgColor() }}>
            <Row className="d-flex row align-items-center justify-content-space-evenly spacebefore">
            <Col className='col-4'>
              <CardTitle key="123" className='booktitle'>{book.title}</CardTitle>
              {/* add function to limit title to xx characters */}
              </Col>
          <Col className='col-3 small'>By: {authorsList(book.authors)}</Col> 
          <Col className='col-5'>
            <Button 
              key='bookDetails' variant='secondary' size='sm'> {/*onClick={() => handleAddBook()}*/}
              {/* {addedBookIds?.some((addedBookId) => addedBookId === book.bookId)
                ? 'Book removed!'
                : 'Take book'} */}
                See details
            </Button>
            <Button 
              key='addBook' className="space" variant='dark' size='sm'>{/*onClick={() => handleAddBook()}*/}
              {/* {addedBookIds?.some((addedBookId) => addedBookId === book.bookId)
                ? 'Book removed!'
                : 'Take book'} */}
                Take book
            </Button></Col></Row>
          </Card>
    ))}
    </div>
);
};

export default BookList;