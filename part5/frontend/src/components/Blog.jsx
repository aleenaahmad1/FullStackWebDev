import { useState } from "react"


const Blog = ({ blog }) => {

  const [ showDetails, setShowDetails ] = useState(false)
  const [ buttonLabel, setButtonLabel ] = useState('view')

  const handleClick = () => {
    const label = showDetails ? 'view' : 'hide'
    setShowDetails(!showDetails)
    setButtonLabel(label)
  }
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}  <button onClick = {handleClick}>{buttonLabel}</button>
      </div>
      {
        showDetails && 
        (
          <div>
            <p>{blog.url}</p>
            <p>Likes 0</p>
            <p>{blog.author}</p>
          </div>
        )
      }
    </div>  
  )

}

export default Blog