"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Keyword extends Model {
    static associate({ User, Result }) {
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
      this.hasOne(Result, { foreignKey: "keywordId", as: "result" });
    }
  }
  Keyword.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "keywords",
      modelName: "Keyword",
    }
  );
  return Keyword;
};
