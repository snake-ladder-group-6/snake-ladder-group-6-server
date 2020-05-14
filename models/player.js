'use strict';
module.exports = (sequelize, DataTypes) => {
  let {Model} = sequelize.Sequelize
  class Player extends Model {}
  Player.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    win_record: DataTypes.INTEGER,
    total_play: DataTypes.INTEGER,
    rank: DataTypes.STRING,
    coordinate: DataTypes.INTEGER
  }, {sequelize}); 
  Player.associate = function(models) {
    Player.belongsToMany(models.Room, { through: 'UserRoom' })
  };
  return Player;
};