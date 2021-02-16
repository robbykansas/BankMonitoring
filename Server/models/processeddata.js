'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProcessedData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProcessedData.belongsTo(models.BankData)
      ProcessedData.hasOne(models.Indicator)
    }
  };
  ProcessedData.init({
    NPL: DataTypes.FLOAT,
    ROE: DataTypes.FLOAT,
    ROA: DataTypes.FLOAT,
    CAR: DataTypes.FLOAT,
    BOPO: DataTypes.FLOAT,
    LDR: DataTypes.FLOAT,
    BankDatumId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProcessedData',
  });
  ProcessedData.beforeBulkCreate(_ => {
    ProcessedData.destroy({where: {}})
  })
  return ProcessedData;
};