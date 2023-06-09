// import the gql tagged template fnx
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        friendCount: Int
        friends: [Friend]
    }
    
    type Friend {
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

    input FriendInput {
        name: String
        phone: String
        email: String
        address: String
    }

    type Query { # just like a fetch{GET)
        me: User
        # users: [User]
        # user(username: String!): User
        # # friends is the query, String is the type
        # friends(name: String): [Friend] # creating custom dataType (each friend that returns will include ALL Friend fields
        # # & also instructs the query that we'll return an array
        # friend(_id: ID!): Friend  
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(email: String!, password: String!, username: String!): Auth
        addFriend(friendList: FriendInput): User
        removeFriend(_id: ID!): User
        # editFriend
    }
`;

//export the typeDefs
module.exports = typeDefs;
