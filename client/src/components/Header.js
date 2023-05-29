import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

// Header component
const Header = () => {
    // Access signOut function and authenticatedUser from AuthContext
    const { signOut, authenticatedUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // Handle sign out
    const handleSignOut = () => {
        signOut();
        navigate('/courses'); // Redirect to courses list after sign out
    };

    // Render the Header component
    return (
        <>
            <div className="wrap header--flex">
                <h1 className="header--logo">
                    <Link to="/courses">Courses</Link>
                </h1>
                <nav>
                    {/* Render different navigation links based on authentication status */}
                    {authenticatedUser ? (
                        <ul className="header--signedin">
                            <li>Welcome, {authenticatedUser.firstName} {authenticatedUser.lastName}!</li>
                            <li>
                                <button className="button button-secondary" onClick={handleSignOut}>Sign Out</button>
                            </li>
                        </ul>
                    ) : (
                        <ul className="header--signedout">
                            <li>
                                <Link to="/signup">Sign Up</Link>
                            </li>
                            <li>
                                <Link to="/signin">Sign In</Link>
                            </li>
                        </ul>
                    )}
                </nav>
            </div>
        </>
    );
};

export default Header;
