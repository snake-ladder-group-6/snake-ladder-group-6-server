let { verifyToken } = require('../helpers/jwt')
let { Player } = require('../models/index')

function authentification (req, res, next) { 
  let token = req.headers.access_token
  try {
    let decode = verifyToken(token)
    let id = decode.id
    Player.findByPk(id)
      .then((data) => {
        if(data) {
          req.currentPlayerId = decode.id
          next()
        } else {
          throw {
            msg:'you need to login',
            code:401
          }
        }
      })
      .catch(err => {
        console.log(err);
        throw err
      })
  } catch (err) {
    next(err)
  }
}

module.exports = {authentification}