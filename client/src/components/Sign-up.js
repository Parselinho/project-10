import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const UserSignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/users', {
                firstName,
                lastName,
                emailAddress: email,
                password
            });

            if (response.status === 201) {
                // user created successfully, now sign in the user
                const encodedCredentials = window.btoa(`${email}:${password}`);
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
            }
        } catch (error) {
            console.error("Error signing up", error);
        }
    };

    const handleCancel = () => {
        history.push('/'); // navigate to the default route
    };

    return (
        <form onSubmit={handleSignUp}>
            <label>
                First Name:
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
            </label>
            <label>
                Last Name:
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Sign Up</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
    );
};

export default UserSignUp;
