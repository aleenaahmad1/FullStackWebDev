const jwt = require('jsonwebtoken')
const logger = require('./loggers')
const User = require('../models/user')


const TokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')){
      request.token = authorization.replace('Bearer ', '')
  } else {
      request.token = null
  }
  next()
}

const UserExtractor = async (request, response, next) => {
  try {  
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(400).json({ error: 'token invalid' })
      }
      console.log("Decoded token id: ", decodedToken.id)
      const user = await User.findById(decodedToken.id)
      if (!user) {
        console.log("User not found with id: ", decodedToken.id)
        return response.status(400).json({ error: 'user not found' })
      }
      console.log("User found: ", user.name)

      if (!user){
        return response.status(400).json({ error: 'user not found'})
      } 
      request.user = user
      next()
  } catch (error) {
      next(error)
  }
}

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  // console.log("ERROR: ", error.message)
  // console.log("ERror: ", error )

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
      console.log("condition met")
      return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }

  next(error)
}


const info = (...params) => {

  if (process.env.NODE_ENV !== 'test') { 
    console.log(...params)
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler, 
  TokenExtractor,
  UserExtractor
}