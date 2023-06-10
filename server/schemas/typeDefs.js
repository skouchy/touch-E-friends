// import the gql tagged template fnx
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        contactCount: Int
        contacts: [Contact]
    }
    
    type Contact {
        _id: ID!
        name: String!
        phone: String
        email: String
        address: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input ContactInput {
        name: String
        phone: String
        email: String
        address: String
    }

    type Query { # just like a fetch{GET)
        me: User
        # users: [User]
        # user(username: String!): User
        # # contacts is the query, String is the type
        # contacts(name: String): [Contact] # creating custom dataType (each contact that returns will include ALL Contact fields
        # # & also instructs the query that we'll return an array
        # contact(_id: ID!): Contact  
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(email: String!, password: String!, username: String!): Auth
        addContact(contactList: ContactInput): User
        removeContact(_id: ID!): User
        # editContact
    }
`;

//export the typeDefs
module.exports = typeDefs;
