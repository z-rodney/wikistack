const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');
const { TEXT, ENUM } = require('sequelize');

const Page = db.define('pages', {
  title: TEXT,
  slug: TEXT,
  content: TEXT,
  status: ENUM('open', 'close')
});

const User = db.define('users', {
  name: TEXT,
  email: {
    type: TEXT,
    unique: true
  }
})

module.exports = {
  db,
  User,
  Page
}
