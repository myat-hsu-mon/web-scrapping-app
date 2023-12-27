"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "email", {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    });
    await queryInterface.addIndex("users", ["email"], {
      name: "users_email_idx",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("users", "users_email_idx");
    await queryInterface.changeColumn("users", {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    });
  },
};
