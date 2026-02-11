const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('assert')
const app = require('../app.js')
const Blog = require('../models/blog.js')

const api = supertest(app)

const initialBlog = [
    {
        title: 'blog 1',
        author: 'poshmal ahmad', 
        url: 'blog1.com',
        likes: '10'
    },
    {
        title: 'blog 2',
        author: 'poshi',
        url: 'blog2.com',
        likes: '5'
    }
]

beforeEach( async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlog[0])
    await blogObject.save()
    blogObject = new Blog(initialBlog[1])
    await blogObject.save()

})

test.only('all blogs are returned in JSON format', async () => {
  const response = await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, initialBlog.length)
})

after(async () => {
  await mongoose.connection.close()
})