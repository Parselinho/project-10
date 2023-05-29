import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const UserSignIn = () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const signedIn = await signIn(emailAddress, password);
            if(signedIn) {
                navigate('/courses');
            }
        } catch (error) {
            console.error("Error signing in", error);
        }
    };

    return (
        <div className="bounds">
            <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input 
                                id="emailAddress" 
                                name="emailAddress" 
                                type="text"
                                className="" 
                                placeholder="Email Address" 
                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.target.value)} 
                            />
                        </div>
                        <div>
                            <input 
                                id="password" 
                                name="password" 
                                type="password"
                                className="" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button to="/courses" className="button" type="submit">Sign In</button>
                            <Link to="/courses" className="button button-secondary">Cancel</Link>
                        </div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
            </div>
        </div>
    );
};

export default UserSignIn;
