const { Schema } = require('mongoose');

const bookSchema = new Schema({

    // saved book id from GoogleBooks
    bookId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
      },
    authors: [
      {
        type: String,
      },
    ],
    description: {
        type: String,
        required: true,
    },

    image: {
    type: String,
    },
    
    link: {
    type: String,
    },
    // savedBooks: [bookSchema],
});

// const Book = model('Book', bookSchema);
module.exports = bookSchema;
