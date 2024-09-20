const jwt = require('jsonwebtoken')

const config = require('./config')

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')

    req.token = null

    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        req.token = authorization.substring(7)
    }

    next()
}

const isAuth = (req, res, next) => {
    const { token } = req

    if(!token){
        return res.status(401).json({ error: 'JWT token is missing' })
    }

    try {
        const decodedToken = jwt.verify(token, config.JWT_SECRET)
        req.user = decodedToken

        next()
    } catch (e) {
        return res.status(401).json({ error: 'JWT token invalid' })
    }
}

const isSocketAuth = (socket, next) => {
	const token = socket.handshake.query.token
	
	if (!token) {
	  return next(new Error('JWT token is missing'))
	}
	
	try {
		const decodedToken = jwt.verify(token, config.JWT_SECRET)
	  	socket.user = decodedToken
	  	next()
	} catch (e) {
		return next(new Error('Invalid token'))
	}
}

const unknownEndpoint = (req, res) => {
    res.status(404).json({ error: 'Unknown endpoint' })
}

module.exports = {
    tokenExtractor,
    isAuth,
    isSocketAuth,
    unknownEndpoint
}
