'use strict';

module.exports = (sequelize, DataTypes) => {

const { Model } = sequelize.Sequelize;

class PlayerRoom extends Model {}
  PlayerRoom.init({
    RoomId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Rooms',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
      hooks: true
    },
    PlayerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Players',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
      hooks: true
    }
  }, {
    sequelize,
    modelname: 'PlayerRoom',
    defaultScope: {
      exclude: ['createdAt', 'updatedAt']
    }
  });

  PlayerRoom.associate = function(models) {
    PlayerRoom.belongsTo(models.Player);
    PlayerRoom.belongsTo(models.Room);
  };
  return PlayerRoom;
};