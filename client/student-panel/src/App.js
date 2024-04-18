import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";


import Homework from "./Components/Homework";
import StudentForm from "./Components/StudentForm";
import StudentInfoDisplay from "./Components/StudentInfoDisplay";
import QuestionPapers from "./Components/QuestionPapers"
import StudentAttendance from './Components/StudentAttendance';
import CollegeCodeEntry from "./Components/CollegeCodeEntry";
import Login from "./Components/Login";
import Student from "./Components/Student";
import VideoLecture from "./Components/VideoLecture";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homework />} />
          <Route path="/collegecode" element={<CollegeCodeEntry />} />
          <Route path="/login" element={<Login />} />
          <Route path="/StudentForm" element={<StudentForm />} />
          <Route path="/StudentInfoDisplay" element={<StudentInfoDisplay />} />
          <Route path="/student-quiz" element={<Student />} />
          <Route  path="/questionpaper" element={<QuestionPapers />}/>
        <Route path='/student-attendance' element={< StudentAttendance/>}/>
        <Route path="videos" element={<VideoLecture/>}/>
  
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
