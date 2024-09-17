const { validationResult, matchedData } = require('express-validator')
const jwt = require('jsonwebtoken')

const config = require('../utils/config')

const User = require('../models/user')

exports.store = async (req, res) => {
	const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const data = matchedData(req)
	const user = await User.findOne({ where: { username:  data.username } })

	const payload = {
		user_id: user.id,
		sub: user.username,
	}

	const token = jwt.sign(payload, config.JWT_SECRET)

	res.json({ token, username: user.username, email: user.email })
}
