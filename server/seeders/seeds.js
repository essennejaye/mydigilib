const db = require('../config/connection');
const { Book, User } = require('../models');


db.once('open', async () => {
  await Book.deleteMany({});
  await User.deleteMany({});

  console.log('success!');
  process.exit(0);
});