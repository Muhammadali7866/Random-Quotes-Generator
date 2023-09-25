"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "please tell your name",
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            mesg: "please provide a valid email ",
          },
          notEmpty: {
            args: true,
            mesg: "please enter your email",
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8],
            mesg: "Password must be 8 charachter long",
          },
        },
      },
      // confirmPassword: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      //   validate: {
      //     notEmpty: {
      //       args: true,
      //       msg: "please confirm your password",
      //     },
      //   },
      // },

      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
