const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = require("./userModel");

class Keyword extends Model {}
Keyword.init(
  {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  { sequelize, modelName: "keyword" }
);

Keyword.sync({ force: true });
Keyword.belongsTo(User);

module.exports = Keyword;
