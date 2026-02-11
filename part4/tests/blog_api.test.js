const { test, after, beforeEach, describe } = require('node:test')
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

// test('all blogs are returned in JSON format', async () => {
//   const response = await api
//   .get('/api/blogs')
//   .expect(200)
//   .expect('Content-Type', /application\/json/)

//   assert.strictEqual(response.body.length, initialBlog.length)
// })

// test("unique identifier named ID", async () => {
//     const response = await api.get('/api/blogs')
//     object_keys = Object.keys(response.body[0])
//     assert(object_keys.includes('id'))
// })

// test("a new blog can be added", async () => {
//     const newBlog = {
//         title: "blog 3", 
//         author: "qudsia", 
//         url: "blog3.com",
//         likes: '11'
//     }

//     await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//     const response = await api.get('/api/blogs')

//     const blogTitles = response.body.map(b => b.title)

//     assert(response.body.length, initialBlog.length + 1)
//     assert(blogTitles.includes('blog 3'))
// })

// test("sets no likes to 0", async () => {
//     const newBlog = {
//         title: "blog 3", 
//         author: "qudsia", 
//         url: "blog3.com",
//     }

//     const response = await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//     assert.strictEqual(response.body.likes, 0)
// })

// test("gives error if no title or url", async () => {
//     const newBlog = {
//         author: "qudsia"   
//     }

//     const response = await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(400)
// })

describe('deletion of a blog', () => {
    test.only('successfully deletes with status code 204 if id is valid', async () => {
        const blog_response  = await api.get('/api/blogs')
        const currentBlogs = blog_response.body
        // console.log("Current blog: ", currentBlogs)
        const blogToDelete = currentBlogs[0]
        // console.log("Blog to delete: ", blogToDelete.id)

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

        const response = await api.get('/api/blogs')
        
        assert.strictEqual(response.body.length, currentBlogs.length - 1)
    })
})

after(async () => {
  await mongoose.connection.close()
})