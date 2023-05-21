import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Head from './Head';
import { AuthContext } from './context/AuthContext';

const UserSignIn = () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    // Use context
    const auth = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const encodedCredentials = window.btoa(`${emailAddress}:${password}`);
            const authHeader = `Basic ${encodedCredentials}`;

            const response = await axios.get('http://localhost:5000/api/users', {
                headers: {
                    'Authorization': authHeader
                }
            });

            if (response.status === 200) {
                // User signed in successfully, update context
                auth.signIn(emailAddress, password);
                // Navigate to courses
                navigate.push('/courses');
            }
        } catch (error) {
            console.error("Error signing in", error);
        }
    };

    const handleCancel = (event) => {
        event.preventDefault();
        navigate.push('/courses'); // navigate to the list of courses
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
                    <h2>Sign In</h2>
                    <form onSubmit={handleSubmit}>
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
                        <button className="button" type="submit">Sign In</button>
                        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                    </form>
                    <p>
                        Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
                    </p>
                </div>
            </main>
        </div>
        </>
    );
};

export default UserSignIn;

