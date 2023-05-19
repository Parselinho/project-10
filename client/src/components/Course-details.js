import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Head from './Head';

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

    const materials = course.materialsNeeded.split('\n').map((item, index) => <li key={index}>{item}</li>);

    return (
        <div>
            <Head />
            <h1>{course.title}</h1>
            <p>By {user.firstName} {user.lastName}</p>
            <p>{course.description}</p>
            <ul>{materials}</ul>
            <button onClick={handleDelete}>Delete Course</button>
            <Link to={`/courses/${course.id}/update`}>Update Course</Link>
        </div>
    )
}

export default CourseDetail;
