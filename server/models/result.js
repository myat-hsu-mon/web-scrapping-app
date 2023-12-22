"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    static associate({ Keyword }) {
      this.belongsTo(Keyword, { foreignKey: "keywordId" });
    }
  }
  Result.init(
    {
      keywordId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalLinks: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      totalAdWords: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      searchResults: {
        type: DataTypes.STRING,
      },
      htmlCode: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: "results",
      modelName: "Result",
    }
  );
  return Result;
};
