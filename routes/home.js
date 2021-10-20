const express = require('express')
const router = express.Router()
var main_controller = require('../controllers/mainController')

router.get('/', (main_controller.index))



module.exports = router

