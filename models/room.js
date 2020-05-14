'use strict';
module.exports = (sequelize, DataTypes) => {
  let {Model} = sequelize.Sequelize
  class Room extends Model {}
  Room.init({
    name: {
      type : DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Please Input Your Data Correctly'
          },
        },
        unique: {
          args: true,
          msg: 'Try Another Name'
        }
    },
    current_player: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    hooks: {
      beforeCreate(room) {
        room.current_player = 0
        room.status = false
      },
      beforeUpdate(room) {
        if(room.current_player >= 5) {
          room.status = true
        }
      }
    },
  }); 
  Room.associate = function(models) {
    Room.belongsToMany(models.Player, { through: 'UserRoom' })
  };
  return Room;
};