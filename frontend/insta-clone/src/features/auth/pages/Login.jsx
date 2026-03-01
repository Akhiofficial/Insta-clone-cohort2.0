import "../style/form.scss"
import { Link } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
import {
  Instagram,
  Facebook,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  Leaf
} from 'lucide-react'

const Login = () => {
  const { loading, handlelogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("");
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    try {
      await handlelogin(username, password);
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || "Invalid username or password");
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
            <h2 style={{ fontSize: '1.5rem' }}>Securing Session...</h2>
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
          <p>The future of social connection. Minimalist, fluid, and designed for the next generation of creators.</p>
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
            <h2>Instagram</h2>
            <p className="subtitle">Login with your credentials</p>

            {error && (
              <div className="error-container">
                {error}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  name='username'
                  type="text"
                  placeholder='Phone, username or email'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>

              <div className="input-group">
                <input
                  name='password'
                  type={showPassword ? "text" : "password"}
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <div className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>

              <Link to="/forgot" className="forgot-password">Forgot password?</Link>

              <button className='primary-button' type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>


            <div className="auth-footer">
              Don't have an account? <Link to="/register">Sign up</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login