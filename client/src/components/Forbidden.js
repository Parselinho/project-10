import React from 'react';
import { Link } from 'react-router-dom';


const ForbiddenPage = () => {
    return (
        <><div>
            {/* <header>
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
            </header> */}
            <main>
                <div className="wrap">
                    <h2>Forbidden</h2>
                    <p>Oh oh! You can't access this page.</p>
                </div>
            </main>
        </div></>
    );
};

export default ForbiddenPage;
