
const Login = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
      <div>
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
}
  
export default Login