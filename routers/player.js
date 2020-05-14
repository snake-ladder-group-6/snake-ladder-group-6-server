let router = require('express').Router()
let PlayerController = require('../controllers/player')

router.post('/register', PlayerController.register)
router.post('/login', PlayerController.login)

module.exports = router