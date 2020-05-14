'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Players', [
      {
        username: 'sir fancis of the filt',
        password: 'password',
        win_record: 10,
        total_play: 10,
        rank: 'top global',
        coordinate: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'alpha centurio',
        password: 'password',
        win_record: 0,
        total_play: 10,
        rank: 'loser',
        coordinate: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Players', null, {});
  }
};
