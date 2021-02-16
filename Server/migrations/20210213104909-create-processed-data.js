'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProcessedData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      NPL: {
        type: Sequelize.FLOAT
      },
      ROE: {
        type: Sequelize.FLOAT
      },
      ROA: {
        type: Sequelize.FLOAT
      },
      CAR: {
        type: Sequelize.FLOAT
      },
      BOPO: {
        type: Sequelize.FLOAT
      },
      LDR: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('ProcessedData');
  }
};