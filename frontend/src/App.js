import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import GetForm from './pages/GetForm';
import CheckForm from './pages/CheckForm';
import ErrorPage from './pages/ErrorPage';
import Formdata from './pages/Formdata';

// Integration Start

import Subject from './pages/FolderManagement/subject/Subject'
import AddSubject from "./pages/FolderManagement/subject/AddSubject"
import SubjectInfo from "./pages/FolderManagement/SubjectInfo";

import CourseMaterial from "./pages/FolderManagement/courseMaterial/CourseMaterial";
import AddCourseMaterial from "./pages/FolderManagement/courseMaterial/AddCourseMaterial";
import EditCourseMaterial from "./pages/FolderManagement/courseMaterial/EditCourseMaterial"

import Quiz from "./pages/FolderManagement/quizzes/Quiz";
import EditQuiz from "./pages/FolderManagement/quizzes/EditQuiz";

import Assignment from "./pages/FolderManagement/assignments/Assignment";
import EditAssignment from "./pages/FolderManagement/assignments/EditAssignment";

import Mids from "./pages/FolderManagement/mids/Mids";
import EditMids from "./pages/FolderManagement/mids/EditMids";

import Finals from "./pages/FolderManagement/finals/Finals";
import EditFinals from "./pages/FolderManagement/finals/EditFinals";

import AddDocument from './pages/FolderManagement/AddDocument';

// Integration End


// @desc    Robot Imports
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  // @modified in Dashboard
  const [ currentUser, setCurrentUser ] = useState();

  const [ files, setFiles ] = useState({
    question: null,
    best: null,
    average: null,
    worst: null,
    marks: null
  });

  const docsA = ['Question Paper', 'Best', 'Average', 'Worst', 'Marks Sheet'];


  return (
    <>
      <Router>
        <div className="container">
          <Header currentUser={currentUser} setCurrentUser={setCurrentUser}/>
          <Routes>
            <Route path='/' element={<Dashboard  currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/form/get' element={<GetForm />} />
            <Route path='/form/check' element={<CheckForm currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path='/form/data/:formID' element={<Formdata />} />

            {/* Integration */}
            <Route exact path="/subject" element={<Subject currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route exact path="/addsubject" element={<AddSubject />} />
            <Route exact path="/subject/:subjectId" element={<SubjectInfo />} />

            <Route exact path="/coursematerial" element={<CourseMaterial />} />
            <Route exact path="/subject/:subjectid/addlecturenotes" element={<AddCourseMaterial />} />
            <Route exact path="/coursematerial/editcoursematerial/:id" element={<EditCourseMaterial />} />

            <Route exact path="/quiz" element={<Quiz />} />
            <Route exact path="/subject/:subjectid/addquiz" element={<AddDocument documents={docsA} files={files} setFiles={setFiles} endpoint={'quiz'}/>} />
            <Route exact path="/subject/editquiz/:id" element={<EditQuiz />} />

            <Route exact path="/assignment" element={<Assignment />} />
            <Route exact path="/subject/:subjectid/addassignment" element={<AddDocument documents={docsA} files={files} setFiles={setFiles} endpoint={'assignment'}/>} />
            <Route exact path="/assignments/editassignment/:id" element={<EditAssignment />} />

            <Route exact path="/mids" element={<Mids />} />
            <Route exact path="/subject/:subjectid/addmid" element={<AddDocument documents={docsA} files={files} setFiles={setFiles} endpoint={'mid'}/>} />
            <Route exact path="/mids/editmids/:id" element={<EditMids />} />

            <Route exact path="/finals" element={<Finals />} />
            <Route exact path="/subject/:subjectid/addfinal" element={<AddDocument documents={docsA} files={files} setFiles={setFiles} endpoint={'final'}/>} />
            <Route exact path="/finals/editfinals/:id" element={<EditFinals />} />


            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
