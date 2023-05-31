import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './context/AuthContext';
import ReactMarkdown from 'react-markdown';

// Course detail component
function CourseDetail() {
    // State variables
    const [course, setCourse] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Context and navigation hooks
    const { authenticatedUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // Retrieve course ID from URL parameters
    const { id } = useParams();

    // Fetch course and user data on component mount
    useEffect(() => {
        // Create a cancel token source for cancelling requests
        const source = axios.CancelToken.source(); 
    
        // Fetch course data
        axios.get(`http://localhost:5000/api/courses/${id}`, { cancelToken: source.token }) // Pass the cancel token to the request
            .then(response => {
                if (!response.data) {
                    navigate('/notfound');
                } else {
                    setCourse(response.data);
                    // Fetch user data for the course owner
                    return axios.get(`http://localhost:5000/api/users/${response.data.userId}`, { cancelToken: source.token }); 
                }
            })
            .then(response => {
                setUser(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                if (!axios.isCancel(error)) {
                  if (error.response && error.response.status === 500) {
                    // If the server returns a 500 status code, navigate to the error page
                    navigate('/error');
                  } else {
                    navigate('/notfound') // If the server returns a 404 status code, navigate to the not found page
                    setIsLoading(false);
                  }
                }
              });
    
        // Cleanup function to cancel requests on component 
        return () => {
            source.cancel();
        };
    }, [id, navigate]);

    // Render loading message while data is being fetched
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Render error message if there was an error fetching data
    if (error) {
        return <div>{error}</div>;
    }

    // Function to handle course deletion
    const handleDelete = () => {
        if (authenticatedUser) {
            // Encode user credentials for authentication
            const encodedCredentials = btoa(`${authenticatedUser.emailAddress}:${authenticatedUser.password}`);
            // Send delete request to the API with authentication headers
            axios.delete(`http://localhost:5000/api/courses/${id}`, {
                headers: {
                    'Authorization': `Basic ${encodedCredentials}`
                }
            })
                .then(() => {
                    navigate('/courses'); // Navigate to the courses list after successful deletion
                })
                .catch(error => {
                    console.log('Error deleting course:', error);
                    setError('There was a problem deleting the course. Please try again.');
                });
        } else {
            navigate('/signin'); // If user is not authenticated, redirect to sign-in page
        }
    };

    // Render the materials list using ReactMarkdown for proper rendering
    const materials = course.materialsNeeded && course.materialsNeeded.trim()
        ? course.materialsNeeded.split('\n').filter(item => item.trim() !== '').map((item, index) =>
            <li key={index}><ReactMarkdown>{item}</ReactMarkdown></li>)
        : [];

    // Render the course detail component
    return (
        <>
            <div>
                <main>
                    <div className="actions--bar">
                        <div className="wrap">
                            {/* Render action buttons for course owner */}
                            {
                                authenticatedUser && authenticatedUser.id === user.id && (
                                    <>
                                        <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                                        <button className="button" onClick={handleDelete}>Delete Course</button>
                                    </>
                                )
                            }
                            {/* Return to courses list button */}
                            <Link className="button button-secondary" to="/courses">Return to List</Link>
                        </div>
                    </div>

                    <div className="wrap">
                        <h2 className="bold">Course Detail</h2>
                        <form>
                            <div className="main--flex">
                                <div className='course--description'>
                                    <h3 className="course--detail--title">Course</h3>
                                    <h4 className="course--name">{course.title}</h4>
                                    <p className='marginBottom'>By {user && `${user.firstName} ${user.lastName}`}</p>
                                    <ReactMarkdown>{course.description}</ReactMarkdown>
                                </div>
                                <div>
                                    <h3 className="course--detail--title">Estimated Time</h3>
                                    <p>{course.estimatedTime}</p>

                                    <div>
                                        <h3 className="course--detail--title">Materials Needed</h3>
                                        <ul className="course--detail--list">
                                            {materials}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}

export default CourseDetail;
