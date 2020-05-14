'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize;

  class Player extends Model {}
  Player.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'username already registered'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'username can\'t be left empty'
        },
        is: {
          args: /^\S+\S$/gi,
          msg: 'password can\'t contain any whitespace character'
        },
        len: {
          args: [8],
          msg: 'password length must be at least 8 character long'
        }
      }
    },
    win_record: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'invalid input, win_record must be an integer value'
        },
        min: {
          args: [0],
          msg: 'win_record value can\'t accept negative integer'
        }
      }
    },
    total_play: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'invalid input, total_play must be an integer value'
        },
        min: {
          args: [0],
          msg: 'total_play value can\'t accept negative integer'
        }
      }
    },
    coordinate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Player',
    defaultScope: {
      exclude: ['createdAt', 'updatedAt']
    }
  });
  Player.associate = function(models) {
    Player.belongsToMany(models.Room({ through: models.PlayerRoom }))
  };
  return Player;
};