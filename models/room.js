'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize;

  class Room extends Model {}

  Room.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Room name already in use'
      },
      validate: {
        notEmpty: {
          msg: 'Room name can\'t be empty'
        }
      }
    },
    current_player: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Room',
    defaultScope: {
      exclude: ['createdAt', 'updatedAt']
    }
  });
  Room.associate = function(models) {
    Room.belongsToMany(models.Player({ through: models.PlayerRoom }))
  };
  return Room;
};