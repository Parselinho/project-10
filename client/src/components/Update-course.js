import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const UpdateCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState({
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(response => {
                setCourse(response.data);
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }, [id]);

    const handleChange = (event) => {
        setCourse({
            ...course,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:5000/api/courses/${id}`, course)
            .then(() => {
                navigate(`/courses/${id}`);
            })
            .catch(error => {
                console.log('Error updating course', error);
            });
    }

    return (
            <>
            <div>
            {/* <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo">
                        <Link to="/courses">Courses</Link>
                    </h1>
                    <nav>
                        <ul className="header--signedin">
                            <li>Welcome Joe Smith!</li>
                            <li>
                                <Link to="/signout">Sign Out</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header> */}
            <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="title" type="text" value={course.title} onChange={handleChange} />

                            <p>By Joe Smith</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="description" value={course.description} onChange={handleChange}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={course.estimatedTime} onChange={handleChange} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={course.materialsNeeded} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button>
                    <Link className="button button-secondary" to={`/courses/${id}`}>Cancel</Link>
                </form>
            </div>
          </main>
        </div></>
    )
}

export default UpdateCourse;
