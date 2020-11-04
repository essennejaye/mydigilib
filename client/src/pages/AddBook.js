import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Auth from '../utils/auth';
import { ADD_BOOK } from '../utils/mutations';
import { Form, Button, Card, Container } from 'react-bootstrap';
import styled from 'styled-components';

const ContainerShow = styled.div
  `
 .book-image {
   width: 500px;
   height: 500px;
 }
 .book-card {
   width: 500px;
   justify-content: 
 }
 .result-container {
  display: ${props => props.show ? 'block' : 'none'};
   width: fit-content;
   margin: 50px auto 0px auto;
 }
  .no-result-container {
  display: ${props => props.show ? 'block' : 'none'};
   width: fit-content;
   margin: 50px auto 0px auto;
 }

 `;

const AddBook = () => {

  // create state for holding search result
  const [searchedBook, setSearchedBook] = useState(null);
  // create state for form
  const [searchInput, setSearchInput] = useState('');

  // mutation for adding a book to the catalog
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
      const item = items ? items[0] : null;

      if (!item) {
        // alert('That ISBN was not found!');
        setSearchInput('');
        setSearchedBook(null);
        return (<>
        {<h1>That ISBN was not found!</h1>}
        </>);
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
  // create function to cancel adding book to databse
  const handleCancelBook = async () => {
    setSearchedBook(null);
    window.location.assign('/addbook');
    return;
  }

  // create function to handle adding book to database
  const handleAddBook = async () => {
    const bookToAdd = searchedBook;
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      alert('You are not logged in!')
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
      <Form onSubmit={handleFormSubmit} className='text-center'>
        <Form.Group className="form-group">
          <Form.Label></Form.Label>
          <h4>Please enter the 13 digit ISBN without spaces or dashes!</h4>
          <Form.Control
            size='lg'
            name='searchInput'
            type="text"
            placeholder="ISBN"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {searchedBook &&
        <ContainerShow show>
          <Container className='result-container'>
            <h2>
              Results:
            </h2>
            <Card border='dark' className='book-card'>
              {searchedBook.image ? (
                <Card.Img src={searchedBook.image} alt={`The cover for ${searchedBook.title}`} variant='top'
                  className='book-image' />
              ) : null}
              <Card.Body>
                <Card.Title>{searchedBook.title}</Card.Title>
                <Card.Text>Authors: {searchedBook.authors}</Card.Text>
                <Card.Text>Description: {searchedBook.description}</Card.Text>
                <Card.Text>Pages: {searchedBook.pages}</Card.Text>
                <Card.Text>Category: {searchedBook.category}</Card.Text>
                <Card.Text>Date Published: {searchedBook.datePublish}</Card.Text>
                <Card.Text>ISBN: {searchedBook.bookISBN}</Card.Text>
                {Auth.loggedIn() && (
                  <>
                    <Button
                      className='btn-block btn-info'
                      onClick={() => handleAddBook()}>
                      Add This Book
                    </Button>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleCancelBook()}>
                      Cancel
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Container>
        </ContainerShow>
      }
      {error && <div><h2>Oops, something went wrong</h2></div>}
    </>
  )
}

export default AddBook;
