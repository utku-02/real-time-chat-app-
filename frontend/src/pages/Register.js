import React, { useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';
import '../style/register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');
        const token = jwt.sign({ username: formData.username, email: formData.email }, 'secret_key');
        try {
            const response = await axios.post('/api/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                token: token
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {error && <div className="error-message">{error}</div>}
            <form className="register-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                <button type="submit">Register</button>
            </form>
            <div className="register-link">
                <span>Already have an account?</span>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default Register;
