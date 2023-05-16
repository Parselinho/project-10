import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'; 

const CourseDetail = () => {
    const { id } = useParams();
    const history = useHistory();
    const [course, setCourse] = useState({});
  
    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${id}`)
        .then(response => {
            setCourse(response.data);
        }) 
        .catch(error => { 
            console.log('Error fetching and parsing data', error);
        });
    }, [id]);

    const deleteCourse = () => {
        axios.delete(`http://localhost:5000/api/courses/${id}`)
        .then(() => {
            history.push("/courses");
        })
        .catch(error => {
            console.log('Error deleting course', error);
        });
    }

    return (
        <div>
            <Header />
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
