import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

function Signup() {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Basic validation
        const errors = {};
        if (!name.trim()) {
            errors.name = "Name is required";
        }
        if (!password.trim()) {
            errors.password = "Password is required";
        } else if (
            !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)
        ) {
            errors.password =
                "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
        }
    
        if (Object.keys(errors).length === 0) {
            axios.post('http://localhost:3001/register', { name, password })
                .then(result => {
                    console.log(result);
                    navigate('/');
                })
                .catch(err => {
                    if (err.response && err.response.data && err.response.data.error) {
                        // Handle specific error case: Name already exists
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
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            className="form-control rounded-0"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p className="text-danger">{errors.name}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="text-danger">{errors.password}</p>}
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register
                    </button>
                </form>
                <p>Already Have an Account</p>
                <Link to ='/' className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
