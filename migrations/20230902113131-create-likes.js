"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("likes", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        unique: true,
      },
      post_id: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      reaction: {
        type: DataTypes.STRING,
        allowNull: false,
        enum: ["like", "dislike", "haha", "wow", "sad", "angry"],
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
    await queryInterface.dropTable("likes");
  },
};
