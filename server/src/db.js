const { Sequelize } = require("sequelize");

const username = process.env.POSTGRES_USERNAME;
const password = process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DB;

const sequelize = new Sequelize({
  database,
  username,
  password,
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
