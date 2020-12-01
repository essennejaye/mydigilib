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
      default: '',
      required: true
    },
    authors: [
      {
        type: String,
      }
    ],
    image: {
      data: Buffer,
      type: String
    },
    pages: {
      type: Number
    },
    datePublish: {
      type: String
    },
  },
);

const Book = model('Book', bookSchema);

module.exports = Book;
