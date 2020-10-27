const faker = require('faker');

const db = require('../config/connection');
const { User, Book } = require('../models');

db.once('open', async () => {
  await User.deleteMany({});
  await Book.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 20; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }
  const createdUsers = await User.collection.insertMany(userData);

  // create books 
  for (let i = 0; i < 60; i++) {

    const title = faker.lorem.sentence(2)
    const authors = faker.name.findName();
    const category = faker.lorem.word();
    const description = faker.lorem.paragraph(3);
    const image = faker.image.image();
    const bookISBN = Math.floor(100000000 + Math.random() * 9000000000);
    const pages = Math.floor(100 + Math.random() * 900);
    const datePublish = faker.date.past();

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: user_id } = createdUsers.ops[randomUserIndex];
    
    const createdBook = await Book.create({
      user_id, title, bookISBN, category, description, authors, image, pages, datePublish
    });
  }
  console.log('success');
  process.exit(0);
});