const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { UserExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {'username': 1, 'name': 1, 'id': 1})
  response.json(blogs)
})

blogsRouter.post('/', UserExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  console.log("Body: ", body)
  console.log("Token: ", request.token)
  console.log("User: ", user.name)


  if ((!body.title) || (!body.url)) {
    return response.status(400).end()
  }
  
  if (!user) {
    return response.status(400).json({ error: "UserID missing or invalid" })
  }

  const blog = new Blog(
    {
      title: body.title,
      author: body.author, 
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    }
  )

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  return response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = request.body
  console.log("Inside route: ", blog.title, blog.likes)
  
  const blogToUpdate = await Blog.findById(request.params.id)
  console.log("Blog to update: ", blogToUpdate)
  if (!blogToUpdate){
    return response.status(404).end()
  }
  // blogToUpdate.title = blog.title
  blogToUpdate.likes = blog.likes
  const savedBlog = await blogToUpdate.save()
  console.log("Saved blog: ", savedBlog)
  response.status(200)
  response.json(savedBlog)
})


blogsRouter.delete('/:id', UserExtractor, async (request, response, next) => {
  try {
    
    const user = request.user
    console.log("User: ", user.name)
    const blogToDelete = await Blog.findById(request.params.id)
    console.log("blog to delete user string", blogToDelete.user.toString())
    console.log("user id string", user.id.toString())
    if (!(blogToDelete.user.toString() === user.id.toString())) {
      return response.status(400).json({ error: 'invalid user: blog can only be deleted by creator' })
    }

    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)

   response.status(204).end()
  } catch (error) {
    next(error)
  }   
})  

module.exports = blogsRouter
