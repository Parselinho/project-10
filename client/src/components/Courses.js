import React, {useEffect, useState} from 'react';
import axios from 'axios';

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
        <h1>Courses:</h1>
        <ul>
          { courses.map(course => <li key={course.id}>{course.title}</li>) }
        </ul>
      </div>
    )
}

export default Courses