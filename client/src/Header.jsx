import React from 'react'
import { NavLink } from 'react-router-dom'
import dpImage from './assets/dp.jpeg'

function Header() {
  return (
    <header className="app-header">
      <div className="brand-card">
        <img src={dpImage} alt="Brand" className="brand-image" />
        <div>
          <h1 className="brand-title">MERN Employee</h1>
          <span className="brand-subtitle">Admin dashboard experience</span>
        </div>
      </div>

      <nav className="nav-links">
        <NavLink to="/home" className="nav-link">
          Dashboard
        </NavLink>
        <NavLink to="/employees" className="nav-link">
          Employees
        </NavLink>
        <NavLink to="/create-employee" className="nav-link">
          Add Employee
        </NavLink>
      </nav>

      <div className="profile-pill">
        <span>Admin</span>
      </div>
    </header>
  )
}

export default Header
