import React from 'react';
import { Link } from 'react-router-dom';
import Head from './Head';

const ErrorPage = () => {
    return (
        <><Head />
            <div id="root">
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo">
                        <Link to="/courses">Courses</Link>
                    </h1>
                    <nav>
                        <ul className="header--signedin">
                            <li>Welcome, Joe Smith!</li>
                            <li>
                                <Link to="/sign-out">Sign Out</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main>
                <div className="wrap">
                    <h2>Error</h2>
                    <p>Sorry! We just encountered an unexpected error.</p>
                </div>
            </main>
        </div>
        </>
    );
};

export default ErrorPage;
