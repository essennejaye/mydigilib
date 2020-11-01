import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks';
import Auth from '../utils/auth';
import { ADD_BOOK } from '../utils/mutations';
import { Form, Button, Card, Container } from 'react-bootstrap';

const AddBook = () => {
  // create state for holding search result
  const [searchedBook, setSearchedBook] = useState();
  // create state for data feom form
  const [searchInput, setSearchInput] = useState('');

  const [addBook, { error }] = useMutation(ADD_BOOK);

  // create method to search for book and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      alert('You must enter a valid ISBN!')
      return false;
    }
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?isbn:${searchInput}`);
      if (!response.ok) {
        throw new Error('Something went wrong!')
      }
      const { book } = await response.json();

      const bookData = {
        user_id: localStorage.getItem('user_id'),
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        pages: book.volumeInfo.pages,
        bookISBN: searchedBook,
        datePublish: book.volumeInfo.datePublished,
        category: book.volumeInfo.mainCategory
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
        variables: { bookData: { ...bookToAdd } }
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
          </Form.Row>
        </Form>
      </Container>
      <Container>
        <h2>
          {searchedBook
            ? `Results:`
            : 'No book found'}
        </h2>
        <Card border='dark'>
          {searchedBook.image ? (
            <Card.Img src={searchedBook.image} alt={`The cover for ${searchedBook.title}`} variant='top' />
          ) : null}
          <Card.Body>
            <Card.Title>{searchedBook.title}</Card.Title>
            <p className='small'>Authors: {searchedBook.authors}</p>
            <Card.Text>Description {searchedBook.description}</Card.Text>
            <Card.Text>Pages {searchedBook.pages}</Card.Text>
            <Card.Text>Category {searchedBook.category}</Card.Text>
            <Card.Text>Date Published {searchedBook.datePublish}</Card.Text>
            <Card.Text>ISBN {searchedBook.bookISBN}</Card.Text>
            <Card.Text>{searchedBook.user_id}</Card.Text>
            {Auth.loggedIn() && (
              <Button
                className='btn-block btn-info'
                onClick={() => handleSaveBook()}>
                {/* ? 'Book Already Saved!'
                        : 'Save This Book!'} */}
              </Button>
            )}
          </Card.Body>
        </Card>
        {error && <div>Oops, something went wrong</div>}
      </Container>
    </>
  )
}

export default AddBook;
