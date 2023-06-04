const Friend = require('../models/Friend');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql');

// Friend Type
const FriendType = new GraphQLObjectType({
  name: 'Friend',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
       friends: {
      type: new GraphQLList(FriendType),
      resolve(parent, args) {
        return Friend.find();
      },
    },
    Friend: {
      type: FriendType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Friend.findById(args.id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add a friend
    addFriend: {
      type: FriendType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const friend = new Friend({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return friend.save();
      },
    },
    // Delete a friend
    deleteFriend: {
      type: FriendType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Project.find({ friendId: args.id }).then((projects) => {
          projects.forEach((project) => {
            project.deleteOne();
          });
        });

        return Friend.findByIdAndRemove(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
