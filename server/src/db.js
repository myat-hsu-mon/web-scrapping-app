const { Sequelize } = require("sequelize");
require("dotenv").config();

const username = process.env.POSTGRES_USERNAME;
const password = process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DB;
const host = process.env.DATABASE_HOST;
const dialect = process.env.DATABASE_TYPE;

const sequelize = new Sequelize({
  database,
  username,
  password,
  host,
  dialect,
});

module.exports = sequelize;
