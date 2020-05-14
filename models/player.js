'use strict';
let {bcryptPass} = require('../helpers/bycrypt')
module.exports = (sequelize, DataTypes) => {
  let {Model} = sequelize.Sequelize
  class Player extends Model {}
  Player.init({
    username: {
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
          msg: 'Username Already Used'
        }
    },

    password: {
      type : DataTypes.STRING,
      allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Please Input Your Data Correctly'
          },
          notEmpty: true,
          len: {
            args: [6],
            msg: 'Password is too Weak'
          }
        },
    },
    win_record: DataTypes.INTEGER,
    total_play: DataTypes.INTEGER,
    rank: DataTypes.STRING,
    coordinate: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate(user) {
        user.password = bcryptPass(user.password)
      }
    }
  }); 
  Player.associate = function(models) {
    Player.belongsToMany(models.Room, { through: 'UserRoom' })
  };
  return Player;
};