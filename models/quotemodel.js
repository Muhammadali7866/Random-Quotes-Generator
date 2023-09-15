"use strict";
const { Model } = require("sequelize");
const userModel = require("./userModel");
module.exports = (sequelize, DataTypes) => {
  class Quote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Quote.belongsToMany(models.User, {
        through: "QuoteMap",
      });
    }
  }
  Quote.init(
    {
      quoteType: DataTypes.ENUM("motivational", "inspirational", "success"),
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Quote",
    }
  );
  return Quote;
};
