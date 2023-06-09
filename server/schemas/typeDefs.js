const { gql } = require('apollo-server');

const typeDefs = gql`
  type Contact {
    id: ID!
    name: String!
    address: String!
    email: String!
  }

  type Query {
    contacts: [Contact!]!
  }

  type Mutation {
    addContact(input: ContactInput!): Contact!
    updateContact(id: ID!, input: ContactInput!): Contact!
    deleteContact(id: ID!): Boolean!
  }

  input ContactInput {
    name: String
    address: String
    email: String
  }
`;

module.exports = typeDefs;
