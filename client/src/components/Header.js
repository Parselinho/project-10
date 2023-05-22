import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ user, onSignOut }) => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        onSignOut();
        navigate('/courses');
    };

    return (
        <>
        <div className="wrap header--flex">
            <h1 className="header--logo">
                <Link to="/courses">Courses</Link>
            </h1>
            <nav>
                {user ? (
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
