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

export const QUERY_CONTACTS = gql`
query contacts($id: ID!) {
  contacts(id: $id) {
    _id
    name
    email
    phone
    address
  }
}`