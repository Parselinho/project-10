import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './context/AuthContext';
import ReactMarkdown from 'react-markdown';


function CourseDetail() {
    const [course, setCourse] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authenticatedUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const source = axios.CancelToken.source();

        axios.get(`http://localhost:5000/api/courses/${id}`, { cancelToken: source.token })
            .then(response => {
                setCourse(response.data);
                return axios.get(`http://localhost:5000/api/users/${response.data.userId}`,
                    { cancelToken: source.token }
                );
            })
            .then(response => {
                setUser(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                if (!axios.isCancel(error)) {
                    setError('Error fetching and parsing data');
                    setIsLoading(false);
                }
            });

        return () => {
            source.cancel();
        };
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    const handleDelete = () => {
        if (authenticatedUser) {
            const encodedCredentials = btoa(`${authenticatedUser.emailAddress}:${authenticatedUser.password}`);
            axios.delete(`http://localhost:5000/api/courses/${id}`, {
                headers: {
                    'Authorization': `Basic ${encodedCredentials}`
                }
            })
                .then(() => {
                    navigate('/courses');
                })
                .catch(error => {
                    console.log('Error deleting course:', error);
                    setError('There was a problem deleting the course. Please try again.');
                });
        } else {
            // handle the case when authenticatedUser is null.
            navigate('/signin');
        }
    };


    const materials = course.materialsNeeded && course.materialsNeeded.trim()
        ? course.materialsNeeded.split('\n').filter(item => item.trim() !== '').map((item, index) =>
            <li key={index}><ReactMarkdown>{item}</ReactMarkdown></li>)
        : [];

    return (
        <>
            <div>
                <main>
                    <div className="actions--bar">
                        <div className="wrap">
                            {
                                authenticatedUser && authenticatedUser.id === user.id && (
                                    <>
                                        <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                                        <button className="button" onClick={handleDelete}>Delete Course</button>
                                    </>
                                )
                            }
                            <Link className="button button-secondary" to="/courses">Return to List</Link>
                        </div>
                    </div>

                    <div className="wrap">
                        <h2>Course Detail</h2>
                        <form>
                            <div className="main--flex">
                                <div>
                                    <h3 className="course--detail--title">Course</h3>
                                    <h4 className="course--name">{course.title}</h4>
                                    <p>By {user && `${user.firstName} ${user.lastName}`}</p>
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
