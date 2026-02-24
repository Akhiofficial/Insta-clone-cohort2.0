import React, { useState } from 'react'
import { Link } from 'react-router'
import '../../styles/form.scss'
import axios from 'axios'

const Register = () => {

    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        axios.post("http://localhost:3000/api/auth/register", {
            username,
            name,
            email,
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
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            onInput={(e) => { setUsername(e.target.value) }}
                            type="text" placeholder='username' />
                        <input
                            onInput={(e) => { setName(e.target.value) }}
                            type="text" placeholder='Full Name' />
                        <input
                            onInput={(e) => { setEmail(e.target.value) }}
                            type="email" placeholder='Email' />
                        <input
                            onInput={(e) => { setPassword(e.target.value) }}
                            type="password" placeholder='Password' />
                        <button type="submit">Register</button>
                    </form>
                    <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
                </div>
            </main>
        </div>
    )
}

export default Register