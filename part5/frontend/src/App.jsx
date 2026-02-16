import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("") 
  const [ user, setUser ] = useState(null)

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
        console.log("user at frontend: ", user)
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

  const blogDisplay = () => (
    <div>
    <h2>blogs</h2>
    <div>
    {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />)}
    </div>
    </div>
  )

  return (
    <div>
      {!user && loginForm()}
      {user && blogDisplay()}
    </div>
  )
}
      
export default App