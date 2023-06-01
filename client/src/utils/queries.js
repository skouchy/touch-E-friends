// TODO: Update for Address Book
// ? Where all the GETs live
import { gql } from '@apollo/client';

export const QUERY = gql` {
    me {
      _id
      email
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
      }
    }
  }
  `