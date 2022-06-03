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

// @desc    Robot Imports
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  // @modified in Dashboard
  const [ currentUser, setCurrentUser ] = useState();



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
            <Route path='/form/check' element={<CheckForm />} />
            <Route path='/form/data/:formID' element={<Formdata />} />


            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
