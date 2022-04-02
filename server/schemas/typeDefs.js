const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Auth {
    token: ID!
    user: User
  }
  
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
    me(username: String): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): User
    saveBook(authors: [String], description: String, title: String, bookId: String, image: String, link: String): User
    removeBook(bookId: String): User
  }
`;

module.exports = typeDefs;