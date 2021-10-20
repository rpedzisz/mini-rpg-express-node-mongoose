const express = require('express')

const router = express.Router()
var uuid = require('uuid')

const {ensureAuthenticated} = require("../config/auth.js")

var city_controller = require('../controllers/cityController')




router.get('/buy',ensureAuthenticated,(city_controller.shop_page_get))
router.post('/buy',ensureAuthenticated,(city_controller.shop_page_get))
router.post('/buy/bron',ensureAuthenticated,(city_controller.shop_page_post_filtruj))
router.post('/buy/tarcza',ensureAuthenticated,(city_controller.shop_page_post_filtruj))
router.post('/buy/zbroja',ensureAuthenticated,(city_controller.shop_page_post_filtruj))
router.post('/buy/rekawice',ensureAuthenticated,(city_controller.shop_page_post_filtruj))
router.post('/buy/nogawice',ensureAuthenticated,(city_controller.shop_page_post_filtruj))
router.post('/buy/buty',ensureAuthenticated,(city_controller.shop_page_post_filtruj))
router.post('/buy/helm',ensureAuthenticated,(city_controller.shop_page_post_filtruj))
router.post('/buy/amulet',ensureAuthenticated,(city_controller.shop_page_post_filtruj))
router.post('/buy/pierscien',ensureAuthenticated,(city_controller.shop_page_post_filtruj))
router.post('/buyitem',ensureAuthenticated,(city_controller.shop_page_post_kup))

router.get('/sell',ensureAuthenticated,(city_controller.sell_page_get))
router.post('/sell',ensureAuthenticated,(city_controller.sell_page_get))
router.post('/sell/bron',ensureAuthenticated,(city_controller.sell_page_post_filtruj))
router.post('/sell/tarcza',ensureAuthenticated,(city_controller.sell_page_post_filtruj))
router.post('/sell/zbroja',ensureAuthenticated,(city_controller.sell_page_post_filtruj))
router.post('/sell/nogawice',ensureAuthenticated,(city_controller.sell_page_post_filtruj))
router.post('/sell/buty',ensureAuthenticated,(city_controller.sell_page_post_filtruj))
router.post('/sell/helm',ensureAuthenticated,(city_controller.sell_page_post_filtruj))
router.post('/sell/rekawice',ensureAuthenticated,(city_controller.sell_page_post_filtruj))
router.post('/sell/amulet',ensureAuthenticated,(city_controller.sell_page_post_filtruj))
router.post('/sell/pierscien',ensureAuthenticated,(city_controller.sell_page_post_filtruj))
router.post('/sellitem',ensureAuthenticated,(city_controller.sell_page_post_sprzedaj))

router.get('/forge',ensureAuthenticated,(city_controller.forge_page_get))
router.post('/forge',ensureAuthenticated,(city_controller.forge_page_post_wybrano))
router.post('/forge/ulepsz',ensureAuthenticated,(city_controller.forge_page_post_ulepsz))
//router.post('/buy',ensureAuthenticated,(city_controller.shop_page_post_filtruj))



module.exports = router

