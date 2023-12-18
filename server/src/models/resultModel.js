const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Result extends Model {}
Result.init(
  {
    totalLinks: DataTypes.INTEGER,
    keywordId: DataTypes.INTEGER,
    totalAdWords: DataTypes.INTEGER,
    searchResults: DataTypes.STRING,
    htmlCode: DataTypes.TEXT,
  },
  { sequelize, modelName: "result" }
);

Result.sync({ force: true });

module.exports = Result;
