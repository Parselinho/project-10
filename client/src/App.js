import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useContext } from 'react';

import { AuthProvider, AuthContext } from "./components/context/AuthContext";
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/Course-details";
import CreateCourse from "./components/Create-course";
import UpdateCourse from "./components/Update-course";
import UserSignIn from "./components/Sign-in";
import UserSignUp from "./components/Sign-up";
import UserSignOut from "./components/SignOut";
import PrivateRoute from "./components/PrivateRoute";
import Error from "./components/ErrorPage";
import Forbidden from "./components/Forbidden";
import NotFound from "./components/NotFound";

// Redirects the user to the "/courses" route when the app is loaded
function RedirectToCourses() {
  const navigate = useNavigate();

  useEffect(() => { 
    navigate('/courses');
  }, [navigate]); // Redirect to the "/courses" route when the component mounts

  return null;
}

function App() {
  const { signIn } = useContext(AuthContext);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<RedirectToCourses />} />
          <Route path="/courses/*" element={
            <Routes>
              <Route path="/" element={<Courses />} />
              <Route path="/:id" element={<CourseDetail />} />
              <Route path="/create" element={
                <PrivateRoute>
                  <CreateCourse />
                </PrivateRoute>
              } />
              <Route path="/:id/update" element={
                <PrivateRoute>
                  <UpdateCourse />
                </PrivateRoute>
              } />
            </Routes>
          } />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signup" element={<UserSignUp onSignUp={signIn} />} />
          <Route path="/signout" element={<UserSignOut />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
