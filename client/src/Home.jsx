import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Header from './Header'

function Home() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    departments: 0
  })

  useEffect(() => {
    axios
      .get('http://localhost:3001/employees')
      .then((response) => {
        const employees = response.data || []
        const uniqueDepts = new Set(
          employees.map((emp) => emp.designation).filter(Boolean)
        )
        setStats({
          totalEmployees: employees.length,
          departments: uniqueDepts.size
        })
      })
      .catch((error) => {
        console.error('Error fetching employee stats:', error)
        setStats({ totalEmployees: 0, departments: 0 })
      })
  }, [])

  return (
    <div className="app-shell">
      <Header />
      <div className="page-content container">
        <div className="hero-card row align-items-center">
          <div className="col-lg-7">
            <h2>Welcome to the Employee Management Dashboard</h2>
            <p className="hero-text">
              Track teams, create secure records, and manage employee details from one modern portal.
            </p>
            <div className="hero-actions">
              <Link to="/create-employee" className="btn btn-primary btn-lg me-3">
                Add Employee
              </Link>
              <Link to="/employees" className="btn btn-outline-light btn-lg">
                View Employees
              </Link>
            </div>
          </div>
          <div className="col-lg-5 hero-stats">
            <div className="stat-card bg-soft">
              <h3>{stats.totalEmployees}</h3>
              <span>Total Employees</span>
            </div>
            <div className="stat-card bg-soft">
              <h3>{stats.departments}</h3>
              <span>Departments</span>
            </div>
            <div className="stat-card bg-soft">
              <h3>{stats.totalEmployees > 0 ? '100%' : '0%'}</h3>
              <span>System Active</span>
            </div>
          </div>
        </div>

        <div className="row py-4 g-4">
          <div className="col-md-4">
            <div className="card card-custom shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Fast Search</h5>
                <p className="card-text">Search employees instantly with name filtering and quick actions.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-custom shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Secure Login</h5>
                <p className="card-text">Login support with validation and user flow ready for enhanced security.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-custom shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Modern UI</h5>
                <p className="card-text">A refreshed admin experience built with responsive layout and polished visuals.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
