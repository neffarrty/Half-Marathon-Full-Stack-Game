const express = require('express')
const { validationResult, matchedData } = require('express-validator')
const bcrypt = require('bcrypt')

const sequelize = require('./utils/db')
const config = require('./utils/config')

const User = require('./models/user')

const { registerValidator, loginValidator } = require('./utils/validators')

const app = express()

app.use(express.json())

app.post('/users', registerValidator, async (req, res) => {
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
})

app.post('/login', loginValidator, async (req, res) => {
	const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const data = matchedData(req)
})

sequelize
	.sync()
	.then(() => {
		app.listen(config.PORT, () => {
			console.log(`App listening on port ${config.PORT}`)
		})
	})

