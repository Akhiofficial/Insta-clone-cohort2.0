import React, { useState } from 'react'
import { Link } from 'react-router'
import '../style/form.scss'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
import {
    Instagram,
    Sparkles,
    ShieldCheck,
    Leaf,
    Eye,
    EyeOff
} from 'lucide-react'

const Register = () => {
    const { loading, handleRegister } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("");

        if (!username || !name || !email || !password) {
            setError("All fields are required");
            return;
        }

        try {
            await handleRegister(username, email, password, name);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Try again.");
        }
    }

    if (loading) {
        return (
            <div className="auth-page">
                <div className="phone-container">
                    <div className="phone-content" style={{ justifyContent: 'center' }}>
                        <div className="brand-logo" style={{ animation: 'pulse 2s infinite' }}>
                            <Instagram />
                        </div>
                        <h2 style={{ fontSize: '1.5rem' }}>Creating Account...</h2>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="auth-page">
            <div className="auth-layout">

                {/* Left Branding Section */}
                <div className="auth-branding">
                    <h1>Experience 2026</h1>
                    <p>Join the next generation of creators. Minimalist, fluid, and designed for meaningful connection.</p>
                    <div className="branding-icons">
                        <div className="icon-box"><Sparkles size={20} /></div>
                        <div className="icon-box"><ShieldCheck size={20} /></div>
                        <div className="icon-box"><Leaf size={20} /></div>
                    </div>
                </div>

                {/* Center Phone Section */}
                <div className="phone-container">
                    <div className="phone-content">
                        <div className="brand-logo">
                            <Instagram strokeWidth={1.5} />
                        </div>
                        <h2>Join Us</h2>
                        <p className="subtitle">Sign up to see photos and videos from your friends.</p>

                        {error && (
                            <div className="error-container">
                                {error}
                            </div>
                        )}

                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder='Username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoComplete="username"
                                />
                            </div>

                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder='Full Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoComplete="name"
                                />
                            </div>

                            <div className="input-group">
                                <input
                                    type="email"
                                    placeholder='Email Address'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                />
                            </div>

                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                />
                                <div className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </div>
                            </div>

                            <button className='primary-button' type="submit" disabled={loading}>
                                {loading ? "Registering..." : "Sign Up"}
                            </button>
                        </form>

                        <div className="auth-footer">
                            Have an account? <Link to="/login">Log in</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Register