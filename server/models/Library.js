
const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = require('./Book');

const librarySchema = new Schema(
    {
      location: {
        type: String,
        required: true,
      },
      // set savedBooks to be an array of data that adheres to the bookSchema
      currentBooks: [bookSchema],
    },
  );


const Library = mongoose.model('Library', librarySchema);

module.exports = Library;
