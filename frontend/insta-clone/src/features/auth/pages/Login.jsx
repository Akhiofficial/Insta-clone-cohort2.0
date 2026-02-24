import React from 'react'
import '../../styles/form.scss'
import { Link } from 'react-router'
import { useState } from 'react'
import axios from 'axios'

const login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    axios.post("http://localhost:3000/api/auth/login", {
      username,
      password
    }, {
      withCredentials: true
    })
      .then(res => {
        console.log(res.data);
      })

  }

  return (
    <div>
      <main>
        <div className="form-container">
          <h1>Login</h1>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder='username or email'
              onInput={(e) => { setUsername(e.target.value) }}
            />
            <input
              type="password"
              placeholder='Password'
              onInput={(e) => { setPassword(e.target.value) }}
            />
            <button type="submit">Log In</button>
          </form>
          <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>
        </div>
      </main>
    </div>

  )
}

export default login