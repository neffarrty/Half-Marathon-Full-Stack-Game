const express = require("express")

const loginController = require('../controllers/login')
const { loginValidator } = require('../utils/validators')

const router = express.Router()

router.post('/', loginValidator, loginController.store)

module.exports = router

