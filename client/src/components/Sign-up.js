import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Head from './Head';
import { AuthContext } from './context/AuthContext';

const UserSignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const { setUser } = useContext(AuthContext);

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
                // user created successfully, now sign in the user
                const encodedCredentials = window.btoa(`${emailAddress}:${password}`);
                const authHeader = `Basic ${encodedCredentials}`;

                const response = await axios.get('http://localhost:5000/api/users', {
                    headers: {
                        'Authorization': authHeader
                    }
                });

                if (response.status === 200) {
                    // user signed in successfully
                    // Set the user in context
                    setUser(response.data);
                    // navigate to courses
                    navigate('/courses');
                }
            }
        } catch (error) {
            console.error("Error creating user", error);
        }
    };

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/courses'); // navigate to the list of courses
    };

    return (
        <>
        <Head />
        <div id="root">
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo">
                        <Link to="/courses">Courses</Link>
                    </h1>
                    <nav>
                        <ul className="header--signedout">
                            <li>
                                <Link to="/signup">Sign Up</Link>
                            </li>
                            <li>
                                <Link to="/signin">Sign In</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main>
                <div className="form--centered">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} />

                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)} />

                        <label htmlFor="emailAddress">Email Address</label>
                        <input
                            id="emailAddress"
                            name="emailAddress"
                            type="email"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)} />

                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />

                        <button className="button" type="submit">Sign Up</button>
                        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                    </form>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </main>
        </div>
        </>
    );
};

export default UserSignUp;
