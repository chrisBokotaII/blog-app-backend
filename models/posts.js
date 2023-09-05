"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users, Category, Comments, Likes }) {
      // define association here
      this.belongsTo(Users, { foreignKey: "user_id" });
      this.hasMany(Category, { foreignKey: "post_id" });
      this.hasMany(Comments, { foreignKey: "post_id" });
      this.hasMany(Likes, { foreignKey: "post_id" });
    }
  }
  posts.init(
    {
      post_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
    },
    {
      sequelize,
      tableName: "posts",
      modelName: "Posts",
    }
  );
  return posts;
};
