import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import Head from './Head'; 

const CourseDetail = () => {
    const { id } = useParams();
    const history = useHistory();
    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${id}`)
        .then(response => {
            setCourse(response.data);
            setIsLoading(false);
        }) 
        .catch(error => { 
            setError('Error fetching and parsing data');
            setIsLoading(false);
        });
    }, [id]);

    const deleteCourse = () => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            axios.delete(`http://localhost:5000/api/courses/${id}`)
            .then(() => {
                history.push("/courses");
            })
            .catch(error => {
                setError('Error deleting course');
            });
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    if (course === null) {
        return <div>Course not found</div>
    }

    return (
        <div>
            <Head />
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {course.User && `${course.User.firstName} ${course.User.lastName}`}</p>
                            {course.description && course.description.split('\n').map((para, index) => <p key={index}>{para}</p>)}
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {course.materialsNeeded && course.materialsNeeded.split('\n').map((material, index) => <li key={index}>{material}</li>)}
                            </ul>
                            <button onClick={deleteCourse}>Delete Course</button>
                            <Link to={`/courses/${id}/update`}>Update Course</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default CourseDetail;
