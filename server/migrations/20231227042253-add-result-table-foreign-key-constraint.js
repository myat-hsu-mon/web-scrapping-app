"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("results", "keywordId", {
      type: DataTypes.INTEGER,
      allowNull: false,
    });
    await queryInterface.addConstraint("results", {
      fields: ["keywordId"],
      type: "foreign key",
      name: "results_keywordId_fk",
      references: {
        table: "keywords",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("results", "results_keywordId_fk");
    await queryInterface.changeColumn("results", "keywordId", {
      type: DataTypes.INTEGER,
      allowNull: true,
    });
  },
};
