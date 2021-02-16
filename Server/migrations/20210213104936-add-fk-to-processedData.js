'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ProcessedData', 'BankDatumId',{
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'BankData'
        }, 
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ProcessedData', 'BankDatumId')
  }
};
