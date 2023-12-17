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

// (async () => {
//   await sequelize.sync();
//   await Keyword.create({
//     name: "how to be creative",
//     userId: 1,
//   });
// })();

module.exports = Keyword;
