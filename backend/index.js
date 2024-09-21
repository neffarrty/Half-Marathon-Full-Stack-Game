const express = require('express')
const { createServer } = require('node:http')
const { Server } = require('socket.io')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const sequelize = require('./utils/db')
const config = require('./utils/config')
const middlewares = require('./utils/middlewares')
const { getRandomElements } = require('./utils/functions')

const User = require('./models/user')
const Card = require('./models/card')

const userRouter = require('./routes/user')
const loginRouter = require('./routes/login')
const gameRouter = require('./routes/game')

const app = express()
const server = createServer(app)
const io = new Server(server,   {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
		credentials: true
}})

app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use(middlewares.tokenExtractor)

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/game', gameRouter)

app.use(middlewares.unknownEndpoint)

io.use(middlewares.isSocketAuth)

io.on('connection', (socket) => {
	console.log('a user connected with socket: ', socket.id)

	socket.on('game-search', async (value) => {
		const rooms = io.sockets.adapter.rooms
		if (!rooms.has('waiting_room') || rooms.get('waiting_room').size === 0) {
			socket.join('waiting_room')
		} else {
			const waitingRoom = rooms.get('waiting_room')
			const opponentSocketId = waitingRoom.values().next().value // get first element from Set
			const opponentSocket = io.sockets.sockets.get(opponentSocketId)
			const gameRoomName = `room-${uuidv4()}`
		
			opponentSocket.leave('waiting_room')
			socket.join(gameRoomName)
			opponentSocket.join(gameRoomName)

			const currentUser = (await User.findByPk(socket.user.user_id)).toJSON()
			delete currentUser.password
			const opponentUser = (await User.findByPk(opponentSocket.user.user_id)).toJSON()
			delete opponentUser.password

			const isOpponentFirstTurn = Math.random() < 0.5
			const isCurrentUserFirstTurn = !isOpponentFirstTurn

			const cards = await Card.findAll()
			const opponentCards = getRandomElements(cards, 5)
			const currentUserCards = getRandomElements(cards, 5)

			socket.emit('game-found', { 
				opponent: opponentUser,
				deck: opponentCards,
				turn: isCurrentUserFirstTurn
			})
			opponentSocket.emit('game-found', {
				opponent: currentUser,
				deck: currentUserCards,
				turn: isOpponentFirstTurn
			})
		}
	})
})

server.listen(config.PORT, () => {
	console.log(`App listening on port ${config.PORT}`)
})

