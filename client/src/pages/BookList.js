import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_BOOKS } from '../utils/queries';
import { Container, Card, CardDeck } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Auth from '../utils/auth';
import styled from 'styled-components';
import ScrollTopArrow from '../components/ScrollTopArrow';

const Styles = styled.div`
 .book-image {
   height: 250px;
 }
 .book-card {
   min-width: 12rem;
   max-width: 12rem;
   margin: 10px auto;
 }
 h2 {
   text-align: center;
 }
 a {
   color: black;
   text-decoration: none;
 }
 @media  (max-width: 576px) {
   .book-image {
     min-width: 18rem;
     height: 18rem;
   }
   .book-card {
     min-width: 18rem;
   }
 }
 `;

const BookList = (props) => {
  const { user_id } = useParams();

  const { loading, data } = useQuery(QUERY_BOOKS, {
    variables: { user_id }
  });
  const books = data?.books || [];

  const token = Auth.loggedIn() ? Auth.getToken() : null;
  if (!token) {
    return false;
  }

  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <Styles>
        <Container>
        <ScrollTopArrow />
          <h2>
            {books.length ?
              `Your Library Catalog has ${books.length} ${books.length === 1 ? 'book' : 'books'}`
              : 'Let\'s Add Some Books To Your Catalog'}
          </h2>
          <CardDeck>
            {books.map((book) => {
              return (
                <Card key={book._id} border='dark' className='book-card'>
                  <Link to={`/book/${book._id}`}>
                    {book.image ? (
                      <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top'
                        className='book-image' />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <p className='small'>
                        {book.authors.length === 1 ?
                          'Author: ' : 'Authors: '}
                        {book.authors.join(', ')}
                      </p>
                    </Card.Body>
                  </Link>
                </Card>
              )
            })}
          </CardDeck>
        </Container>
      </Styles>
    </>
  )
}
export default BookList;