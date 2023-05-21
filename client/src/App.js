import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
    // handle sign in logic and setUser
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      <BrowserRouter>
        <Header user={user} onSignOut={signOut} />
        <Routes>
          <Route path="/courses/*" element={
            <Routes>
              <Route path="/" element={<Courses />} />
              <Route path="/:id" element={<CourseDetail />} />
              <Route path="/create" element={<CreateCourse />} />
              <Route path="/:id/update" element={<UpdateCourse />} />
            </Routes>
          } />
          <Route path="/signin" element={<UserSignIn onSignIn={signIn} />} />
          <Route path="/signup" element={<UserSignUp onSignUp={signIn} />} />
          <Route path="/signout" element={<UserSignOut onSignOut={signOut} />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
