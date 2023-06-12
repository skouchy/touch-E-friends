
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const ADD_CONTACT = gql`
  mutation addContact($input: ContactInput!) {
    addContact(input: $input) {
      _id
      name
      address
      email
      phone
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation updateContact($id: ID!, $input: ContactInput!) {
    updateContact(_id: $id, input: $input) {
      _id
      name
      address
      email
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation deleteContact($id: ID!) {
    deleteContact(_id: $id)
  }
`;
