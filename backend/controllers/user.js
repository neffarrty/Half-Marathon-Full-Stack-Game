const { validationResult, matchedData } = require('express-validator')
const bcrypt = require('bcrypt')

const User = require('../models/user')

exports.index = async (req, res) => {
    const users = await User.findAll();

    res.json(users)
}

exports.store = async (req, res) => {
	const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const data = matchedData(req)
	data.password = await bcrypt.hash(data.password, 10)

	const user = await User.create(data)
	const responseUser = user.toJSON()
	delete responseUser.password

    res.status(201).json(responseUser)
}

exports.show = async (req, res) => {
    const user_id = req.params.id
    const user = await User.findByPk(user_id)
    // validate
    res.json(user)
}

