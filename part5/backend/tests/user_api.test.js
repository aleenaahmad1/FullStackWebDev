const { test, beforeEach, describe, after } = require('node:test')
const supertest = require('supertest')
const assert = require('assert')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const helper = require('./test_helper.js')
const app = require('../app.js')
const mongoose = require('mongoose')

const api = supertest(app)

describe('Addition of users', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    // userToken = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET)
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'aleenaa',
      name: 'Aleena Ahmad',
      password: '1234',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with the invalid password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'hello', 
      password: 'b'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('password must be atleast 3 characters long'))
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

  test('creation fails with the same username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'hello', 
      password: 'bye'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      
    const usersAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('expected `username` to be unique'))
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})