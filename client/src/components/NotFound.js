import React from 'react';
import { Link } from 'react-router-dom';
import Head from './Head';

const NotFoundPage = () => {
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
                    <h2>Not Found</h2>
                    <p>Sorry! We couldn't find the page you're looking for.</p>
                </div>
            </main>
        </div></>
    );
};

export default NotFoundPage;
