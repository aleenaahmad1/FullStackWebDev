import { useState } from 'react'

const AddBlog = ({ handleNewBlog }) => {
  const [ newBlog, setNewBlog ] = useState({
    title: '',
    author: '',
    url: ''
  })

  const addNewBlog = () => {
    // console.log('Sending values to blog service: ', newBlog)
    handleNewBlog(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
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
      <button onClick={addNewBlog}>Create</button>
    </div>
  )
}

export default AddBlog