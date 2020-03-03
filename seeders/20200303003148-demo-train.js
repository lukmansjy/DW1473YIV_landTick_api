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

    return queryInterface.bulkInsert('trains', [
      {
        nameTrain: 'Agro Wilis',
        typeTrainId: 1,
        dateStart: "2020-03-03",
        startStation : "Stasiun Manggarai",
        startTime: "07:00:00",
        destinationStation : "Stasiun Surabaya Pasarturi",
        arrivalTime: "19:00:00",
        price: 300000,
        qty: 250,
        createdAt: dateTime,
        updatedAt: dateTime
      },
      {
        nameTrain: 'Argo Bromo Anggrek',
        typeTrainId: 2,
        dateStart: "2020-03-03",
        startStation : "Stasiun Manggarai",
        startTime: "07:30:00",
        destinationStation : "Stasiun Surabaya Pasarturi",
        arrivalTime: "19:45:00",
        price: 300000,
        qty: 350,
        createdAt: dateTime,
        updatedAt: dateTime
      },
      {
        nameTrain: 'Argo Lawu',
        typeTrainId: 3,
        dateStart: "2020-03-04  ",
        startStation : "Stasiun Manggarai",
        startTime: "08:10:00",
        destinationStation : "Stasiun Surabaya Pasarturi",
        arrivalTime: "20:10:00",
        price: 300000,
        qty: 300,
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
