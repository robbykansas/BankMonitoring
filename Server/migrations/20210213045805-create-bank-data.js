'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BankData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      periode: {
        type: Sequelize.STRING
      },
      sandiBank: {
        type: Sequelize.STRING
      },
      kreditKol1: {
        type: Sequelize.FLOAT
      },
      kreditKol2: {
        type: Sequelize.FLOAT
      },
      kreditKol3: {
        type: Sequelize.FLOAT
      },
      kreditKol4: {
        type: Sequelize.FLOAT
      },
      kreditKol5: {
        type: Sequelize.FLOAT
      },
      laba: {
        type: Sequelize.FLOAT
      },
      modal: {
        type: Sequelize.FLOAT
      },
      totalAset: {
        type: Sequelize.FLOAT
      },
      atmr: {
        type: Sequelize.FLOAT
      },
      bebanOperasional: {
        type: Sequelize.FLOAT
      },
      pendapatanOperasional: {
        type: Sequelize.FLOAT
      },
      danaPihakKetiga: {
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
    await queryInterface.dropTable('BankData');
  }
};