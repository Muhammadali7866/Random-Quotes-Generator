"use strict";
const { Model } = require("sequelize");
const quotesmap = require("./quotesmap");
module.exports = (sequelize, DataTypes) => {
  class userModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userModel.belongsToMany(models.quoteModel, { through: models.quotesMap });
    }
  }
  userModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "please tell your name",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: "please provide a valid email ",
          },
          notEmpty: {
            args: true,
            mesg: "please enter your email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8],
            msg: "Password must be 8 charachter long",
          },
        },
      },
      confirmPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "please confirm your password",
          },
        },
      },
      quotesType: {
        type: DataTypes.ENUM("motivational", "inspirational", "success"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "userModel",
    }
  );
  return userModel;
};
