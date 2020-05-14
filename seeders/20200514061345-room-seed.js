'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rooms', [
      {
        name: 'roomA',
        current_player: 0,
        status: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'roomB',
        current_player: 0,
        status: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rooms', null, {});
  }
};
