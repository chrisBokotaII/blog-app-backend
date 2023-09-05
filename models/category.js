"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Posts }) {
      // define association here
      category.belongsTo(Posts, { foreignKey: "post_id" });
    }
  }
  category.init(
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
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "category is required" },
          notEmpty: { msg: "category is required" },
          min: { args: 2, msg: "category must be at least 3 characters" },
          max: { args: 50, msg: "category must be at most 50 characters" },
        },
      },
    },
    {
      sequelize,
      tableName: "categories",
      modelName: "Category",
    }
  );
  return category;
};
