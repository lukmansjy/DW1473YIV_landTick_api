'use strict';

const date = new Date();
const dateTime = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('orders', [
      {
        trainId: 1,
        userId: 1,
        qty: 2,
        totalPrice: 600000,
        status: "Pending",
        attachment: "https://upload.wikimedia.org/wikipedia/commons/0/0b/ReceiptSwiss.jpg",
        createdAt: dateTime,
        updatedAt: dateTime
      },
      {
        trainId: 2,
        userId: 2,
        qty: 1,
        totalPrice: 300000,
        status: "Pending",
        attachment: "https://upload.wikimedia.org/wikipedia/commons/0/0b/ReceiptSwiss.jpg",
        createdAt: dateTime,
        updatedAt: dateTime
      },
      {
        trainId: 3,
        userId: 3,
        qty: 1,
        totalPrice: 300000,
        status: "Pending",
        attachment: "https://upload.wikimedia.org/wikipedia/commons/0/0b/ReceiptSwiss.jpg",
        createdAt: dateTime,
        updatedAt: dateTime
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
