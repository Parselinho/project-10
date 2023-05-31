import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

// CreateCourse component
const CreateCourse = () => {
    // State variables
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const { authenticatedUser } = useContext(AuthContext);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(authenticatedUser);

        // Encode user credentials for authentication
        const encodedCredentials = btoa(`${authenticatedUser.emailAddress}:${authenticatedUser.password}`);

        try {
            // Send POST request to create a new course
            const response = await axios.post('http://localhost:5000/api/courses', {
                title,
                description,
                estimatedTime,
                materialsNeeded
            }, {
                headers: {
                    'Authorization': `Basic ${encodedCredentials}`
                }
            });

            if (response.status === 201) {
                navigate('/courses'); // Redirect to courses list on successful creation
            }
        } catch (error) {
            console.error("Error creating course", error);
            if (error.response) {
                if (error.response.status === 500) {
                    navigate('/error'); // Navigate to error page if server returns a 500 status code
                } else if (error.response.data.errors) {
                    setErrors(error.response.data.errors);
                }
            }
        }
    };

    // Handle cancellation
    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/courses'); // Redirect to courses list on cancellation
    };

    // Render the CreateCourse component
    return (
        <>
            <div>
                <main>
                    <div className="wrap">
                        <h2 className='bold'>Create Course</h2>
                        {/* Render validation errors, if any */}
                        {errors.length > 0 && (
                            <div className="validation--errors">
                                <h3>Validation Errors</h3>
                                <ul>
                                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                                </ul>
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="main--flex">
                                <div>
                                    <label htmlFor="courseTitle">Course Title</label>
                                    <input
                                        id="courseTitle"
                                        name="courseTitle"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)} />

                                    <p>By {authenticatedUser.firstName} {authenticatedUser.lastName}</p>

                                    <label htmlFor="courseDescription">Course Description</label>
                                    <textarea
                                        id="courseDescription"
                                        name="courseDescription"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                    <input
                                        id="estimatedTime"
                                        name="estimatedTime"
                                        type="text"
                                        value={estimatedTime}
                                        onChange={(e) => setEstimatedTime(e.target.value)} />

                                    <label htmlFor="materialsNeeded">Materials Needed</label>
                                    <textarea
                                        id="materialsNeeded"
                                        name="materialsNeeded"
                                        value={materialsNeeded}
                                        onChange={(e) => setMaterialsNeeded(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <button className="button" type="submit">Create Course</button>
                            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                        </form>
                    </div>
                </main>
            </div>
        </>
    )
};

export default CreateCourse;
