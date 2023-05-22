import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        let errorMessages = [];
        if (title === '') errorMessages.push("Please provide a value for 'Title'");
        if (description === '') errorMessages.push("Please provide a value for 'Description'");
        setErrors(errorMessages);

        if (errorMessages.length > 0) return;

        try {
            const response = await axios.post('http://localhost:5000/api/courses', {
                title,
                description,
                estimatedTime,
                materialsNeeded
            });

            if (response.status === 201) {
                navigate('/courses'); 
            }
        } catch (error) {
            console.error("Error creating course", error);
        }
    };

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/courses'); // navigate to the list of courses
    };

    return (
            <>
            <div>
            {/* <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo">
                       <Link to="/courses">Courses</Link> 
                    </h1>
                    <nav>
                        <ul className="header-signedin">
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
                    <h2>Create Course</h2>
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

                                <p>By Joe Smith</p>

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
        </div></>
    )
};

export default CreateCourse;
