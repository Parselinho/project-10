import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
// import Head from './Head';

function CourseDetail() {
    const [course, setCourse] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const source = axios.CancelToken.source();
    
        axios.get(`http://localhost:5000/api/courses/${id}`, { cancelToken: source.token })
            .then(response => {
                setCourse(response.data);
                return axios.get(`http://localhost:5000/api/courses/${response.data.userId}`,
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
        axios.delete(`http://localhost:5000/api/courses/${id}`)
            .then(() => {
                // redirecting to the list of courses
            })
            .catch(error => {
                console.log('Error deleting course:', error);
                setError('There was a problem deleting the course. Please try again.');
            });
    };

    const materials = course.materialsNeeded && course.materialsNeeded.trim() 
    ? course.materialsNeeded.split('\n').filter(item => item.trim() !== '').map((item, index) => <li key={index}>{item}</li>) 
    : [];
  
    return (
        <>
            {/* <Head /> */}
            <div>
            <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                    <ul className="header--signedin">
                        <li>Welcome, {user && `${user.firstName} ${user.lastName}`}!</li>
                        <li><Link to="/sign-out">Sign Out</Link></li>
                    </ul>
                </nav>
            </div>
            </header>

            <main>
                <div className="actions--bar">
                    <div className="wrap">
                        <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                        <button className="button" onClick={handleDelete}>Delete Course</button>
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
                                <p>{course.description}</p>
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{course.estimatedTime}</p>

                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ul className="course--detail--list">
                                    {materials.map((material, index) => (
                                     <li key={index}>{material}</li>
                                ))}
                            </ul>
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
