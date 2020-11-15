import gql from 'graphql-tag';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_BOOKS = gql`
query books($user_id: String!)  {
  books(user_id: $user_id){
    _id
    title
    authors
    image
  }
}
`;

export const QUERY_BOOK = gql`
query book($_id: ID!) {
  book(_id: $_id){
    title
    authors
    description
    datePublish
    image
    pages
    category
    bookISBN
  }
}
`;
// query to check database for duplicate before adding to database
// export const DUPLICATEBOOK = gql`
//   query duplicateBook($bookISBN: String!) {
//     duplicateBook(bookISBN: $bookISBN) {
//       bookISBN
//     }
//   }
// `;

// add future queries on categories and sort by title