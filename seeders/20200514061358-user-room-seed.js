'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserRooms', [
      {
        PlayerId: 1,
        RoomId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        PlayerId: 2,
        RoomId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserRooms', null, {});
  }
};
