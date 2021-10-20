const express = require('express')

const router = express.Router()
var uuid = require('uuid')

const {ensureAuthenticated} = require("../config/auth.js")
var path = require('path')

const multer = require('multer');
var mult = require('../db/mult')



var user_controller = require('../controllers/userController')
var character_controller = require('../controllers/characterController')

router.get('/login', (user_controller.login_page_get))
router.post('/login', (user_controller.login_page_post))

router.get('/register', (user_controller.register_page_get))
router.post('/register', (user_controller.register_page_post))

router.get('/logout',(user_controller.logout))

router.get('/konto',ensureAuthenticated, (user_controller.konto_page_get))


let upload = multer({ storage: mult.storage, fileFilter: mult.imageFilter })

router.post('/konto/obrazek', ensureAuthenticated, upload.single('profile_pic'),(user_controller.konto_page_post_obrazek))
router.post('/konto/haslo', ensureAuthenticated,(user_controller.konto_page_post_haslo))

module.exports = router

