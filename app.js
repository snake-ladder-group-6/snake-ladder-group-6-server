const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const server = require('http').createServer(app);
const router = require('./routers/index');
const io = require('socket.io')(server);
const { check_cord } = require('./helpers/checkPos');
const { generateToken, verifyToken } = require('./helpers/jwt');
const { compareHash } = require('./helpers/bcrypt');
const { Player, Room, PlayerRoom } = require('./models');
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)

let users = [];

io.on('connection', (socket) => {

  socket.on('disconnect', () => {
    console.log('a player just leave the game');
  })

  socket.on('register', payload => {
    console.log('register');
    const { username, password } = payload;

    Player
      .create({
        username,
        password
      })
      .then(player => {
        console.log('a new player just sign up');
      })
      .catch(err => {
        console.log(err);
      })
  })
 
  socket.on('login', payload => {
    const { username, password } = payload;
    if(users.length >= 4) {
      socket.emit('token', null)
    } else {
      Player
        .findOne({
          where: {
            username
          }
        })
        .then(player => {
          if (player) {
            let compare = compareHash(password, player.password);
            if(compare) {
              let access_token = generateToken({
                id: player.id,
                username: player.username
              })
              let payload = {
                access_token,
                username
              }
              users.push(username)
              io.emit('token', users); 
            } else {
              console.log('invalid email/password');
            }
          } else {
            console.log('invalid email/password');
          }
        })
        .catch(err => {
          console.log(err);
        })
    }

  })

  socket.on('add-room', payload => {
    const token = payload.token;
    let decode = verifyToken(token);
    const { id } = decode;
    let RoomId;
    let roomName;
    Room.create({
      name: payload.roomName
    })
      .then(room => {
        RoomId = room.id;
        roomName =  room.name;
        return PlayerRoom
          .create({
            PlayerId: id,
            RoomId
          })
      })
      .then(() => {
        socket.join(RoomId, (err) => {
          if(err) {
            console.log(err)
          } else {
            let room = {
              id: RoomId,
              name: roomName
            }
            io.emit('roomCreated', room)
          }
        })
      })
      .catch(err => {
        console.log(err);
      })
  })

  socket.on('join-room', (payload) => {
    if (payload.access_token) {
      let decode = verifyToken(payload.access_token);
      const { id } = decode;
      Room.findOne({ where: {id: payload.RoomId}})
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
                id: payload.RoomId
              },
              returning: true,
              individualHooks: true
          })
            .then(() => {
              let data = {
                PlayerId:id, //currentPlayerId from AUTH
                RoomId:payload.RoomId
              }
              PlayerRoom.create(data)
                .then((player) => {
                  socket.join(payload.id, () => {
                  io.to(payload.id).emit('someoneJoined', payload)
                  })
                })
            })
        } else { // io io
          throw {
            msg : 'Room is FULL',
            code : 400
          }
        }
      } else {
        throw {
          msg : 'Room Not Found',
          code : 404
        }
      }
    })
    .catch(err => {
      console.log(err);
    })
    } else {
    // nanti eror
    }
  })

  socket.on('showAllRoom', () => {
    Rooms.findAll({
      where: {
        status: false
      }
    })
    .then(results => {
      socket.emit('rooms', results)
    })
  })

  socket.on('start-game', () => {
    io.emit('gameStarted')
  })

  socket.on('sendDiceNum', (pos, id) => {
    let newPosition = check_cord(pos);

    if (newPosition) {
      io.emit('newPos', newPosition, id)
    } else {
      io.emit('newPos', pos, id)
    }

    // Player
    //   .findByPk(id)
    //   .then(player => {
    //     let position = player.coordinate + diceNumber;

    //     newPosition = check_cord(position);
    //     socket.emit('newPosition', newPosition);
    //     return Player
    //       .update({
    //         coordinate: newPosition.newPos
    //       }, {
    //         where: {
    //           id
    //         },
    //         returning: true
    //       })
    //       .then(player => {
    //         console.log(player);
    //       })
    //       .catch(err => {
    //         socket.emit('error', err.msg)
    //       })
    //   })
  })

  socket.on('winner', payload => {
    const { id, username } = payload;

    Player
      .findOne({
        where: {
          username
        }
      })
      .then(player => {
        player.win_record++;
        return Player
          .update({
            win_record: player.win_record
          }, {
            where: {
              id
            }
          })
      })
      .catch((err) => {
        io.to(player.id).emit('error', err.msg);
      });
  })
})

server.listen(port, ()=> {
  console.log('tis on port', 3000);
})
