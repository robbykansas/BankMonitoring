'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Indicators', 'ProcessedDatumId',{
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'ProcessedData'
        }, 
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Indicators', 'ProcessedDatumId')
  }
};
