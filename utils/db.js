const Sequelize = require("sequelize");
const config = require("./../config/config.json")["development"];

// intialize the sequelize with the configration from the file
const sequelize = new Sequelize(config);

// now test the database
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection is estabalished succesfully ");
  })
  .catch((err) => {
    console.error("Unable to connect to the database", err);
  });

module.exports = sequelize;
