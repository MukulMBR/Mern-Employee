import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import Header from "./Header";
import CreateEmployee from './Employee'
import EmployeeList from './EmployeeList'
import UpdateEmployee from './UpdateEmployee';

import{BrowserRouter, Routes, Route} from 'react-router-dom'
function App() {
  
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/register" element={<Signup/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/update/:id" component={UpdateEmployee} />
      <Route path="/employees" element={<EmployeeList/>}></Route>
      <Route path="/create-employee" element={<CreateEmployee/>}></Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App
