import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
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
    <div>App</div>
  )
}

export default App