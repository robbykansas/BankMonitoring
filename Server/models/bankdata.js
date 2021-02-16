'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BankData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BankData.hasOne(models.ProcessedData)
    }
  };
  BankData.init({
    periode: DataTypes.STRING,
    sandiBank: DataTypes.STRING,
    kreditKol1: DataTypes.FLOAT,
    kreditKol2: DataTypes.FLOAT,
    kreditKol3: DataTypes.FLOAT,
    kreditKol4: DataTypes.FLOAT,
    kreditKol5: DataTypes.FLOAT,
    laba: DataTypes.FLOAT,
    modal: DataTypes.FLOAT,
    totalAset: DataTypes.FLOAT,
    atmr: DataTypes.FLOAT,
    bebanOperasional: DataTypes.FLOAT,
    pendapatanOperasional: DataTypes.FLOAT,
    danaPihakKetiga: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'BankData',
  });
  BankData.beforeBulkCreate(_ => {
    BankData.destroy({where: {}})
  })
  return BankData;
};