let express = require('express')
let app = express()
let port = process.env.PORT || 3000
let server = require('http').createServer(app)
let cors = require('cors')
let router = require('./routers/index')
let io = require('socket.io')(server)

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(router)
app.use(cors())

io.on('connection', (socket)=> {
  console.log('Connected');
})

server.listen(port, ()=> {
  console.log('tis on port', 3000);
})