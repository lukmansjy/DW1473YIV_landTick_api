'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    trainId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    status: DataTypes.STRING,
    attachment: DataTypes.STRING
  }, {});
  order.associate = function(models) {
    // associations can be defined here

    order.belongsTo(models.train, {
      as: 'train',
      foreignKey: 'trainId',
    })

    order.belongsTo(models.user, {
      as: 'user',
      foreignKey: 'userId',
    })

    // order.belongsTo(models.user, {
    //   as: 'user',
    //   foreignKey: 'userId',
    // })

  };
  return order;
};