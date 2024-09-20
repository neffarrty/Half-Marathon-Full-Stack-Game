const express = require("express")

const gameController = require('../controllers/game')

const router = express.Router()

router.post('/', gameController.store)

module.exports = router

