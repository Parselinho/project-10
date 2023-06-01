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
          const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
          const course = response.data;
      
          if (course) {
            if (authenticatedUser.id !== course.userId) {
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
          if (error.response && error.response.status === 404) {
            navigate('/notfound');
          }
          else if (error.response && error.response.status === 403) {
              navigate('/forbidden');
          } else if (error.response && error.response.status === 500) {
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
            if (error.response.status === 500) {
                navigate('/error'); 
            } else if (error.response.data.errors) {
                setErrors(error.response.data.errors);
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
        <button className="button" type="submit">Update Course</button>
        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateCourse;
