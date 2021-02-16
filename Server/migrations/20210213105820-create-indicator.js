'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Indicators', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Rk: {
        type: Sequelize.STRING
      },
      Pr: {
        type: Sequelize.STRING
      },
      Re: {
        type: Sequelize.STRING
      },
      Ef: {
        type: Sequelize.STRING
      },
      Lk: {
        type: Sequelize.STRING
      },
      Komposit: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Indicators');
  }
};