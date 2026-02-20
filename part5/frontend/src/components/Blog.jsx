import { useState } from 'react'


const Blog = ({ blog, updateLikes, deleteBlog, user }) => {

  const [ showDetails, setShowDetails ] = useState(false)
  const [ buttonLabel, setButtonLabel ] = useState('view')

  const showRemove = user.id === blog.user.id
  console.log('User id: ', user.id)
  // console.log("Blog user id: ", blog.user.toString())

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClick = () => {
    const label = showDetails ? 'view' : 'hide'
    setShowDetails(!showDetails)
    setButtonLabel(label)
  }

  const handleLike = () => {
    const updatedLikes = blog.likes + 1
    const newBlog = {
      ...blog,
      likes: updatedLikes
    }
    updateLikes(newBlog, blog.id)
  }

  const handleDelete = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}  <button onClick={handleClick}>{buttonLabel}</button>
      </div>
      {
        showDetails &&
        (
          <div>
            <p>{blog.url}</p>
            <p>Likes {blog.likes}
              <button onClick={handleLike}>Like</button>
            </p>
            <p>{blog.author}</p>
            {showRemove && <button onClick={handleDelete}>Remove</button>}
          </div>
        )
      }
    </div>
  )

}

export default Blog