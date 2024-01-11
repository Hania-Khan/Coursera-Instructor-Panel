// import Home from './components/Home';
import Login from './components/Login.js';
import Signup from './components/Signup';
import CreateQuiz from './components/CreateQuiz'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {HomePage} from './pages/HomePage.jsx'
import {QuizPage} from "./pages/quiz/Quiz";
import {ViewQuizPage} from './pages/quiz/ViewQuiz'
import {CreateCourseListPage} from './pages/CourseMaterial/Course';
import {CreateMaterialPage} from './pages/CourseMaterial/CreateCourse';
import {AssignmentPage} from './pages/CourseMaterial/Assignment.jsx';
// import { useState } from 'react';

function App(){
  return(
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/quizzes/create" element={<QuizPage />} />
          <Route path="/quizzes" element={<ViewQuizPage />} />
          <Route path="/courses" element={<CreateCourseListPage />} />
          <Route path="/courses/:courseId/material" element={<CreateMaterialPage />} />
          <Route path="/assignment/:courseId" element={<AssignmentPage />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;

