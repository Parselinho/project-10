import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Head from './Head';

const UserSignIn = () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

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
                // user signed in successfully
                // navigate to courses
                history.push('/courses');
            }
        } catch (error) {
            console.error("Error signing in", error);
        }
    };

    const handleCancel = (event) => {
        event.preventDefault();
        history.push('/courses'); // navigate to the list of courses
    };

    return (
        <div>
            <Head />
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
                            onChange={(e) => setEmailAddress(e.target.value)}
                        />

                        <label htmlFor="password">Password</label>
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className="button" type="submit">Sign In</button>
                        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                    </form>
                    <p>Don't have a user account? Click here to <a href="/sign-up">sign up</a>!</p>
                </div>
            </main>
        </div>
    )
};

export default UserSignIn;
