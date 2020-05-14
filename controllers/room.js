let {Player, Room, UserRoom} = require('../models/index')
let {rng} = require('../helpers/roll')
let {check_cord} = require('../helpers/checkPos')

class RoomController {

  static allRoom (req, res, next) {
    UserRoom.findAll({
      include: [Player, Room],

    })
      .then((result) => {
        if(result) {
          if(result.length == 5) {
            Room.update({
              status: true,
              where: {  
                id: req.params.RoomId
              }
            })
          }
          // res.status(200).json({
          //   result
          // })
          // if(result) {
          // }
        }
      }).catch((err) => {
        console.log(err)
      });
  
  }

  static create (req, res, next) {
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

  static delete (req, res, next) {
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
  static roomInfo (req, res, next) {
    UserRoom.findAll({
      include: [Player, Room],
      where: {  
        RoomId: req.params.RoomId
      }
    })
      .then((result) => {
        if(result) {
          if(result.length == 5) {
            Room.update({
              status: true,
              where: {  
                id: req.params.RoomId
              }
            })
          }
          // res.status(200).json({
          //   result
          // })
          // if(result) {

          // }
        }
      }).catch((err) => {
        console.log(err)
      });
  }

  static advance (req, res, next) {
    
  }
}
module.exports = RoomController