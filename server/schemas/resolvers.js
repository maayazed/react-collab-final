const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('You are not signed in');
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },

    users: async () => {
      return User.find();
    },
  },

  Mutation: {
    addUser: async (parent, { userLibrary, email, password }) => {
      const user = await User.create({ userLibrary, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user }
    },
  }
};

module.exports = resolvers;