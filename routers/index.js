let router = require('express').Router()
let playerrouter = require('./player')
let roomrouter = require('./room')

router.use('/player', playerrouter)
router.use('/room', roomrouter)

module.exports = router