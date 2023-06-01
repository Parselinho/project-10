import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Courses component
function Courses() {
    // State variables
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null);

    // Hook for navigation
    const navigate = useNavigate();

    // Fetch courses data on component mount
    useEffect(() => {
        axios.get('http://localhost:5000/api/courses')
            .then(response => {
                setCourses(response.data); // Set courses state variable
                setIsLoading(false); // Set loading state variable
            })
            .catch(error => {
                if (error.response && error.response.status === 500) {
                    navigate('/error');
                } else {
                    setError('Error fetching and parsing data');
                    setIsLoading(false);
                }
            });
    }, [navigate]);

    // Render loading message while data is being fetched
    if (isLoading) { 
        return <div>Loading...</div>;
    }

    // Render error message if there was an error fetching data
    if (error) {
        return <div>{error}</div>;
    }

    // Render the courses component
    return (
        <div>
            <main>
                <div className="wrap main--grid">
                    {/* Map over courses data and render course modules */}
                    {courses.map(course => (
                        <Link className="course--module course--link" key={course.id} to={`/courses/${course.id}`}>
                            <h2 className="course--label">Course</h2>
                            <h3 className="course--title">{course.title}</h3>
                        </Link>
                    ))}
                    {/* Render module for creating a new course */}
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
