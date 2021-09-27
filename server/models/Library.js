
const mongoose = require('mongoose');

const { Schema } = mongoose;

const librarySchema = new Schema(
    {
      location: {
        type: String,
        required: true,
      },
      currentBooks: [
        { 
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
        }
        
      ],
    },
  );


const Library = mongoose.model('Library', librarySchema);

module.exports = Library;
