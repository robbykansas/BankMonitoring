'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Indicator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Indicator.belongsTo(models.ProcessedData)
    }
  };
  Indicator.init({
    Rk: DataTypes.STRING,
    Pr: DataTypes.STRING,
    Re: DataTypes.STRING,
    Ef: DataTypes.STRING,
    Lk: DataTypes.STRING,
    Komposit: DataTypes.STRING,
    ProcessedDatumId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Indicator',
  });
  // Indicator.beforeBulkCreate(_ => {
  //   Indicator.destroy({where: {}})
  // })
  return Indicator;
};