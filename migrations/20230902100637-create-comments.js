"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("comments", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      post_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        validate: {
          notNull: { msg: "post_id is required" },
          notEmpty: { msg: "post_id is required" },
        },
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        validate: {
          notNull: { msg: "user_id is required" },
          notEmpty: { msg: "user_id is required" },
        },
      },
      comments: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "comment is required" },
          notEmpty: { msg: "comment is required" },
          min: { args: 2, msg: "comment must be at least 3 characters" },
          max: { args: 50, msg: "comment must be at most 50 characters" },
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
    await queryInterface.dropTable("comments");
  },
};
