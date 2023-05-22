import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/Course-details";
import CreateCourse from "./components/Create-course";
import UpdateCourse from "./components/Update-course";
import UserSignIn from "./components/Sign-in";
import UserSignUp from "./components/Sign-up";
import UserSignOut from "./components/SignOut";
import { AuthProvider } from "./components/context/AuthContext";

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
