const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    userName: String
    email: String
    savedBooks: [Book]
  }

  type Book {
    _id: ID
    authors: [String]
    bookId: String
    image: String
    link: String
    title: String
  }

  type Query {
    User(username: String): User
  }
`;

module.exports = typeDefs;