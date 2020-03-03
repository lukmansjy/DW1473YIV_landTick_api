'use strict';
module.exports = (sequelize, DataTypes) => {
  const typeTrain = sequelize.define('typeTrain', {
    name: DataTypes.STRING
  }, {});
  typeTrain.associate = function(models) {
    // associations can be defined here
  };
  return typeTrain;
};