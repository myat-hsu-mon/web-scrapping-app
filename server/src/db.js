const { Sequelize } = require("sequelize");

const username = process.env.POSTGRES_USERNAME;
const password = process.env.POSTGRES_PASSWORD;

console.log({ username, password });
// const sequelize = new Sequelize(
//   `postgres://myat:postgres@localhost:5432/webscraping`
// );

const sequelize = new Sequelize({
  database: "webscraping",
  username: "myat",
  password: "postgres",
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
