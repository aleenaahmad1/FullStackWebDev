import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("") 
  const [ user, setUser ] = useState(null)
  const [ newBlog, setNewBlog ] = useState({
      title: "",
      author: "",
      url: ""
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [user])

  const loginForm = () => (
      <div>
      <h2>blogs</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            <input
              type="text"
              value={username}
              onChange={({target}) => {setUsername(target.value)}}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="password"
              value={password}
              onChange={({target}) => {setPassword(target.value)}}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
      </div>
  )
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
        const user = await loginService.login({ username, password })

        window.localStorage.setItem(
          'loggedUser', JSON.stringify(user)
        )
        
        setUser(user)
        setUsername('')
        setPassword('')
      } catch {
        console.log('wrong credentials') //add error message functionality
        setTimeout(() => {
          console.log('time')
          //set error message to null here
        }, 5000)
      }
      console.log("Logged in with value: ", username, password)
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }
  const blogDisplay = () => (
    <div>
    <h2>blogs</h2>
    <div>
    {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />)}
    </div>
    </div>
  )

  const handleNewBlog = () => {
    console.log("Sending values to blog service: ", newBlog, user)
    blogService.addBlog(newBlog, user)
    setNewBlog({
      title: "",
      author: "",
      url: ""
    })
  }

  const blogForm = () => (
    <div>
      <div>
        <label>
          Title:
          <input
            type='text'
            value={newBlog.title}
            onChange={(e) => 
              setNewBlog(prev => ({
                ...prev,
                title: e.target.value
              }))
            }
          />
        </label>
      </div>
      <div>
        <label>
          Author:
          <input
            type='text'
            value={newBlog.author}
            onChange={(e) => 
              setNewBlog(prev => ({
                ...prev,
                author: e.target.value
              }))
            }
          />
        </label>
      </div>
      <div>
        <label>
          URL:
          <input
            type='text'
            value={newBlog.url}
            onChange={(e) => 
              setNewBlog(prev => ({
                ...prev,
                url: e.target.value
              }))
            }
          />
        </label>
      </div>
      <button onClick={handleNewBlog}>Create</button>
    </div>
  )
  return (
    <div>
      {!user && loginForm()}
      <button onClick={handleLogout}>Log Out</button>
      {user && blogForm()}
      {user && blogDisplay()}
    </div>
  )
}
      
export default App