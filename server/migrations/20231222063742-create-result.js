"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("results", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      keywordId: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("results");
  },
};
