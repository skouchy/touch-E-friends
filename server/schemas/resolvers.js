const { User } = require('../models');
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
                console.log(userData);
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            console.log(`ADD USER ARGS: ${args}`);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            console.log(`USER LOGIN: ${token}  ${user}`);
            return { token, user };
        },
        addFriend: async (parent, { friendList }, context) => {
            console.log(`USER PLUSS:`, friendList);
            if (context.user) {
                // const newFriend = await Friend.create(friendList);
                const userPlus = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { friends: friendList } },
                    { new: true }
                )
                return userPlus;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeFriend: async (parent, { _id }, context) => {
            if (context.user) {
                const userMinus = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { friends: { _id } } },
                    { new: true }
                )
                console.log(`USER MINUS: ${userMinus}`);
                return userMinus;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // updateFriend: async (parent, { friendData }, context) => {
        //     if (context.user) {
        //         const userEdit = await User. findOneAndUpdate(
        //             { _id: context.user._id },

        //         )
        //     }
        // }
        // editFriend: async (parent, args, context) => {
        // const contactIndex = contacts.findIndex((contact) => contact.id === id);
        //       if (contactIndex !== -1) {
        //         contacts[contactIndex] = { ...contacts[contactIndex], ...input };
        //         return contacts[contactIndex];
        //       }
        //       throw new Error('Contact not found');
        // },

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

//   },
// };
// removeFriend: async (parent, args, context) => {
// const contactIndex = contacts.findIndex((contact) => contact.id === id);
//       if (contactIndex !== -1) {
//         contacts.splice(contactIndex, 1);
//         return true;
//       }
//       throw new Error('Contact not found');
//     },

module.exports = resolvers;