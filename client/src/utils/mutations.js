import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const DUPLICATEBOOK = gql`
  mutation duplicateBook($bookISBN: String!) {
    duplicateBook(bookISBN: $bookISBN) {
      bookISBN
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($bookData: BookInput!) {
    addBook(bookData: $bookData) {
    user_id
    title
    bookISBN
    category
    authors
    image
    description
    pages
    datePublish
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($_id: ID!) {
    removeBook(_id: $_id) {
     title
    }
  }
`;

