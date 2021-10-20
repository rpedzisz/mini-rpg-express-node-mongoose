const express = require('express')

const router = express.Router()
var uuid = require('uuid')

const {ensureAuthenticated} = require("../config/auth.js")

var fight_controller = require('../controllers/fightController')




router.get('/monster',ensureAuthenticated,(fight_controller.monster_page_get))
router.get('/player',ensureAuthenticated,(fight_controller.player_page_get))
router.post('/monster/vs',ensureAuthenticated,(fight_controller.monster_page_post_vs))
router.post('/player/vs',ensureAuthenticated,(fight_controller.player_page_post_vs))


module.exports = router

