const { AuthenticationError } = require('apollo-server-express');
const { User, Book, Library } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        users: async () => User.find(),
        
        books: async () => Book.find(),

        libraries: async ()=> Library.find(),

        book: async (parent, args) => {
            return await Book.findById(args.id);
        },
        
        library: async (parent, args) => {
            return await Library.findById(args.id).populate({
                path: 'libaries.currentBooks',
                populate: 'book',
            });
        }
    },

    Mutation: {
          addUser: async (parent, { email, password }) => {
            const user = await User.create({ email, password });
            const token = signToken(user);
            return { token, user };
          },

          addBook: async (parent, { libraryId, title, authors, description, image, link }, context) => {
            if (context.user) {
              return Library.findOneAndUpdate(
                { _id: libraryId },
                {
                  $addToSet: {
                    currentBooks: { title, authors, description, image, link },
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
                      _id: bookId,
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