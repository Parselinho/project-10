import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Head from './Head';

const Header = () => {
    const { isAuthenticated, user, signOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        navigate('/courses');
    };

    return (
        <><Head />
        <div className="wrap header--flex">
            <h1 className="header--logo">
                <Link to="/courses">Courses</Link>
            </h1>
            <nav>
                {isAuthenticated ? (
                    <ul className="header--signedin">
                        <li>Welcome, {user.name}!</li>
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
