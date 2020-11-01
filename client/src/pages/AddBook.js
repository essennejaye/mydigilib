import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks';
// import { Link, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { ADD_BOOK } from '../utils/mutations';
import { Form, Button, Col, Card, Container } from 'react-bootstrap';

const AddBook = () => {
  // create state for holding search result
  const [searchedBook, setSearchedBook] = useState({});
  // create state for data form
  const [searchInput, setSearchInput] = useState('');

  const [addBook, { error }] = useMutation(ADD_BOOK);

  // create method to search for book and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      alert('You must enter a valid ISBN!');
      return false;
    }
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${searchInput}`
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Oops, something went wrong!');
      }
      const { items } = await response.json();
      const item = items[0];

      if (!item) {
        throw new Error('Book was not retreived, Please try again!');
      }

      const bookData = {
        user_id: localStorage.getItem('user_id'),
        authors: item.volumeInfo.authors || ['No author to display'],
        title: item.volumeInfo.title,
        description: item.volumeInfo.description,
        image: item.volumeInfo.imageLinks?.thumbnail || '',
        pages: item.volumeInfo.pageCount,
        bookISBN: searchInput,
        datePublish: item.volumeInfo.publishedDate,
        category: item.volumeInfo.categories
      };
      setSearchedBook(bookData);
      setSearchInput('');
    } catch (e) {
      console.error(e);
    }
  };

  // create function to handle saving book to database
  const handleSaveBook = async () => {
    const bookToAdd = searchedBook;
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await addBook({
        variables: { bookData: bookToAdd }
      })
      window.location.assign(`/books/${localStorage.getItem('user_id')}`)
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <Container>
        <h1>Search for Books!</h1>
        <h3>Please enter the 13 digit ISBN, without spaces or dashes!</h3>
        <Form onSubmit={handleFormSubmit}>
          <Form.Row>
            <Col xs={12} md={8}>
              <Form.Control
                name='searchInput'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type='text'
                size='lg'
                placeholder='Enter ISBN to search for a book'
              />
              <Button type='submit' variant='success' size='lg'>
                Submit Search
                </Button>
            </Col>
          </Form.Row>
        </Form>
      </Container>
      <Container>
        <h2>
          {searchedBook
            ? `Results:`
            : 'Book not found'}
        </h2>
        <Card border='dark'>
          {searchedBook.image ? (
            <Card.Img src={searchedBook.image} alt={`The cover for ${searchedBook.title}`} variant='top' />
          ) : null}
          <Card.Body>
            <Card.Title>{searchedBook.title}</Card.Title>
            <p className='small'>Authors: {searchedBook.authors}</p>
            <Card.Text>{searchedBook.description}</Card.Text>
            <Card.Text>{searchedBook.pages}</Card.Text>
            <Card.Text>{searchedBook.category}</Card.Text>
            <Card.Text>{searchedBook.datePublish}</Card.Text>
            <Card.Text>{searchedBook.bookISBN}</Card.Text>
            {/* {Auth.loggedIn() && ( */}
            <Button
              className='btn-block btn-info'
              onClick={() => handleSaveBook()}>
              {/* // ? 'Book Already Saved!'
                   //     : 'Save This Book!'   */}Add this book
              </Button>
            {/* )} */}
          </Card.Body>
        </Card>
        {error && <div>Book not added!</div>}
      </Container>
    </>
  )
}

export default AddBook;
