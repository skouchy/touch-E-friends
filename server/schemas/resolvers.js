const { User, Friend } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

// const contacts = [
//   { id: '1', name: 'John Doe', address: '123 Main St', email: 'johndoe@example.com' },
//   { id: '2', name: 'Jane Smith', address: '456 Elm St', email: 'janesmith@example.com' },
// ];
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('friends');

                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        friends: async (parent, { username }) => {
            const params = username ? { username } : {}; // if username exists, set params to object w/ username key set to that value.. if it does NOT, return empty object
            return Friend.find(params).sort({ createdAt: -1 }); // returns { 'data': {'helloWorld': 'Hello WORRRLLDD'}} in Apollo sandbox
        },
        friend: async (parent, { _id }) => {
            return Friend.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends');
        },
        // get user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addFriend: async (parent, args, context) => {
            if (context.user) {
                const friend = await Friend.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { friends: friend._id } },
                    { new: true } //  returns updated doc
                );

                return friend;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        // editFriend: async (parent, args, context) => {

        // },
        // removeFriend: async (parent, args, context) => {

        // },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        }
    }
  };

// const resolvers = {
//   Query: {
//     contacts: () => contacts,
//   },
//   Mutation: {
//     addContact: (_, { input }) => {
//       const newContact = { id: String(contacts.length + 1), ...input };
//       contacts.push(newContact);
//       return newContact;
//     },
//     updateContact: (_, { id, input }) => {
//       const contactIndex = contacts.findIndex((contact) => contact.id === id);
//       if (contactIndex !== -1) {
//         contacts[contactIndex] = { ...contacts[contactIndex], ...input };
//         return contacts[contactIndex];
//       }
//       throw new Error('Contact not found');
//     },
//     deleteContact: (_, { id }) => {
//       const contactIndex = contacts.findIndex((contact) => contact.id === id);
//       if (contactIndex !== -1) {
//         contacts.splice(contactIndex, 1);
//         return true;
//       }
//       throw new Error('Contact not found');
//     },
//   },
// };

module.exports = resolvers;