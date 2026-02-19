import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import AddBlog from './components/AddBlog'
import Togglable from './components/Togglable'


const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("") 
  const [ user, setUser ] = useState(null)
  const [ notif, setNotif ] = useState(null)
  const [ msgClass, setMsgClass ] = useState('')
  const blogFormRef = useRef()

  useEffect( () => {
    async function fetchBlogs() {
      const returnedBlogs = await blogService.getAll()
      const sortedBlogs = returnedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    fetchBlogs()
  }, [user])
  
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
        console.log('wrong credentials') 
        setNotif("Wrong username or password")
        setMsgClass("error")
        setTimeout(() => {
          console.log('time')
          setNotif(null)
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
        <Blog key={blog.id} blog={blog} updateLikes={updateLikes}/>)
    }
    </div>
    </div>
  )

  const blogForm = () => {
    return (
    <Togglable buttonLabel='Add Blog' ref={blogFormRef}>
        <AddBlog handleNewBlog={handleNewBlog}/>
    </Togglable>
    )
  }

  const handleNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.addBlog(newBlog, user)
    setBlogs(blogs.concat(returnedBlog))
    setNotif(`A new blog ${newBlog.title} by ${newBlog.author} added.`)
    setMsgClass('notif')
    setTimeout(() => {
      console.log('time')
      setNotif(null)
    }, 5000)
  }

  const updateLikes = async (updatedBlog, id) => {
    const returnedBlog = await blogService.likeBlog(updatedBlog, id)
    setBlogs(blogs.map(blog => blog.id === id ? returnedBlog : blog))
    setNotif(`Blog ${updatedBlog.title} liked!`)
    setMsgClass('notif')
    setTimeout(() => {
      console.log('time')
      setNotif(null)
    }, 2000)
  }
  
  return (
    <div>
      {!user && 
      <Togglable buttonLabel='Login'>
        <Login 
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </Togglable>
      }
      <Notification message={notif} type={msgClass}/>
      {user && <button onClick={handleLogout}>Log Out</button>}
      {user && blogForm()}
      {user && blogDisplay()}
    </div>
  )
}
      
export default App