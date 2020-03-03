'use strict';
module.exports = (sequelize, DataTypes) => {
  const train = sequelize.define('train', {
    nameTrain: DataTypes.STRING,
    typeTrainId: DataTypes.INTEGER,
    dateStart: DataTypes.STRING,
    startStation: DataTypes.STRING,
    startTime: DataTypes.STRING,
    destinationStation: DataTypes.STRING,
    arrivalTime: DataTypes.STRING,
    price: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {});
  train.associate = function(models) {
    // associations can be defined here

    train.belongsTo(models.typeTrain, {
      as: 'typeTrain',
      foreignKey: 'typeTrainId',
    })


  };
  return train;
};