let {Player, Room, PlayerRoom} = require('../models/index')
let {rng} = require('../helpers/roll')
let {check_cord} = require('../helpers/checkPos')

class RoomController {

  static allRoom (req, res, next) {
    Room.findAll()
      .then((result) => {
        res.status(200).json({
          result
        })
      }).catch((err) => {
        res.status(500).json({
          err
        })
      });
  }

  static create (req, res, next) {  // need req.body.name
    let data = {
      name: req.body.name
    }
    Room.create(data)
      .then((result) => {
        res.status(200).json({
          result
        })
      }).catch((err) => {
        res.status(500).json({
          err
        })
      });
  }

  static delete (req, res, next) { // need params RoomId
    Room.destroy({
      where: {
        id: req.params.RoomId
      }
    })
      .then((result) => {
        res.status(200).json({
          result
        })
      }).catch((err) => {
        res.status(500).json({
          err
        })
      });
  }
  static roomInfo (req, res, next) { // need params RoomId
    PlayerRoom.findAll({
      include: [Player, Room],
      where: {  
        RoomId: req.params.RoomId
      }
    })
      .then((result) => {
        res.status(200).json({
          result
        })
      }).catch((err) => {
        res.status(500).json({
          err
        })
      });
  }

  static advance (req, res, next) {
    
  }
}
module.exports = RoomController