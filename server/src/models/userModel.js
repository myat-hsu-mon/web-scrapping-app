const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class User extends Model {}
User.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  { sequelize, modelName: "user" }
);

User.sync({ force: true });

module.exports = User;
