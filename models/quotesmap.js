"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class quotesMap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  quotesMap.init(
    {
      type: DataTypes.STRING, // Corrected data type
      user: DataTypes.INTEGER, // Corrected data type
    },
    {
      sequelize,
      modelName: "quotesMap",
    }
  );
  return quotesMap;
};
