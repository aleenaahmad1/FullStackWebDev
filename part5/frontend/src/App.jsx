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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
        <Blog key={blog.id} blog={blog} />)
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

  const handleNewBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService.addBlog(newBlog, user)
    setNotif(`A new blog ${newBlog.title} by ${newBlog.author} added.`)
    setMsgClass('notif')
    setTimeout(() => {
      console.log('time')
      setNotif(null)
    }, 5000)
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