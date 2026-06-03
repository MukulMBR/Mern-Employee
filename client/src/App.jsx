import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import CreateEmployee from './Employee'
import EmployeeList from './EmployeeList'
import UpdateEmployee from './UpdateEmployee'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/update/:id" element={<UpdateEmployee />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
