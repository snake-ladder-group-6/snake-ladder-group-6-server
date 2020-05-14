const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const server = require('http').createServer(app);
const cors = require('cors');
const router = require('./routers/index');
const io = require('socket.io')(server);
const { check_cord } = require('./helpers/checkPos');
const { generateToken, verifyToken } = require('./helpers/jwt');
const { compareHash } = require('./helpers/bcrypt');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)

io.on('connect', (socket)=> {
  console.log('a new player connected');

  socket.on('disconnected', () => {
    console.log('a player just leave the game');
  })

  socket.on('register', payload => {
    const { username, password } = payload;

    Player
      .craete({
        username,
        password
      })
      .then(player => {
        console.log('a new player just sign up');
      })
      .else(err => {
        io.to(player.id).emit('error', err.msg);
      })
  })
 
  socket.on('login', payload => {
    const { username, password } = payload;

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
            socket.emit('token', access_token); 
          } else {
            io.to(player.id).emit('error', 'invalid username/password');
          }
        } else {
          io.to(player.id).emit('error', 'invalid username/password');
        }
      })
      .catch(err => {
        io.to(player.id).emit('error', err.msg);
      })
  })

  socket.on('add-room', payload => {
    console.log(payload);
  })

  socket.on('join-room', token => {
    console.log(token);
  })

  socket.on('showAllRoom', () => {

  })

  socket.on('sendDiceNum', (diceNumber, token) => {
    let decode = verifyToken(token);
    const { id } = decode;
    console.log(diceNumber, id);
    let newPosition;
    Player
      .findByPk(id)
      .then(player => {
        let position = player.coordinate + diceNumber;

        newPosition = check_cord(position);
        socket.emit('newPosition', newPosition);
        return Player
          .update({
            coordinate: newPosition.newPos
          }, {
            where: {
              id
            },
            returning: true
          })
          .then(player => {
            console.log(player);
          })
          .catch(err => {
            socket.emit('error', err.msg)
          })
      })
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
