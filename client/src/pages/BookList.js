import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_BOOKS } from '../utils/queries';
import { Container, CardColumns, Card } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Auth from '../utils/auth';

const BookList = (props) => {
  const { user_id } = useParams();

  const { loading, data } = useQuery(QUERY_BOOKS, {
    variables: { user_id }
  });

  const books = data?.books || [];
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) { 
    alert('You must be logged in to get your book list!');
    return false;
  }

  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <Container>
        <h2>
          {books.length ?
            `Your Library Catalog has ${books.length} ${books.length === 1 ? 'book' : 'books'}`
            : 'Please Add Some Books To Your Catalog'}
        </h2>
        <CardColumns>
          {books.map((book) => {
            return (
              <Card key={book._id} border='dark'>
                <Link to={`/book/${book._id}`}>
                  {book.image ? (
                    <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                  </Card.Body>
                </Link>
              </Card>

            )
          })}
        </CardColumns>
      </Container>
    </>
  )
}
export default BookList;