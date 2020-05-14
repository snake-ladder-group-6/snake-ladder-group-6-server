let express = require('express')
let app = express()
let port = process.env.PORT || 3000
// let cors = require('cors')
let router = require('./routers/index')

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(router)
// app.use(cors())

app.listen(port, ()=> {
  console.log('tis on port', 3000);
})