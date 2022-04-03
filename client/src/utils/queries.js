import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email    
      savedBooks {
        _id: ID      
        bookId: String
        image: String
        link: String
        title: String
      }
    }
  }
`;