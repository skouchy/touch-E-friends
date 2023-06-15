const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { Error } = require('mongoose');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('contacts');
                console.log(userData);
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        getContacts: async (parent, args, context) => {
            if (context.user) {
                const contactsData = await User.findOne({ token: context.user.token })
                console.log(`contactsData: ${contactsData}`);
                return contactsData;
            }
            throw new Error('getContacts aint happening')
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            console.log(`ADD USER ARGS:`, {args});
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
        addContact: async (parent, { input }, context) => {
                console.log(`USER PLUSS:`, input);
                if (context.user) {
                    const userPlus = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $push: { input: input } },
                        { new: true }
                    )
                    return userPlus;
                }
                throw new AuthenticationError('You need to be logged in!');
            },
        editContact: async (parent, args, context) => {
            const contactIndex = contacts.findIndex((contact) => contact.id === id);
            if (contactIndex !== -1) {
                contacts[contactIndex] = { ...contacts[contactIndex], ...input };
                return contacts[contactIndex];
            }
            throw new Error('Contact not found');
        },
        removeContact: async (parent, { _id }, context) => {
                if (context.user) {
                    const userMinus = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { contacts: { _id } } },
                        { new: true }
                    )
                    console.log(`USER MINUS: ${userMinus}`);
                    return userMinus;
                }
                throw new AuthenticationError('You need to be logged in!');
            },

    }
};

module.exports = resolvers;