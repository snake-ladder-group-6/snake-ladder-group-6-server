'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PlayerRooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      RoomId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Rooms',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        hooks: true
      },
      PlayerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Players',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        hooks: true
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
    return queryInterface.dropTable('PlayerRooms');
  }
};