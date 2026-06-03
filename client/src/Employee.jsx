import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Header from './Header'

function CreateEmployee() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: []
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === 'course') {
      setForm((prev) => ({
        ...prev,
        course: checked ? [...prev.course, value] : prev.course.filter((item) => item !== value)
      }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const validate = () => {
    const validationErrors = {}
    if (!form.name.trim()) validationErrors.name = 'Please enter employee name.'
    if (!form.email.trim()) validationErrors.email = 'Please enter employee email.'
    if (!form.mobile.trim()) validationErrors.mobile = 'Please enter mobile number.'
    if (!form.designation) validationErrors.designation = 'Please select a designation.'
    if (!form.gender) validationErrors.gender = 'Please select gender.'
    if (!form.course.length) validationErrors.course = 'Please select at least one course.'
    return validationErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      setStatus('')
      return
    }

    axios
      .post('http://localhost:3001/create-employee', form)
      .then(() => {
        setStatus('Employee created successfully.')
        setErrors({})
        setForm({ name: '', email: '', mobile: '', designation: '', gender: '', course: [] })
        setTimeout(() => navigate('/employees'), 1200)
      })
      .catch((err) => {
        console.error(err)
        setStatus('Failed to create employee. Please try again.')
      })
  }

  return (
    <div className="app-shell">
      <Header />
      <div className="page-content container">
        <div className="card card-custom mx-auto" style={{ maxWidth: '820px' }}>
          <div className="card-header">
            <div>
              <h3 className="mb-0">Create Employee</h3>
              <p className="text-muted mb-0">Use the form to add a new employee profile.</p>
            </div>
            <Link to="/employees" className="btn btn-outline-light">
              Back to list
            </Link>
          </div>
          <div className="card-body">
            {status && <div className="alert alert-info">{status}</div>}
            <form onSubmit={handleSubmit}>
              <div className="row gy-3">
                <div className="col-md-6">
                  <label className="form-label">Name</label>
                  <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} />
                  {errors.name && <div className="form-text text-danger">{errors.name}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} />
                  {errors.email && <div className="form-text text-danger">{errors.email}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Mobile</label>
                  <input type="text" name="mobile" className="form-control" value={form.mobile} onChange={handleChange} />
                  {errors.mobile && <div className="form-text text-danger">{errors.mobile}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Designation</label>
                  <select name="designation" className="form-select" value={form.designation} onChange={handleChange}>
                    <option value="">Select Designation</option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                  </select>
                  {errors.designation && <div className="form-text text-danger">{errors.designation}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Gender</label>
                  <div className="d-flex gap-3 flex-wrap">
                    {['Male', 'Female', 'Other'].map((option) => (
                      <label className="form-check form-check-inline" key={option}>
                        <input className="form-check-input" type="radio" name="gender" value={option} checked={form.gender === option} onChange={handleChange} />
                        <span className="form-check-label">{option}</span>
                      </label>
                    ))}
                  </div>
                  {errors.gender && <div className="form-text text-danger">{errors.gender}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Course</label>
                  <div className="d-flex gap-3 flex-wrap">
                    {['MCA', 'BCA', 'BSC'].map((course) => (
                      <label className="form-check form-check-inline" key={course}>
                        <input className="form-check-input" type="checkbox" name="course" value={course} checked={form.course.includes(course)} onChange={handleChange} />
                        <span className="form-check-label">{course}</span>
                      </label>
                    ))}
                  </div>
                  {errors.course && <div className="form-text text-danger">{errors.course}</div>}
                </div>
              </div>
              <div className="mt-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                <button type="submit" className="btn btn-primary btn-lg">
                  Save Employee
                </button>
                <Link to="/employees" className="btn btn-outline-secondary btn-lg">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateEmployee
