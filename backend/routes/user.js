const express = require("express")

const userController = require('../controllers/user')
const { registerValidator } = require('../utils/validators')
const middlewares = require('../utils/middlewares')

const router = express.Router()

router.get('/', userController.index)
router.get('/:id', middlewares.isAuth, userController.show)
router.post('/', registerValidator, userController.store)

module.exports = router
