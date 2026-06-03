import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Signup() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = {}

    if (!name.trim()) validationErrors.name = 'Name is required.'
    if (!password.trim()) {
      validationErrors.password = 'Password is required.'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)) {
      validationErrors.password =
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
    }

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post('http://localhost:3001/register', { name, password })
        .then(() => {
          setStatus('Account created successfully. Redirecting to login...')
          setErrors({})
          setTimeout(() => navigate('/'), 1200)
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.error) {
            setErrors({ name: err.response.data.error })
          } else {
            console.log(err)
            setStatus('Unable to create account. Please try again.')
          }
        })
    } else {
      setErrors(validationErrors)
      setStatus('')
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card shadow-lg">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Register to manage employee records with full admin access.</p>
        </div>

        {status && <div className="alert alert-info">{status}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              autoComplete="off"
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className="form-text text-danger">{errors.name}</div>}
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
            {errors.password && <div className="form-text text-danger">{errors.password}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>
          <Link to="/" className="btn btn-outline-secondary btn-sm">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
