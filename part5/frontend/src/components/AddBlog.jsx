const AddBlog = ({ newBlog, setNewBlog, handleNewBlog }) => {
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
      <button onClick={handleNewBlog}>Create</button>
    </div>
  )
}

export default AddBlog