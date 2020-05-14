let router = require('express').Router()
let {authentification} = require('../middlewares/authentication')
let PlayerController = require('../controllers/player')

router.post('/register', PlayerController.register)
router.post('/login', PlayerController.login)
router.use(authentification)
router.put('/join/:RoomId', PlayerController.join)

module.exports = router