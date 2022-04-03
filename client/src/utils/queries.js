import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query me($username: String!) {
    me(username: $username) {
      _id
      username
      email     
      savedBooks {
        bookId
        authors
        title
        image
      }    
    }
  }
`;