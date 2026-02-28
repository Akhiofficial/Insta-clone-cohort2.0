import React, { useState } from 'react'
import { Link } from 'react-router'
import '../../styles/form.scss'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'


const Register = () => {

    const { loading, handleRegister } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    const handleSubmit = async (e) => {
        e.preventDefault()

        await handleRegister(username, email, password, name);

        navigate("/");

    }



    if (loading) {
        return (<main>
            <div className="form-container">
                <h1>Loading...</h1>
            </div>
        </main>)
    }


    return (
        <div>
            <main>
                <div className="form-container">
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" placeholder='username' />
                        <input
                            onChange={(e) => { setName(e.target.value) }}
                            type="text" placeholder='Full Name' />
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" placeholder='Email' />
                        <input
                            onInput={(e) => { setPassword(e.target.value) }}
                            type="password"
                             placeholder='Password' />
                        <button type="submit">Register</button>
                    </form>
                    <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
                </div>
            </main>
        </div>
    )
}

export default Register