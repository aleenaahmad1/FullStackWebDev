import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (blog, user) => {
  console.log("Inside blog.js, blog n user: ", blog, user)
  const response = await axios.post(baseUrl, blog, { headers: {'Authorization': `Bearer ${user.token}`}})
  return response.data
}

const likeBlog = async (blog, id) => {
  console.log("Inside like blog", blog)
  const likeURL = `${baseUrl}/${id}`
  const response = await axios.put(likeURL, blog)
  return response.data
}

const deleteBlog = async (id, user) => {
  console.log("Inside delete blog", user)
  const deleteURL = `${baseUrl}/${id}`
  const response = await axios.delete(deleteURL, { headers: {'Authorization': `Bearer ${user.token}`}})
  return response.data
}
export default { getAll, addBlog, likeBlog, deleteBlog }