const { User, Friend } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({})
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

module.exports = resolvers;