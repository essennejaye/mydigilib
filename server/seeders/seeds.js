const { Book, User }= require('../models');
const db = require('../config/connection');


db.once('once', async () => {
  await Book.deleteMany({});
  await User.deleteMany({});

  console.log('success!');
  process.exit(0);
});