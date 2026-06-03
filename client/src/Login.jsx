import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:3001/', { username, password })
      .then((result) => {
        if (result.data.message === 'Success') {
          navigate('/home', { state: { username: result.data.username } })
        } else {
          setError(result.data)
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setError(err.response.data)
        } else {
          console.log(err)
          setError('Unable to login at this time.')
        }
      })
  }

  return (
    <div className="auth-shell">
      <div className="auth-card shadow-lg">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to access the employee dashboard.</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              autoComplete="off"
              name="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <div className="auth-footer">
          <span>Don't have an account?</span>
          <Link to="/register" className="btn btn-outline-secondary btn-sm">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
