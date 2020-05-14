'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlayerRoom = sequelize.define('PlayerRoom', {
    RoomId: DataTypes.INTEGER,
    PlayerId: DataTypes.INTEGER
  }, {});
  PlayerRoom.associate = function(models) {
    // associations can be defined here
  };
  return PlayerRoom;
};