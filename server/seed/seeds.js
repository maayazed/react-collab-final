//for library model

const db = require('./connection');
const {
  Library,
  Book
} = require('../models');
const bookSchema = require('../models/Book');

db.once('open', async () => {
  await Library.deleteMany();

  const library = await Library.insertMany([{
      location: '2017 Buford St.',
      currentBooks: [bookSchema],
    },
    {
      location: '1920 Fitch Ave.',
      currentBooks: [bookSchema],
    },
  ]);

  console.log('libraries seeded');

  await Book.deleteMany();

  const books = await Book.insertMany([{
    title: 'Title here',
    authors: 'Author(s)',
    description: 'Description',
    image: 'image',
    link: 'link',
  }]);

  console.log('initial books seeded');

  process.exit();
});