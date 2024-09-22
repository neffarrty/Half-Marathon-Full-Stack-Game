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

	socket.on('turn', async (value) => {
		const { gameRoom } = value
		const rooms = io.sockets.adapter.rooms
		const room = rooms.get(gameRoom)
		const opponentSocketId = [ ...room ].filter(id => id !== socket.id)[0]
		const opponentSocket = io.sockets.sockets.get(opponentSocketId)
		const cards = await Card.findAll()
    	const randomCard = getRandomElements(cards, 1)[0]

   		opponentSocket.emit('turn', { card: randomCard })
	})
	

	socket.on('action', async (value) => {
		// validate value
	
		const { gameRoom } = value
		const rooms = io.sockets.adapter.rooms
		const room = rooms.get(gameRoom)
		const opponentSocketId = [ ...room ].filter(id => id !== socket.id)[0]
		const opponentSocket = io.sockets.sockets.get(opponentSocketId)
	
		opponentSocket.emit('action', value)
	})
	
	socket.on('game-search', async (value) => {
		console.log('game search', socket.id)
		const rooms = io.sockets.adapter.rooms
		if (!rooms.has('waiting_room') || rooms.get('waiting_room').size === 0) {
			console.log('join waiting room', socket.id)
			socket.join('waiting_room')
		} else {
			console.log(socket.id)
			const waitingRoom = rooms.get('waiting_room')
			let opponentSocketId = null

			for (let waitingSocket of waitingRoom.values()) {
				if (waitingSocket !== socket.id) {
					opponentSocketId = waitingSocket
					break
				}
			}

			if (opponentSocketId === null) {
				return
			}

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
				turn: isCurrentUserFirstTurn,
				gameRoom: gameRoomName
			})
			opponentSocket.emit('game-found', {
				opponent: currentUser,
				deck: currentUserCards,
				turn: isOpponentFirstTurn,
				gameRoom: gameRoomName
			})
		}
	})
})

server.listen(config.PORT, () => {
	console.log(`App listening on port ${config.PORT}`)
})

