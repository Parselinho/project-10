import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSignIn = async (e) => {
        e.preventDefault();

        const encodedCredentials = window.btoa(`${email}:${password}`);
        const authHeader = `Basic ${encodedCredentials}`;

        try {
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

    const handleCancel = () => {
        history.push('/'); // navigate to the default route
    };

    return (
        <form onSubmit={handleSignIn}>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Sign In</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
    );
};

export default SignIn;
