import { BrowserRouter, Route, Routes } from "react-router-dom";

import Courses from "./components/Courses";
import CourseDetail from "./components/Course-details";
import CreateCourse from "./components/Create-course";
import UpdateCourse from "./components/Update-course";
import UserSignIn from "./components/Sign-in";
import UserSignUp from "./components/Sign-up";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/courses/create" element={<CreateCourse />} />
        <Route path="/courses/:id/update" element={<UpdateCourse />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App