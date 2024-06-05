import React, { useState } from 'react';
import './Signup.css'; // Make sure the CSS file is imported
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { signup } from '../../lambda-calls/LambdaCalls';
import random from 'random'

interface FormData {
    id: number
    name: string;
    email: string;
    password: string;
}

const Signup: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({id: 0, name: '', email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    let navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form Data Submitted: ', formData);
        // Handle the submission logic here
        if (formData.email !== "" && formData.password !== "") {
            let data = {
                ...formData,
                id: random.int((0), (10000))
            }
            signup(data)
            .then(res => {
                navigate("/login")
            })
            .catch(err => {
                alert(err)
            })
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <br></br>
            <NavLink to="/login" >Already have an account ?, click here</NavLink>
        </div>
    );
};

export default Signup;
