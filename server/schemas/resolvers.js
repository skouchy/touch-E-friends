// TODO: update to associate ADDRESS BOOK

const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("please find another one")
    }
  },
  Mutation: {
    createUser: async (parent, args) => {
      console.log(args)
      try{

        const user = await User.create(args);
        const token = signToken(user)
        return { token, user };
      }
      catch(err){
        console.log(err)
      }
    },
    // saveBook: async (parent, { bookData }, context) => {
    //   if (context.user) {
    //     const savebookData = await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $push: { savedBooks: bookData } },
    //     { new: true }
    //     );
    //     return savebookData
    //   }
    //   throw new AuthenticationError("please find another one")
    // },
    // deleteBook: async (parent, { bookId }, context) => {
    //   if (context.user) {
    //     const deletebookData = await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { savedBooks: bookId } },
    //     { new: true }
    //     );
    //     return savebookData
    //   }
    //   throw new AuthenticationError("please find another one")
    // },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
