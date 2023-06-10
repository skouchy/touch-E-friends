import { gql } from '@apollo/client';

export const QUERY_ME = gql`
{
  me {
    _id
    username
    email
    contacts {
      _id
      name
      email
      phone
      address
    }
    contactCount
  }
}
`;