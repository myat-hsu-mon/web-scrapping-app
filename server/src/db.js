const { Sequelize } = require("sequelize");

const username = process.env.POSTGRES_USERNAME;
const password = process.env.POSTGRES_PASSWORD;

const sequelize = new Sequelize(
  `postgres://${username}:${password}@localhost:5432/webscraping`
);

module.exports = sequelize;
