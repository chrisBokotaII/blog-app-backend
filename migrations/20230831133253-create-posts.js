"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("posts", {
      post_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "user_id is required" },
          notEmpty: { msg: "user_id is required" },
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "title is required" },
          notEmpty: { msg: "title is required" },
          min: { args: 3, msg: "title must be at least 3 characters" },
          max: { args: 50, msg: "title must be at most 50 characters" },
        },
      },

      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "content is required" },
          notEmpty: { msg: "content is required" },
          min: { args: 30, msg: "content must be at least 3 characters" },
          max: { args: 500, msg: "content must be at most 50 characters" },
        },
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
    await queryInterface.dropTable("posts");
  },
};
