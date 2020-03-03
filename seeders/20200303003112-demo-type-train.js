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
    return queryInterface.bulkInsert('typetrains', [
      {
        name: 'Sleeper',
        createdAt: dateTime,
        updatedAt: dateTime
      },
      {
        name: 'Priority',
        createdAt: dateTime,
        updatedAt: dateTime
      },
      {
        name: 'Executive',
        createdAt: dateTime,
        updatedAt: dateTime
      },
      {
        name: 'Business',
        createdAt: dateTime,
        updatedAt: dateTime
      },
      {
        name: 'Economiy',
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
