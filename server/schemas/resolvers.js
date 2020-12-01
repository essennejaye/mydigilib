const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // get all users
    users: async () => {
      return User.find()
        .select('-__v -password')
    },

    // get user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
    },

    // get all books for logged in user
    books: async (parent, { user_id }, context) => {
      if (context.user) {
        return Book.find({ user_id })
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // get single book for logged in user
    book: async (parent, { _id }, context) => {
      if (context.user) {
        return Book.findOne({ _id: _id })
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // check if user is entering duplicate book
    // duplicateBook: async (parent, { bookISBN }, context) => {
    //   if (context.user) {
    //     const duplicatebook = await Book.findOne({ bookISBN: bookISBN })
    //     return duplicatebook;
    //   }
    //   throw new AuthenticationError('Not logged in');
    // },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

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
    },

    addBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const book = await Book.create({ ...bookData });
        return book;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeBook: async (parent, { _id }, context) => {
      if (context.user) {
        const updatedBook = await Book.findOneAndDelete(
          { _id: { _id } },
        );
        return updatedBook;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // used mutation instead of query because LazyQuery returns void first time called
    searchDuplicateBook: async (parent, { bookISBN }, context) => {
      if (context.user) {
        const searchDuplicatebook = await Book.findOne({ bookISBN: bookISBN })
        return searchDuplicatebook;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  }
};

module.exports = resolvers;
