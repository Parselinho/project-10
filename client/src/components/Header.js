import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const Header = () => {
    const { signOut, authenticatedUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        navigate('/courses');
    };

    return (
        <>
        <div className="wrap header--flex">
            <h1 className="header--logo">
                <Link to="/courses">Courses</Link>
            </h1>
            <nav>
                {authenticatedUser ? (
                    <ul className="header--signedin">
                        <li>Welcome, {authenticatedUser.firstName} {authenticatedUser.lastName}!</li>
                        <li>
                            <button onClick={handleSignOut}>Sign Out</button>
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
