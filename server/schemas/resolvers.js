const { AuthenticationError } = require('apollo-server-express');
const { User, Library } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        users: async () => User.find(),

        library: async (parent, { libraryId }) => {
          return Library.findOne({ _id: libraryId });
        },
        
        libraries: async ()=> Library.find(),

    },

    Mutation: {
          addUser: async (parent, { email, password }) => {
            const user = await User.create({ email, password });
            const token = signToken(user);
            return { token, user };
          },

          addLibrary: async (parent, { location, currentBooks }) => {
            const library = await Library.create({ location, currentBooks });
            return { library };
          },

          addBook: async (parent, { bookId, libraryId, title, authors, description, image, link }, context) => {
            if (context.user) {
              return Library.findOneAndUpdate(
                { _id: libraryId },
                {
                  $addToSet: {
                    currentBooks: { bookId, title, authors, description, image, link },
                  },
                },
                {
                  new: true,
                  runValidators: true,
                }
              );
            }
            throw new AuthenticationError('You need to be logged in!');
          },

          login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
          },

          removeBook: async (parent, { libraryId, bookId }, context) => {
            if (context.user) {
              return Library.findOneAndUpdate(
                { _id: libraryId },
                {
                  $pull: {
                    currentBooks: {
                      bookId: bookId,
                    },
                  },
                },
                { new: true }
              );
            }
            throw new AuthenticationError('You need to be logged in!');
          }, 
    }
};

module.exports = resolvers;