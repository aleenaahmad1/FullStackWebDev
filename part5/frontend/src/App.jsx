import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import AddBlog from './components/AddBlog'


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
  const [ notif, setNotif ] = useState(null)
  const [ msgClass, setMsgClass ] = useState('')

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
        <Blog key={blog.id} blog={blog} />)}
    </div>
    </div>
  )

  const handleNewBlog = () => {
    console.log("Sending values to blog service: ", newBlog, user)
    blogService.addBlog(newBlog, user)
    setNotif(`A new blog ${newBlog.title} by ${newBlog.author} added.`)
    setMsgClass('notif')
    setNewBlog({
      title: "",
      author: "",
      url: ""
    })
    setTimeout(() => {
      console.log('time')
      setNotif(null)
    }, 5000)
  }

  
  return (
    <div>
      {!user && <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin}/>}
      <Notification message={notif} type={msgClass}/>
      <button onClick={handleLogout}>Log Out</button>
      {user && AddBlog({newBlog, setNewBlog, handleNewBlog})}
      {user && blogDisplay()}
    </div>
  )
}
      
export default App