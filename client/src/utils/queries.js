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

export const QUERY_CONTACT = gql`
query contact($id: ID!) {
  contact(_id: $id) {
    _id
    name
    email
    phone
    address
  }
}`