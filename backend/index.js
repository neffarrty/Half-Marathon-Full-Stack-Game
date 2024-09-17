const express = require('express')
const sequelize = require('./utils/db')
const config = require('./utils/config')
const middlewares = require('./utils/middlewares')

const userRouter = require('./routes/user')
const loginRouter = require('./routes/login')

const app = express()

app.use(express.json())
app.use(middlewares.tokenExtractor)

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middlewares.unknownEndpoint)

sequelize
	.sync()
	.then(() => {
		app.listen(config.PORT, () => {
			console.log(`App listening on port ${config.PORT}`)
		})
	})

