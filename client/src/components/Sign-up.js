import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Head from './Head';

const UserSignUp = ({ onSignUp }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/users', {
                firstName,
                lastName,
                emailAddress,
                password
            });

            if (response.status === 201) {
                onSignUp(emailAddress, password);
                navigate('/courses');
            }
        } catch (error) {
            console.error("Error creating user", error);
        }
    };

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/courses');
    };

    return (
        <>
        <Head />
        <div className="form--centered">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            <p>
                Already have a user account? <Link to="/signin">Click here</Link> to sign in!
            </p>
        </div>
        </>
    );
};

export default UserSignUp;
