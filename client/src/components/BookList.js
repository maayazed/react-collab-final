import React, { useState } from 'react';
import { Card, CardTitle } from 'reactstrap';
import { Button, Col, Row, Modal } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';
import '../index.css';

// saved books data from user
import { QUERY_ME } from '../utils/queries';

const booksBg = ["#E8A68E", "#FFCDAB", "#CBD9BF", "#ACCC7A5", "#A0C4FF", "#BDB2FF"];

const BookList = () => {
  const { data, loading } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  //creating the pop-up modal for book details
  function BookModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4>{props.book.title}</h4>
          <Row><Col xs={3}><img alt={`${props.book.title} book cover`} src={props.book.image}></img></Col>
            <Col className="space">{props.book.description}
            </Col></Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const [modalShow, setModalShow] = useState(false);

  //gets random color for book's background
  const getBgColor = () => {
    const i = Math.floor(Math.random() * booksBg.length);
    return booksBg[i];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData?.userLibrary) {
    return (
      <h2>
        You are not authorized with our libraries!
      </h2>
    );
  }

  return (
    <div className='col'>
      {userData.savedBooks?.map((book) => {
        return (
          <Card key={book.bookId} variant="primary" className='bookcover' style={{ backgroundColor: getBgColor() }}>
            <Row className="d-flex row align-items-center justify-content-space-evenly spacebefore">
              <Col className='col-4'>
                <CardTitle key="123" className='booktitle'>{book.title}</CardTitle>
                {/* add function to limit title to xx characters */}
              </Col>
              <Col className='col-3 small'>By: {book.authors}</Col>
              <Col className='col-5'>
                <Button
                  key='bookDetails' variant='dark' size='sm' onClick={() => setModalShow(true)}>
                  See details
                </Button>
                <BookModal
                  book={book}
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
                <Button
                  key='addBook' className="space" variant='dark' size='sm'>{/*onClick={() => handleAddBook()}*/}
                  {/* {addedBookIds?.some((addedBookId) => addedBookId === book.bookId)
                ? 'Book removed!'
                : 'Take book'} */}
                  Take book
                </Button></Col></Row>
          </Card>
        );
      })}
    </div>
  );
};

export default BookList;