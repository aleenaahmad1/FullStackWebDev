const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {'username': 1, 'name': 1, 'id': 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if ((!body.title) || (!body.url)) {
    response.status(400).end()
  }
  const users = await User.find({})
  if (users.length === 0){
    return response.status(400).json({
      error: "No user in DB"
    })
  }
  const userforBlog = users[0]
  console.log("chosen user: ", userforBlog.name)
  const blog = new Blog(
    {
      title: body.title,
      author: body.author, 
      url: body.url,
      likes: body.likes || 0,
      user: userforBlog._id
    }
  )

  const savedBlog = await blog.save()

  userforBlog.blogs = userforBlog.blogs.concat(blog._id)
  await userforBlog.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { id, title, likes } = request.body
  console.log("Inside route: ", title, likes)
  
  const blogToUpdate = await Blog.findById(request.params.id)
  console.log("Blog to update: ", blogToUpdate)
  if (!blogToUpdate){
    return response.status(404).end()
  }
  blogToUpdate.title = title
  blogToUpdate.likes = likes
  const savedBlog = await blogToUpdate.save()
  console.log("Saved blog: ", savedBlog)
  response.status(200)
  response.json(savedBlog)
})


blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)

   response.status(204).end()
  } catch (error) {
    next(error)
  }   
})  

module.exports = blogsRouter
