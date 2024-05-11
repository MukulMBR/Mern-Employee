import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Header from "./Header";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch the list of employees from the server
        axios.get('http://localhost:3001/employees')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
            });
    }, []);

    const handleDelete = (id) => {
        // Delete the employee with the given id
        axios.delete(`http://localhost:3001/employees/${id}`)
            .then(response => {
                // Remove the deleted employee from the list
                setEmployees(employees.filter(employee => employee._id !== id));
            })
            .catch(error => {
                console.error('Error deleting employee:', error);
            });
    };

    // Filter employees based on search term
    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Header/>
            <h2 style={{ textAlign: 'center' }}>Employee List</h2>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                <div>
                    <Link to="/create-employee" style={{ textDecoration: 'none', backgroundColor: '#007bff', color: '#fff', padding: '8px 12px', borderRadius: '5px' }}>Create Employee</Link>
                </div>
            </div>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr style={{ backgroundColor: '#007bff', color: '#fff' }}>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Mobile</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Designation</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Gender</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Course</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map(employee => (
                        <tr key={employee._id} style={{ backgroundColor: '#f2f2f2' }}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.name}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.email}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.mobile}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.designation}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.gender}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.course.join(', ')}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                <Link to={`/update/${employee._id}`} style={{ marginRight: '5px' }}>Update</Link>
                                <button onClick={() => handleDelete(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
