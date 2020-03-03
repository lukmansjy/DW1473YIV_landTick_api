'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('trains', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameTrain: {
        type: Sequelize.STRING
      },
      typeTrainId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'typeTrains',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      dateStart: {
        type: Sequelize.STRING
      },
      startStation: {
        type: Sequelize.STRING
      },
      startTime: {
        type: Sequelize.STRING
      },
      destinationStation: {
        type: Sequelize.STRING
      },
      arrivalTime: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      qty: {
        type: Sequelize.INTEGER
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('trains');
  }
};