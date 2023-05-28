import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/Course-details";
import CreateCourse from "./components/Create-course";
import UpdateCourse from "./components/Update-course";
import UserSignIn from "./components/Sign-in";
import UserSignUp from "./components/Sign-up";
import UserSignOut from "./components/SignOut";
import PrivateRoute from './components/PrivateRoute';


function RedirectToCourses() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/courses');
  }, [navigate]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<RedirectToCourses />} />
        <Route path="/courses/*" element={
          <Routes>
            <Route path="/" element={<Courses />} />
            <Route path="/:id" element={<CourseDetail />} />
            <PrivateRoute path="/create" element={<CreateCourse />} />
            <PrivateRoute path="/:id/update" element={<UpdateCourse />} />
          </Routes>
        } />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signout" element={<UserSignOut />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
