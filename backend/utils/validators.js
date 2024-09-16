const { body } = require('express-validator')
const bcrypt = require('bcrypt')

const User = require('../models/user')

exports.registerValidator = [
    body('email').notEmpty().isEmail().custom(async value => {
        const user = await User.findOne({ where: { email: value } })

        if (user) {
            throw new Error('User with this email already exists')
        }
    }),
    body('username').notEmpty().custom(async value => {
        const user = await User.findOne({ where: { username: value } })
        
        if (user) {
            throw new Error('User with this username already exists')
        }
    }),
    body('password').notEmpty()
]

exports.loginValidator = [
    body('username').notEmpty().bail().custom(async value => {
        const user = await User.findOne({ where: { username: value } })

        if (!user) {
            throw new Error('User with this login doesn\'t exist')
        }
    }),
    body('password').notEmpty().custom(async (value, { req }) => {
        const user = await User.findOne({ where: { username:  req.body.username } })
        
        if (!user) {
            return          // can't bail other chains
        }

        if (!(await bcrypt.compare(value, user.attr.password))) {
            throw new Error('Invalid password')
        }
    })
]

