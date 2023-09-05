"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
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
  Likes.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      post_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      reaction: {
        type: DataTypes.STRING,
        allowNull: false,
        enum: ["like", "dislike", "haha", "wow", "sad", "angry"],
      },
    },
    {
      sequelize,
      tableName: "likes",
      modelName: "Likes",
    }
  );
  return Likes;
};
