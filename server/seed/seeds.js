//for library model

const db = require('../config/connection');
const { Library } = require('../models');
const librarySeeds = require('./librarySeeds.json');

db.once('open', async () => {
  try {
    await Library.deleteMany({});
    await Library.create(librarySeeds);

    console.log('initial libraries seeded');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});