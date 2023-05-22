import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from 'axios';

import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/Course-details";
import CreateCourse from "./components/Create-course";
import UpdateCourse from "./components/Update-course";
import UserSignIn from "./components/Sign-in";
import UserSignUp from "./components/Sign-up";
import UserSignOut from "./components/SignOut";
import { AuthContext } from "./components/context/AuthContext";

function App() {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    try {
        const response = await axios.get('http://localhost:5000/api/authenticate', {
            headers: {
                'Authorization': `Basic ${window.btoa(`${email}:${password}`)}`
            }
        });

        if (response.status === 200) {
            setUser(response.data.user);
        }
    } catch (error) {
        console.error("Error signing in", error);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/courses/*" element={
            <Routes>
              <Route path="/" element={<Courses />} />
              <Route path="/:id" element={<CourseDetail />} />
              <Route path="/create" element={<CreateCourse />} />
              <Route path="/:id/update" element={<UpdateCourse />} />
            </Routes>
          } />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/signout" element={<UserSignOut />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
