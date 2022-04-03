const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Auth {
    token: ID!
    user: User
  }
  
type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
    password: String
  }

  type Book {
    bookId: String
    authors: [String]
    title: String
    image: String
  }

  type Query {
    me(username: String): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookId: String, authors: [String], title: String, image: String): User
    removeBook(bookId: String): User
  }
`;

module.exports = typeDefs;