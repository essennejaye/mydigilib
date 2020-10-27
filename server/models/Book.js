const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    bookISBN: {
      type: String
    },
    category: [
      {
        type: String
      }
    ],
    description: {
      type: String,
      required: true
    },
    authors: [
      {
        type: String,
      }
    ],
    image: {
      type: String
    },
    pages: {
      type: Number
    },
    datePublish: {
      type: Date
    },
  },
);

const Book = model('Book', bookSchema);

module.exports = Book;

