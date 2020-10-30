import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { QUERY_BOOK } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Container, Card, Button } from 'react-bootstrap';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';

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
      <Container>
        <Link to={`/books/${localStorage.getItem('userId')}`}>Back to List My Books</Link>
        <Card border='dark'>
          {book.image ? (
            <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
          ) : null}
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <p className='small'>
              Authors: {book.authors} <br />
              Description: {book.description} <br />
              Category: {book.category} <br />
              Pages: {book.pages} <br />
              Date Published: {book.datePublish} <br />
              ISBN: {book.bookISBN}</p>
          </Card.Body>
        </Card>
        <Button className='btn-block btn-danger' onClick={() => handleDeleteBook()}>
          Delete This Book
        </Button>
        {error && <span className="ml-2">Something went wrong...</span>}
      </Container>
    </>
  )
}

export default SingleBook;
