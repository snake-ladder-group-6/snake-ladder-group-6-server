let {Player, Room, PlayerRoom} = require('../models/index')
let { compareHash } = require('../helpers/bycrypt')
let { generateToken } = require('../helpers/jwt')

class PlayerController {
  static register (req, res, next) { //need req body pass and username
    let data = {
      username: req.body.username,
      password: req.body.password,
    }
    Player.create(data)
    .then(data => {
      res.status(200).json({
        data
      })
    })
    .catch(err => {
      res.status(500).json({
        err
      })
    })
  }

  static login (req, res, next) { //need req body pass and username
      let username = req.body.username
      let password = req.body.password
      Player.findOne({
          where: {
              username
          }
      })
        .then((user) => {
          if (!user) {
            throw {
              msg : 'wrong username / password',
              code : 401
            }
          } else if (!compareHash(password, user.password)) {
            throw {
                msg : 'wrong username / password',
                code : 401
            }
          } else  {
            let access_token = generateToken ({
                id:user.id,
                username
            })
            
            res.status(200).json({
                access_token 
            })
          }
        })
      .catch(err => {
          next(err)
      })
    }

  static join (req, res, next) { //need params.RoomId AND Req Headers Access Token to get req.currentPlayerId
    Room.findOne({ where: {id: req.params.RoomId}})
    .then((result) => {
      if(result) {
        if(!result.status) {
          let newStats = result.current_player + 1
          Room.update(
            {
              current_player: newStats
            },
            {   
              where : {
                id: req.params.RoomId
              },
              returning: true,
              individualHooks: true
          })
            .then(() => {
              let data = {
                PlayerId:req.currentPlayerId, //currentPlayerId from AUTH
                RoomId:req.params.RoomId
              }
              UserRoom.create(data)
                .then((player) => {
                  res.status(200).json({
                    player
                  })
                })
            })
        }
      } else {
        throw {
          msg : 'Room Not Found',
          code : 404
        }
      }
    })
    .catch(err => {
      next(err)
    })
  }
}
module.exports = PlayerController