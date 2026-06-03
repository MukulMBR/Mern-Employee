import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Header from './Header'

function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/employees')
      .then((response) => {
        setEmployees(response.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching employees:', err)
        setError('Unable to load employees. Please try again later.')
        setLoading(false)
      })
  }, [])

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/employees/${id}`)
      .then(() => {
        setEmployees((current) => current.filter((employee) => employee._id !== id))
      })
      .catch((err) => {
        console.error('Error deleting employee:', err)
        setError('Unable to delete employee. Please try again.')
      })
  }

  const filteredEmployees = employees.filter((employee) =>
    employee.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="app-shell">
      <Header />
      <div className="page-content container">
        <div className="page-header d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
          <div>
            <h2>Employee Directory</h2>
            <p className="text-muted">Browse, search, update, and remove employee records.</p>
          </div>
          <Link to="/create-employee" className="btn btn-primary btn-lg">
            Add Employee
          </Link>
        </div>

        <div className="card card-custom mb-4">
          <div className="card-body row g-3 align-items-center">
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Search employees by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-md-6 text-md-end">
              <span className="text-muted">Total employees: {employees.length}</span>
            </div>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card card-custom table-card">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">Loading employees...</div>
            ) : filteredEmployees.length === 0 ? (
              <div className="text-center py-5">No employees found.</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-borderless align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Designation</th>
                      <th>Gender</th>
                      <th>Course</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <tr key={employee._id}>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.mobile}</td>
                        <td>{employee.designation}</td>
                        <td>{employee.gender}</td>
                        <td>
                          {(Array.isArray(employee.course) ? employee.course : [employee.course]).map((course) => (
                            <span key={course} className="badge badge-course me-1">
                              {course}
                            </span>
                          ))}
                        </td>
                        <td className="text-end">
                          <Link to={`/update/${employee._id}`} className="btn btn-sm btn-outline-primary me-2">
                            Update
                          </Link>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(employee._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeList
