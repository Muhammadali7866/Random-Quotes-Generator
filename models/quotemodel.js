"use strict";
const { Model } = require("sequelize");
const userModel = require("./userModel");
module.exports = (sequelize, DataTypes) => {
  class quoteModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      quoteModel.belongsToMany(models.userModel, {
        through: models.quotesMap,
      });
    }
  }
  quoteModel.init(
    {
      quoteType: DataTypes.ENUM("motivational", "inspirational", "success"),
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "quoteModel",
    }
  );
  return quoteModel;
};
