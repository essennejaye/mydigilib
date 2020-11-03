import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { QUERY_BOOK } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Container, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';

const Styles = styled.div
  `
 .book-image {
   width: 500px;
   height: 500px;
 }
 .book-card {
   width: 500px;
   justify-content: 
 }
  div.result-container {
   width: fit-content;
 }

`;

const SingleBook = (props) => {
  const { _id } = useParams();

  const { loading, data } = useQuery(QUERY_BOOK, {
    variables: { _id }
  });

  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  const book = data?.book || {};

  const handleDeleteBook = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await removeBook({
        variables: { _id }
      });
      window.location.assign(`/books/${localStorage.getItem('user_id')}`)
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <Styles>
        <Container className='result-container'>
          <Link to={`/books/${localStorage.getItem('user_id')}`}><h2>Back to My List of Books</h2></Link>
          <Card border='dark' className='book-card'>
            {book.image ? (
              <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' className='book-image' />
            ) : null}
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>Authors: {book.authors}</Card.Text>
              <Card.Text>Description: {book.description}</Card.Text>
              <Card.Text>Category: {book.category}</Card.Text>
              <Card.Text>Pages: {book.pages}</Card.Text>
              <Card.Text>Date Published: {book.datePublish}</Card.Text>
              <Card.Text>ISBN: {book.bookISBN}</Card.Text>
            </Card.Body>
          </Card>
          <Button className='btn-block btn-danger' onClick={() => handleDeleteBook()}>
            Delete This Book
        </Button>
          {error && <span className="ml-2">Something went wrong...</span>}
        </Container>
      </Styles>
    </>
  )
}

export default SingleBook;
