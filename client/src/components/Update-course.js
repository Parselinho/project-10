import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const UpdateCourse = () => {
  const { authenticatedUser } = useContext(AuthContext); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/courses/${id}`); // Fetch course data
          const course = response.data; // Store course data in a variable
      
          if (course) {
            if (authenticatedUser.id !== course.userId) { // If the authenticated user does not own the course, redirect to forbidden page
              navigate('/forbidden');
            } else {
              setTitle(course.title);
              setDescription(course.description);
              setEstimatedTime(course.estimatedTime || '');
              setMaterialsNeeded(course.materialsNeeded || '');
            }
          } else {
            navigate('/notfound');
          }
        } catch (error) {
          if (error.response && error.response.status === 404) { // If the server returns a 404 status code, navigate to the not found page
            navigate('/notfound');
          }
          else if (error.response && error.response.status === 403) { // If the server returns a 403 status code, navigate to the forbidden page
              navigate('/forbidden');
          } else if (error.response && error.response.status === 500) { // If the server returns a 500 status code, navigate to the error page
              navigate('/error');
          } else {
            console.error("Error fetching course", error);
          }
        }
      };
  
    fetchCourse();
  }, [id, navigate, authenticatedUser]); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.put(`http://localhost:5000/api/courses/${id}`, { 
            title,
            description,
            estimatedTime,
            materialsNeeded
        }, {
            headers: {
                'Authorization': `Basic ${btoa(`${authenticatedUser.emailAddress}:${authenticatedUser.password}`)}`
            }
        });

        if (response.status === 204) {
            navigate('/courses');
        }
    } catch (error) {
        console.error("Error updating course", error);
        if (error.response) {
            if (error.response.status === 400) { // If the server returns a 400 status code, handle validation errors
                setErrors(error.response.data.errors);
            } else if (error.response.status === 500) {
                navigate('/error'); 
            }
        }
    }
};
  
  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/courses');
  };

  return (
    <div>
      <h1 className='bold'>Update Course</h1>
      {errors.length > 0 && (
        <div>
          <h2>Validation Errors</h2>
          <ul className='marginBottom'>
            {errors.map((error, index) => <li key={index}>{error}</li>)}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Course Title:</label>
        <input id="title" name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="description">Course Description:</label>
        <textarea id="description" name="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label htmlFor="estimatedTime">Estimated Time:</label>
        <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)} />

        <label htmlFor="materialsNeeded">Materials Needed:</label>
        <textarea id="materialsNeeded" name="materialsNeeded" type="text" value={materialsNeeded} onChange={(e) => setMaterialsNeeded(e.target.value)} />

        <button type="submit">Update Course</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateCourse;
