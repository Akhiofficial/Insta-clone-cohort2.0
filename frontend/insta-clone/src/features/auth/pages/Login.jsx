import "../style/form.scss"
import { Link } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {


  const { user, loading, handlelogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // navigate hook
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    await handlelogin(username, password);

    console.log("user loggedIn");

    navigate('/')
  }

  if (loading) {
    return (<main>
      <h1>Loading...</h1>
    </main>)
  }


  return (
    <div>
      <main>
        <div className="form-container">
          <h1>Login</h1>
          <form action="" onSubmit={handleSubmit}>
            <input
              name='username'
              id='username'
              type="text"
              placeholder='username or email'
              onInput={(e) => { setUsername(e.target.value) }}
            />
            <input
              name='password'
              id='password'
              type="password"
              placeholder='Password'
              onInput={(e) => { setPassword(e.target.value) }}
            />
            <button className='primary-button' type="submit">Log In</button>
          </form>
          <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>
        </div>
      </main>
    </div>

  )
}

export default Login