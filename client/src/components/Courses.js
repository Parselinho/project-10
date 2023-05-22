import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Head from './Head';

function Courses() {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/courses')
            .then(response => {
                setCourses(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError('Error fetching and parsing data');
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (

        <div>
            {/* <header>
                <div className="wrap header--flex">
                <h1 className='header--logo'>
                <Link to="/courses">Courses</Link>
                </h1>
                <nav>
                    <ul className="header--signedout">
                    <li>
                        <Link to="/signup">Sign Up</Link>
                        <Link to="/signin">Sign In</Link>
                    </li>
                    </ul>
                </nav>
                </div>
            </header> */}

            <main>
                <div className="wrap main--grid">
                    {courses.map(course => (
                        <Link className="course--module course--link" key={course.id} to={`/courses/${course.id}`}>
                            <h2 className="course--label">Course</h2>
                            <h3 className="course--title">{course.title}</h3>
                        </Link>
                    ))}
                    <Link className="course--module course--add--module" to="/courses/create">
                        <span className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6"></polygon>
                            </svg>
                            New Course
                        </span>
                    </Link>
                </div>
            </main>
        </div>
    )
}

export default Courses;
