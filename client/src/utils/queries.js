import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me($username: String) {
    me(username: $username) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;