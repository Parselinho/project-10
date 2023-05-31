import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

// UpdateCourse component
const UpdateCourse = () => {
  const { authenticatedUser } = useContext(AuthContext); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch the course data from the API
  useEffect(() => {
    const fetchCourse = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
          const course = response.data;
      
          if (course) {
            setTitle(course.title);
            setDescription(course.description);
            setEstimatedTime(course.estimatedTime || '');
            setMaterialsNeeded(course.materialsNeeded || '');
          } 
        } catch (error) {
          if (error.response && error.response.status === 404) {
            navigate('/notfound');
          } else if (error.response && error.response.status === 403) {
            navigate('/forbidden');
          } else {
            console.error("Error fetching course", error);
          }
        }
      };
  
    fetchCourse();
  }, [id, navigate]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    let errorMessages = [];
    if (title === '') errorMessages.push("Please provide a value for 'Title'");
    if (description === '') errorMessages.push("Please provide a value for 'Description'");
    setErrors(errorMessages);

    if (errorMessages.length > 0) return;

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
    }
  };

  // Handle cancel button click
  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/courses');
  };

  // Render the UpdateCourse component
  return (
    <div>
      <h1>Update Course</h1>
      {errors.length > 0 && (
        <div>
          <h2>Validation Errors</h2>
          <ul>
            {errors.map((error, index) => <li key={index}>{error}</li>)}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
        </label>
        <label>
          Estimated Time:
          <input type="text" value={estimatedTime} onChange={e => setEstimatedTime(e.target.value)} />
        </label>
        <label>
          Materials Needed:
          <textarea value={materialsNeeded} onChange={e => setMaterialsNeeded(e.target.value)} />
        </label>
        <button type="submit">Update Course</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateCourse;
