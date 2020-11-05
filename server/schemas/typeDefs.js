const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  username: String!
  email: String!
  password: String!
}

type Book {
  _id: ID!
  user_id: String!
  title: String!
  bookISBN: String
  category: [String]
  description: String  
  authors: [String]
  image: String
  pages: Int
  datePublish: String
}

type Auth {
    token: ID!
    user: User
  }

input BookInput {
  user_id: String
  title: String
  bookISBN: String
  category: [String]
  description: String  
  authors: [String]
  image: String
  pages: Int
  datePublish: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    books(user_id: String!): [Book]
    book(_id: ID!): Book
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addBook(bookData: BookInput!): Book
    duplicateBook(bookISBN: String!): Book
    removeBook(_id: ID!): Book
  }
`;
module.exports = typeDefs;