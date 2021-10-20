const express = require('express')

const router = express.Router()
var uuid = require('uuid')

const {ensureAuthenticated} = require("../config/auth.js")

var character_controller = require('../controllers/characterController')




router.get('/stats',ensureAuthenticated,(character_controller.character_page_get))
router.post('/stats/rozdaj_pkt',ensureAuthenticated,(character_controller.character_page_post_rozdaj))



router.post('/inventory/zaloz',ensureAuthenticated,(character_controller.inventory_page_post_zaloz))
router.post('/inventory/zaloz2',ensureAuthenticated,(character_controller.inventory_page_post_zaloz2))

router.get('/inventory',ensureAuthenticated,(character_controller.inventory_page_get))
router.post('/inventory',ensureAuthenticated,(character_controller.inventory_page_get))

router.post('/inventory/bron',ensureAuthenticated,(character_controller.inventory_page_post_filtruj))
router.post('/inventory/tarcza',ensureAuthenticated,(character_controller.inventory_page_post_filtruj))
router.post('/inventory/helm',ensureAuthenticated,(character_controller.inventory_page_post_filtruj))
router.post('/inventory/zbroja',ensureAuthenticated,(character_controller.inventory_page_post_filtruj))
router.post('/inventory/nogawice',ensureAuthenticated,(character_controller.inventory_page_post_filtruj))
router.post('/inventory/buty',ensureAuthenticated,(character_controller.inventory_page_post_filtruj))
router.post('/inventory/pierscien',ensureAuthenticated,(character_controller.inventory_page_post_filtruj))
router.post('/inventory/amulet',ensureAuthenticated,(character_controller.inventory_page_post_filtruj))
router.post('/inventory/rekawice',ensureAuthenticated,(character_controller.inventory_page_post_filtruj))

router.get('/equipment',ensureAuthenticated,(character_controller.equipment_page_get))
router.post('/equipment/zdejmij',ensureAuthenticated,(character_controller.equipment_page_post_zdejmij))
router.get('/leczenie',ensureAuthenticated,(character_controller.leczenie_page_get))
router.post('/leczenie',ensureAuthenticated,(character_controller.leczenie_page_post))
module.exports = router

