let router = require('express').Router()
let RoomController = require('../controllers/room')

router.get('/', RoomController.allRoom)
router.post('/', RoomController.create)
router.get('/:RoomId', RoomController.roomInfo)
router.put('/advance/:UserId', RoomController.advance)
router.delete('/:RoomId', RoomController.roomInfo)

module.exports = router