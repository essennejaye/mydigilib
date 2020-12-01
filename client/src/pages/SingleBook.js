import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { QUERY_BOOK } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Container, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';

const Styles = styled.div`
 .book-image {
   width: 500px;
   height: 400px;
 }
 .book-card {
   width: 500px;
   justify-content: center
 }
  div.result-container {
   width: fit-content;
   margin: auto;
 }
 svg {
  width: .5em;
  padding: 0px 4px 0px 0px;
  margin: 0px 5px 0px 0px;
 }
 @media  (max-width: 576px) {
   .book-image {
     width: 350px;
     height: 350px;
   }
   .book-card {
     width: 350px;
   }
   div.result-container {
     width: 360px;
     padding: 0px;
   }
   .btn-block {
     width: 350px;
   }
 }
  `;

const StyledLink = styled(Link)`
  color: black;
      &:hover {
      color: orange;
      text-decoration: none;
    }
  font-weight: bold;
  font-size: 24px;
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
        <Container fluid className='result-container'>
          <StyledLink to={`/books/${localStorage.getItem('user_id')}`}>
            <h2>
              <FaChevronLeft />
              Back to My List of Books
            </h2>
          </StyledLink>
          <Card border='dark' className='book-card'>
            {book.image ? (
              <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' className='book-image' />
            ) : null}
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>
                {book.authors.length === 1 ?
                  'Author: ' : 'Authors: '}
                {book.authors.join(', ')}
              </Card.Text>
              <Card.Text>Description: {book.description}</Card.Text>
              <Card.Text>
                {book.category.length === 1 ?
                  'Category: ' : 'Categories: '}
                {book.category.join(', ')}
              </Card.Text>
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
