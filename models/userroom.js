'use strict';
module.exports = (sequelize, DataTypes) => {
  let {Model} = sequelize.Sequelize
  class UserRoom extends Model {}
  UserRoom.init({
    PlayerId: DataTypes.INTEGER,
    RoomId: DataTypes.INTEGER
  }, {sequelize});
  UserRoom.associate = function(models) {
    UserRoom.belongsTo(models.Player)
    UserRoom.belongsTo(models.Room)
  };
  return UserRoom;
};