import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function CreateEmployee() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('');
    const [course, setCourse] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        const errors = {};
        if (!name.trim()||!email.trim()||!mobile.trim()||!designation||!gender||course.length===0) {
            errors.name = "All fields are required";
        }

        if (Object.keys(errors).length === 0) {
            const newEmployee = { name, email, mobile, designation, gender, course };
            axios.post('http://localhost:3001/create-employee', newEmployee)
                .then(result => {
                    console.log(result);
                    navigate('/employees');
                })
                .catch(err => {
                    if (err.response && err.response.data && err.response.data.error) {
                        setErrors({ name: err.response.data.error });
                    } else {
                        console.log(err);
                    }
                });
        } else {
            setErrors(errors);
        }
    };

    return (
        <div>
            <Header/>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <h2 style={{ textAlign: 'center' }}>Create Employee</h2>
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Name:</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Mobile:</label>
                            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Designation:</label>
                            <select value={designation} onChange={(e) => setDesignation(e.target.value)}>
                                <option value="">Select Designation</option>
                                <option value="HR">HR</option>
                                <option value="Manager">Manager</option>
                                <option value="Sales">Sales</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Gender:</label>
                            <div>
                                <input type="radio" id="male" name="gender" value="Male" checked={gender === 'Male'} onChange={() => setGender('Male')} /><label htmlFor="male">Male</label>
                                <input type="radio" id="female" name="gender" value="Female" checked={gender === 'Female'} onChange={() => setGender('Female')} /><label htmlFor="female">Female</label>
                                <input type="radio" id="other" name="gender" value="Other" checked={gender === 'Other'} onChange={() => setGender('Other')} /><label htmlFor="other">Other</label>
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Course:</label>
                            <div>
                                <input type="checkbox" id="mca" name="course" value="MCA" checked={course.includes('MCA')} onChange={(e) => setCourse(e.target.checked ? [...course, 'MCA'] : course.filter(c => c !== 'MCA'))} /><label htmlFor="mca">MCA</label>
                                <input type="checkbox" id="bca" name="course" value="BCA" checked={course.includes('BCA')} onChange={(e) => setCourse(e.target.checked ? [...course, 'BCA'] : course.filter(c => c !== 'BCA'))} /><label htmlFor="bca">BCA</label>
                                <input type="checkbox" id="bsc" name="course" value="BSC" checked={course.includes('BSC')} onChange={(e) => setCourse(e.target.checked ? [...course, 'BSC'] : course.filter(c => c !== 'BSC'))} /><label htmlFor="bsc">BSC</label>
                            </div>
                        </div>
                        <button type="submit" style={{ width: '100%', backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Create Employee</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateEmployee;
