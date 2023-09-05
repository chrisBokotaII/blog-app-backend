"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Posts, Users }) {
      // define association here
      this.belongsTo(Posts, { foreignKey: "post_id" });
      this.belongsTo(Users, { foreignKey: "user_id" });
    }
  }
  Comments.init(
    {
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
    },
    {
      sequelize,
      tableName: "comments",
      modelName: "Comments",
    }
  );
  return Comments;
};
