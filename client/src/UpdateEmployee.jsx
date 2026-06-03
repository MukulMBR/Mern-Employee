import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'
import Header from './Header'

function UpdateEmployee() {
  const { id } = useParams()
  const [employee, setEmployee] = useState({
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

  useEffect(() => {
    axios
      .get(`http://localhost:3001/employees/${id}`)
      .then((response) => {
        setEmployee(response.data)
      })
      .catch((error) => {
        console.error('Error fetching employee:', error)
        setStatus('Unable to load employee details.')
      })
  }, [id])

  const handleChange = (e) => {
    const { name, value, checked } = e.target
    if (name === 'course') {
      setEmployee((prev) => ({
        ...prev,
        course: checked ? [...prev.course, value] : prev.course.filter((item) => item !== value)
      }))
    } else {
      setEmployee((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = {}

    if (!employee.name.trim()) validationErrors.name = 'Name is required'
    if (!employee.email.trim()) validationErrors.email = 'Email is required'
    if (!employee.mobile.trim()) validationErrors.mobile = 'Mobile is required'
    if (!employee.designation) validationErrors.designation = 'Designation is required'
    if (!employee.gender) validationErrors.gender = 'Gender is required'
    if (!employee.course.length) validationErrors.course = 'Select at least one course'

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }

    axios
      .put(`http://localhost:3001/employees/${id}`, employee)
      .then(() => {
        setStatus('Employee updated successfully.')
        setErrors({})
        setTimeout(() => navigate('/employees'), 1000)
      })
      .catch((err) => {
        console.error('Error updating employee:', err)
        setStatus('Failed to update employee. Please try again.')
      })
  }

  return (
    <div className="app-shell">
      <Header />
      <div className="page-content container">
        <div className="card card-custom mx-auto" style={{ maxWidth: '820px' }}>
          <div className="card-header d-flex justify-content-between align-items-center">
            <div>
              <h3 className="mb-0">Update Employee</h3>
              <p className="text-muted mb-0">Change the employee details and save the updated profile.</p>
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
                  <input type="text" name="name" className="form-control" value={employee.name} onChange={handleChange} />
                  {errors.name && <div className="form-text text-danger">{errors.name}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" value={employee.email} onChange={handleChange} />
                  {errors.email && <div className="form-text text-danger">{errors.email}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Mobile</label>
                  <input type="text" name="mobile" className="form-control" value={employee.mobile} onChange={handleChange} />
                  {errors.mobile && <div className="form-text text-danger">{errors.mobile}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Designation</label>
                  <select className="form-select" name="designation" value={employee.designation} onChange={handleChange}>
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
                        <input className="form-check-input" type="radio" name="gender" value={option} checked={employee.gender === option} onChange={handleChange} />
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
                        <input className="form-check-input" type="checkbox" name="course" value={course} checked={employee.course.includes(course)} onChange={handleChange} />
                        <span className="form-check-label">{course}</span>
                      </label>
                    ))}
                  </div>
                  {errors.course && <div className="form-text text-danger">{errors.course}</div>}
                </div>
              </div>
              <div className="mt-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                <Link to="/employees" className="btn btn-outline-secondary btn-lg">
                  Cancel
                </Link>
                <button type="submit" className="btn btn-primary btn-lg">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateEmployee
