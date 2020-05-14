'use strict';
module.exports = (sequelize, DataTypes) => {
  let {Model} = sequelize.Sequelize
  class Room extends Model {}
  Room.init({
    name: DataTypes.STRING,
    current_player: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    hooks: {
      beforeCreate(room) {
        room.current_player = 0
        room.status = false
      }
    }
  }); 
  Room.associate = function(models) {
    Room.belongsToMany(models.Player, { through: 'UserRoom' })
  };
  return Room;
};