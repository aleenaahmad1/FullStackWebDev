const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body
    console.log("username and pass iin backend: ", username, password)

    const user = await User.findOne({ username })
    // console.log("user: ", us/er)
    const passwordCorrect = user === null 
    ? false
    : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    // console.log("sending to frontend: ", user.name, user.username, token)
    response
      .status(200)
      .send({ token, username: user.username, name: user.name, id: user._id})
})

module.exports = loginRouter