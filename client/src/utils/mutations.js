
import { gql } from '@apollo/client';

export const ADD_CONTACT = gql`
  mutation AddContact($input: ContactInput!) {
    addContact(input: $input) {
      id
      name
      address
      email
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($id: ID!, $input: ContactInput!) {
    updateContact(id: $id, input: $input) {
      id
      name
      address
      email
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: ID!) {
    deleteContact(id: $id)
  }
`;