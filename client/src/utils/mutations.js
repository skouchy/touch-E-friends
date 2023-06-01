// TODO: Update for Address Book
// ? Where all the put, post, deletes live


import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        email
        savedBooks {
          image
          authors
          link
          title
          bookId
          description
        }
      }
    }
  }
  `

export const LOGIN = gql` 
 mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        savedBooks {
          image
          bookId
          authors
          description
          link
          title
        }
        username
      }
    }
  }
  `

 export  const SAVE_BOOK = gql `
 mutation saveBook($bookData: BookInput) {
    saveBook(bookData: $bookData) {
      _id
      email
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
      username
    }
    `

    export  const DELETE_BOOK = gql `
    mutation deleteBook($bookId: ID!) {
       saveBook(bookId: $bookId) {
         _id
         email
         savedBooks {
           authors
           bookId
           description
           image
           link
           title
         }
         username
       }
       `