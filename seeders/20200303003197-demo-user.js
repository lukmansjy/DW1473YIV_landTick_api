'use strict';

const bcrypt = require('bcrypt')

const hashPassword = bcrypt.hashSync('demo', 10);
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

    return queryInterface.bulkInsert('users', [
      {
        name:'Lukman Sanjaya',
        username: 'lukman',
        email:'lukman.rocks@live.com',
        password : hashPassword,
        gender: 'Male',
        phone: '082226455525',
        address: 'Kab. Wonogiri, Jawa Tengah',
        status: '0',
        admin: 1,
        createdAt: dateTime,
        updatedAt: dateTime
      },
      {
        name:'Admin',
        username: 'admin',
        email:'admin@admin.com',
        password : hashPassword,
        gender: 'Male',
        phone: '082226455525',
        address: 'Kab. Wonogiri, Jawa Tengah',
        status: "0",
        admin: 1,
        createdAt: dateTime,
        updatedAt: dateTime
      },
      {
        name:'Demo User',
        username: 'demo',
        email:'demo@demo.com',
        password : hashPassword,
        gender: 'Male',
        phone: '082226455525',
        address: 'Kab. Wonogiri, Jawa Tengah',
        status: "0",
        admin: 0,
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
