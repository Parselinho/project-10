import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:5000/api/courses')
        .then(response => {
          setCourses(response.data);
          console.log(response.data);
        }) 
        .catch(error => { 
          console.log('Error fetching and parsing data', error);
        });
    }, []);
  
    return (
      <div>
      <Header />
        <h1>Courses:</h1>
        <ul>
            {courses.map(course => (
                <li key={course.id}>
                    <Link to={`/courses/${course.id}`}>{course.title}</Link>
                </li>
            ))}
        </ul>
        <Link to="/courses/create">Create Course</Link>
      </div>
    )
}

export default Courses