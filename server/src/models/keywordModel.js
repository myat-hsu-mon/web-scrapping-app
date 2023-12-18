const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Keyword extends Model {}
Keyword.init(
  {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  { sequelize, modelName: "keyword" }
);

module.exports = Keyword;
