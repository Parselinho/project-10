import React, { useState } from 'react';
import Header from './Header'; 

const CreateCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');

    const handleCancel = (event) => {
        event.preventDefault();
        // redirection logic here
    };

    return (
        <div>
            <Header />
            <main>
                <div className="wrap">
                    <h2>Create Course</h2>
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            <li>Please provide a value for "Title"</li>
                            <li>Please provide a value for "Description"</li>
                        </ul>
                    </div>
                    <form>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">Course Title</label>
                                <input 
                                    id="courseTitle" 
                                    name="courseTitle" 
                                    type="text" 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)}
                                />

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
                                    onChange={(e) => setEstimatedTime(e.target.value)}
                                />

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
    )
};

export default CreateCourse;
