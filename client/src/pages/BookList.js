import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_BOOKS } from '../utils/queries';
import {  Container, CardColumns, Card } from 'react-bootstrap';

// import Auth from '../utils/auth';

const BookList = () => {
  const { loading, data } = useQuery(QUERY_BOOKS);

  const bookData = data?.books || [];
  // const loggedIn = Auth.login();

  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <Container>
        <h2>
          {bookData.length ?
            `Your Library Catalogue` : 'Please Add Some Books To Your Catalog'}
        </h2>
        <CardColumns>
          {bookData.map((book) => {
            return (
              <Card key={book._id} border='dark'>
                {book.image ? (
                  <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                </Card.Body>
              </Card>

            )
          })}
        </CardColumns>
      </Container>
    </>
  )
}
export default BookList;