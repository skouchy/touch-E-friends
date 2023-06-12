import { gql } from '@apollo/client';

export const QUERY_ME = gql`
{
  me {
    _id
    username
    email
    contactCount
    contacts {
      _id
      name
      email
      phone
      address
    }
  }
}
`;

export const GET_CONTACTS = gql`
  query getContacts {
    contacts {
      id
      name
      address
      email
    }
  }
`;